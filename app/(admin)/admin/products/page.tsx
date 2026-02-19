'use client'

import { useMemo, useState } from 'react'
import { Eye, Pencil, Trash2, Plus } from 'lucide-react'

import { AdminModal } from '@/components/sections/admin/AdminModal'
import { ConfirmDialog } from '@/components/sections/admin/ConfirmDialog'
import { initialCategories, initialProducts, type AdminProduct } from '@/components/sections/admin/mockData'

type ConfirmState = {
  title: string
  description: string
  action: () => void
}

export default function Page() {
  const [items, setItems] = useState<AdminProduct[]>(initialProducts)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const [createOpen, setCreateOpen] = useState(false)
  const [detailsId, setDetailsId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)

  const [name, setName] = useState('')
  const [category, setCategory] = useState(initialCategories[0]?.name ?? 'Ceramics')
  const [price, setPrice] = useState('0')

  const categories = useMemo(() => ['All', ...initialCategories.map((cat) => cat.name)], [])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [categoryFilter, items, search])

  const detailItem = items.find((item) => item.id === detailsId) ?? null
  const editingItem = items.find((item) => item.id === editingId) ?? null

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 style={{ fontFamily: 'var(--font-amarante)' }} className="text-5xl md:text-6xl text-[var(--black)]">
          Products
        </h1>
        <button
          onClick={() => {
            setName('')
            setPrice('0')
            setCategory(initialCategories[0]?.name ?? 'Ceramics')
            setCreateOpen(true)
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          <Plus size={14} />
          Create Product
        </button>
      </div>

      <section className="rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-5 space-y-4">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
          className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          style={{ fontFamily: 'var(--font-abel)' }}
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] border ${
                categoryFilter === cat
                  ? 'bg-[var(--black)] text-white border-[var(--black)]'
                  : 'border-[var(--secondary-bg)] text-[var(--dark-grey)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-[var(--secondary-bg)]">
            <tr className="text-left">
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
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  {item.name}
                </td>
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  {item.category}
                </td>
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  ${item.price}
                </td>
                <td className="p-4">
                  <button
                    onClick={() =>
                      setConfirm({
                        title: item.isActive ? 'Deactivate Product' : 'Activate Product',
                        description: `Are you sure you want to ${item.isActive ? 'deactivate' : 'activate'} "${item.name}"?`,
                        action: () =>
                          setItems((prev) =>
                            prev.map((row) =>
                              row.id === item.id ? { ...row, isActive: !row.isActive } : row,
                            ),
                          ),
                      })
                    }
                    className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                      item.isActive ? 'bg-emerald-700 text-white' : 'bg-zinc-500 text-white'
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
                        setCategory(item.category)
                        setPrice(String(item.price))
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
                          action: () =>
                            setItems((prev) => prev.filter((row) => row.id !== item.id)),
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

      <AdminModal open={createOpen} title="Create Product" onClose={() => setCreateOpen(false)}>
        <div className="space-y-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Product name"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
            style={{ fontFamily: 'var(--font-abel)' }}
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
            style={{ fontFamily: 'var(--font-abel)' }}
          >
            {initialCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
            style={{ fontFamily: 'var(--font-abel)' }}
          />
        </div>
        <button
          onClick={() => {
            if (!name.trim()) return
            setItems((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                name: name.trim(),
                category,
                price: Number(price) || 0,
                isActive: true,
              },
            ])
            setCreateOpen(false)
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
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          >
            {initialCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          />
        </div>
        <button
          onClick={() => {
            if (!editingId || !name.trim()) return
            setItems((prev) =>
              prev.map((item) =>
                item.id === editingId
                  ? { ...item, name: name.trim(), category, price: Number(price) || 0 }
                  : item,
              ),
            )
            setEditingId(null)
          }}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Update
        </button>
      </AdminModal>

      <AdminModal open={!!detailItem} title="Product Details" onClose={() => setDetailsId(null)}>
        {detailItem ? (
          <div className="space-y-3">
            <p style={{ fontFamily: 'var(--font-abel)' }}>Name: {detailItem.name}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Category: {detailItem.category}</p>
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
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          confirm?.action()
          setConfirm(null)
        }}
      />
    </div>
  )
}
