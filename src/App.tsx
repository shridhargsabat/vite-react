import React, { useState } from 'react';
import './App.css';

interface Transaction {
  id: number;
  amount: number;
  description: string;
  category: string;
}

const categories = ['Food', 'Transport', 'Housing', 'Entertainment', 'Savings', 'Other'];

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && description) {
      setTransactions(prevTransactions => [
        ...prevTransactions,
        {
          id: Date.now(),
          amount: parseFloat(amount),
          description: description,
          category: category
        }
      ]);
      setDescription('');
      setAmount('');
      setCategory(categories[0]);
    }
  };

  const removeTransaction = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const calculateBalance = () => {
    return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  return (
    <div className="App">
      <h1>Budget Tracker</h1>
      <form onSubmit={addTransaction}>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          required 
        />
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount" 
          step="0.01" 
          required 
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add Transaction</button>
      </form>
      <div className="balance">
        <h2>Current Balance: ${calculateBalance().toFixed(2)}</h2>
      </div>
      <ul className="transactions">
        {transactions.map(transaction => (
          <li key={transaction.id} className="transaction">
            <span>{transaction.description}</span> 
            <span>${transaction.amount.toFixed(2)}</span>
            <span>({transaction.category})</span>
            <button onClick={() => removeTransaction(transaction.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;