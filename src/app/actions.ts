'use server';

import { z } from 'zod';
import { generateRecipe, GenerateRecipeOutput } from '@/ai/flows/generate-recipe';

const formSchema = z.object({
  ingredients: z.string().min(10, {
    message: "Please enter at least a few ingredients.",
  }),
});

export interface RecipeState {
  form: {
    ingredients: string;
  };
  error?: string;
  recipe?: GenerateRecipeOutput;
}

export async function getRecipeAction(
  prevState: RecipeState,
  formData: FormData
): Promise<RecipeState> {
  const validatedFields = formSchema.safeParse({
    ingredients: formData.get('ingredients'),
  });

  if (!validatedFields.success) {
    return {
      form: {
        ingredients: formData.get('ingredients') as string || '',
      },
      error: validatedFields.error.flatten().fieldErrors.ingredients?.[0],
    };
  }

  try {
    const recipe = await generateRecipe({ ingredients: validatedFields.data.ingredients });
    return {
      form: { ingredients: validatedFields.data.ingredients },
      recipe: recipe,
    };
  } catch (error) {
    console.error(error);
    return {
      form: { ingredients: validatedFields.data.ingredients },
      error: 'Failed to generate recipe. Please try again.',
    };
  }
}
