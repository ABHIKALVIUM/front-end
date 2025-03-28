"use client"

import { X, Plus, Minus } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

type ShoppingBagProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ShoppingBag({ isOpen, onClose }: ShoppingBagProps) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full overflow-auto shadow-xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">My Bag</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">Your bag is empty</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Remove item"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border rounded-l p-1 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="border-t border-b px-3 py-1 min-w-[30px] text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border rounded-r p-1 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t mt-auto">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

