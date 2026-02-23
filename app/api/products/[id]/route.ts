import { NextResponse } from 'next/server'

import { readDb, writeDb } from '@/lib/db'
import { saveUploadedImage } from '@/lib/uploads'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const db = await readDb()
  const index = db.products.findIndex((item) => item.id === id)
  if (index < 0) {
    return NextResponse.json({ message: 'Product not found.' }, { status: 404 })
  }

  const contentType = request.headers.get('content-type') ?? ''
  let updates: Partial<(typeof db.products)[number]> = {}

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData()
    const categoryId = String(form.get('categoryId') ?? db.products[index].categoryId)
    const category = db.categories.find((item) => item.id === categoryId)

    const existingRaw = String(form.get('imageUrls') ?? '[]')
    const existingImages = (JSON.parse(existingRaw) as string[]).filter(Boolean)
    const files = form.getAll('images')
    const uploaded: string[] = []
    for (const file of files) {
      if (file instanceof File && file.size > 0) {
        uploaded.push(await saveUploadedImage(file))
      }
    }

    updates = {
      name: String(form.get('name') ?? db.products[index].name).trim(),
      categoryId,
      categoryName: category?.name ?? db.products[index].categoryName,
      price: Number(form.get('price') ?? db.products[index].price) || 0,
      images: [...existingImages, ...uploaded],
      isActive: String(form.get('isActive') ?? db.products[index].isActive) === 'true',
    }
  } else {
    const body = await request.json()
    updates = {
      name: body.name ?? db.products[index].name,
      categoryId: body.categoryId ?? db.products[index].categoryId,
      categoryName: body.categoryName ?? db.products[index].categoryName,
      price: body.price ?? db.products[index].price,
      images: body.images ?? db.products[index].images,
      isActive: body.isActive ?? db.products[index].isActive,
    }
  }

  const next = { ...db.products[index], ...updates }
  db.products[index] = next
  await writeDb(db)
  return NextResponse.json(next)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const db = await readDb()
  db.products = db.products.filter((item) => item.id !== id)
  await writeDb(db)
  return NextResponse.json({ success: true })
}
