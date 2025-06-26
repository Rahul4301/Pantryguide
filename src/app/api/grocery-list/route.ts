import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const [rows] = await pool.query('SELECT * FROM grocery_items');
  // Always return an array, even if empty
  return NextResponse.json(rows || []);
}

export async function POST(req: NextRequest) {
  const { item } = await req.json();
  if (!item) return NextResponse.json({ error: 'Item required' }, { status: 400 });
  await pool.query('INSERT INTO grocery_items (name) VALUES (?)', [item]);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { item } = await req.json();
  await pool.query('DELETE FROM grocery_items WHERE name = ?', [item]);
  return NextResponse.json({ success: true });
}
