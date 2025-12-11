// Report Generation Module for STRATAVERSE
// Creates comprehensive strategic reports with MBB-grade structure

function generateReport(data) {
    const reportContainer = document.getElementById('reportContainer');
    if (!reportContainer) return;
    
    // Hide wizard, show report
    document.getElementById('wizardContainer').style.display = 'none';
    reportContainer.style.display = 'block';
    reportContainer.innerHTML = generateReportHTML(data);
    
    // Scroll to report
    reportContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Generate charts if needed
    setTimeout(() => {
        generateCharts(data);
    }, 500);
}

function generateReportHTML(data) {
    const reportDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    return `
        <div class="report-header">
            <div class="report-logo">
                <h1>STRATAVERSE™</h1>
                <p>Strategic Intelligence Platform</p>
            </div>
            <div class="report-meta">
                <p><strong>Report Date:</strong> ${reportDate}</p>
                <p><strong>Organization:</strong> ${data.org_name || 'N/A'}</p>
                <p class="confidential">CONFIDENTIAL & PROPRIETARY</p>
            </div>
        </div>
        
        <div class="report-actions">
            <button onclick="exportPDF()" class="btn-primary">📄 Export PDF</button>
            <button onclick="exportJSON(appState.wizardData, 'strategic-analysis.json')" class="btn-secondary">💾 Export JSON</button>
            <button onclick="printPage()" class="btn-secondary">🖨️ Print</button>
            <button onclick="shareAnalysis()" class="btn-secondary">🔗 Share</button>
        </div>
        
        <div class="report-content">
            <!-- Executive Summary -->
            <section class="report-section">
                <h2 class="section-number">1. Executive Summary</h2>
                <div class="executive-summary">
                    <p><strong>Organization:</strong> ${data.org_name}</p>
                    <p><strong>Industry:</strong> ${data.industry}</p>
                    <p><strong>Revenue:</strong> ${formatCurrency(data.revenue)}</p>
                    <p><strong>Employees:</strong> ${formatNumber(data.employees)}</p>
                    <p><strong>Market Position:</strong> ${data.market_position}</p>
                    <p><strong>Planning Horizon:</strong> ${data.planning_horizon}</p>
                    
                    <div class="key-metrics">
                        <div class="metric-card">
                            <h4>Expected Revenue Impact</h4>
                            <p class="metric-value">${formatCurrency(data.revenue_impact)}</p>
                        </div>
                        <div class="metric-card">
                            <h4>Cost Reduction</h4>
                            <p class="metric-value">${formatCurrency(data.cost_reduction)}</p>
                        </div>
                        <div class="metric-card">
                            <h4>Market Share Impact</h4>
                            <p class="metric-value">${data.market_share || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Strategic Context -->
            <section class="report-section">
                <h2 class="section-number">2. Strategic Context</h2>
                
                <h3>Strategic Objectives</h3>
                <p>${data.objectives || 'Not specified'}</p>
                
                <h3>Key Challenges</h3>
                <p>${data.challenges || 'Not specified'}</p>
                
                <h3>Market Opportunities</h3>
                <p>${data.opportunities || 'Not specified'}</p>
            </section>
            
            <!-- 5W1H Analysis -->
            <section class="report-section">
                <h2 class="section-number">3. Multi-Dimensional Analysis (5W1H)</h2>
                
                <div class="w5h1-analysis">
                    <div class="analysis-item">
                        <h3>WHO - Stakeholders & Decision Makers</h3>
                        <p>${data.who || 'Not specified'}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h3>WHAT - Scope & Deliverables</h3>
                        <p>${data.what || 'Not specified'}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h3>WHEN - Timeline & Milestones</h3>
                        <p>${data.when || 'Not specified'}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h3>WHERE - Locations & Segments</h3>
                        <p>${data.where || 'Not specified'}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h3>WHY - Strategic Rationale</h3>
                        <p>${data.why || 'Not specified'}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h3>HOW - Execution Approach</h3>
                        <p>${data.how || 'Not specified'}</p>
                    </div>
                </div>
            </section>
            
            <!-- Strategic Frameworks -->
            <section class="report-section">
                <h2 class="section-number">4. Strategic Frameworks Applied</h2>
                <div class="frameworks-applied">
                    ${generateFrameworksSection(data)}
                </div>
            </section>
            
            <!-- RACI Matrix -->
            <section class="report-section">
                <h2 class="section-number">5. RACI Matrix</h2>
                <p><strong>Activities:</strong> ${data.raci_activities || 'Not specified'}</p>
                <p><strong>Roles:</strong> ${data.raci_roles || 'Not specified'}</p>
                <div class="raci-note">
                    <p><strong>Note:</strong> Detailed RACI matrix should be developed during implementation planning with specific assignments for each activity-role combination.</p>
                </div>
            </section>
            
            <!-- Benefits Realization -->
            <section class="report-section">
                <h2 class="section-number">6. Benefits Realization</h2>
                
                <h3>Financial Impact</h3>
                <ul>
                    <li><strong>Revenue Impact:</strong> ${formatCurrency(data.revenue_impact)} annually</li>
                    <li><strong>Cost Reduction:</strong> ${formatCurrency(data.cost_reduction)} annually</li>
                    <li><strong>Net Benefit:</strong> ${formatCurrency((parseFloat(data.revenue_impact) || 0) + (parseFloat(data.cost_reduction) || 0))} annually</li>
                </ul>
                
                <h3>Operational Impact</h3>
                <p><strong>Efficiency Gains:</strong> ${data.efficiency_gains || 'Not specified'}</p>
                
                <h3>Market Impact</h3>
                <p><strong>Market Share:</strong> ${data.market_share || 'Not specified'}</p>
                
                <h3>Customer Impact</h3>
                <p>${data.customer_impact || 'Not specified'}</p>
                
                <h3>Intangible Benefits</h3>
                <p>${data.intangible_benefits || 'Not specified'}</p>
            </section>
            
            <!-- Risk Assessment -->
            <section class="report-section">
                <h2 class="section-number">7. Risk Assessment & Mitigation</h2>
                ${generateRiskSection(data)}
            </section>
            
            <!-- Implementation Roadmap -->
            <section class="report-section">
                <h2 class="section-number">8. Implementation Roadmap</h2>
                
                ${CONFIG.implementationPhases.map((phase, index) => `
                    <div class="phase-detail">
                        <h3>Phase ${index + 1}: ${phase.name} (${phase.duration})</h3>
                        <p><strong>Focus:</strong> ${phase.focus}</p>
                        <p><strong>Key Initiatives:</strong> ${data['phase_' + (index + 1) + '_initiatives'] || 'Not specified'}</p>
                        <p><strong>Success Metrics:</strong> ${data['phase_' + (index + 1) + '_metrics'] || 'Not specified'}</p>
                    </div>
                `).join('')}
                
                <h3>Critical Dependencies</h3>
                <p>${data.dependencies || 'Not specified'}</p>
                
                <h3>Governance Structure</h3>
                <p>${data.governance || 'Not specified'}</p>
            </section>
            
            <!-- Do's and Don'ts -->
            <section class="report-section">
                <h2 class="section-number">9. Do's and Don'ts</h2>
                
                <div class="dos-donts">
                    <div class="dos">
                        <h3>✅ DO's</h3>
                        <ul>
                            <li>Maintain clear communication with all stakeholders</li>
                            <li>Track KPIs and benefits realization monthly</li>
                            <li>Conduct regular steering committee meetings</li>
                            <li>Celebrate quick wins to build momentum</li>
                            <li>Invest in change management and training</li>
                            <li>Document lessons learned continuously</li>
                            <li>Maintain flexibility to adapt to market changes</li>
                        </ul>
                    </div>
                    
                    <div class="donts">
                        <h3>❌ DON'Ts</h3>
                        <ul>
                            <li>Don't skip stakeholder engagement</li>
                            <li>Don't ignore early warning signals</li>
                            <li>Don't underestimate change resistance</li>
                            <li>Don't proceed without clear RACI</li>
                            <li>Don't neglect risk mitigation plans</li>
                            <li>Don't lose sight of strategic objectives</li>
                            <li>Don't compromise on governance structure</li>
                        </ul>
                    </div>
                </div>
            </section>
            
            <!-- Next Steps -->
            <section class="report-section">
                <h2 class="section-number">10. Recommended Next Steps</h2>
                <ol>
                    <li><strong>Steering Committee Formation:</strong> Establish governance within 2 weeks</li>
                    <li><strong>Detailed Planning:</strong> Develop detailed project plans for Phase 1 initiatives</li>
                    <li><strong>Resource Allocation:</strong> Secure budget and assign team members</li>
                    <li><strong>Quick Wins:</strong> Identify and execute 2-3 quick wins in first 30 days</li>
                    <li><strong>KPI Dashboard:</strong> Set up tracking mechanisms and reporting cadence</li>
                    <li><strong>Stakeholder Communication:</strong> Launch communication plan and change management</li>
                    <li><strong>Risk Monitoring:</strong> Implement risk tracking and mitigation protocols</li>
                </ol>
            </section>
        </div>
        
        <div class="report-footer">
            <div class="footer-disclaimer">
                <p><strong>CONFIDENTIAL & PROPRIETARY</strong></p>
                <p>This strategic analysis was generated by STRATAVERSE™, an independent educational platform by Bhramastra Advisory. 
                Not affiliated with McKinsey & Company, Boston Consulting Group, Bain & Company, or any other consulting firm.</p>
                <p>© ${new Date().getFullYear()} Bhramastra Advisory. All rights reserved.</p>
                <p>For questions: <a href="mailto:connect@bhramaastraadvisory.com">connect@bhramaastraadvisory.com</a></p>
            </div>
        </div>
    `;
}

