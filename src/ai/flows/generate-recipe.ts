'use server';

/**
 * @fileOverview Generates a recipe based on a list of ingredients provided by the user.
 *
 * - generateRecipe - A function that generates a recipe from ingredients.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has available.'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  ingredients: z.array(z.string()).describe('The ingredients required for the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
  additionalNotes: z.string().optional().describe('Any additional notes or tips for the recipe.'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `You are a recipe generation AI. The user will provide you with a list of ingredients they have on hand, and you will generate a recipe using those ingredients.

  Ingredients: {{{ingredients}}}

  Please provide the recipe in the following format:

  Recipe Name: (The name of the recipe)
  Ingredients: (A list of ingredients required for the recipe. Include quantities.)
  Instructions: (Step-by-step instructions for preparing the recipe)
  Additional Notes: (Optional: Any additional notes or tips for the recipe)

  Make sure the recipe only include ingredients that user specified, and if the user specified very few items make up the rest of the recipe with basic ingredients such as oil, salt, pepper, etc.
`,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
