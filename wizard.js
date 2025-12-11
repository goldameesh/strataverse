// Strategic Analysis Wizard Module
// Comprehensive 8-step process for institutional-grade strategic planning

const wizardSteps = [
    {
        id: 1,
        title: 'Organization Profile',
        description: 'Foundational information about your organization'
    },
    {
        id: 2,
        title: 'Strategic Context',
        description: 'Current state, objectives, and challenges'
    },
    {
        id: 3,
        title: 'Framework Selection',
        description: 'Choose strategic frameworks for analysis'
    },
    {
        id: 4,
        title: '5W1H Analysis',
        description: 'Multi-dimensional strategic analysis'
    },
    {
        id: 5,
        title: 'RACI Matrix',
        description: 'Define roles and responsibilities'
    },
    {
        id: 6,
        title: 'Benefits Realization',
        description: 'Quantify value and impact'
    },
    {
        id: 7,
        title: 'Risk Assessment',
        description: 'Identify and mitigate risks'
    },
    {
        id: 8,
        title: 'Implementation Roadmap',
        description: 'Phased execution plan'
    }
];

// Initialize wizard
function initializeWizard() {
    const container = document.getElementById('wizardContainer');
    if (!container) return;
    
    container.style.display = 'block';
    container.innerHTML = generateWizardHTML();
    
    // Scroll to wizard
    container.scrollIntoView({ behavior: 'smooth' });
    
    // Show first step
    showWizardStep(1);
}

