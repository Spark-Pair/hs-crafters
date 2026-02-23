import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

import { readDb, writeDb } from '@/lib/db'
import { saveUploadedImage } from '@/lib/uploads'

export async function GET() {
  const db = await readDb()
  return NextResponse.json(db.products)
}

export async function POST(request: Request) {
  const db = await readDb()
  const contentType = request.headers.get('content-type') ?? ''

  let payload: {
    name: string
    categoryId: string
    categoryName: string
    price: number
    images: string[]
    isActive: boolean
  }

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData()
    const name = String(form.get('name') ?? '').trim()
    const categoryId = String(form.get('categoryId') ?? '').trim()
    const price = Number(form.get('price') ?? 0) || 0
    const isActive = String(form.get('isActive') ?? 'true') === 'true'
    const category = db.categories.find((item) => item.id === categoryId)
    const rawImages = String(form.get('imageUrls') ?? '')
    const parsedUrls = rawImages ? (JSON.parse(rawImages) as string[]) : []
    const uploadedUrls: string[] = []

    const files = form.getAll('images')
    for (const file of files) {
      if (file instanceof File && file.size > 0) {
        uploadedUrls.push(await saveUploadedImage(file))
      }
    }

    payload = {
      name,
      categoryId,
      categoryName: category?.name ?? '',
      price,
      images: [...parsedUrls, ...uploadedUrls],
      isActive,
    }
  } else {
    const body = await request.json()
    payload = {
      name: String(body.name ?? '').trim(),
      categoryId: String(body.categoryId ?? '').trim(),
      categoryName: String(body.categoryName ?? '').trim(),
      price: Number(body.price ?? 0) || 0,
      images: Array.isArray(body.images) ? body.images : [],
      isActive: body.isActive ?? true,
    }
  }

  if (!payload.name || !payload.categoryId || payload.images.length === 0) {
    return NextResponse.json(
      { message: 'Name, category and at least one image are required.' },
      { status: 400 },
    )
  }

  const item = {
    id: randomUUID(),
    ...payload,
  }
  db.products.push(item)
  await writeDb(db)
  return NextResponse.json(item, { status: 201 })
}
