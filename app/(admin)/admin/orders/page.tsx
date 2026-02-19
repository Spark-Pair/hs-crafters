'use client'

import { useMemo, useState } from 'react'
import { Eye, Pencil, Trash2, Plus } from 'lucide-react'

import { AdminModal } from '@/components/sections/admin/AdminModal'
import { ConfirmDialog } from '@/components/sections/admin/ConfirmDialog'
import {
  initialCategories,
  initialOrders,
  type AdminOrder,
  type OrderStatus,
} from '@/components/sections/admin/mockData'

type ConfirmState = {
  title: string
  description: string
  action: () => void
}

const statuses: OrderStatus[] = ['pending', 'working', 'delivered']

export default function Page() {
  const [items, setItems] = useState<AdminOrder[]>(initialOrders)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all')

  const [createOpen, setCreateOpen] = useState(false)
  const [detailsId, setDetailsId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [statusModalId, setStatusModalId] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('pending')
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)

  const [customer, setCustomer] = useState('')
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState(initialCategories[0]?.name ?? 'Ceramics')
  const [amount, setAmount] = useState('0')
  const [status, setStatus] = useState<OrderStatus>('pending')

  const categories = useMemo(() => ['All', ...initialCategories.map((cat) => cat.name)], [])
  const detailItem = items.find((item) => item.id === detailsId) ?? null
  const editingItem = items.find((item) => item.id === editingId) ?? null
  const statusItem = items.find((item) => item.id === statusModalId) ?? null

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      const matchesSearch =
        item.customer.toLowerCase().includes(query) ||
        item.productName.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [categoryFilter, items, search, statusFilter])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 style={{ fontFamily: 'var(--font-amarante)' }} className="text-5xl md:text-6xl text-[var(--black)]">
          Orders
        </h1>
        <button
          onClick={() => {
            setCustomer('')
            setProductName('')
            setAmount('0')
            setStatus('pending')
            setCreateOpen(true)
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          <Plus size={14} />
          Create Order
        </button>
      </div>

      <section className="rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-5 space-y-4">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by customer, order id, product..."
          className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          style={{ fontFamily: 'var(--font-abel)' }}
        />
        <div className="grid md:grid-cols-2 gap-3">
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'all' | OrderStatus)}
            className="rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
          >
            <option value="all">All Statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-[var(--secondary-bg)]">
            <tr className="text-left">
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Order</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Customer</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Category</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Amount</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Status</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0 border-[var(--secondary-bg)]">
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  {item.id}
                </td>
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  {item.customer}
                </td>
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  {item.category}
                </td>
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  ${item.amount}
                </td>
                <td className="p-4">
                  <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-[var(--black)] text-white">
                    {item.status}
                  </span>
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
                        setCustomer(item.customer)
                        setProductName(item.productName)
                        setCategory(item.category)
                        setAmount(String(item.amount))
                        setStatus(item.status)
                      }}
                      className="p-2 rounded-full border border-[var(--secondary-bg)]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setStatusModalId(item.id)
                        setSelectedStatus(item.status)
                      }}
                      className="rounded-full border border-[var(--secondary-bg)] px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
                    >
                      Update Status
                    </button>
                    <button
                      onClick={() =>
                        setConfirm({
                          title: 'Delete Order',
                          description: `Are you sure you want to delete order "${item.id}"?`,
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

      <AdminModal open={createOpen} title="Create Order" onClose={() => setCreateOpen(false)}>
        <OrderForm
          customer={customer}
          productName={productName}
          category={category}
          amount={amount}
          status={status}
          setCustomer={setCustomer}
          setProductName={setProductName}
          setCategory={setCategory}
          setAmount={setAmount}
          setStatus={setStatus}
        />
        <button
          onClick={() => {
            if (!customer.trim() || !productName.trim()) return
            setItems((prev) => [
              ...prev,
              {
                id: `ord-${Math.floor(Math.random() * 9000 + 1000)}`,
                customer: customer.trim(),
                productName: productName.trim(),
                category,
                amount: Number(amount) || 0,
                status,
              },
            ])
            setCreateOpen(false)
          }}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Save
        </button>
      </AdminModal>

      <AdminModal open={!!editingItem} title="Edit Order" onClose={() => setEditingId(null)}>
        <OrderForm
          customer={customer}
          productName={productName}
          category={category}
          amount={amount}
          status={status}
          setCustomer={setCustomer}
          setProductName={setProductName}
          setCategory={setCategory}
          setAmount={setAmount}
          setStatus={setStatus}
        />
        <button
          onClick={() => {
            if (!editingId || !customer.trim() || !productName.trim()) return
            setItems((prev) =>
              prev.map((item) =>
                item.id === editingId
                  ? {
                      ...item,
                      customer: customer.trim(),
                      productName: productName.trim(),
                      category,
                      amount: Number(amount) || 0,
                      status,
                    }
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

      <AdminModal open={!!detailItem} title="Order Details" onClose={() => setDetailsId(null)}>
        {detailItem ? (
          <div className="space-y-3">
            <p style={{ fontFamily: 'var(--font-abel)' }}>Order ID: {detailItem.id}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Customer: {detailItem.customer}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Product: {detailItem.productName}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Category: {detailItem.category}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Amount: ${detailItem.amount}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Status: {detailItem.status}</p>
          </div>
        ) : null}
      </AdminModal>

      <AdminModal
        open={!!statusItem}
        title="Update Order Status"
        onClose={() => setStatusModalId(null)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {statuses.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedStatus(option)}
              className={`rounded-full px-4 py-3 text-xs uppercase tracking-[0.2em] border ${
                selectedStatus === option
                  ? 'bg-[var(--black)] text-white border-[var(--black)]'
                  : 'border-[var(--secondary-bg)] text-[var(--dark-grey)]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            if (!statusModalId) return
            setItems((prev) =>
              prev.map((item) =>
                item.id === statusModalId ? { ...item, status: selectedStatus } : item,
              ),
            )
            setStatusModalId(null)
          }}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Save Status
        </button>
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

type OrderFormProps = {
  customer: string
  productName: string
  category: string
  amount: string
  status: OrderStatus
  setCustomer: (value: string) => void
  setProductName: (value: string) => void
  setCategory: (value: string) => void
  setAmount: (value: string) => void
  setStatus: (value: OrderStatus) => void
}

function OrderForm({
  customer,
  productName,
  category,
  amount,
  status,
  setCustomer,
  setProductName,
  setCategory,
  setAmount,
  setStatus,
}: OrderFormProps) {
  return (
    <div className="space-y-3">
      <input
        value={customer}
        onChange={(event) => setCustomer(event.target.value)}
        placeholder="Customer"
        className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
      />
      <input
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
        placeholder="Product"
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
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="Amount"
        className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
      />
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value as OrderStatus)}
        className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}
