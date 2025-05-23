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
 * Calculate and display a rating based on percentile
 * @param {string} elementId - The ID of the element to update
 * @param {number} value - The creator's value for this metric
 * @param {Array<number>} allValues - All creators' values for this metric
 */
function displayRating(elementId, value, allValues) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Filter out zeros and sort values
    const filteredValues = allValues.filter(v => v > 0).sort((a, b) => a - b);
    
    if (filteredValues.length === 0 || value === 0) {
        element.textContent = 'N/A';
        return;
    }
    
    // Find the percentile of the current value
    const index = filteredValues.findIndex(v => v >= value);
    const percentile = index === -1 
        ? 100 // Higher than all values
        : (index / filteredValues.length) * 100;
    
    // Convert percentile to rating (1-10)
    // Using a non-linear scale to reward higher percentiles more
    const rating = Math.max(1, Math.min(10, Math.ceil(Math.pow(percentile / 100, 0.5) * 10)));
    
    // Display the rating
    element.textContent = rating + '/10';
    
    // Add appropriate class based on rating
    if (rating >= 8) {
        element.classList.add('rating-high');
    } else if (rating >= 5) {
        element.classList.add('rating-medium');
    } else {
        element.classList.add('rating-low');
    }
}
