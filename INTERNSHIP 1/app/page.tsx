"use client"

import { useState } from "react"
import ProductGrid from "@/components/product-grid"
import Navbar from "@/components/navbar"
import ShoppingBag from "@/components/shopping-bag"
import ProductDetailModal from "@/components/product-detail-modal"
import { CartProvider } from "@/components/cart-context"
import { mockProducts } from "@/lib/mock-data"

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
          <ProductGrid products={mockProducts} onProductClick={(product) => setSelectedProduct(product)} />
        </main>
        <ShoppingBag isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </CartProvider>
  )
}

