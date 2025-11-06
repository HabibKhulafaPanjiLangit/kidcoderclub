import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  text: string;
  isBot: boolean;
  timestamp?: Date;
}

interface GeminiResponse {
  text: string;
  success: boolean;
  error?: string;
}

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private apiKey: string;

  constructor() {
    // In production, use environment variable
    // For now, you'll need to add your API key here or in environment
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your environment variables.');
    }
    
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  private getSystemPrompt(): string {
    return `You are a helpful AI assistant for KidCoderClub, an online coding education platform for children. 

About KidCoderClub:
- We provide coding courses for kids aged 6-17
- We offer various programming languages including Scratch, Python, JavaScript, and more
- Students can enroll in courses, complete assignments, earn certificates, and join WhatsApp communities
- We have mentors available to help students
- Students can access their dashboard to track progress and view certificates

Your role:
- Be friendly, encouraging, and age-appropriate in your responses
- Help students with questions about courses, enrollment, assignments, certificates, and platform navigation
- Provide clear, simple explanations suitable for children
- If you don't know something specific about the platform, direct them to contact support or check their dashboard
- Always maintain a positive, supportive tone that encourages learning

Common topics you should help with:
1. Course enrollment and selection
2. Assignment submission
3. Certificate viewing and downloading
4. Joining WhatsApp groups/communities
5. Platform navigation
6. General coding questions (keep it simple and age-appropriate)
7. Technical issues (direct to support for complex problems)

Keep responses concise but helpful. Use encouraging language and emojis when appropriate.`;
  }

  async sendMessage(userMessage: string, conversationHistory: Message[] = []): Promise<GeminiResponse> {
    try {
      if (!this.apiKey) {
        return {
          text: "I'm sorry, but the AI service is not configured properly. Please contact support for assistance.",
          success: false,
          error: "API key not configured"
        };
      }

      // Prepare conversation context
      const context = this.getSystemPrompt();
      
      // Build conversation history for context
      const historyText = conversationHistory
        .slice(-6) // Keep last 6 messages for context
        .map(msg => `${msg.isBot ? 'Assistant' : 'User'}: ${msg.text}`)
        .join('\n');

      const fullPrompt = `${context}

Previous conversation:
${historyText}

User: ${userMessage}

Please provide a helpful response as the KidCoderClub assistant:`;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      return {
        text: text.trim(),
        success: true
      };

    } catch (error: any) {
      console.error('Gemini API Error:', error);
      
      // Provide fallback responses based on error type
      if (error.message?.includes('API_KEY')) {
        return {
          text: "I'm having trouble connecting to my AI services. Please try again later or contact our support team for immediate assistance! 😊",
          success: false,
          error: "API key issue"
        };
      }

      if (error.message?.includes('quota') || error.message?.includes('limit')) {
        return {
          text: "I'm experiencing high demand right now. Please try again in a few moments, or feel free to contact our support team! 🚀",
          success: false,
          error: "Rate limit exceeded"
        };
      }

      // Generic fallback
      return {
        text: "I'm having a temporary issue connecting to my brain! 🤖 Please try asking your question again, or contact our support team if you need immediate help.",
        success: false,
        error: error.message || "Unknown error"
      };
    }
  }

  // Fallback responses when Gemini is not available
  getFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      enrollment: "To enroll in a course, go to the Courses page, browse available courses, and click 'Enroll Now' on the course you want to join! 📚",
      certificate: "You can view your certificates in your Dashboard. Certificates are automatically generated when you complete 100% of a course! 🏆",
      assignment: "To submit an assignment, go to the course page, find the assignment section, and click 'Submit Assignment' to upload your work! 📝",
      whatsapp: "WhatsApp group links are available on each course page after you enroll. Look for the 'Join Community' section! 💬",
      help: "I'm here to help you with KidCoderClub! You can ask me about enrolling in courses, viewing certificates, submitting assignments, or joining our community groups! 😊",
    };

    if (lowerMessage.includes('enroll') || lowerMessage.includes('join') || lowerMessage.includes('course')) {
      return responses.enrollment;
    } else if (lowerMessage.includes('certificate')) {
      return responses.certificate;
    } else if (lowerMessage.includes('assignment') || lowerMessage.includes('submit')) {
      return responses.assignment;
    } else if (lowerMessage.includes('whatsapp') || lowerMessage.includes('community') || lowerMessage.includes('group')) {
      return responses.whatsapp;
    } else if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return responses.help;
    }

    return "Thanks for your message! I'm here to help you with KidCoderClub. You can ask me about courses, certificates, assignments, or anything else about our platform! If you need immediate assistance, feel free to contact our support team. 🌟";
  }
}

export default GeminiService;