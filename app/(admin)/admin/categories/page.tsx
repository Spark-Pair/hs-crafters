'use client'

import { useEffect, useMemo, useState } from 'react'
import { Eye, Pencil, Trash2, Plus, Filter } from 'lucide-react'

import { AdminModal } from '@/components/sections/admin/AdminModal'
import { ConfirmDialog } from '@/components/sections/admin/ConfirmDialog'
import { CustomSelect } from '@/components/custom/CustomSelect'
import { SlidingFilterButtons } from '@/components/custom/SlidingFilterButtons'
import type { Category } from '@/lib/types'

type ConfirmState = {
  title: string
  description: string
  intent: 'danger' | 'success'
  action: () => void
}

type FilterState = {
  status: 'all' | 'active' | 'inactive'
  featured: 'all' | 'featured' | 'not_featured'
}

export default function Page() {
  const [items, setItems] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    featured: 'all',
  })

  const [createOpen, setCreateOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [detailsId, setDetailsId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)

  const [name, setName] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isActive, setIsActive] = useState('true')
  const [featuredOnHome, setFeaturedOnHome] = useState('false')

  const fetchCategories = async () => {
    const response = await fetch('/api/categories', { cache: 'no-store' })
    if (!response.ok) return
    const data = (await response.json()) as Category[]
    setItems(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(query)
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'active' ? item.isActive : !item.isActive)
      const matchesFeatured =
        filters.featured === 'all' ||
        (filters.featured === 'featured' ? item.featuredOnHome : !item.featuredOnHome)
      return matchesSearch && matchesStatus && matchesFeatured
    })
  }, [filters.featured, filters.status, items, search])

  const editingItem = items.find((item) => item.id === editingId) ?? null
  const detailItem = items.find((item) => item.id === detailsId) ?? null
  const activeFilterChips = [
    `Status: ${filters.status}`,
    `Home: ${filters.featured === 'not_featured' ? 'not featured' : filters.featured}`,
  ]

  const resetForm = () => {
    setName('')
    setImageFile(null)
    setIsActive('true')
    setFeaturedOnHome('false')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 style={{ fontFamily: 'var(--font-amarante)' }} className="text-5xl md:text-6xl text-[var(--black)]">
          Categories
        </h1>
        <button
          onClick={() => {
            resetForm()
            setCreateOpen(true)
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          <Plus size={14} />
          Create Category
        </button>
      </div>

      <section className="mt-6 rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-5">
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search categories..."
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
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Status</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Home Feature</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0 border-[var(--secondary-bg)]">
                <td className="p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-xl border border-[var(--secondary-bg)]"
                  />
                </td>
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  {item.name}
                </td>
                <td className="p-4">
                  <button
                    onClick={async () => {
                      await fetch(`/api/categories/${item.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ isActive: !item.isActive }),
                      })
                      fetchCategories()
                    }}
                    className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                      item.isActive
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="p-4">
                  <button
                    onClick={async () => {
                      await fetch(`/api/categories/${item.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ featuredOnHome: !item.featuredOnHome }),
                      })
                      fetchCategories()
                    }}
                    className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                      item.featuredOnHome
                        ? 'bg-[var(--black)] text-white border border-[var(--black)]'
                        : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                    }`}
                  >
                    {item.featuredOnHome ? 'Featured' : 'Not Featured'}
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
                        setImageFile(null)
                        setIsActive(String(item.isActive))
                        setFeaturedOnHome(String(item.featuredOnHome))
                      }}
                      className="p-2 rounded-full border border-[var(--secondary-bg)]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() =>
                        setConfirm({
                          title: 'Delete Category',
                          description: `Are you sure you want to delete "${item.name}"?`,
                          intent: 'danger',
                          action: async () => {
                            await fetch(`/api/categories/${item.id}`, { method: 'DELETE' })
                            fetchCategories()
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

      <AdminModal open={filterOpen} title="Category Filters" onClose={() => setFilterOpen(false)}>
        <div className="space-y-4">
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
          <div>
            <p
              style={{ fontFamily: 'var(--font-roboto)' }}
              className="text-[10px] uppercase tracking-[0.2em] text-[var(--dark-grey)] mb-2"
            >
              Home
            </p>
            <SlidingFilterButtons
              options={['all', 'featured', 'not_featured']}
              value={filters.featured}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  featured: value as FilterState['featured'],
                }))
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

      <AdminModal open={createOpen} title="Create Category" onClose={() => setCreateOpen(false)}>
        <div className="space-y-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Category name"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
            style={{ fontFamily: 'var(--font-abel)' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
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
          <CustomSelect
            value={featuredOnHome}
            onChange={setFeaturedOnHome}
            options={[
              { value: 'false', label: 'Not Featured' },
              { value: 'true', label: 'Featured On Home' },
            ]}
          />
        </div>
        <button
          onClick={async () => {
            if (!name.trim() || !imageFile) return
            const form = new FormData()
            form.set('name', name.trim())
            form.set('isActive', isActive)
            form.set('featuredOnHome', featuredOnHome)
            form.set('image', imageFile)
            const response = await fetch('/api/categories', {
              method: 'POST',
              body: form,
            })
            if (!response.ok) return
            setCreateOpen(false)
            await fetchCategories()
          }}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Save
        </button>
      </AdminModal>

      <AdminModal open={!!editingItem} title="Edit Category" onClose={() => setEditingId(null)}>
        <div className="space-y-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Category name"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
            style={{ fontFamily: 'var(--font-abel)' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
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
          <CustomSelect
            value={featuredOnHome}
            onChange={setFeaturedOnHome}
            options={[
              { value: 'false', label: 'Not Featured' },
              { value: 'true', label: 'Featured On Home' },
            ]}
          />
        </div>
        <button
          onClick={async () => {
            if (!editingId || !name.trim()) return
            const form = new FormData()
            form.set('name', name.trim())
            form.set('isActive', isActive)
            form.set('featuredOnHome', featuredOnHome)
            if (imageFile) form.set('image', imageFile)
            const response = await fetch(`/api/categories/${editingId}`, {
              method: 'PUT',
              body: form,
            })
            if (!response.ok) return
            setEditingId(null)
            await fetchCategories()
          }}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Update
        </button>
      </AdminModal>

      <AdminModal open={!!detailItem} title="Category Details" onClose={() => setDetailsId(null)}>
        {detailItem ? (
          <div className="space-y-3">
            <img
              src={detailItem.image}
              alt={detailItem.name}
              className="w-full h-52 object-cover rounded-2xl border border-[var(--secondary-bg)]"
            />
            <p style={{ fontFamily: 'var(--font-abel)' }}>Name: {detailItem.name}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>
              Status: {detailItem.isActive ? 'Active' : 'Inactive'}
            </p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>
              Home Feature: {detailItem.featuredOnHome ? 'Featured' : 'Not Featured'}
            </p>
          </div>
        ) : null}
      </AdminModal>

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.title ?? ''}
        description={confirm?.description ?? ''}
        intent={confirm?.intent ?? 'danger'}
        confirmLabel="Yes"
        onCancel={() => setConfirm(null)}
        onConfirm={async () => {
          await confirm?.action()
          setConfirm(null)
        }}
      />
    </div>
  )
}
