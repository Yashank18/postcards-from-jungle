import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const userName = request.body.userName as string;
        const answers = request.body.parsedAnswers as string;
        const result = request.body.content as string;
        if (!userName) throw new Error('Username required');
        await sql`INSERT INTO postcard (user_name, answers ,result) VALUES (${userName}, (${answers}), ${result})`;
        return response.status(200).json({ message: 'Success' });
    } catch (error) {
        return response.status(500).json({ error });
    }
}