document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
});

function initializeProfile() {
    setupEventListeners();
    loadProfileData();
    setupModals();
    initializePortfolio();
}

// Event Listeners Setup
function setupEventListeners() {
    // Connect Button
    const connectBtn = document.querySelector('.primary-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => openModal('connectModal'));
    }

    // Bookmark Button
    const bookmarkBtn = document.querySelector('.secondary-btn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', toggleBookmark);
    }

    // Profile Photo Edit
    const editPhotoBtn = document.querySelector('.edit-photo');
    if (editPhotoBtn) {
        editPhotoBtn.addEventListener('click', handleProfilePhotoEdit);
    }

    // Document Downloads
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', handleDocumentDownload);
    });

    // Connect Form Submission
    const connectForm = document.getElementById('connectForm');
    if (connectForm) {
        connectForm.addEventListener('submit', handleConnectSubmit);
    }

    // Notifications
    const notificationBell = document.querySelector('.notifications');
    if (notificationBell) {
        notificationBell.addEventListener('click', handleNotifications);
    }
}

// Modal Functions
function setupModals() {
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });

    // Close button functionality
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Profile Actions
function toggleBookmark(e) {
    const btn = e.currentTarget;
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        showToast('Profile bookmarked');
    } else {
        icon.classList.replace('fas', 'far');
        showToast('Bookmark removed');
    }
}

function handleProfilePhotoEdit() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Here you would typically upload to your server
                // For now, we'll just show a preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.querySelector('.profile-photo img').src = e.target.result;
                };
                reader.readAsDataURL(file);
                showToast('Profile photo updated');
            } catch (error) {
                showToast('Error updating profile photo', 'error');
            }
        }
    };
    
    input.click();
}

// Portfolio Management
function initializePortfolio() {
    const portfolioData = [
        {
            name: "HealthTech Solutions",
            description: "AI-powered healthcare diagnostics",
            image: "healthtech.jpg",
            year: 2022
        },
        {
            name: "GreenEnergy AI",
            description: "Renewable energy optimization",
            image: "greenenergyAi.jpg",
            year: 2023
        }
        // Add more portfolio items as needed
    ];

    renderPortfolio(portfolioData);
}

function renderPortfolio(data) {
    const container = document.querySelector('.portfolio-grid');
    if (!container) return;

    container.innerHTML = data.map(item => `
        <div class="portfolio-item">
            <img src="assets/images/${item.image}" alt="${item.name}">
            <div class="portfolio-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="year">${item.year}</span>
            </div>
        </div>
    `).join('');
}

// Form Handling
async function handleConnectSubmit(e) {
    e.preventDefault();
    
    const message = document.getElementById('message').value;
    const pitchFile = document.getElementById('pitch').files[0];

    try {
        // Here you would typically send to your server
        // For demo, we'll just simulate an API call
        await simulateApiCall({ message, pitchFile });
        
        showToast('Message sent successfully');
        closeModal('connectModal');
        e.target.reset();
    } catch (error) {
        showToast('Error sending message', 'error');
    }
}

// Utility Functions
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Add to document
    document.body.appendChild(toast);

    // Remove after animation
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

async function simulateApiCall(data) {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

function handleDocumentDownload(e) {
    e.preventDefault();
    const docName = e.target.closest('li').querySelector('span').textContent;
    showToast(`Downloading ${docName}...`);
    // Implement actual download logic here
}

function handleNotifications() {
    // Implement notifications panel logic
    showToast('Loading notifications...');
}

// Load Profile Data
function loadProfileData() {
    // Here you would typically fetch profile data from your API
    // For now, we'll use static data
    const profileData = {
        name: "TechVentures Capital",
        location: "Andhra Pradesh, India",
        tags: ["Tech", "Healthcare", "AI/ML"],
        stats: {
            investments: 32,
            avgInvestment: "$750K",
            successRate: "85%"
        }
    };

    updateProfileUI(profileData);
}

function updateProfileUI(data) {
    // Update profile information
    document.querySelector('.profile-text h1').textContent = data.name;
    document.querySelector('.location').innerHTML = 
        `<i class="fas fa-map-marker-alt"></i> ${data.location}`;
    
    // Update stats
    const statsElements = document.querySelectorAll('.stat-value');
    statsElements[0].textContent = data.stats.investments;
    statsElements[1].textContent = data.stats.avgInvestment;
    statsElements[2].textContent = data.stats.successRate;
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeProfile,
        showToast,
        handleConnectSubmit
    };
} 