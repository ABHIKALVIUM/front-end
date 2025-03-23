"use client"

import Image from "next/image"
import { X, Star, StarHalf, Plus, Minus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

type ProductDetailModalProps = {
  product: any
  isOpen: boolean
  onClose: () => void
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  if (!isOpen) return null

  const handleAddToBag = () => {
    addItem(product, quantity)
    onClose()
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="relative h-80 md:h-full">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div>
            <p className="text-gray-500 mb-1">{product.brand}</p>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <StarHalf size={18} fill="currentColor" />
              </div>
              <span className="text-sm text-gray-500">(32 reviews)</span>
            </div>

            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="border rounded-l p-2 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="border-t border-b px-4 py-2 min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="border rounded-r p-2 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <Button className="w-full" onClick={handleAddToBag}>
              Add to Bag
            </Button>
          </div>
        </div>

        <div className="p-6 border-t">
          <h3 className="font-semibold mb-4">Customer Reviews</h3>
          {product.reviews?.map((review: any, index: number) => (
            <div key={index} className="mb-4 pb-4 border-b last:border-0">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-medium">{review.author}</span>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

