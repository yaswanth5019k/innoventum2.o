// Add these functions at the top of your file
function generateState() {
    // Generate a random string for state parameter
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

function handleLinkedInCallback() {
    // Check if this is a LinkedIn callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    if (code) {
        // Verify state parameter matches what we stored
        const storedState = localStorage.getItem('linkedin_state');
        if (state !== storedState) {
            console.error('State parameter mismatch');
            return;
        }
        
        // Clear stored state
        localStorage.removeItem('linkedin_state');
        
        // Exchange code for access token (this should be done on your backend)
        console.log('LinkedIn authorization code:', code);
        // Here you would typically send the code to your backend
        // exchangeCodeForToken(code);
    } else if (error) {
        console.error('LinkedIn OAuth error:', error);
    }
}

// Add this at the top of your file, outside the DOMContentLoaded event
function handleCredentialResponse(response) {
    // This function will be called when Google returns the credentials
    console.log("Encoded JWT ID token: " + response.credential);
    
    // Decode the credential
    const responsePayload = decodeJwtResponse(response.credential);
    
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    // Here you would typically:
    // 1. Send this information to your backend
    // 2. Create or update user in your database
    // 3. Create a session or JWT token
    // 4. Redirect to dashboard
}

// Helper function to decode JWT token
function decodeJwtResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Form submission handling
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const remember = document.querySelector('#remember').checked;

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password, remember });
        
        // Example validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

    });

    // Social login handlers
    const linkedinBtn = document.querySelector('.linkedin');

    linkedinBtn.addEventListener('click', function(e) {
        // Generate and store state parameter
        const state = generateState();
        localStorage.setItem('linkedin_state', state);
        
        // Update href with new state
        const baseUrl = 'https://www.linkedin.com/oauth/v2/authorization';
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: 'YOUR_CLIENT_ID',
            redirect_uri: 'YOUR_REDIRECT_URI',
            state: state,
            scope: 'r_liteprofile r_emailaddress'
        });
        
        this.href = `${baseUrl}?${params.toString()}`;
    });

    // Check for LinkedIn callback
    handleLinkedInCallback();
});

function openStartUp(){
    window.location.href = "profile.html";
}

function openInvestor(){
    window.location.href = "ie.html";
}