"use client";

import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { getBalance } from "@/store/slices/balanceSlice/thunks";
import { clearError } from "@/store/slices/balanceSlice";
import { useToast } from "../ui/use-toast";
import { RootState, AppDispatch } from '@/store'

const Client = () => {
    
    const dispatch = useDispatch<AppDispatch>()
    const { toast } = useToast();
    const { user, isLoaded, isSignedIn } = useUser(); // Hook de Clerk para obtener datos del usuario actual
    // const [balance, setBalance] = useState(2000);
    // const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const { error, status } = useSelector((state: RootState) => state.balance)
    const balance = useSelector((state: RootState) => state.balance.balance)
    // const { transactions } = balance 
    const { userAuth } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
      dispatch(getBalance(userAuth?.id))
    }, [dispatch])

    useEffect(() => {
      if (error) {
        toast({
          title: "Error",
          description: error,
          className: "bg-red-500 text-white",
        });
  
        // Limpiar error después de un tiempo
        setTimeout(() => dispatch(clearError()), 3000);
    }
    }, [error, toast, dispatch])
    
    return (
      <div className="space-y-6">
        {/* Balance Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Balance Disponible</h2>
            <Wallet className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex items-baseline">
            {!loading && <p className="text-sm text-gray-500">Cargando balance...</p>}
            {error && <p className="text-sm text-red-500">Error: {error}</p>}
            {balance !== null && (
              <p className="text-lg font-medium text-gray-800">
                ${parseFloat(balance.amount).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </p>
            )}
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+2.5% desde el último mes</span>
          </div>
          {/* <button onClick={()=>createUser()} className="bg-red-500">User</button> */}
        </div>
  
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Transacciones Recientes</h2>
          <div className="space-y-4">
            {!balance? (<p>LOADING....</p>):(
              <>
                {balance?.transactions.map((transaction: any) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {transaction.type === "deposito" ? (
                    <div className="p-2 bg-green-100 rounded-full">
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="p-2 bg-red-100 rounded-full">
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.type === "deposito" ? "Depósito" : "Retiro"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString("es-MX")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.type === "deposito" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "deposito" ? "+" : "-"}$
                    {parseFloat(transaction.amount).toLocaleString("es-MX", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  {/* <p className="text-sm text-gray-500 capitalize">{transaction.status}</p> */}
                </div>
              </div>
            ))}
              </>
            )}
            
          </div>
        </div>
      </div>
    );
}

export default Client