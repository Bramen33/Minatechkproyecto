"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../store/slices/userSlice/thunks'
import { Wallet } from 'lucide-react'
import { useTheme } from 'next-themes'
import ModalWallet from '@/app/(routes)/components/ModalWallet/ModalWallet'
import { useToast } from '../ui/use-toast';
import { clearError, clearStatus } from '@/store/slices/userSlice';
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { RootState, AppDispatch } from '@/store'

const Admin = () => {
    // const [users, setUsers] = useState([])
    const dispatch = useDispatch<AppDispatch>()
    const { toast } = useToast();
    const { users, error, status } = useSelector((state: RootState) => state.users)
    const { userAuth } = useSelector((state: RootState) => state.auth)
    const { theme } = useTheme()

    // const getAllUsers = async () => {
    //     const res = await axios.get('/api/users')
    //     console.log('ALL USERS ', res);
    //     setUsers(res.data)
    // }

    const [search, setSearch] = useState("");

    // Filtrado de usuarios por ID, Nombre o Correo

    useEffect(() => {
       dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        if (error) {
          toast({
            title: "Error",
            description: error,
            className: "bg-red-500 text-white",
          });
    
          // Limpiar error después de un tiempo
          setTimeout(() => {
            dispatch(clearError())
            dispatch(clearStatus())
          }, 3000);
      }
      }, [error, toast, dispatch, status])

      const filteredUsers = users.filter((user:any) => {
        return (
          user.id === Number(search) 
          || user.name.toLowerCase().includes(search.toLowerCase()))
          || user.email.toLowerCase().startsWith(search.toLowerCase())
    });
    
  return (
    <div className="space-y-6">
        <div className='px-6 py-4 flex flex-col w-full'>
            <h3 className='text-center mb-8 text-2xl font-bold'>Usuarios</h3>
            <input
                type="text"
                placeholder="Filtrar por ID, Nombre o Correo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-1/2 p-2 ml-auto mb-3 border-b-[1px] border-gray-600 dark:border-white bg-transparent focus:outline-none"
            />
            <div className='border rounded-md border-gray-600 dark:border-gray-100 py-4 px-4 overflow-x-auto w-full'>
                <table className="table-auto min-w-[700px] md:w-full">
                    <thead className='border-b border-gray-600 dark:border-gray-100'>
                        <tr>
                            <th className='text-left pr-2'>Id</th>
                            <th className='text-left'>Nombre</th>
                            <th className='text-left'>Email</th>
                            <th className='text-left pr-2'>Balance</th>
                            <th className='text-left'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers?.map((item:any) => (
                            <tr key={item.id}>
                                <td className='pt-2'>{item.id}</td>
                                <td className='pt-2'>{item.name}</td>
                                <td className='pt-2 pr-2'>{item.email}</td>
                                <td className='pt-2'>{item.balance.amount}</td>
                                <td className='pt-2 pl-2'>
                                    <ModalWallet balanceId={item.balance.id} balance={item.balance.amount}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {status == 'loading' &&
                <div className='w-full flex justify-center items-center'>
                    <ArrowPathIcon className="h-8 w-8 animate-spin text-white mt-2" />
                </div>}
                {filteredUsers.length == 0 && status != 'loading' && 
                <div className='w-full flex justify-center mt-2'>
                    <h1>NO HAY RESULTADOS</h1>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default Admin