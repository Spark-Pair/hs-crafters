import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

export async function saveUploadedImage(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer())
  const extension = getExtension(file.name, file.type)
  const filename = `${Date.now()}-${randomUUID()}.${extension}`
  await mkdir(uploadDir, { recursive: true })
  await writeFile(path.join(uploadDir, filename), buffer)
  return `/uploads/${filename}`
}

function getExtension(filename: string, mimeType: string) {
  const ext = filename.split('.').pop()?.toLowerCase()
  if (ext && ext.length <= 5) return ext
  if (mimeType.includes('png')) return 'png'
  if (mimeType.includes('webp')) return 'webp'
  return 'jpg'
}
