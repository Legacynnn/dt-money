import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormType = z.infer<typeof newTransactionFormSchema>

export function TransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormType>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormType) {
    const { category, description, price, type } = data

    await createTransaction({
      category,
      description,
      price,
      type,
    })

    reset()
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 h-full w-full bg-[rgba(0,0,0,0.75)]" />
      <Dialog.Content
        className="fixed left-1/2 top-1/2 min-w-[32rem] 
        translate-x-[-50%] translate-y-[-50%] transform rounded bg-gray-800 px-10 py-12"
      >
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer text-gray-500">
          <X size={24} />
        </Dialog.Close>
        <Dialog.Title>Nova transação</Dialog.Title>
        <form
          onSubmit={handleSubmit(handleCreateNewTransaction)}
          className="mt-8 flex flex-col gap-4"
        >
          <input
            className="rounded-md border-0 bg-gray-900 p-4 text-gray-300 placeholder:text-gray-500"
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            className="rounded-md border-0 bg-gray-900 p-4 text-gray-300 placeholder:text-gray-500"
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            className="rounded-md border-0 bg-gray-900 p-4 text-gray-300 placeholder:text-gray-500"
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  onValueChange={field.onChange}
                  className="mt-2 grid grid-cols-2 gap-4 "
                >
                  <RadioGroup.Item
                    value="income"
                    className="flex cursor-pointer items-center justify-center gap-2 
                      rounded-md bg-gray-700 p-4 text-gray-100 radix-state-checked:bg-green-500
                    radix-state-checked:text-white"
                  >
                    <ArrowCircleUp size={24} />
                    Entrada
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value="outcome"
                    className="flex cursor-pointer items-center justify-center 
                      gap-2 rounded-md bg-gray-700 p-4 text-gray-100 radix-state-checked:bg-red-500
                    radix-state-checked:text-white"
                  >
                    <ArrowCircleDown size={24} />
                    Saída
                  </RadioGroup.Item>
                </RadioGroup.Root>
              )
            }}
          />

          <button
            className="mt-2 h-14 cursor-pointer border-0 bg-green-500 py-2 
            font-bold text-white transition-colors 
            hover:bg-green-700 disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            Cadastrar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
