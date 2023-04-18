import React from 'react'
import logo from '../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { TransactionModal } from './TransactionModal'

export function Header() {
  return (
    <header className="bg-gray-900 pb-28 pt-10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <img src={logo} alt="" />

        <Dialog.Root>
          <Dialog.Trigger
            className="h-12 cursor-pointer rounded-md bg-green-500 px-5 
          font-bold text-white transition duration-500 hover:bg-green-700"
          >
            Nova transação
          </Dialog.Trigger>
          <TransactionModal />
        </Dialog.Root>
      </div>
    </header>
  )
}
