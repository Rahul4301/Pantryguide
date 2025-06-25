'use client';

import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils } from 'lucide-react';

interface RecipeDisplayProps {
  recipe: GenerateRecipeOutput;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <Card className="shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{recipe.recipeName}</CardTitle>
        {recipe.additionalNotes && (
          <CardDescription className="pt-1">{recipe.additionalNotes}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-headline text-lg font-semibold mb-3 flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Ingredients
          </h3>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="secondary" className="text-sm font-normal">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-headline text-lg font-semibold mb-3">Instructions</h3>
          <div className="space-y-3 text-foreground whitespace-pre-wrap leading-relaxed">
            {recipe.instructions.split('\n').map((step, index) => (
                step.trim() && (
                    <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                            {index + 1}
                        </div>
                        <p className="flex-1">{step}</p>
                    </div>
                )
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
