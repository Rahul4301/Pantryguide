'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecipeGenerator from "@/components/recipe-generator"
import GroceryMap from "@/components/grocery-map"
import MealPrep from "@/components/meal-prep"
import GroceryList from "@/components/grocery-list"
import { ChefHatIcon } from "@/components/icons/chef-hat"
import { Map, Utensils, ListChecks } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [dishes, setDishes] = useState<string[]>([]);
  // For demo: hardcoded grocery items per dish. In real app, fetch from API/model.
  const groceryMap: Record<string, string[]> = {
    "Chicken Alfredo": ["Chicken breast", "Pasta", "Cream", "Parmesan", "Garlic"],
    "Veggie Stir Fry": ["Broccoli", "Carrot", "Bell pepper", "Soy sauce", "Tofu"],
    // ...add more demo dishes
  };
  const groceryItems = Array.from(
    new Set(
      dishes.flatMap(dish => groceryMap[dish] || [])
    )
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <ChefHatIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-primary">PantryPal</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="recipe" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="recipe">
              <Utensils className="mr-2 h-4 w-4" />
              Recipe Generator
            </TabsTrigger>
            <TabsTrigger value="stores">
              <Map className="mr-2 h-4 w-4" />
              Grocery Stores
            </TabsTrigger>
            <TabsTrigger value="meal-prep">
              <ChefHatIcon className="mr-2 h-4 w-4" />
              Meal Prep
            </TabsTrigger>
            <TabsTrigger value="grocery-list">
              <ListChecks className="mr-2 h-4 w-4" />
              Grocery List
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recipe" className="mt-6">
            <RecipeGenerator />
          </TabsContent>
          <TabsContent value="stores" className="mt-6">
            <GroceryMap />
          </TabsContent>
          <TabsContent value="meal-prep" className="mt-6">
            <MealPrep onAddDish={dish => setDishes([...dishes, dish])} dishes={dishes} />
          </TabsContent>
          <TabsContent value="grocery-list" className="mt-6">
            <GroceryList groceryItems={groceryItems} />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PantryPal. All rights reserved.
      </footer>
    </div>
  );
}
