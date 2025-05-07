import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_LENGTH = 1000;

// Truncate text if it's too long
const truncateText = (text, maxLength = MAX_LENGTH) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export async function POST(req) {
  try {
    const { jd, resume } = await req.json();

    if (!jd || !resume) {
      return new Response(JSON.stringify({ error: "Missing JD or Resume" }), { status: 400 });
    }

    const prompt = `
You are an AI assistant for career analysis. Please analyze the following:

1. The job description (JD) is for a specific role. Your task is to:
   - Identify the **key focus areas** and **skills** required in the JD for that role.
   
2. The resume provided is from a different individual. Compare the skills in the JD against the skills listed in the resume.

3. Identify any **skill gaps** the resume has for the role described in the JD. 

Please return the result in valid JSON format, structured like this:

{
  "focusAreas": ["Skill 1", "Skill 2", "Skill 3", ...],
  "skillGaps": ["Skill A", "Skill B", "Skill C", ...]
}

JOB DESCRIPTION (Role):
${truncateText(jd)}

RESUME:
${truncateText(resume)}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content;

    // Try parsing it to ensure it’s valid JSON
    const result = JSON.parse(content);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error analyzing JD and Resume:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
