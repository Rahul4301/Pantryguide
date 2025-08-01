"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface Recipe {
  recipeName: string;
  ingredients: string[];
  instructions: string[] | string;
}

export function RecipeHistory() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipeHistory");
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  const deleteRecipe = (index: number) => {
    const newRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(newRecipes);
    localStorage.setItem("recipeHistory", JSON.stringify(newRecipes));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recipe History</CardTitle>
      </CardHeader>
      <CardContent>
        {recipes.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {recipes.map((recipe, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{recipe.recipeName}</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <h4 className="font-semibold">Ingredients:</h4>
                    <ul className="list-disc pl-5">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                    <h4 className="font-semibold mt-4">Instructions:</h4>
                    <ol className="list-decimal pl-5">
                      {(Array.isArray(recipe.instructions)
                        ? recipe.instructions
                        : recipe.instructions.split('. ')
                      ).map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ol>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-4"
                      onClick={() => deleteRecipe(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p>No past recipes found.</p>
        )}
      </CardContent>
    </Card>
  );
}
