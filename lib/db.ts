import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import type { AppDb } from '@/lib/types'

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DATA_DIR, 'db.json')

const seedDb: AppDb = {
  categories: [
    {
      id: 'cat-1',
      name: 'Ceramics',
      image:
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200',
      isActive: true,
      featuredOnHome: true,
    },
    {
      id: 'cat-2',
      name: 'Woodwork',
      image:
        'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200',
      isActive: true,
      featuredOnHome: true,
    },
    {
      id: 'cat-3',
      name: 'Textiles',
      image:
        'https://images.unsplash.com/photo-1610505466020-058597376045?q=80&w=1200',
      isActive: true,
      featuredOnHome: false,
    },
    {
      id: 'cat-4',
      name: 'Limited',
      image:
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200',
      isActive: false,
      featuredOnHome: false,
    },
  ],
  products: [
    {
      id: 'prod-1',
      name: 'Ridge Clay Vase',
      categoryId: 'cat-1',
      categoryName: 'Ceramics',
      price: 64,
      images: [
        'https://images.unsplash.com/photo-1612196808214-b7e239e5f501?q=80&w=1400',
      ],
      isActive: true,
    },
    {
      id: 'prod-2',
      name: 'Oak Serving Board',
      categoryId: 'cat-2',
      categoryName: 'Woodwork',
      price: 92,
      images: [
        'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1400',
      ],
      isActive: true,
    },
    {
      id: 'prod-3',
      name: 'Linen Throw',
      categoryId: 'cat-3',
      categoryName: 'Textiles',
      price: 78,
      images: [
        'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1400',
      ],
      isActive: true,
    },
    {
      id: 'prod-4',
      name: 'Edition No. 7 Vessel',
      categoryId: 'cat-4',
      categoryName: 'Limited',
      price: 180,
      images: [
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400',
      ],
      isActive: false,
    },
  ],
  orders: [],
}

export async function ensureDb() {
  await mkdir(DATA_DIR, { recursive: true })
  try {
    await readFile(DB_PATH, 'utf8')
  } catch {
    await writeFile(DB_PATH, JSON.stringify(seedDb, null, 2), 'utf8')
  }
}

export async function readDb(): Promise<AppDb> {
  await ensureDb()
  const raw = await readFile(DB_PATH, 'utf8')
  return JSON.parse(raw) as AppDb
}

export async function writeDb(next: AppDb) {
  await ensureDb()
  await writeFile(DB_PATH, JSON.stringify(next, null, 2), 'utf8')
}
