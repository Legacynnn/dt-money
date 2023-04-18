import { MagnifyingGlass } from 'phosphor-react'
import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = z.object({
  query: z.string(),
})

type searchFormType = z.infer<typeof searchFormSchema>

function SearchBarComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<searchFormType>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransaction(data: searchFormType) {
    await fetchTransactions(data.query)
  }

  return (
    <form
      className="flex gap-4"
      onSubmit={handleSubmit(handleSearchTransaction)}
    >
      <input
        className="flex-1 rounded-md bg-gray-900 p-4 text-gray-300 
        placeholder:text-gray-500"
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button
        type="submit"
        className="flex items-center gap-3 rounded-md border  border-solid
        border-green-300 bg-transparent p-4 font-bold text-green-300  
        transition-colors hover:border-green-500 hover:bg-green-500 
        hover:text-white disabled:opacity-70"
        disabled={isSubmitting}
      >
        <MagnifyingGlass size={20} /> Buscar
      </button>
    </form>
  )
}

export const SearchBar = memo(SearchBarComponent)
