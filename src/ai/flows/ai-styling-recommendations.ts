'use server';
/**
 * @fileOverview An AI styling tool that suggests complementary accessories, design variations, and occasion-based styling ideas for a selected dress.
 *
 * - aiStylingRecommendations - A function that handles the AI styling recommendations process.
 * - AiStylingRecommendationsInput - The input type for the aiStylingRecommendations function.
 * - AiStylingRecommendationsOutput - The return type for the aiStylingRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiStylingRecommendationsInputSchema = z.object({
  dressDescription: z.string().describe('A detailed description of the dress, including its style, color, fabric, and any notable features.'),
  dressPhotoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of the dress, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AiStylingRecommendationsInput = z.infer<typeof AiStylingRecommendationsInputSchema>;

const AiStylingRecommendationsOutputSchema = z.object({
  accessorySuggestions: z
    .array(z.string())
    .describe('A list of complementary accessories for the dress, such as jewelry, bags, shoes, or scarves.'),
  designVariations: z
    .array(z.string())
    .describe('A list of alternative design variations or modifications for the dress, e.g., different necklines, sleeve styles, or embellishments.'),
  occasionStylingIdeas: z
    .array(z.string())
    .describe('A list of styling ideas for different occasions, e.g., casual, formal, party, or work wear.'),
});
export type AiStylingRecommendationsOutput = z.infer<typeof AiStylingRecommendationsOutputSchema>;

export async function aiStylingRecommendations(
  input: AiStylingRecommendationsInput
): Promise<AiStylingRecommendationsOutput> {
  return aiStylingRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiStylingRecommendationsPrompt',
  input: {schema: AiStylingRecommendationsInputSchema},
  output: {schema: AiStylingRecommendationsOutputSchema},
  prompt: `You are an expert fashion stylist. Your task is to provide comprehensive styling recommendations for a given dress.

Based on the provided dress description and optionally a photo, suggest complementary accessories, alternative design variations, and occasion-based styling ideas.

Dress Description: {{{dressDescription}}}
{{#if dressPhotoDataUri}}
Photo: {{media url=dressPhotoDataUri}}
{{/if}}

Please provide your suggestions in the specified JSON format.`,
});

const aiStylingRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiStylingRecommendationsFlow',
    inputSchema: AiStylingRecommendationsInputSchema,
    outputSchema: AiStylingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