// Generate wizard HTML structure
function generateWizardHTML() {
    return `
        <div class="wizard-progress-bar">
            ${wizardSteps.map((step, index) => `
                <div class="progress-step ${index === 0 ? 'active' : ''}" data-step="${step.id}">
                    <div class="progress-number">${step.id}</div>
                    <div class="progress-label">${step.title}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="wizard-content">
            <div id="wizardStepContent"></div>
        </div>
        
        <div class="wizard-navigation">
            <button id="prevBtn" onclick="previousStep()" class="btn-secondary" style="display: none;">Previous</button>
            <button id="nextBtn" onclick="nextStep()" class="btn-primary">Next</button>
            <button id="generateBtn" onclick="generateFinalReport()" class="btn-primary" style="display: none;">Generate Report</button>
        </div>
    `;
}

// Show specific wizard step
function showWizardStep(stepNumber) {
    appState.currentStep = stepNumber;
    
    // Update progress bar
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < stepNumber) {
            step.classList.add('completed');
        } else if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
    });
    
    // Generate step content
    const contentContainer = document.getElementById('wizardStepContent');
    if (contentContainer) {
        contentContainer.innerHTML = generateStepContent(stepNumber);
    }
    
    // Update navigation buttons
    updateNavigationButtons(stepNumber);
    
    // Populate with existing data if available
    populateStepData(stepNumber);
}

// Generate content for each step
function generateStepContent(stepNumber) {
    switch(stepNumber) {
        case 1:
            return generateStep1HTML();
        case 2:
            return generateStep2HTML();
        case 3:
            return generateStep3HTML();
        case 4:
            return generateStep4HTML();
        case 5:
            return generateStep5HTML();
        case 6:
            return generateStep6HTML();
        case 7:
            return generateStep7HTML();
        case 8:
            return generateStep8HTML();
        default:
            return '<p>Invalid step</p>';
    }
}

// Step 1: Organization Profile
function generateStep1HTML() {
    return `
        <h2>Organization Profile</h2>
        <p class="step-description">Provide foundational information about your organization</p>
        
        <div class="form-group">
            <label>Organization Name *</label>
            <input type="text" id="org_name" placeholder="e.g., Acme Corporation" required>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>Industry *</label>
                <select id="industry" required>
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Energy">Energy</option>
                    <option value="Telecommunications">Telecommunications</option>
                    <option value="Consumer Goods">Consumer Goods</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Annual Revenue (USD) *</label>
                <input type="number" id="revenue" placeholder="e.g., 50000000" required>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>Number of Employees *</label>
                <input type="number" id="employees" placeholder="e.g., 500" required>
            </div>
            
            <div class="form-group">
                <label>Geographic Presence *</label>
                <select id="geography" required>
                    <option value="">Select Region</option>
                    <option value="Local">Local (Single City)</option>
                    <option value="Regional">Regional (Multiple Cities)</option>
                    <option value="National">National</option>
                    <option value="International">International</option>
                    <option value="Global">Global</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label>Market Position *</label>
            <select id="market_position" required>
                <option value="">Select Position</option>
                <option value="Market Leader">Market Leader</option>
                <option value="Strong Competitor">Strong Competitor</option>
                <option value="Challenger">Challenger</option>
                <option value="Niche Player">Niche Player</option>
                <option value="New Entrant">New Entrant</option>
            </select>
        </div>
    `;
}

// Step 2: Strategic Context
function generateStep2HTML() {
    return `
        <h2>Strategic Context</h2>
        <p class="step-description">Define your strategic objectives, challenges, and opportunities</p>
        
        <div class="form-group">
            <label>Strategic Objectives (What do you want to achieve?) *</label>
            <textarea id="objectives" rows="4" placeholder="e.g., Increase market share by 15%, Launch 3 new products, Expand into Asia-Pacific region..." required></textarea>
            <small>Be specific and quantifiable where possible</small>
        </div>
        
        <div class="form-group">
            <label>Key Challenges (What obstacles do you face?) *</label>
            <textarea id="challenges" rows="4" placeholder="e.g., Intense competition, Regulatory constraints, Talent shortage, Legacy systems..." required></textarea>
        </div>
        
        <div class="form-group">
            <label>Market Opportunities (What opportunities exist?) *</label>
            <textarea id="opportunities" rows="4" placeholder="e.g., Emerging markets, Digital transformation, Strategic partnerships, New customer segments..." required></textarea>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>Planning Horizon *</label>
                <select id="planning_horizon" required>
                    <option value="">Select Timeframe</option>
                    <option value="1 Year">1 Year (Short-term)</option>
                    <option value="3 Years">3 Years (Medium-term)</option>
                    <option value="5 Years">5 Years (Long-term)</option>
                    <option value="10+ Years">10+ Years (Visionary)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Investment Capacity *</label>
                <select id="investment_capacity" required>
                    <option value="">Select Range</option>
                    <option value="< $1M">< $1M</option>
                    <option value="$1M - $10M">$1M - $10M</option>
                    <option value="$10M - $50M">$10M - $50M</option>
                    <option value="$50M - $100M">$50M - $100M</option>
                    <option value="> $100M">> $100M</option>
                </select>
            </div>
        </div>
    `;
}

// Step 3: Framework Selection
function generateStep3HTML() {
    return `
        <h2>Framework Selection</h2>
        <p class="step-description">Choose strategic frameworks that best fit your analysis needs</p>
        
        <div class="frameworks-grid">
            ${CONFIG.frameworks.map(fw => `
                <div class="framework-card selectable" onclick="toggleFramework('${fw.id}')">
                    <input type="checkbox" id="fw_${fw.id}" class="framework-checkbox">
                    <h3>${fw.name}</h3>
                    <span class="framework-category">${fw.category}</span>
                    <p>${fw.description}</p>
                    <div class="impact-indicators">
                        <div class="impact-bar">
                            <span>Revenue</span>
                            <div class="bar"><div class="fill" style="width: ${fw.impact.revenue * 10}%"></div></div>
                        </div>
                        <div class="impact-bar">
                            <span>Innovation</span>
                            <div class="bar"><div class="fill" style="width: ${fw.impact.innovation * 10}%"></div></div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <p class="help-text">💡 Select 2-5 frameworks for comprehensive analysis</p>
    `;
}

// Step 4: 5W1H Analysis
function generateStep4HTML() {
    return `
        <h2>5W1H Strategic Analysis</h2>
        <p class="step-description">Multi-dimensional analysis covering all critical aspects</p>
        
        <div class="w5h1-form">
            <div class="form-group">
                <label>WHO (Stakeholders & Decision Makers) *</label>
                <textarea id="who" rows="3" placeholder="List key stakeholders, decision-makers, owners, affected groups, partners..." required></textarea>
            </div>
            
            <div class="form-group">
                <label>WHAT (Scope & Deliverables) *</label>
                <textarea id="what" rows="3" placeholder="Define problem scope, success metrics, initiatives, target outcomes..." required></textarea>
            </div>
            
            <div class="form-group">
                <label>WHEN (Timeline & Milestones) *</label>
                <textarea id="when" rows="3" placeholder="Specify timeline, key milestones, dependencies, critical path..." required></textarea>
            </div>
            
            <div class="form-group">
                <label>WHERE (Locations & Segments) *</label>
                <textarea id="where" rows="3" placeholder="Identify business units, regions, segments, systems, processes impacted..." required></textarea>
            </div>
            
            <div class="form-group">
                <label>WHY (Strategic Rationale) *</label>
                <textarea id="why" rows="3" placeholder="Explain root causes, strategic rationale, quantified benefits, value drivers..." required></textarea>
            </div>
            
            <div class="form-group">
                <label>HOW (Execution Approach) *</label>
                <textarea id="how" rows="3" placeholder="Describe workplan, enablers, capabilities, resources, change management..." required></textarea>
            </div>
        </div>
    `;
}

// Step 5: RACI Matrix
function generateStep5HTML() {
    return `
        <h2>RACI Matrix</h2>
        <p class="step-description">Define clear accountability and responsibilities</p>
        
        <div class="raci-builder">
            <div class="form-group">
                <label>Key Initiatives/Activities *</label>
                <textarea id="raci_activities" rows="3" placeholder="List major initiatives or activities (one per line)..." required></textarea>
            </div>
            
            <div class="form-group">
                <label>Key Roles/Stakeholders *</label>
                <textarea id="raci_roles" rows="3" placeholder="List key roles or stakeholders (one per line)..." required></textarea>
            </div>
            
            <p class="help-text">
                <strong>RACI Definitions:</strong><br>
                <strong>R</strong> = Responsible (Does the work)<br>
                <strong>A</strong> = Accountable (Ultimately answerable)<br>
                <strong>C</strong> = Consulted (Provides input)<br>
                <strong>I</strong> = Informed (Kept updated)
            </p>
        </div>
    `;
}

// Step 6: Benefits Realization
function generateStep6HTML() {
    return `
        <h2>Benefits Realization</h2>
        <p class="step-description">Quantify expected value and impact</p>
        
        <div class="benefits-form">
            <div class="form-group">
                <label>Revenue Impact (Annual) *</label>
                <input type="number" id="revenue_impact" placeholder="Expected revenue increase (USD)" required>
            </div>
            
            <div class="form-group">
                <label>Cost Reduction (Annual) *</label>
                <input type="number" id="cost_reduction" placeholder="Expected cost savings (USD)" required>
            </div>
            
            <div class="form-group">
                <label>Efficiency Gains *</label>
                <input type="text" id="efficiency_gains" placeholder="e.g., 25% faster time-to-market, 30% productivity increase" required>
            </div>
            
            <div class="form-group">
                <label>Market Share Impact *</label>
                <input type="text" id="market_share" placeholder="e.g., +5 percentage points" required>
            </div>
            
            <div class="form-group">
                <label>Customer Impact *</label>
                <textarea id="customer_impact" rows="3" placeholder="Describe impact on customer satisfaction, retention, acquisition..." required></textarea>
            </div>
            
            <div class="form-group">
                <label>Intangible Benefits *</label>
                <textarea id="intangible_benefits" rows="3" placeholder="Brand value, employee morale, innovation capability, market positioning..." required></textarea>
            </div>
        </div>
    `;
}

// Step 7: Risk Assessment
function generateStep7HTML() {
    return `
        <h2>Risk Assessment</h2>
        <p class="step-description">Identify risks and mitigation strategies</p>
        
        <div class="risk-form">
            <div id="risksList"></div>
            <button onclick="addRisk()" class="btn-secondary">+ Add Risk</button>
        </div>
        
        <script>
            // Initialize with one risk
            if (document.getElementById('risksList').children.length === 0) {
                addRisk();
            }
        </script>
    `;
}

// Step 8: Implementation Roadmap
function generateStep8HTML() {
    return `
        <h2>Implementation Roadmap</h2>
        <p class="step-description">Define phased execution plan</p>
        
        <div class="roadmap-form">
            ${CONFIG.implementationPhases.map((phase, index) => `
                <div class="phase-section">
                    <h3>Phase ${index + 1}: ${phase.name}</h3>
                    <p class="phase-duration">${phase.duration}</p>
                    <p class="phase-focus">${phase.focus}</p>
                    
                    <div class="form-group">
                        <label>Key Initiatives for ${phase.name} *</label>
                        <textarea id="phase_${index + 1}_initiatives" rows="3" placeholder="List major initiatives for this phase..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Success Metrics *</label>
                        <textarea id="phase_${index + 1}_metrics" rows="2" placeholder="Define measurable success criteria..." required></textarea>
                    </div>
                </div>
            `).join('')}
            
            <div class="form-group">
                <label>Critical Dependencies *</label>
                <textarea id="dependencies" rows="3" placeholder="List critical dependencies, prerequisites, and constraints..." required></textarea>
            </div>
            
            <div class="form-group">
                <label>Governance Structure *</label>
                <textarea id="governance" rows="3" placeholder="Describe steering committee, PMO, decision rights, meeting cadence..." required></textarea>
            </div>
        </div>
    `;
}

// Toggle framework selection
function toggleFramework(frameworkId) {
    const checkbox = document.getElementById('fw_' + frameworkId);
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.parentElement.classList.toggle('selected');
    }
}

// Add risk to assessment
function addRisk() {
    const risksList = document.getElementById('risksList');
    const riskId = 'risk_' + Date.now();
    
    const riskHTML = `
        <div class="risk-item" id="${riskId}">
            <div class="form-row">
                <div class="form-group">
                    <label>Risk Description</label>
                    <input type="text" class="risk-description" placeholder="Describe the risk...">
                </div>
                <div class="form-group">
                    <label>Likelihood</label>
                    <select class="risk-likelihood">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Impact</label>
                    <select class="risk-impact">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Mitigation Strategy</label>
                <textarea class="risk-mitigation" rows="2" placeholder="How will you mitigate this risk?"></textarea>
            </div>
            <button onclick="removeRisk('${riskId}')" class="btn-danger btn-small">Remove</button>
        </div>
    `;
    
    risksList.insertAdjacentHTML('beforeend', riskHTML);
}

// Remove risk
function removeRisk(riskId) {
    const risk = document.getElementById(riskId);
    if (risk) {
        risk.remove();
    }
}

// Navigation functions
function nextStep() {
    if (validateCurrentStep()) {
        saveCurrentStepData();
        if (appState.currentStep < appState.totalSteps) {
            showWizardStep(appState.currentStep + 1);
        }
    }
}

function previousStep() {
    if (appState.currentStep > 1) {
        saveCurrentStepData();
        showWizardStep(appState.currentStep - 1);
    }
}

// Update navigation buttons
function updateNavigationButtons(stepNumber) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const generateBtn = document.getElementById('generateBtn');
    
    if (prevBtn) prevBtn.style.display = stepNumber > 1 ? 'inline-block' : 'none';
    if (nextBtn) nextBtn.style.display = stepNumber < appState.totalSteps ? 'inline-block' : 'none';
    if (generateBtn) generateBtn.style.display = stepNumber === appState.totalSteps ? 'inline-block' : 'none';
}

// Validate current step
function validateCurrentStep() {
    const requiredFields = document.querySelectorAll('#wizardStepContent [required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields');
    }
    
    return isValid;
}

// Save current step data
function saveCurrentStepData() {
    const inputs = document.querySelectorAll('#wizardStepContent input, #wizardStepContent select, #wizardStepContent textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            appState.wizardData[input.id] = input.checked;
        } else {
            appState.wizardData[input.id] = input.value;
        }
    });
}

// Populate step with existing data
function populateStepData(stepNumber) {
    setTimeout(() => {
        Object.keys(appState.wizardData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = appState.wizardData[key];
                } else {
                    element.value = appState.wizardData[key];
                }
            }
        });
    }, 100);
}

// Populate wizard with saved data
function populateWizardWithData(data) {
    appState.wizardData = data;
}

// Generate final report
function generateFinalReport() {
    if (!validateCurrentStep()) return;
    
    saveCurrentStepData();
    
    // Save to database if user is authenticated
    if (currentUser && typeof saveAnalysis === 'function') {
        saveAnalysis(appState.wizardData);
    }
    
    // Generate and display report
    if (typeof generateReport === 'function') {
        generateReport(appState.wizardData);
    } else {
        alert('Report generation module not loaded');
    }
}