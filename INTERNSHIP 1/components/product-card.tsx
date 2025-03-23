"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

type ProductCardProps = {
  product: {
    id: string
    name: string
    brand: string
    price: number
    image: string
  }
  onClick: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToBag = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="relative h-64 w-full">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="font-bold">${product.price.toFixed(2)}</p>
          <Button size="sm" onClick={handleAddToBag}>
            Add to Bag
          </Button>
        </div>
      </div>
    </div>
  )
}

