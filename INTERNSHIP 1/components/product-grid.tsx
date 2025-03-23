"use client"

import ProductCard from "./product-card"

type ProductGridProps = {
  products: any[]
  onProductClick: (product: any) => void
}

export default function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
      ))}
    </div>
  )
}

