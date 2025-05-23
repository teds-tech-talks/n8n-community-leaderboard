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
            
            // Log creator data for debugging
            console.log('Creator data found:', creatorData);
            console.log('Creator user data:', creatorData.user);
            console.log('Current URL path:', window.location.pathname);
            console.log('Extracted username:', creatorUsername);
            
            // Populate creator profile with data from JSON if not already set in the MD file
            populateCreatorProfile(creatorData);
            
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
 * Populate the creator profile with data from JSON if not already set in the MD file
 * @param {Object} creatorData - The creator's data from the JSON
 */
function populateCreatorProfile(creatorData) {
    const userData = creatorData.user;
    console.log('Populating profile with user data:', userData);
    
    // Set creator name if not already set
    const nameElement = document.querySelector('.creator-info h1');
    console.log('Name element found:', nameElement, 'Current text:', nameElement ? nameElement.textContent : 'not found');
    if (nameElement && nameElement.textContent.trim() === '') {
        nameElement.textContent = userData.name || userData.username;
        console.log('Updated name to:', userData.name || userData.username);
    }
    
    // Set creator bio if not already set or create it if missing
    let bioElement = document.querySelector('.creator-bio');
    if (!bioElement && userData.bio) {
        // Bio element doesn't exist, create it
        console.log('Bio element not found, creating new one');
        bioElement = document.createElement('p');
        bioElement.className = 'creator-bio';
        const mainContent = document.querySelector('.creator-card-main-content');
        if (mainContent) {
            mainContent.appendChild(bioElement);
        }
    }
    
    if (bioElement) {
        if (bioElement.textContent.trim() === '') {
            if (userData.bio) {
                bioElement.textContent = userData.bio;
                console.log('Updated bio to:', userData.bio);
            } else {
                bioElement.style.display = 'none';
            }
        }
    }
    
    // Set creator avatar if not already set
    const avatarElement = document.querySelector('img.creator-avatar');
    console.log('Avatar element found:', avatarElement, 'Current src:', avatarElement ? avatarElement.src : 'not found');
    if (avatarElement && (!avatarElement.src || avatarElement.src.includes('default'))) {
        if (userData.avatar) {
            avatarElement.src = userData.avatar;
            console.log('Updated avatar to:', userData.avatar);
        }
    }
    
    // Set verified badge if applicable
    const verifiedBadge = document.querySelector('.verified-badge');
    if (userData.verified) {
        if (!verifiedBadge) {
            const usernameElement = document.querySelector('.creator-username');
            if (usernameElement) {
                const badge = document.createElement('span');
                badge.className = 'verified-badge';
                badge.title = 'Verified Creator';
                usernameElement.appendChild(badge);
            }
        }
    } else if (verifiedBadge) {
        verifiedBadge.style.display = 'none';
    }
    
    // Add social links if not already set
    const linksContainer = document.querySelector('.creator-username .creator-links');
    console.log('Links container found:', linksContainer, 'Children count:', linksContainer ? linksContainer.children.length : 'not found');
    console.log('User links:', userData.links);
    
    // If links container doesn't exist, create it
    if (!linksContainer && userData.links && userData.links.length > 0) {
        console.log('Links container not found, creating new one');
        const usernameElement = document.querySelector('.creator-username');
        if (usernameElement) {
            const newLinksContainer = document.createElement('span');
            newLinksContainer.className = 'creator-links';
            usernameElement.appendChild(newLinksContainer);
            
            // Add links to the new container
            userData.links.forEach(link => {
                addLinkToContainer(link, newLinksContainer);
            });
        }
    } else if (linksContainer && linksContainer.children.length === 0 && userData.links && userData.links.length > 0) {
        console.log('Adding links to existing container');
        userData.links.forEach(link => {
            addLinkToContainer(link, linksContainer);
        });
    }
}

/**
 * Helper function to add a link to a container
 * @param {string} link - The URL to add
 * @param {HTMLElement} container - The container to add the link to
 */
function addLinkToContainer(link, container) {
    const linkLower = link.toLowerCase();
    let iconClass = 'icon-website';
    let linkText = link.replace('https://', '').replace('http://', '').split('/')[0];
    
    if (linkLower.includes('twitter.com')) {
        iconClass = 'icon-twitter';
        linkText = 'Twitter';
    } else if (linkLower.includes('github.com')) {
        iconClass = 'icon-github';
        linkText = 'GitHub';
    } else if (linkLower.includes('linkedin.com')) {
        iconClass = 'icon-linkedin';
        linkText = 'LinkedIn';
    }
    
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.target = '_blank';
    linkElement.rel = 'noopener noreferrer';
    linkElement.className = 'social-button';
    
    const iconSpan = document.createElement('span');
    iconSpan.className = `link-icon ${iconClass}`;
    
    linkElement.appendChild(iconSpan);
    linkElement.appendChild(document.createTextNode(linkText));
    
    container.appendChild(linkElement);
    console.log('Added link:', link, 'to container');
}

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
    
    // Also update the creator count in the explanation text
    const creatorCountElement = document.getElementById('creator-count');
    if (creatorCountElement && elementId === 'total-views-rating') {
        creatorCountElement.textContent = totalCreators;
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
