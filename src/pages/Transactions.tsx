import React from 'react'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { Summary } from '../components/Summary'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../utils/formatter'

export interface TransactionsProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <>
      <Header />
      <Summary />

      <main className="mx-auto mb-0 mt-4 w-full max-w-[1120px] py-6">
        <SearchBar />
        <table className="mt-4 w-full border-separate border-spacing-y-2">
          <tbody className="">
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td
                    width="40%"
                    className="rounded-bl-md rounded-tl-md bg-gray-700 px-7 py-6"
                  >
                    {transaction.description}
                  </td>
                  <td
                    className={
                      transaction.type === 'income'
                        ? 'bg-gray-700 px-7 py-6 text-green-500'
                        : 'bg-gray-700 px-7 py-6 text-red-500'
                    }
                  >
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </td>
                  <td className="bg-gray-700 px-7 py-6">
                    {transaction.category}
                  </td>
                  <td className="rounded-br-md rounded-tr-md bg-gray-700 px-7 py-6">
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    </>
  )
}
