import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

import { readDb, writeDb } from '@/lib/db'
import type { Order, OrderItem } from '@/lib/types'

export async function GET() {
  const db = await readDb()
  return NextResponse.json(db.orders)
}

export async function POST(request: Request) {
  const db = await readDb()
  const body = await request.json()
  const items = (Array.isArray(body.items) ? body.items : []) as OrderItem[]
  const amount =
    Number(body.amount) ||
    items.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 0), 0)

  if (!body.customer || items.length === 0) {
    return NextResponse.json({ message: 'Customer and items are required.' }, { status: 400 })
  }

  const order: Order = {
    id: `ord-${Math.floor(Math.random() * 9000 + 1000)}`,
    customer: String(body.customer),
    customerEmail: String(body.customerEmail ?? ''),
    amount,
    status: body.status ?? 'pending',
    items,
    createdAt: new Date().toISOString(),
  }

  db.orders.unshift(order)
  await writeDb(db)
  return NextResponse.json(order, { status: 201 })
}
