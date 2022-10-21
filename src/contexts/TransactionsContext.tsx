import { createContext, ReactNode, useEffect, useState } from 'react'

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

  const loadTransactions = async () => {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
