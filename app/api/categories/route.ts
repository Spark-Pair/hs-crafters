import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

import { readDb, writeDb } from '@/lib/db'
import { saveUploadedImage } from '@/lib/uploads'

export async function GET() {
  const db = await readDb()
  return NextResponse.json(db.categories)
}

export async function POST(request: Request) {
  const db = await readDb()
  const contentType = request.headers.get('content-type') ?? ''

  let payload: {
    name: string
    image: string
    isActive: boolean
    featuredOnHome: boolean
  }

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData()
    const name = String(form.get('name') ?? '').trim()
    const featuredOnHome = String(form.get('featuredOnHome') ?? 'false') === 'true'
    const isActive = String(form.get('isActive') ?? 'true') === 'true'
    const imageInput = form.get('image')
    const imageUrl = String(form.get('imageUrl') ?? '').trim()

    let image = imageUrl
    if (imageInput instanceof File && imageInput.size > 0) {
      image = await saveUploadedImage(imageInput)
    }

    payload = { name, image, isActive, featuredOnHome }
  } else {
    const body = await request.json()
    payload = {
      name: String(body.name ?? '').trim(),
      image: String(body.image ?? '').trim(),
      isActive: body.isActive ?? true,
      featuredOnHome: body.featuredOnHome ?? false,
    }
  }

  if (!payload.name || !payload.image) {
    return NextResponse.json({ message: 'Name and image are required.' }, { status: 400 })
  }

  const item = {
    id: randomUUID(),
    ...payload,
  }
  db.categories.push(item)
  await writeDb(db)
  return NextResponse.json(item, { status: 201 })
}
