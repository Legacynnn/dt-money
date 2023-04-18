import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { priceFormatter } from '../utils/formatter'
import { useSummary } from '../hooks/useSummary'

export function Summary() {
  const summary = useSummary()

  return (
    <section className="mx-auto mt-[-5rem] grid w-full max-w-6xl grid-cols-3 gap-4 px-6">
      <div className="rounded-md bg-gray-600 p-8">
        <header className="flex items-center justify-between text-gray-300">
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong className="mt-4 block text-4xl">
          {priceFormatter.format(summary.income)}
        </strong>
      </div>

      <div className="rounded-md bg-gray-600 p-8">
        <header className="flex items-center justify-between text-gray-300">
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong className="mt-4 block text-4xl">
          {priceFormatter.format(summary.outcome)}
        </strong>
      </div>

      <div className="rounded-md bg-green-700 p-8">
        <header className="flex items-center justify-between text-gray-300">
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong className="mt-4 block text-4xl">
          {priceFormatter.format(summary.total)}
        </strong>
      </div>
    </section>
  )
}
