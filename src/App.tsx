import { TransactionsProvider } from './contexts/TransactionsContext'
import { Transactions } from './pages/Transactions'

function App() {
  return (
    <div className="App">
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </div>
  )
}

export default App
