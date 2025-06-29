import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GROCERY_INPUT_KEY = 'grocery-list-input';

export default function GroceryList() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState<string[]>([]);

  // Load input from localStorage on mount
  useEffect(() => {
    const savedInput = localStorage.getItem(GROCERY_INPUT_KEY);
    if (savedInput) setItem(savedInput);
    fetch("/api/grocery-list")
      .then(res => res.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  // Save input to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(GROCERY_INPUT_KEY, item);
  }, [item]);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item.trim()) return;
    await fetch("/api/grocery-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
    setItems([...items, item]);
    setItem("");
    localStorage.removeItem(GROCERY_INPUT_KEY);
  };

  const removeItem = async (name: string) => {
    await fetch("/api/grocery-list", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: name }),
    });
    setItems(items.filter(i => i !== name));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grocery List</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addItem} className="flex gap-2 mb-4">
          <Label htmlFor="item" className="sr-only">Add Item</Label>
          <Input
            id="item"
            value={item}
            onChange={e => setItem(e.target.value)}
            placeholder="Add grocery item"
            className="flex-1"
            required
          />
          <Button type="submit">Add</Button>
        </form>
        <ul className="list-disc pl-6">
          {items.map((i, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span>{i}</span>
              <Button variant="ghost" size="sm" onClick={() => removeItem(i)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
