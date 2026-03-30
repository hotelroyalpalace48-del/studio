'use server';
/**
 * @fileOverview An AI agent that generates a beautiful Hindi shayari about ethnic wear and fashion.
 *
 * - dailyShayari - A function that generates a daily shayari.
 * - DailyShayariOutput - The return type for the dailyShayari function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DailyShayariOutputSchema = z.object({
  shayari: z.string().describe('A beautiful 2-4 line shayari in Hindi about ethnic fashion, beauty, or Mogra.'),
  translation: z.string().describe('A brief English translation or essence of the shayari.'),
});
export type DailyShayariOutput = z.infer<typeof DailyShayariOutputSchema>;

export async function dailyShayari(): Promise<DailyShayariOutput> {
  return dailyShayariFlow();
}

const prompt = ai.definePrompt({
  name: 'dailyShayariPrompt',
  input: { schema: z.object({ date: z.string() }) },
  output: { schema: DailyShayariOutputSchema },
  prompt: `You are a poetic soul with a deep appreciation for Indian ethnic wear and the brand "Mogra Design Studio".
Generate a beautiful and elegant Hindi shayari (2-4 lines) that celebrates the beauty of ethnic fashion, the grace of a woman in traditional attire, or the fragrance of Mogra.

Current Date: {{{date}}}

The shayari should be sophisticated, using words like 'libaas', 'nazaakat', 'khushbu', or 'shaan'. 
It should feel like a daily greeting to someone entering a luxury fashion studio.

Provide the output in JSON format with 'shayari' and 'translation' fields.`,
});

const dailyShayariFlow = ai.defineFlow(
  {
    name: 'dailyShayariFlow',
    inputSchema: z.void(),
    outputSchema: DailyShayariOutputSchema,
  },
  async () => {
    const date = new Date().toDateString();
    const { output } = await prompt({ date });
    return output!;
  }
);
