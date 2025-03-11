import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { X } from 'lucide-react';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import emailjs from '@emailjs/browser';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
}

interface FormData {
  amount: string;
  country: string;
  method: string;
  bankDetails?: string;
}

export function TransactionModal({ isOpen, onClose, type }: TransactionModalProps) {
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    amount: '',
    country: '',
    method: '',
    bankDetails: '',
  });

  // Inicializar EmailJS con la Public Key directamente
  useEffect(() => {
    emailjs.init('YmmUb1mBnHCro0OWp'); // Usamos tu Public Key
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please sign in to submit a request',
      });
      return;
    }
    
    try {
      const templateParams = {
        from_name: user.fullName,
        user_name: user.fullName,
        user_email: user.primaryEmailAddress?.emailAddress,
        transaction_type: type,
        amount: formData.amount,
        country: formData.country,
        method: formData.method,
        bank_details: formData.bankDetails || 'N/A',
      };

      const response = await emailjs.send(
        'service_jzkpagi',  // Service ID
        'template_4ziotqw', // Template ID
        templateParams
      );

      if (response.status === 200) {
        // Configuración del modal de éxito
        const transactionTypeMessage = type === 'deposit' ? 'Deposit' : 'Withdrawal';
        Swal.fire({
          icon: 'success',
          title: `${transactionTypeMessage} Confirmation`,
          text: `Your ${transactionTypeMessage.toLowerCase()} request has been successfully submitted!`,
          confirmButtonColor: '#4CAF50', // Fondo verde de éxito
        });

        // Resetear formulario
        setFormData({
          amount: '',
          country: '',
          method: '',
          bankDetails: '',
        });

        setTimeout(() => {
          onClose();
        }, 2000); // Espera 2 segundos para cerrar el modal
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to submit request. Please try again.',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 max-w-md w-full mx-4 rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {type === 'deposit' ? 'Deposit Request' : 'Withdrawal Request'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Country</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" className="bg-gray-700">Select country</option>
              <option value="chile" className="bg-gray-700">Chile</option>
              <option value="peru" className="bg-gray-700">Peru</option>
              <option value="mexico" className="bg-gray-700">Mexico</option>
            </select>
          </div>

          {type === 'deposit' ? (
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Payment Method</label>
              <select
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" className="bg-gray-700">Select method</option>
                <option value="card" className="bg-gray-700">Debit/Credit Card</option>
                <option value="btc" className="bg-gray-700">Bitcoin (BTC)</option>
                <option value="usdt" className="bg-gray-700">USDT</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Bank Account Details</label>
              <textarea
                value={formData.bankDetails}
                onChange={(e) => setFormData({ ...formData, bankDetails: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Confirm {type === 'deposit' ? 'Deposit' : 'Withdrawal'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
