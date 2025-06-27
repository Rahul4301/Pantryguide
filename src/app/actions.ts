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
  const input = (formData.get('ingredients') as string || '').toLowerCase();

  // Basic non-food detection: question, non-food words, or empty
  const nonFoodPatterns = [
    /\b(who|what|when|where|why|how|\?)\b/, // question words
    /\b(car|phone|computer|table|chair|shoe|shirt|pen|pencil|book|money|dog|cat|rock|plastic|metal|wood|glass|paint|code|app|software|hardware|music|movie|game|ball|toy|lamp|light|fan|tv|television|radio|camera|bag|wallet|key|door|window|wall|floor|ceiling|roof|road|street|carpet|blanket|pillow|bed|sofa|couch|bottle|cup|mug|plate|fork|spoon|knife|gun|weapon|bomb|explosive|drug|medicine|pill|tablet|capsule|soap|shampoo|detergent|bleach|cleaner|toothpaste|brush|comb|razor|scissors|tape|glue|stapler|paper|envelope|stamp|coin|bill|ticket|receipt|card|calendar|clock|watch|ring|necklace|bracelet|earring|jewelry|jewel|diamond|gold|silver|bronze|copper|iron|steel|aluminum|lead|zinc|tin|mercury|platinum|uranium|plutonium|thorium|radium|polonium|astatine|francium|promethium|berkelium|californium|einsteinium|fermium|mendelevium|nobelium|lawrencium|rutherfordium|dubnium|seaborgium|bohrium|hassium|meitnerium|darmstadtium|roentgenium|copernicium|nihonium|flerovium|moscovium|livermorium|tennessine|oganesson)\b/,
    /\d{3,}/, // long numbers
  ];
  if (!input.trim() || nonFoodPatterns.some((pat) => pat.test(input))) {
    return {
      form: { ingredients: input },
      error: 'please enter food items',
    };
  }

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
