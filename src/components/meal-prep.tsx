import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MealPrep({ onAddDish, dishes }: { onAddDish: (dish: string) => void, dishes: string[] }) {
  const [dish, setDish] = useState("");

  const addDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dish.trim()) return;
    await fetch("/api/meal-prep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dish }),
    });
    onAddDish(dish.trim());
    setDish("");
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Meal Prep Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addDish} className="flex gap-2 mb-4">
          <Label htmlFor="dish" className="sr-only">Dish Name</Label>
          <Input
            id="dish"
            value={dish}
            onChange={e => setDish(e.target.value)}
            placeholder="Enter dish name (e.g. Blueberry Pancakes)"
            className="flex-1"
            required
          />
          <Button type="submit">Add</Button>
        </form>
        <ul className="list-disc pl-6">
          {dishes.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
