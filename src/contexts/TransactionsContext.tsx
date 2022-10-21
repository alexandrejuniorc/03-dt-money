import { createContext, ReactNode, useEffect, useState } from 'react'

import { api } from '../lib/axios'

interface TransactionsProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  created_at: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: TransactionsProps[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsChildrenProps {
  children: ReactNode
}

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
)

export const TransactionsProvider = ({
  children,
}: TransactionsChildrenProps) => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])

  const fetchTransactions = async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'created_at',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }

  const createTransaction = async (data: CreateTransactionInput) => {
    const { description, price, category, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      created_at: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
