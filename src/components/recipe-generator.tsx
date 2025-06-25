'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecipeAction, RecipeState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import RecipeDisplay from './recipe-display';
import { Skeleton } from './ui/skeleton';
import { Sparkles } from 'lucide-react';
import { ChefHatIcon } from './icons/chef-hat';

const initialState: RecipeState = {
  form: {
    ingredients: '',
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? (
        'Generating...'
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Recipe
        </>
      )}
    </Button>
  );
}

export default function RecipeGenerator() {
  const [state, formAction] = useFormState(getRecipeAction, initialState);
  const { toast } = useToast();
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state.error, toast]);

  return (
    <div className="grid gap-8 md:grid-cols-2 items-start">
      <Card className="shadow-lg sticky top-24">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">What's in your pantry?</CardTitle>
          <CardDescription>
            Enter the ingredients you have, and we'll whip up a recipe for you.
            Please separate ingredients with a comma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                placeholder="e.g., chicken breast, broccoli, olive oil, garlic"
                rows={5}
                required
                defaultValue={state.form.ingredients}
                className="text-base"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <div>
        {pending ? (
          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Skeleton className="h-6 w-1/4 mb-4" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
              <div>
                <Skeleton className="h-6 w-1/4 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : state.recipe ? (
          <RecipeDisplay recipe={state.recipe} />
        ) : (
           <Card className="flex h-full min-h-[400px] flex-col items-center justify-center text-center p-8 shadow-lg bg-card/50">
             <ChefHatIcon className="w-16 h-16 text-muted-foreground mb-4" />
             <h3 className="text-xl font-headline text-muted-foreground">Your recipe will appear here</h3>
             <p className="text-muted-foreground mt-2">Let's see what you can cook today!</p>
           </Card>
        )}
      </div>
    </div>
  );
}
