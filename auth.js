// Authentication Module for STRATAVERSE
// Handles user authentication, session management, and data persistence

let supabaseClient = null;
let currentUser = null;

// Initialize Supabase client
function initAuth() {
    if (CONFIG.supabase.url === 'YOUR_SUPABASE_URL') {
        console.warn('Supabase not configured. Authentication features disabled.');
        return;
    }

    try {
        supabaseClient = supabase.createClient(
            CONFIG.supabase.url,
            CONFIG.supabase.anonKey
        );

        // Check for existing session
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                currentUser = session.user;
                updateAuthUI(true);
            }
        });

        // Listen for auth changes
        supabaseClient.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                currentUser = session.user;
                updateAuthUI(true);
            } else if (event === 'SIGNED_OUT') {
                currentUser = null;
                updateAuthUI(false);
            }
        });
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
    }
}

// Update UI based on auth state
function updateAuthUI(isAuthenticated) {
    const authButton = document.getElementById('authButton');
    if (authButton) {
        authButton.textContent = isAuthenticated ? 'Dashboard' : 'Sign In';
        authButton.onclick = isAuthenticated ? showDashboard : showAuthModal;
    }
}

// Handle auth button click
function handleAuth() {
    if (currentUser) {
        showDashboard();
    } else {
        showAuthModal();
    }
}

// Show authentication modal
function showAuthModal() {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <div class="auth-modal-header">
                <h2>Sign In to STRATAVERSE</h2>
                <button class="close-modal" onclick="closeAuthModal()">&times;</button>
            </div>
            <div class="auth-modal-body">
                <div class="auth-tabs">
                    <button class="auth-tab active" onclick="switchAuthTab('signin')">Sign In</button>
                    <button class="auth-tab" onclick="switchAuthTab('signup')">Sign Up</button>
                </div>
                
                <div id="signinForm" class="auth-form active">
                    <input type="email" id="signinEmail" placeholder="Email" required>
                    <input type="password" id="signinPassword" placeholder="Password" required>
                    <button onclick="signIn()" class="auth-submit">Sign In</button>
                    <p class="auth-link">Forgot password? <a href="#" onclick="resetPassword()">Reset</a></p>
                </div>
                
                <div id="signupForm" class="auth-form">
                    <input type="text" id="signupName" placeholder="Full Name" required>
                    <input type="email" id="signupEmail" placeholder="Email" required>
                    <input type="password" id="signupPassword" placeholder="Password (min 8 characters)" required>
                    <button onclick="signUp()" class="auth-submit">Create Account</button>
                </div>
                
                <div class="auth-divider">OR</div>
                
                <button onclick="signInWithGoogle()" class="auth-social google">
                    <span>Continue with Google</span>
                </button>
            </div>
            <div class="auth-modal-footer">
                <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Close auth modal
function closeAuthModal() {
    const modal = document.querySelector('.auth-modal');
    if (modal) {
        modal.remove();
    }
}

// Switch between sign in and sign up tabs
function switchAuthTab(tab) {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));
    
    if (tab === 'signin') {
        tabs[0].classList.add('active');
        document.getElementById('signinForm').classList.add('active');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('signupForm').classList.add('active');
    }
}

// Sign in with email/password
async function signIn() {
    if (!supabaseClient) {
        alert('Authentication not configured. Please set up Supabase credentials in config.js');
        return;
    }

    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        closeAuthModal();
        alert('Welcome back!');
    } catch (error) {
        alert('Sign in failed: ' + error.message);
    }
}

// Sign up with email/password
async function signUp() {
    if (!supabaseClient) {
        alert('Authentication not configured. Please set up Supabase credentials in config.js');
        return;
    }

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return;
    }

    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        if (error) throw error;

        closeAuthModal();
        alert('Account created! Please check your email to verify your account.');
    } catch (error) {
        alert('Sign up failed: ' + error.message);
    }
}

// Sign in with Google
async function signInWithGoogle() {
    if (!supabaseClient) {
        alert('Authentication not configured. Please set up Supabase credentials in config.js');
        return;
    }

    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) throw error;
    } catch (error) {
        alert('Google sign in failed: ' + error.message);
    }
}

// Reset password
async function resetPassword() {
    if (!supabaseClient) {
        alert('Authentication not configured. Please set up Supabase credentials in config.js');
        return;
    }

    const email = prompt('Enter your email address:');
    if (!email) return;

    try {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password'
        });

        if (error) throw error;

        alert('Password reset email sent! Check your inbox.');
    } catch (error) {
        alert('Password reset failed: ' + error.message);
    }
}

// Sign out
async function signOut() {
    if (!supabaseClient) return;

    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;

        alert('Signed out successfully');
        showPage('home');
    } catch (error) {
        alert('Sign out failed: ' + error.message);
    }
}

