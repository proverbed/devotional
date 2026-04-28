import { onCall, HttpsError } from 'firebase-functions/v2/https';
import Anthropic from '@anthropic-ai/sdk';

interface GenerateRequest {
  theme: string;
}

interface DevotionalContent {
  subject: string;
  theme: string;
  scripture: string;
  scripture_ref: string;
  reflection: string;
  prayer: string;
  declaration: string;
}

export const generateDevotional = onCall<GenerateRequest>(
  { cors: true },
  async (request) => {
    const { theme } = request.data;

    if (!theme || typeof theme !== 'string' || theme.trim().length === 0) {
      throw new HttpsError('invalid-argument', 'theme is required');
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new HttpsError('internal', 'Anthropic API key not configured');
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system:
        'You are a warm, Spirit-filled devotional writer. You write short, powerful daily devotionals using the New King James Version (NKJV) of the Bible. Every devotional must be readable in about 2 minutes. Always respond with ONLY valid JSON, no markdown, no extra text.',
      messages: [
        {
          role: 'user',
          content: `Write a daily devotional on the theme: "${theme.trim()}".

Return ONLY this JSON structure:
{
  "subject": "a compelling email subject line under 60 characters",
  "theme": "${theme.trim()}",
  "scripture": "the scripture verse text (NKJV)",
  "scripture_ref": "Book Chapter:Verse",
  "reflection": "2-3 warm, encouraging paragraphs connecting the scripture to daily life. About 120-150 words.",
  "prayer": "A personal, heartfelt prayer of 3-4 sentences. Start with 'Father,'",
  "declaration": "A bold, first-person faith declaration. One or two sentences. Start with 'I declare'"
}`,
        },
      ],
    });

    const text = message.content
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('');

    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim()) as DevotionalContent;
    return parsed;
  },
);
