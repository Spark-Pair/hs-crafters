import { notFound } from 'next/navigation'

import { ProductDetailsPage } from '@/components/sections/shop/ProductDetailsPage'
import { getProductById } from '@/components/sections/shop/data'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return <ProductDetailsPage product={product} />
}
