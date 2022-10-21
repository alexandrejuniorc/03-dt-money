import React, { useEffect, useState } from 'react'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

interface TransactionsProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  created_at: string
}

export const Transactions = () => {
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
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>
                    {transaction.price}
                  </PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.created_at}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