// Show user dashboard
function showDashboard() {
    if (!currentUser) {
        showAuthModal();
        return;
    }

    const dashboardHTML = `
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h1>Welcome, ${currentUser.user_metadata?.full_name || currentUser.email}</h1>
                <button onclick="signOut()" class="btn-secondary">Sign Out</button>
            </div>
            
            <div class="dashboard-stats">
                <div class="stat-card">
                    <h3>Analyses Created</h3>
                    <p class="stat-number" id="analysisCount">0</p>
                </div>
                <div class="stat-card">
                    <h3>Frameworks Used</h3>
                    <p class="stat-number" id="frameworkCount">0</p>
                </div>
                <div class="stat-card">
                    <h3>Total Value Analyzed</h3>
                    <p class="stat-number" id="totalValue">$0</p>
                </div>
            </div>
            
            <div class="dashboard-section">
                <h2>Recent Analyses</h2>
                <div id="recentAnalyses" class="analyses-list">
                    <p class="empty-state">No analyses yet. <a href="#" onclick="startWizard()">Create your first analysis</a></p>
                </div>
            </div>
        </div>
    `;

    // Create dashboard page if it doesn't exist
    let dashboardPage = document.getElementById('dashboardPage');
    if (!dashboardPage) {
        dashboardPage = document.createElement('div');
        dashboardPage.id = 'dashboardPage';
        dashboardPage.className = 'page';
        document.getElementById('app').appendChild(dashboardPage);
    }

    dashboardPage.innerHTML = dashboardHTML;
    showPage('dashboard');
    loadUserAnalyses();
}

// Load user's saved analyses
async function loadUserAnalyses() {
    if (!supabaseClient || !currentUser) return;

    try {
        const { data, error } = await supabaseClient
            .from('analyses')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) throw error;

        if (data && data.length > 0) {
            displayAnalyses(data);
            updateDashboardStats(data);
        }
    } catch (error) {
        console.error('Failed to load analyses:', error);
    }
}

// Display analyses in dashboard
function displayAnalyses(analyses) {
    const container = document.getElementById('recentAnalyses');
    if (!container) return;

    container.innerHTML = analyses.map(analysis => `
        <div class="analysis-card">
            <h3>${analysis.organization_name}</h3>
            <p>${analysis.industry} • ${new Date(analysis.created_at).toLocaleDateString()}</p>
            <div class="analysis-actions">
                <button onclick="loadAnalysis('${analysis.id}')" class="btn-primary">View</button>
                <button onclick="deleteAnalysis('${analysis.id}')" class="btn-danger">Delete</button>
            </div>
        </div>
    `).join('');
}

// Update dashboard statistics
function updateDashboardStats(analyses) {
    document.getElementById('analysisCount').textContent = analyses.length;
    
    const uniqueFrameworks = new Set(analyses.flatMap(a => a.frameworks || []));
    document.getElementById('frameworkCount').textContent = uniqueFrameworks.size;
    
    const totalValue = analyses.reduce((sum, a) => sum + (parseFloat(a.revenue) || 0), 0);
    document.getElementById('totalValue').textContent = '$' + (totalValue / 1000000).toFixed(1) + 'M';
}

// Save analysis to database
async function saveAnalysis(analysisData) {
    if (!supabaseClient || !currentUser) {
        console.warn('Cannot save analysis: user not authenticated');
        return null;
    }

    try {
        const { data, error } = await supabaseClient
            .from('analyses')
            .insert([{
                user_id: currentUser.id,
                ...analysisData,
                created_at: new Date().toISOString()
            }])
            .select();

        if (error) throw error;

        return data[0];
    } catch (error) {
        console.error('Failed to save analysis:', error);
        return null;
    }
}

// Load specific analysis
async function loadAnalysis(analysisId) {
    if (!supabaseClient || !currentUser) return;

    try {
        const { data, error } = await supabaseClient
            .from('analyses')
            .select('*')
            .eq('id', analysisId)
            .single();

        if (error) throw error;

        // Populate wizard with saved data and show report
        populateWizardWithData(data);
        generateReport(data);
    } catch (error) {
        console.error('Failed to load analysis:', error);
        alert('Failed to load analysis');
    }
}

// Delete analysis
async function deleteAnalysis(analysisId) {
    if (!supabaseClient || !currentUser) return;

    if (!confirm('Are you sure you want to delete this analysis?')) return;

    try {
        const { error } = await supabaseClient
            .from('analyses')
            .delete()
            .eq('id', analysisId);

        if (error) throw error;

        loadUserAnalyses(); // Refresh list
    } catch (error) {
        console.error('Failed to delete analysis:', error);
        alert('Failed to delete analysis');
    }
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', initAuth);