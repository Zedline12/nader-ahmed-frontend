"use client";

import { useCart } from "@/lib/context/CartContext";
import CartItemRow from "@/features/cart/components/CartItemRow";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, isLoading, clearCart } =
    useCart();

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (isLoading && !cart) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-xl text-gray-400 animate-pulse">
          Loading your cart...
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 mb-6">
            <ShoppingBag size={48} className="text-gray-300" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
            Looks like you haven't added anything yet. Explore our products and
            courses to find something you love.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all"
          >
            Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-10">
          Shopping Cart
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-100">
                  {cart.items.map((item) => (
                    <li key={item.id} className="py-6">
                      <CartItemRow
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <section className="mt-16 rounded-2xl bg-white shadow-sm border border-gray-100 lg:col-span-5 lg:mt-0 p-6 sm:p-8 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Subtotal
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {formatPrice(cart.totalPrice)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Shipping estimate
                </dt>
                <dd className="text-base font-medium text-gray-500">
                  Calculated at checkout
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-bold text-gray-900">Total</dt>
                <dd className="text-base font-bold text-indigo-600 text-xl">
                  {formatPrice(cart.totalPrice)}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <button
                type="button"
                className="w-full flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5"
              >
                Checkout
              </button>
              <div className="mt-4 text-center">
                <Link
                  href="/"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