function generateFrameworksSection(data) {
    const selectedFrameworks = CONFIG.frameworks.filter(fw => data['fw_' + fw.id]);
    
    if (selectedFrameworks.length === 0) {
        return '<p>No frameworks selected</p>';
    }
    
    return selectedFrameworks.map(fw => `
        <div class="framework-detail">
            <h3>${fw.name}</h3>
            <p><strong>Category:</strong> ${fw.category}</p>
            <p><strong>Application:</strong> ${fw.description}</p>
            <div class="framework-impact">
                <p><strong>Expected Impact:</strong></p>
                <ul>
                    <li>Revenue Growth Potential: ${fw.impact.revenue}/10</li>
                    <li>Innovation & Differentiation: ${fw.impact.innovation}/10</li>
                    <li>Operational Excellence: ${fw.impact.operations}/10</li>
                    <li>Competitive Positioning: ${fw.impact.competitive}/10</li>
                </ul>
            </div>
        </div>
    `).join('');
}

function generateRiskSection(data) {
    // Extract risks from data (this would need to be properly structured)
    return `
        <div class="risk-matrix">
            <p><strong>Risk Management Approach:</strong> Comprehensive risk identification, assessment, and mitigation planning</p>
            <p class="risk-note">Detailed risk register should be maintained and reviewed monthly during implementation.</p>
            
            <div class="risk-categories">
                <h3>Key Risk Categories</h3>
                <ul>
                    <li><strong>Strategic Risks:</strong> Market changes, competitive responses, regulatory shifts</li>
                    <li><strong>Operational Risks:</strong> Execution challenges, resource constraints, capability gaps</li>
                    <li><strong>Financial Risks:</strong> Budget overruns, ROI delays, funding availability</li>
                    <li><strong>Organizational Risks:</strong> Change resistance, talent retention, cultural alignment</li>
                </ul>
            </div>
        </div>
    `;
}

function generateCharts(data) {
    // Placeholder for chart generation
    // Would use Chart.js to create visual representations
    console.log('Charts would be generated here with Chart.js');
}

function exportPDF() {
    alert('PDF Export: This feature requires server-side rendering with Puppeteer for production-quality PDFs. For now, please use the Print function (Ctrl/Cmd + P) and save as PDF.');
    
    // Alternative: Use browser print to PDF
    window.print();
}

// Email report (would need backend service)
function emailReport() {
    const email = prompt('Enter email address to send report:');
    if (email && validateEmail(email)) {
        alert('Email functionality requires backend service. Report link copied to clipboard instead.');
        navigator.clipboard.writeText(window.location.href);
    }
}