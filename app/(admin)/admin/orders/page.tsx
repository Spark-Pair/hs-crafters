'use client'

import { useEffect, useMemo, useState } from 'react'
import { Eye, Pencil, Trash2, Plus, Filter } from 'lucide-react'

import { AdminModal } from '@/components/sections/admin/AdminModal'
import { ConfirmDialog } from '@/components/sections/admin/ConfirmDialog'
import { CustomSelect } from '@/components/custom/CustomSelect'
import { SlidingFilterButtons } from '@/components/custom/SlidingFilterButtons'
import type { Category, Order, OrderStatus, Product } from '@/lib/types'

type ConfirmState = {
  title: string
  description: string
  intent: 'danger' | 'success'
  action: () => Promise<void> | void
}

const statuses: OrderStatus[] = ['pending', 'working', 'delivered']

export default function Page() {
  const [items, setItems] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<{ category: string; status: 'all' | OrderStatus }>({
    category: 'All',
    status: 'all',
  })

  const [createOpen, setCreateOpen] = useState(false)
  const [detailsId, setDetailsId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [statusModalId, setStatusModalId] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('pending')
  const [filterOpen, setFilterOpen] = useState(false)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)

  const [customer, setCustomer] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [status, setStatus] = useState<OrderStatus>('pending')

  const fetchAll = async () => {
    const [ordersRes, productsRes, categoriesRes] = await Promise.all([
      fetch('/api/orders', { cache: 'no-store' }),
      fetch('/api/products', { cache: 'no-store' }),
      fetch('/api/categories', { cache: 'no-store' }),
    ])
    if (ordersRes.ok) setItems((await ordersRes.json()) as Order[])
    if (productsRes.ok) {
      const list = (await productsRes.json()) as Product[]
      setProducts(list)
      if (!selectedProductId && list[0]) setSelectedProductId(list[0].id)
    }
    if (categoriesRes.ok) setCategories((await categoriesRes.json()) as Category[])
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const categoriesTabs = useMemo(
    () => ['All', ...categories.map((item) => item.name)],
    [categories],
  )
  const productOptions = useMemo(
    () => products.map((item) => ({ value: item.id, label: `${item.name} ($${item.price})` })),
    [products],
  )
  const detailItem = items.find((item) => item.id === detailsId) ?? null
  const editingItem = items.find((item) => item.id === editingId) ?? null
  const statusItem = items.find((item) => item.id === statusModalId) ?? null

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      const categoryNames = item.items.map((row) => row.categoryName || '').join(' ')
      const productNames = item.items.map((row) => row.name).join(' ')
      const matchesSearch =
        item.customer.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        productNames.toLowerCase().includes(query)
      const matchesCategory =
        filters.category === 'All' ||
        categoryNames.toLowerCase().includes(filters.category.toLowerCase())
      const matchesStatus = filters.status === 'all' || item.status === filters.status
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [filters.category, filters.status, items, search])

  const activeFilterChips = [`Category: ${filters.category}`, `Status: ${filters.status}`]

  const selectedProduct = products.find((item) => item.id === selectedProductId) ?? null

  const openEdit = (item: Order) => {
    setEditingId(item.id)
    setCustomer(item.customer)
    setCustomerEmail(item.customerEmail ?? '')
    setStatus(item.status)
    const first = item.items[0]
    if (first) {
      const matched = products.find((product) => product.name === first.name)
      if (matched) setSelectedProductId(matched.id)
      setQuantity(String(first.quantity))
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 style={{ fontFamily: 'var(--font-amarante)' }} className="text-5xl md:text-6xl text-[var(--black)]">
          Orders
        </h1>
        <button
          onClick={() => {
            setCustomer('')
            setCustomerEmail('')
            setQuantity('1')
            setStatus('pending')
            if (products[0]) setSelectedProductId(products[0].id)
            setCreateOpen(true)
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          <Plus size={14} />
          Create Order
        </button>
      </div>

      <section className="mt-6 rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-5">
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by customer, order id, product..."
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
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Order</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Customer</th>
              <th className="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)]">Items</th>
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
                  {item.items.length} item(s)
                </td>
                <td className="p-4" style={{ fontFamily: 'var(--font-abel)' }}>
                  ${item.amount}
                </td>
                <td className="p-4">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] border ${getOrderStatusChipClass(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                    <button
                      onClick={() => {
                        setStatusModalId(item.id)
                        setSelectedStatus(item.status)
                      }}
                      className="p-1.5 rounded-full border border-[var(--secondary-bg)] text-[var(--dark-grey)] hover:text-[var(--black)]"
                      aria-label="Edit order status"
                    >
                      <Pencil size={13} />
                    </button>
                  </div>
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
                      onClick={() => openEdit(item)}
                      className="p-2 rounded-full border border-[var(--secondary-bg)]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() =>
                        setConfirm({
                          title: 'Delete Order',
                          description: `Are you sure you want to delete order "${item.id}"?`,
                          intent: 'danger',
                          action: async () => {
                            await fetch(`/api/orders/${item.id}`, { method: 'DELETE' })
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

      <AdminModal open={filterOpen} title="Order Filters" onClose={() => setFilterOpen(false)}>
        <div className="space-y-4">
          <div>
            <p
              style={{ fontFamily: 'var(--font-roboto)' }}
              className="text-[10px] uppercase tracking-[0.2em] text-[var(--dark-grey)] mb-2"
            >
              Category
            </p>
            <SlidingFilterButtons
              options={categoriesTabs}
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
              options={['all', 'pending', 'working', 'delivered']}
              value={filters.status}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value as 'all' | OrderStatus }))
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

      <AdminModal open={createOpen} title="Create Order" onClose={() => setCreateOpen(false)}>
        <OrderForm
          customer={customer}
          customerEmail={customerEmail}
          quantity={quantity}
          status={status}
          productId={selectedProductId}
          productOptions={productOptions}
          setCustomer={setCustomer}
          setCustomerEmail={setCustomerEmail}
          setQuantity={setQuantity}
          setStatus={setStatus}
          setProductId={setSelectedProductId}
        />
        <button
          onClick={async () => {
            if (!customer.trim() || !selectedProduct) return
            const qty = Math.max(1, Number(quantity) || 1)
            const response = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customer: customer.trim(),
                customerEmail: customerEmail.trim(),
                status,
                amount: selectedProduct.price * qty,
                items: [
                  {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    image: selectedProduct.images[0],
                    price: selectedProduct.price,
                    quantity: qty,
                    categoryName: selectedProduct.categoryName,
                  },
                ],
              }),
            })
            if (!response.ok) return
            setCreateOpen(false)
            await fetchAll()
          }}
          className="mt-6 rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Save
        </button>
      </AdminModal>

      <AdminModal open={!!editingItem} title="Edit Order" onClose={() => setEditingId(null)}>
        <OrderForm
          customer={customer}
          customerEmail={customerEmail}
          quantity={quantity}
          status={status}
          productId={selectedProductId}
          productOptions={productOptions}
          setCustomer={setCustomer}
          setCustomerEmail={setCustomerEmail}
          setQuantity={setQuantity}
          setStatus={setStatus}
          setProductId={setSelectedProductId}
        />
        <button
          onClick={async () => {
            if (!editingId || !customer.trim() || !selectedProduct) return
            const qty = Math.max(1, Number(quantity) || 1)
            const response = await fetch(`/api/orders/${editingId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customer: customer.trim(),
                customerEmail: customerEmail.trim(),
                status,
                amount: selectedProduct.price * qty,
                items: [
                  {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    image: selectedProduct.images[0],
                    price: selectedProduct.price,
                    quantity: qty,
                    categoryName: selectedProduct.categoryName,
                  },
                ],
              }),
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

      <AdminModal open={!!detailItem} title="Order Details" onClose={() => setDetailsId(null)}>
        {detailItem ? (
          <div className="space-y-3">
            <p style={{ fontFamily: 'var(--font-abel)' }}>Order ID: {detailItem.id}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Customer: {detailItem.customer}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Email: {detailItem.customerEmail || '-'}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Amount: ${detailItem.amount}</p>
            <p style={{ fontFamily: 'var(--font-abel)' }}>Status: {detailItem.status}</p>
            <div className="pt-3 border-t border-[var(--secondary-bg)] grid grid-cols-1 sm:grid-cols-2 gap-3">
              {detailItem.items.map((item) => (
                <article
                  key={`${detailItem.id}-${item.id}-${item.name}`}
                  className="rounded-2xl border border-[var(--secondary-bg)] bg-[var(--bg)] p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-28 object-cover rounded-xl"
                  />
                  <h4
                    style={{ fontFamily: 'var(--font-amarante)' }}
                    className="text-2xl text-[var(--black)] mt-2"
                  >
                    {item.name}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-abel)' }} className="text-sm text-[var(--dark-grey)]">
                    Qty: {item.quantity} | ${item.price}
                  </p>
                </article>
              ))}
            </div>
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
                  : 'border-[var(--secondary-bg)] text-[var(--dark-grey)] hover:border-[var(--dark-grey)]/40'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={async () => {
            if (!statusModalId) return
            await fetch(`/api/orders/${statusModalId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: selectedStatus }),
            })
            setStatusModalId(null)
            await fetchAll()
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

type OrderFormProps = {
  customer: string
  customerEmail: string
  quantity: string
  status: OrderStatus
  productId: string
  productOptions: Array<{ value: string; label: string }>
  setCustomer: (value: string) => void
  setCustomerEmail: (value: string) => void
  setQuantity: (value: string) => void
  setStatus: (value: OrderStatus) => void
  setProductId: (value: string) => void
}

function OrderForm({
  customer,
  customerEmail,
  quantity,
  status,
  productId,
  productOptions,
  setCustomer,
  setCustomerEmail,
  setQuantity,
  setStatus,
  setProductId,
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
        value={customerEmail}
        onChange={(event) => setCustomerEmail(event.target.value)}
        placeholder="Customer Email"
        className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
      />
      <CustomSelect
        value={productId}
        onChange={setProductId}
        options={productOptions}
        placeholder="Select product"
      />
      <input
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        placeholder="Quantity"
        className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
      />
      <CustomSelect
        value={status}
        onChange={(value) => setStatus(value as OrderStatus)}
        options={statuses.map((item) => ({ value: item, label: item }))}
      />
    </div>
  )
}

function getOrderStatusChipClass(status: OrderStatus) {
  if (status === 'pending') return 'bg-amber-100 text-amber-800 border-amber-200'
  if (status === 'working') return 'bg-sky-100 text-sky-800 border-sky-200'
  return 'bg-emerald-100 text-emerald-800 border-emerald-200'
}
