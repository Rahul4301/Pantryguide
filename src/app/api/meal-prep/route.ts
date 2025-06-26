import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { generateRecipe } from '@/ai/flows/generate-recipe';

export async function POST(req: NextRequest) {
  const { dish } = await req.json();
  if (!dish) return NextResponse.json({ error: 'Dish required' }, { status: 400 });
  // Use AI to get ingredients for the dish
  const aiResult = await generateRecipe({ ingredients: dish });
  const ingredients = aiResult.ingredients || [];
  for (const ingredient of ingredients) {
    await pool.query('INSERT IGNORE INTO grocery_items (name) VALUES (?)', [ingredient]);
  }
  return NextResponse.json({ success: true, ingredients });
}
