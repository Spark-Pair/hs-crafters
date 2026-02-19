'use client'

import { useMemo, useState } from 'react'
import { Eye, Pencil, Trash2, Plus } from 'lucide-react'

import { AdminModal } from '@/components/sections/admin/AdminModal'
import { ConfirmDialog } from '@/components/sections/admin/ConfirmDialog'
import { initialCategories, type AdminCategory } from '@/components/sections/admin/mockData'

type ConfirmState = {
  title: string
  description: string
  action: () => void
}

export default function Page() {
  const [items, setItems] = useState<AdminCategory[]>(initialCategories)
  const [search, setSearch] = useState('')

  const [createOpen, setCreateOpen] = useState(false)
  const [detailsId, setDetailsId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)
  const [name, setName] = useState('')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => item.name.toLowerCase().includes(query))
  }, [items, search])

  const editingItem = items.find((item) => item.id === editingId) ?? null
  const detailItem = items.find((item) => item.id === detailsId) ?? null

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 style={{ fontFamily: 'var(--font-amarante)' }} className="text-5xl md:text-6xl text-[var(--black)]">
          Categories
        </h1>
        <button
          onClick={() => {
            setName('')
            setCreateOpen(true)
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          <Plus size={14} />
          Create Category
        </button>
      </div>

      <section className="rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-5">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search categories..."
          className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          style={{ fontFamily: 'var(--font-abel)' }}
        />
      </section>

      <section className="rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-[var(--secondary-bg)]">
            <tr className="text-left">
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Name</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Status</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Home Feature</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0 border-[var(--secondary-bg)]">
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  {item.name}
                </td>
                <td className="p-4">
                  <button
                    onClick={() =>
                      setConfirm({
                        title: item.isActive ? 'Deactivate Category' : 'Activate Category',
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
                  <button
                    onClick={() =>
                      setConfirm({
                        title: item.featuredOnHome ? 'Remove From Home' : 'Feature On Home',
                        description: `Are you sure you want to ${item.featuredOnHome ? 'remove' : 'feature'} "${item.name}" ${item.featuredOnHome ? 'from' : 'on'} home page?`,
                        action: () =>
                          setItems((prev) =>
                            prev.map((row) =>
                              row.id === item.id
                                ? { ...row, featuredOnHome: !row.featuredOnHome }
                                : row,
                            ),
                          ),
                      })
                    }
                    className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                      item.featuredOnHome ? 'bg-[var(--black)] text-white' : 'bg-zinc-400 text-white'
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

      <AdminModal open={createOpen} title="Create Category" onClose={() => setCreateOpen(false)}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Category name"
          className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          style={{ fontFamily: 'var(--font-abel)' }}
        />
        <button
          onClick={() => {
            if (!name.trim()) return
            setItems((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                name: name.trim(),
                isActive: true,
                featuredOnHome: false,
              },
            ])
            setCreateOpen(false)
            setName('')
          }}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Save
        </button>
      </AdminModal>

      <AdminModal open={!!editingItem} title="Edit Category" onClose={() => setEditingId(null)}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Category name"
          className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          style={{ fontFamily: 'var(--font-abel)' }}
        />
        <button
          onClick={() => {
            if (!editingId || !name.trim()) return
            setItems((prev) =>
              prev.map((item) =>
                item.id === editingId ? { ...item, name: name.trim() } : item,
              ),
            )
            setEditingId(null)
            setName('')
          }}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Update
        </button>
      </AdminModal>

      <AdminModal open={!!detailItem} title="Category Details" onClose={() => setDetailsId(null)}>
        {detailItem ? (
          <div className="space-y-3">
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
        confirmLabel="Yes"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          confirm?.action()
          setConfirm(null)
        }}
      />
    </div>
  )
}
