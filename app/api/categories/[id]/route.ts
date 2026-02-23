import { NextResponse } from 'next/server'

import { readDb, writeDb } from '@/lib/db'
import { saveUploadedImage } from '@/lib/uploads'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const db = await readDb()
  const index = db.categories.findIndex((item) => item.id === id)
  if (index < 0) {
    return NextResponse.json({ message: 'Category not found.' }, { status: 404 })
  }

  const contentType = request.headers.get('content-type') ?? ''
  let updates: Partial<(typeof db.categories)[number]> = {}

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData()
    const imageInput = form.get('image')
    const imageUrl = String(form.get('imageUrl') ?? '').trim()

    let image = imageUrl
    if (imageInput instanceof File && imageInput.size > 0) {
      image = await saveUploadedImage(imageInput)
    }

    updates = {
      name: String(form.get('name') ?? db.categories[index].name).trim(),
      image: image || db.categories[index].image,
      isActive: String(form.get('isActive') ?? db.categories[index].isActive) === 'true',
      featuredOnHome:
        String(form.get('featuredOnHome') ?? db.categories[index].featuredOnHome) ===
        'true',
    }
  } else {
    const body = await request.json()
    updates = {
      name: body.name ?? db.categories[index].name,
      image: body.image ?? db.categories[index].image,
      isActive: body.isActive ?? db.categories[index].isActive,
      featuredOnHome: body.featuredOnHome ?? db.categories[index].featuredOnHome,
    }
  }

  const next = { ...db.categories[index], ...updates }
  db.categories[index] = next
  await writeDb(db)
  return NextResponse.json(next)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const db = await readDb()
  db.categories = db.categories.filter((item) => item.id !== id)
  await writeDb(db)
  return NextResponse.json({ success: true })
}
