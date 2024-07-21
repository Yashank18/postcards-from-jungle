// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
    project: process.env.OPEN_AI_PROJECT_KEY,
    // organization: process.env.OPEN_AI_ORGANIZATION_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    // const body = "1-A, 2-B, 3-B, 4-A, 5-B";
    const answers = req.body.answers;
    const prompt = process.env.PROMPT || '';
    if (!prompt) {
      throw new Error("Prompt not found");
    }
    
    const promptWithAnswers = prompt.replace("{{answers}}", answers);

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "user", content: promptWithAnswers },
      ],
      model: "gpt-4-turbo",
      temperature: 0.5,
      response_format: { type: "json_object" },
    })
  
    res.status(200).json({ content: JSON.parse(completion.choices[0].message.content || '') });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
