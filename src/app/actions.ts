'use server';

import { z } from 'zod';
import { generateRecipe, GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { generateRecipeImage } from '@/ai/flows/generate-recipe-image';

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
  imageUrl?: string;
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
    const { imageUrl } = await generateRecipeImage({ recipeName: recipe.recipeName });

    return {
      form: { ingredients: validatedFields.data.ingredients },
      recipe: recipe,
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error(error);
    return {
      form: { ingredients: validatedFields.data.ingredients },
      error: 'Failed to generate recipe. Please try again.',
    };
  }
}
