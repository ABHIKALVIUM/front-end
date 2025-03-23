"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "./cart-context"

type NavbarProps = {
  onCartClick: () => void
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const { getTotalItems } = useCart()
  const itemCount = getTotalItems()

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">StyleShop</h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About
              </a>
            </li>
            <li>
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-600 hover:text-gray-900"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

