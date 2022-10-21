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

interface TransactionContextType {
  transactions: TransactionsProps[]
  fetchTransactions: (query?: string) => Promise<void>
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
        q: query,
      },
    })

    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
