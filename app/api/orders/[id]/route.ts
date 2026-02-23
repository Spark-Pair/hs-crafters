import { NextResponse } from 'next/server'

import { readDb, writeDb } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const db = await readDb()
  const index = db.orders.findIndex((item) => item.id === id)
  if (index < 0) {
    return NextResponse.json({ message: 'Order not found.' }, { status: 404 })
  }

  const body = await request.json()
  const next = {
    ...db.orders[index],
    customer: body.customer ?? db.orders[index].customer,
    customerEmail: body.customerEmail ?? db.orders[index].customerEmail,
    amount: body.amount ?? db.orders[index].amount,
    status: body.status ?? db.orders[index].status,
    items: body.items ?? db.orders[index].items,
  }

  db.orders[index] = next
  await writeDb(db)
  return NextResponse.json(next)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const db = await readDb()
  db.orders = db.orders.filter((item) => item.id !== id)
  await writeDb(db)
  return NextResponse.json({ success: true })
}
