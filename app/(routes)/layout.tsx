"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../store/slices/authSlice/thunks'
import { useUser } from "@clerk/nextjs";
import { clearError, setUser } from "@/store/slices/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { RootState, AppDispatch } from '@/store'

export default function LayoutDashboard({ children }: { children: React.ReactElement }) {

    const dispatch = useDispatch<AppDispatch>()
    const { userAuth, error, status } = useSelector((state: RootState) => state.auth)
    const { user } = useUser(); // Hook de Clerk para obtener datos del usuario actual
    const { toast } = useToast();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser? JSON.parse(storedUser) : null
        dispatch(setUser(parsedUser))

        dispatch(getUser(String(user?.id)))
        
    }, [user, dispatch]);

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
        // dispatch(getUser("user_2sX8sgANRzG6HRP0A5AZ6zYgGQk"))
    }, [error, dispatch, toast]);
    
    return (
        <div className="flex w-full h-full">
            <div className="hidden xl:block w-80 h-full xl:fixed">
                <Sidebar role={userAuth?.roleId}/>
            </div>
            <div className="w-full xl:ml-80 h-full">
                <Navbar role={userAuth?.roleId}/>
                <div className="p-6 bg-[#fafbfc] min-h-[91.4%] dark:bg-secondary relative">
                    {children}
                </div>
            </div>
        </div>
    )
}
