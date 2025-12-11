// AI Chat Assistant Module - STRATA (Strategic Thinking & Research Assistant)
// Powered by Google Gemini API

let chatHistory = [];
let isChatMinimized = false;

// Toggle chat widget
function toggleChat() {
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.querySelector('.chat-input-container');
    const toggleBtn = document.querySelector('.chat-toggle');
    
    isChatMinimized = !isChatMinimized;
    
    if (isChatMinimized) {
        chatBody.style.display = 'none';
        chatInput.style.display = 'none';
        toggleBtn.textContent = '+';
    } else {
        chatBody.style.display = 'block';
        chatInput.style.display = 'flex';
        toggleBtn.textContent = '−';
    }
}

// Handle chat input keypress
function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Send chat message
async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    input.value = '';
    
    // Show typing indicator
    addTypingIndicator();
    
    // Get AI response
    try {
        const response = await getAIResponse(message);
        removeTypingIndicator();
        addMessageToChat(response, 'bot');
    } catch (error) {
        removeTypingIndicator();
        addMessageToChat('Sorry, I encountered an error. Please try again.', 'bot');
        console.error('Chat error:', error);
    }
}

// Add message to chat UI
function addMessageToChat(message, sender) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<p>${sanitizeHTML(message)}</p>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Add to history
    chatHistory.push({ role: sender === 'user' ? 'user' : 'assistant', content: message });
}

// Add typing indicator
function addTypingIndicator() {
    const chatBody = document.getElementById('chatBody');
    const indicator = document.createElement('div');
    indicator.className = 'chat-message bot typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = '<p>STRATA is thinking...</p>';
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Get AI response from Gemini
async function getAIResponse(userMessage) {
    // Check if Gemini is configured
    if (CONFIG.gemini.apiKey === 'YOUR_GEMINI_API_KEY') {
        return getFallbackResponse(userMessage);
    }
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.gemini.model}:generateContent?key=${CONFIG.gemini.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: buildPrompt(userMessage)
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500
                }
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini API error:', error);
        return getFallbackResponse(userMessage);
    }
}

// Build prompt with context
function buildPrompt(userMessage) {
    const systemContext = `You are STRATA (Strategic Thinking & Research Assistant), an AI assistant for the STRATAVERSE strategic consulting platform. 

Your role is to help users with:
- Understanding strategic frameworks (BCG Matrix, Porter's Five Forces, Ansoff Matrix, etc.)
- Clarifying questions during the strategic analysis process
- Providing examples of well-structured responses
- Explaining consulting methodologies inspired by McKinsey, BCG, and Bain
- Troubleshooting technical issues

Key points:
- Be concise and professional
- Use consulting terminology appropriately
- Provide actionable guidance
- Reference the 5W1H framework (Who, What, When, Where, Why, How)
- Emphasize RACI, benefits realization, and risk assessment
- Always remind users that STRATAVERSE is independent and not affiliated with any consulting firm

Current user question: ${userMessage}

Provide a helpful, professional response:`;

    return systemContext;
}

// Fallback responses when API is not configured
function getFallbackResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Framework questions
    if (lowerMessage.includes('framework') || lowerMessage.includes('bcg') || lowerMessage.includes('porter')) {
        return "I can help you understand strategic frameworks! Each framework serves a specific purpose:\n\n" +
               "• BCG Matrix: Analyze business units by market growth and market share\n" +
               "• Porter's Five Forces: Assess industry competitiveness\n" +
               "• Ansoff Matrix: Identify growth strategies\n" +
               "• Blue Ocean Strategy: Create uncontested market space\n\n" +
               "Which framework would you like to learn more about?";
    }
    
    // RACI questions
    if (lowerMessage.includes('raci')) {
        return "RACI Matrix defines clear accountability:\n\n" +
               "• R (Responsible): Does the work\n" +
               "• A (Accountable): Ultimately answerable\n" +
               "• C (Consulted): Provides input\n" +
               "• I (Informed): Kept updated\n\n" +
               "Each activity should have exactly one Accountable person, but can have multiple Responsible, Consulted, or Informed stakeholders.";
    }
    
    // 5W1H questions
    if (lowerMessage.includes('5w1h') || lowerMessage.includes('who what when')) {
        return "The 5W1H framework ensures comprehensive analysis:\n\n" +
               "• WHO: Stakeholders, decision-makers, owners\n" +
               "• WHAT: Scope, deliverables, outcomes\n" +
               "• WHEN: Timeline, milestones, dependencies\n" +
               "• WHERE: Locations, segments, systems\n" +
               "• WHY: Strategic rationale, benefits\n" +
               "• HOW: Execution approach, resources\n\n" +
               "Address all six dimensions for thorough strategic planning.";
    }
    
    // Benefits questions
    if (lowerMessage.includes('benefit') || lowerMessage.includes('value') || lowerMessage.includes('roi')) {
        return "Benefits Realization focuses on quantifying value:\n\n" +
               "• Financial: Revenue impact, cost reduction\n" +
               "• Operational: Efficiency gains, productivity\n" +
               "• Market: Market share, competitive position\n" +
               "• Customer: Satisfaction, retention, acquisition\n" +
               "• Intangible: Brand value, innovation capability\n\n" +
               "Always establish baseline metrics and tracking mechanisms.";
    }
    
    // Risk questions
    if (lowerMessage.includes('risk')) {
        return "Risk Assessment should cover:\n\n" +
               "• Identification: What could go wrong?\n" +
               "• Likelihood: How probable is it?\n" +
               "• Impact: What's the potential damage?\n" +
               "• Mitigation: How will you address it?\n\n" +
               "Maintain a risk register and review it regularly during implementation.";
    }
    
    // General help
    if (lowerMessage.includes('help') || lowerMessage.includes('how to')) {
        return "I'm here to help! I can assist with:\n\n" +
               "✓ Strategic framework selection\n" +
               "✓ 5W1H analysis guidance\n" +
               "✓ RACI matrix development\n" +
               "✓ Benefits quantification\n" +
               "✓ Risk assessment\n" +
               "✓ Implementation planning\n\n" +
               "What specific aspect would you like help with?";
    }
    
    // Default response
    return "Thank you for your question! I'm STRATA, your strategic thinking assistant. " +
           "I can help you with strategic frameworks, analysis methodologies, and implementation planning. " +
           "Could you please provide more details about what you'd like to know?";
}

// Initialize chat with welcome message
document.addEventListener('DOMContentLoaded', function() {
    // Chat is already initialized with welcome message in HTML
    console.log('STRATA Assistant ready');
});