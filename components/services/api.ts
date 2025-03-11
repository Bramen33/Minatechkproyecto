import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'https://your-hostinger-api.com';

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'crypto' | 'bank' | 'manual';
  details: {
    cryptoAddress?: string;
    bankInfo?: {
      accountHolder: string;
      bankName: string;
      accountNumber: string;
      country: string;
    };
    notes?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const api = {
  async getTransactions(userId: string): Promise<Transaction[]> {
    const response = await axios.get(`${API_BASE_URL}/transactions/${userId}`);
    return response.data;
  },

  async createTransaction(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    const response = await axios.post(`${API_BASE_URL}/transactions`, data);
    return response.data;
  },

  async updateTransactionStatus(transactionId: string, status: Transaction['status']): Promise<Transaction> {
    const response = await axios.patch(`${API_BASE_URL}/transactions/${transactionId}`, { status });
    return response.data;
  },

  async updateUserBalance(userId: string, amount: number): Promise<{ balance: number }> {
    const response = await axios.post(`${API_BASE_URL}/users/${userId}/balance`, { amount });
    return response.data;
  }
};