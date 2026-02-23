'use client'

import { useEffect, useMemo, useState } from 'react'
import { Eye, Pencil, Trash2, Plus, Filter, X } from 'lucide-react'

import { AdminModal } from '@/components/sections/admin/AdminModal'
import { ConfirmDialog } from '@/components/sections/admin/ConfirmDialog'
import { SlidingFilterButtons } from '@/components/custom/SlidingFilterButtons'
import { CustomSelect } from '@/components/custom/CustomSelect'
import type { Category, Product } from '@/lib/types'

type ConfirmState = {
  title: string
  description: string
  intent: 'danger' | 'success'
  action: () => Promise<void> | void
}

type FilterState = {
  status: 'all' | 'active' | 'inactive'
  category: string
}

export default function Page() {
  const [items, setItems] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    category: 'All',
  })

  const [createOpen, setCreateOpen] = useState(false)
  const [detailsId, setDetailsId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)

  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [price, setPrice] = useState('0')
  const [isActive, setIsActive] = useState('true')
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const fetchAll = async () => {
    const [productResponse, categoryResponse] = await Promise.all([
      fetch('/api/products', { cache: 'no-store' }),
      fetch('/api/categories', { cache: 'no-store' }),
    ])
    if (productResponse.ok) {
      const productData = (await productResponse.json()) as Product[]
      setItems(productData)
    }
    if (categoryResponse.ok) {
      const categoryData = (await categoryResponse.json()) as Category[]
      setCategories(categoryData)
      if (!categoryId && categoryData[0]) setCategoryId(categoryData[0].id)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const categoryOptions = useMemo(
    () => categories.map((cat) => ({ value: cat.id, label: cat.name })),
    [categories],
  )
  const categoryTabs = useMemo(() => ['All', ...categories.map((cat) => cat.name)], [categories])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.categoryName.toLowerCase().includes(query)
      const matchesCategory =
        filters.category === 'All' || item.categoryName === filters.category
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'active' ? item.isActive : !item.isActive)
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [filters.category, filters.status, items, search])

  const detailItem = items.find((item) => item.id === detailsId) ?? null
  const editingItem = items.find((item) => item.id === editingId) ?? null

  const resetForm = () => {
    setName('')
    setPrice('0')
    setIsActive('true')
    setExistingImages([])
    setImageFiles([])
    if (categories[0]) setCategoryId(categories[0].id)
  }

  const activeFilterChips = [`Category: ${filters.category}`, `Status: ${filters.status}`]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 style={{ fontFamily: 'var(--font-amarante)' }} className="text-5xl md:text-6xl text-[var(--black)]">
          Products
        </h1>
        <button
          onClick={() => {
            resetForm()
            setCreateOpen(true)
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          <Plus size={14} />
          Create Product
        </button>
      </div>

      <section className="mt-6 rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-5">
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            className="flex-1 rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
            style={{ fontFamily: 'var(--font-abel)' }}
          />
          <button
            onClick={() => setFilterOpen(true)}
            className="rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-roboto)' }}
          >
            <Filter size={14} />
            Filters
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {activeFilterChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-[var(--secondary-bg)] px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-[var(--secondary-bg)]">
            <tr className="text-left">
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Image</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Name</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Category</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Price</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Status</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0 border-[var(--secondary-bg)]">
                <td className="p-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-xl border border-[var(--secondary-bg)]"
                  />
                </td>
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  {item.name}
                </td>
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  {item.categoryName}
                </td>
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  ${item.price}
                </td>
                <td className="p-4">
                  <button
                    onClick={async () => {
                      await fetch(`/api/products/${item.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ isActive: !item.isActive }),
                      })
                      fetchAll()
                    }}
                    className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                      item.isActive
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                    }`}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDetailsId(item.id)}
                      className="p-2 rounded-full border border-[var(--secondary-bg)]"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(item.id)
                        setName(item.name)
                        setCategoryId(item.categoryId)
                        setPrice(String(item.price))
                        setIsActive(String(item.isActive))
                        setExistingImages(item.images)
                        setImageFiles([])
                      }}
                      className="p-2 rounded-full border border-[var(--secondary-bg)]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() =>
                        setConfirm({
                          title: 'Delete Product',
                          description: `Are you sure you want to delete "${item.name}"?`,
                          intent: 'danger',
                          action: async () => {
                            await fetch(`/api/products/${item.id}`, { method: 'DELETE' })
                            await fetchAll()
                          },
                        })
                      }
                      className="p-2 rounded-full border border-[var(--secondary-bg)]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <AdminModal open={filterOpen} title="Product Filters" onClose={() => setFilterOpen(false)}>
        <div className="space-y-4">
          <div>
            <p
              style={{ fontFamily: 'var(--font-roboto)' }}
              className="text-[10px] uppercase tracking-[0.2em] text-[var(--dark-grey)] mb-2"
            >
              Category
            </p>
            <SlidingFilterButtons
              options={categoryTabs}
              value={filters.category}
              onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
            />
          </div>
          <div>
            <p
              style={{ fontFamily: 'var(--font-roboto)' }}
              className="text-[10px] uppercase tracking-[0.2em] text-[var(--dark-grey)] mb-2"
            >
              Status
            </p>
            <SlidingFilterButtons
              options={['all', 'active', 'inactive']}
              value={filters.status}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value as FilterState['status'] }))
              }
            />
          </div>
        </div>
        <button
          onClick={() => setFilterOpen(false)}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Apply
        </button>
      </AdminModal>

      <AdminModal open={createOpen} title="Create Product" onClose={() => setCreateOpen(false)}>
        <div className="space-y-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Product name"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
            style={{ fontFamily: 'var(--font-abel)' }}
          />
          <CustomSelect
            value={categoryId}
            onChange={setCategoryId}
            options={categoryOptions}
            placeholder="Select category"
          />
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
            style={{ fontFamily: 'var(--font-abel)' }}
          />
          <CustomSelect
            value={isActive}
            onChange={setIsActive}
            options={[
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' },
            ]}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => setImageFiles(Array.from(event.target.files ?? []))}
            className="w-full rounded-full border border-[var(--secondary-bg)] px-4 py-2"
          />
          <div className="flex flex-wrap gap-2">
            {imageFiles.map((file) => (
              <span
                key={file.name}
                className="rounded-full border border-[var(--secondary-bg)] px-3 py-1 text-xs"
              >
                {file.name}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={async () => {
            if (!name.trim() || !categoryId || imageFiles.length === 0) return
            const form = new FormData()
            form.set('name', name.trim())
            form.set('categoryId', categoryId)
            form.set('price', price)
            form.set('isActive', isActive)
            imageFiles.forEach((file) => form.append('images', file))
            const response = await fetch('/api/products', { method: 'POST', body: form })
            if (!response.ok) return
            setCreateOpen(false)
            await fetchAll()
          }}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Save
        </button>
      </AdminModal>

      <AdminModal open={!!editingItem} title="Edit Product" onClose={() => setEditingId(null)}>
        <div className="space-y-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Product name"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          />
          <CustomSelect
            value={categoryId}
            onChange={setCategoryId}
            options={categoryOptions}
            placeholder="Select category"
          />
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          />
          <CustomSelect
            value={isActive}
            onChange={setIsActive}
            options={[
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' },
            ]}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => setImageFiles(Array.from(event.target.files ?? []))}
            className="w-full rounded-full border border-[var(--secondary-bg)] px-4 py-2"
          />
          <div className="flex flex-wrap gap-2">
            {existingImages.map((image) => (
              <span
                key={image}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--secondary-bg)] px-3 py-1 text-xs"
              >
                Existing
                <button
                  type="button"
                  onClick={() => setExistingImages((prev) => prev.filter((row) => row !== image))}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            {imageFiles.map((file) => (
              <span
                key={file.name}
                className="rounded-full border border-[var(--secondary-bg)] px-3 py-1 text-xs"
              >
                {file.name}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={async () => {
            if (!editingId || !name.trim()) return
            const form = new FormData()
            form.set('name', name.trim())
            form.set('categoryId', categoryId)
            form.set('price', price)
            form.set('isActive', isActive)
            form.set('imageUrls', JSON.stringify(existingImages))
            imageFiles.forEach((file) => form.append('images', file))
            const response = await fetch(`/api/products/${editingId}`, {
              method: 'PUT',
              body: form,
            })
            if (!response.ok) return
            setEditingId(null)
            await fetchAll()
          }}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Update
        </button>
      </AdminModal>

      <AdminModal open={!!detailItem} title="Product Details" onClose={() => setDetailsId(null)}>
        {detailItem ? (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {detailItem.images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={detailItem.name}
                  className="w-full h-24 object-cover rounded-xl border border-[var(--secondary-bg)]"
                />
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Name: {detailItem.name}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Category: {detailItem.categoryName}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Price: ${detailItem.price}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>
              Status: {detailItem.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        ) : null}
      </AdminModal>

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.title ?? ''}
        description={confirm?.description ?? ''}
        intent={confirm?.intent ?? 'danger'}
        onCancel={() => setConfirm(null)}
        onConfirm={async () => {
          await confirm?.action()
          setConfirm(null)
        }}
      />
    </div>
  )
}
