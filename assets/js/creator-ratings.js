document.addEventListener('DOMContentLoaded', function() {
    // Get the creator username from the URL
    const pathParts = window.location.pathname.split('/');
    const creatorUsername = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
    
    if (!creatorUsername) {
        console.error('Could not determine creator username from URL');
        return;
    }
    
    // Fetch the creators data
    fetch('/stats_aggregate_creators.json')
        .then(response => response.json())
        .then(data => {
            // Find the current creator's data
            const creatorData = data.find(item => item.user.username === creatorUsername);
            
            if (!creatorData) {
                console.error('Creator not found in data:', creatorUsername);
                return;
            }
            
            // Extract all creators' metrics for comparison
            const allTotalViews = data.map(item => parseInt(item.sum_unique_visitors) || 0);
            const allTotalInserters = data.map(item => parseInt(item.sum_unique_inserters) || 0);
            const allMonthlyViews = data.map(item => parseInt(item.sum_unique_monthly_visitors) || 0);
            const allMonthlyInserters = data.map(item => parseInt(item.sum_unique_monthly_inserters) || 0);
            const allWeeklyViews = data.map(item => parseInt(item.sum_unique_weekly_visitors) || 0);
            const allWeeklyInserters = data.map(item => parseInt(item.sum_unique_weekly_inserters) || 0);
            
            // Calculate and display ratings
            displayRating('total-views-rating', 
                parseInt(creatorData.sum_unique_visitors) || 0, 
                allTotalViews);
                
            displayRating('total-inserters-rating', 
                parseInt(creatorData.sum_unique_inserters) || 0, 
                allTotalInserters);
                
            displayRating('monthly-views-rating', 
                parseInt(creatorData.sum_unique_monthly_visitors) || 0, 
                allMonthlyViews);
                
            displayRating('monthly-inserters-rating', 
                parseInt(creatorData.sum_unique_monthly_inserters) || 0, 
                allMonthlyInserters);
                
            displayRating('weekly-views-rating', 
                parseInt(creatorData.sum_unique_weekly_visitors) || 0, 
                allWeeklyViews);
                
            displayRating('weekly-inserters-rating', 
                parseInt(creatorData.sum_unique_weekly_inserters) || 0, 
                allWeeklyInserters);
        })
        .catch(error => console.error('Error fetching creator data:', error));
});

/**
 * Calculate and display a creator's position/rank
 * @param {string} elementId - The ID of the element to update
 * @param {number} value - The creator's value for this metric
 * @param {Array<number>} allValues - All creators' values for this metric
 */
function displayRating(elementId, value, allValues) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Filter out zeros and sort values in descending order (higher is better)
    const filteredValues = allValues.filter(v => v > 0).sort((a, b) => b - a);
    
    if (filteredValues.length === 0 || value === 0) {
        element.textContent = 'N/A';
        return;
    }
    
    // Find the position of the current value (1-based index)
    const position = filteredValues.findIndex(v => v === value) + 1;
    
    // If value not found in the array (shouldn't happen, but just in case)
    if (position === 0) {
        element.textContent = 'N/A';
        return;
    }
    
    // Display the position
    element.textContent = `#${position}`;
    
    // Add appropriate class based on position
    const totalCreators = filteredValues.length;
    const percentile = (position / totalCreators) * 100;
    
    // Update the total creators count (only needs to be done once)
    const totalCreatorsElement = document.getElementById('total-creators');
    if (totalCreatorsElement && elementId === 'total-views-rating') {
        totalCreatorsElement.textContent = `Out of ${totalCreators} total creators`;
    }
    
    // Clear any existing classes
    element.classList.remove('rating-top', 'rating-middle', 'rating-bottom');
    
    // Add appropriate class based on percentile
    if (percentile <= 33) {
        element.classList.add('rating-top');
    } else if (percentile <= 66) {
        element.classList.add('rating-middle');
    } else {
        element.classList.add('rating-bottom');
    }
}
