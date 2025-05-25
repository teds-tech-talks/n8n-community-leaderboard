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
            const creatorData = data.find(item => item.user.username.toLowerCase() === creatorUsername);
            
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
    
    // Update the creator name in the rankings text if needed
    const displayNameElement = document.getElementById('creator-display-name');
    if (displayNameElement && displayNameElement.textContent.trim() === '') {
        displayNameElement.textContent = userData.name || userData.username;
        console.log('Updated display name in rankings to:', userData.name || userData.username);
    }
    
    // Handle bio - only use JSON bio if the MD file doesn't have one
    const bioElement = document.querySelector('.creator-bio');
    console.log('Bio element found:', bioElement);
    
    // Check if the bio is coming from the MD file by looking at the HTML structure
    // If it's from the MD file, it will have child nodes (like <p> tags from markdownify)
    const bioFromMd = bioElement && (bioElement.innerHTML.trim() !== bioElement.textContent.trim() || 
                                    bioElement.childNodes.length > 1);
    
    console.log('Bio from MD:', bioFromMd, 'Bio innerHTML:', bioElement ? bioElement.innerHTML : 'none');
    
    if (bioElement) {
        if (bioFromMd || bioElement.textContent.trim() !== '') {
            // If bio element has content from MD file, keep it and don't add JSON bio
            console.log('Using existing bio from MD file');
        } else if (userData.bio) {
            // If bio element is empty and we have a bio in JSON
            bioElement.textContent = userData.bio;
            bioElement.style.display = ''; // Make sure it's visible
            console.log('Updated empty bio with JSON bio:', userData.bio);
        } else {
            // No bio in MD file or JSON
            bioElement.style.display = 'none';
            console.log('No bio available, hiding bio element');
        }
    }
    
    // Handle avatar
    const avatarElement = document.querySelector('img.creator-avatar');
    const defaultAvatarElement = document.querySelector('.default-avatar');
    console.log('Avatar element found:', avatarElement, 'Default avatar found:', defaultAvatarElement);
    
    if (userData.avatar) {
        // If we have an avatar URL from the JSON
        if (avatarElement) {
            // If there's an img.creator-avatar element, update its src
            avatarElement.src = userData.avatar;
            console.log('Updated avatar image src to:', userData.avatar);
        } else if (defaultAvatarElement) {
            // If there's a default avatar div, replace it with an image
            const img = document.createElement('img');
            img.src = userData.avatar;
            img.alt = `${userData.name || userData.username}'s avatar`;
            img.className = 'creator-avatar';
            defaultAvatarElement.parentNode.replaceChild(img, defaultAvatarElement);
            console.log('Replaced default avatar with image:', userData.avatar);
        }
    } else if (defaultAvatarElement) {
        // If no avatar URL but we have a default avatar element, make sure it shows the first letter
        const nameFirstLetter = (userData.name || userData.username || '?').charAt(0).toUpperCase();
        defaultAvatarElement.textContent = nameFirstLetter;
        console.log('Set default avatar text to:', nameFirstLetter);
    }
    
    // Set verified badge if applicable
    const verifiedBadge = document.querySelector('.verified-badge');
    if (userData.verified) {
        if (!verifiedBadge) {
            const usernameElement = document.querySelector('.creator-username');
            if (usernameElement) {
                // Find where to insert the badge - right after the username text
                const usernameText = usernameElement.childNodes[0];
                if (usernameText) {
                    const badge = document.createElement('span');
                    badge.className = 'verified-badge';
                    badge.title = 'Verified Creator';
                    
                    // Insert after the username text but before any other elements
                    usernameElement.insertBefore(badge, usernameText.nextSibling);
                    console.log('Added verified badge after username text');
                } else {
                    // Fallback to appending if we can't find the text node
                    usernameElement.appendChild(badge);
                    console.log('Added verified badge at end of username element');
                }
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
