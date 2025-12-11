// Configuration for STRATAVERSE Platform
// Replace these with your actual credentials

const CONFIG = {
    // Supabase Configuration (for authentication and data storage)
    // Get your credentials from: https://supabase.com/dashboard
    supabase: {
        url: 'YOUR_SUPABASE_URL', // e.g., 'https://xxxxx.supabase.co'
        anonKey: 'YOUR_SUPABASE_ANON_KEY'
    },

    // Google Gemini API Configuration (for AI chat assistant)
    // Get your API key from: https://makersuite.google.com/app/apikey
    gemini: {
        apiKey: 'YOUR_GEMINI_API_KEY',
        model: 'gemini-pro'
    },

    // Application Settings
    app: {
        name: 'STRATAVERSE™',
        version: '1.0.0',
        company: 'Bhramastra Advisory',
        email: 'connect@bhramaastraadvisory.com',
        website: 'https://goldameesh.github.io/strataverse/'
    },

    // Strategic Frameworks Database
    frameworks: [
        {
            id: 'bcg-matrix',
            name: 'BCG Matrix',
            category: 'Portfolio',
            description: 'Analyze business units based on market growth and relative market share',
            impact: {
                revenue: 8,
                innovation: 6,
                operations: 5,
                competitive: 9
            }
        },
        {
            id: 'porters-five-forces',
            name: "Porter's Five Forces",
            category: 'Competitive',
            description: 'Assess industry attractiveness through competitive rivalry, supplier power, buyer power, substitutes, and new entrants',
            impact: {
                revenue: 7,
                innovation: 5,
                operations: 6,
                competitive: 10
            }
        },
        {
            id: 'ansoff-matrix',
            name: 'Ansoff Matrix',
            category: 'Growth',
            description: 'Identify growth strategies through market penetration, development, product development, and diversification',
            impact: {
                revenue: 9,
                innovation: 8,
                operations: 6,
                competitive: 7
            }
        },
        {
            id: 'blue-ocean',
            name: 'Blue Ocean Strategy',
            category: 'Innovation',
            description: 'Create uncontested market space through value innovation',
            impact: {
                revenue: 9,
                innovation: 10,
                operations: 7,
                competitive: 9
            }
        },
        {
            id: 'mckinsey-7s',
            name: 'McKinsey 7S',
            category: 'Organization',
            description: 'Align strategy, structure, systems, shared values, skills, style, and staff',
            impact: {
                revenue: 6,
                innovation: 7,
                operations: 9,
                competitive: 7
            }
        },
        {
            id: 'balanced-scorecard',
            name: 'Balanced Scorecard',
            category: 'Performance',
            description: 'Measure performance across financial, customer, internal process, and learning perspectives',
            impact: {
                revenue: 7,
                innovation: 6,
                operations: 9,
                competitive: 6
            }
        },
        {
            id: 'vrio',
            name: 'VRIO Analysis',
            category: 'Resources',
            description: 'Evaluate resources through Value, Rarity, Imitability, and Organization',
            impact: {
                revenue: 7,
                innovation: 7,
                operations: 8,
                competitive: 9
            }
        },
        {
            id: 'swot',
            name: 'SWOT Analysis',
            category: 'Strategic',
            description: 'Analyze Strengths, Weaknesses, Opportunities, and Threats',
            impact: {
                revenue: 7,
                innovation: 6,
                operations: 7,
                competitive: 8
            }
        },
        {
            id: 'pestel',
            name: 'PESTEL Analysis',
            category: 'Environment',
            description: 'Assess Political, Economic, Social, Technological, Environmental, and Legal factors',
            impact: {
                revenue: 6,
                innovation: 7,
                operations: 6,
                competitive: 7
            }
        },
        {
            id: 'value-chain',
            name: 'Value Chain Analysis',
            category: 'Operations',
            description: 'Identify value-creating activities and optimize primary and support activities',
            impact: {
                revenue: 7,
                innovation: 6,
                operations: 10,
                competitive: 7
            }
        },
        {
            id: 'core-competence',
            name: 'Core Competence',
            category: 'Capabilities',
            description: 'Identify and leverage unique organizational capabilities',
            impact: {
                revenue: 8,
                innovation: 8,
                operations: 7,
                competitive: 9
            }
        },
        {
            id: 'disruptive-innovation',
            name: 'Disruptive Innovation',
            category: 'Innovation',
            description: 'Identify opportunities for market disruption through new business models',
            impact: {
                revenue: 9,
                innovation: 10,
                operations: 6,
                competitive: 9
            }
        },
        {
            id: 'platform-strategy',
            name: 'Platform Strategy',
            category: 'Digital',
            description: 'Build multi-sided platforms connecting producers and consumers',
            impact: {
                revenue: 10,
                innovation: 9,
                operations: 7,
                competitive: 9
            }
        },
        {
            id: 'lean-startup',
            name: 'Lean Startup',
            category: 'Innovation',
            description: 'Rapid experimentation through build-measure-learn cycles',
            impact: {
                revenue: 7,
                innovation: 9,
                operations: 8,
                competitive: 7
            }
        },
        {
            id: 'esg-framework',
            name: 'ESG Framework',
            category: 'Sustainability',
            description: 'Integrate Environmental, Social, and Governance factors into strategy',
            impact: {
                revenue: 6,
                innovation: 7,
                operations: 8,
                competitive: 7
            }
        }
    ],

    // RACI Roles
    raciRoles: ['Responsible', 'Accountable', 'Consulted', 'Informed'],

    // Risk Levels
    riskLevels: {
        low: { label: 'Low', color: '#28A745' },
        medium: { label: 'Medium', color: '#FFC107' },
        high: { label: 'High', color: '#DC3545' },
        critical: { label: 'Critical', color: '#6C757D' }
    },

    // Implementation Phases
    implementationPhases: [
        {
            name: 'Foundation',
            duration: '0-3 months',
            focus: 'Quick wins, capability building, governance setup'
        },
        {
            name: 'Acceleration',
            duration: '3-12 months',
            focus: 'Scale initiatives, optimize processes, track benefits'
        },
        {
            name: 'Transformation',
            duration: '12-24 months',
            focus: 'Full implementation, culture change, sustained impact'
        }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}