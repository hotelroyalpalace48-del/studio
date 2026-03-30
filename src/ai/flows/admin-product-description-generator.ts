'use server';
/**
 * @fileOverview An AI agent that generates engaging and detailed product descriptions for dress patterns.
 *
 * - adminProductDescriptionGenerator - A function that handles the product description generation process.
 * - AdminProductDescriptionGeneratorInput - The input type for the adminProductDescriptionGenerator function.
 * - AdminProductDescriptionGeneratorOutput - The return type for the adminProductDescriptionGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminProductDescriptionGeneratorInputSchema = z.object({
  keywords: z.array(z.string()).describe('A list of keywords describing the product.'),
  productImages: z
    .array(
      z
        .string()
        .describe(
          "A product image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        )
    )
    .describe('An array of product images.'),
});
export type AdminProductDescriptionGeneratorInput = z.infer<
  typeof AdminProductDescriptionGeneratorInputSchema
>;

const AdminProductDescriptionGeneratorOutputSchema = z.object({
  description: z.string().describe('The generated engaging and detailed product description.'),
});
export type AdminProductDescriptionGeneratorOutput = z.infer<
  typeof AdminProductDescriptionGeneratorOutputSchema
>;

export async function adminProductDescriptionGenerator(
  input: AdminProductDescriptionGeneratorInput
): Promise<AdminProductDescriptionGeneratorOutput> {
  return adminProductDescriptionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminProductDescriptionGeneratorPrompt',
  input: {schema: AdminProductDescriptionGeneratorInputSchema},
  output: {schema: AdminProductDescriptionGeneratorOutputSchema},
  prompt: `You are an expert copywriter for a high-end fashion boutique named Mogra Design Studio.
Your task is to create an engaging, detailed, and appealing product description for a dress pattern.

Here are some keywords to guide your description:
Keywords: {{{keywords}}}

And here are images of the product:
{{#each productImages}}
Photo: {{media url=this}}
{{/each}}

Based on the provided keywords and images, craft a compelling product description that highlights the dress's style, fabric, unique features, and suitability for various occasions. Emphasize elegance, quality, and design. The description should be suitable for an e-commerce platform.

Generate the output in JSON format with a 'description' field.`,
});

const adminProductDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'adminProductDescriptionGeneratorFlow',
    inputSchema: AdminProductDescriptionGeneratorInputSchema,
    outputSchema: AdminProductDescriptionGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
