import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getTrainingTip = async (
  completedCases: number,
  averageScore: number,
  totalCases: number
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `As a medical training assistant, provide a brief, encouraging tip (max 100 characters) for a healthcare learner who has:
    - Completed ${completedCases} out of ${totalCases} cases
    - Average score of ${averageScore}%
    
    Make it supportive, professional, and actionable. No emojis.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Fallback tips
    if (averageScore < 60) {
      return "Keep practicing! Review the fundamentals and try again.";
    } else if (averageScore < 80) {
      return "Good progress! Focus on the cases where you scored lower.";
    } else {
      return "Excellent work! Consider challenging yourself with advanced cases.";
    }
  }
};

export const analyzePerformance = async (
  scores: number[],
  caseTypes: string[]
): Promise<{
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Analyze this medical training performance data:
    Scores: ${scores.join(', ')}
    Case Types: ${caseTypes.join(', ')}
    
    Provide JSON with: strengths (array), weaknesses (array), recommendations (array).
    Keep each item brief and actionable.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\\{[\\s\\S]*\\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Invalid JSON response');
  } catch (error) {
    console.error('Performance analysis error:', error);
    
    return {
      strengths: ['Consistent effort'],
      weaknesses: ['Need more data for analysis'],
      recommendations: ['Complete more cases for better insights']
    };
  }
};
