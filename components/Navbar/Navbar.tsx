"use client"
import React, { useState } from 'react';
import { Wallet, CreditCard, Menu, X } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ToggleTheme } from "@/components/ToggleTheme";
import { SidebarRoutes } from "../SidebarRoutes";
import { TransactionModal } from './TransactionModal';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    return (
        <nav className="flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
            <div className="block xl:hidden">
                <Sheet>
                    <SheetTrigger className="flex items-center">
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SidebarRoutes />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden md:flex items-center gap-x-2">
                <button
                    onClick={() => setIsDepositModalOpen(true)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                >
                    <Wallet className="h-4 w-4 mr-2" />
                    Deposit
                </button>
                <button 
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Withdraw
                </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                    {isMenuOpen ? (
                        <X className="block h-6 w-6" />
                    ) : (
                        <Menu className="block h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-background z-50">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button
                            onClick={() => {
                                setIsDepositModalOpen(true);
                                setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"                          >
                            <Wallet className="h-4 w-4 mr-2" />
                            Deposit
                        </button>
                        <button 
                            onClick={() => {
                                setIsWithdrawModalOpen(true);
                                setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                        >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Withdraw
                        </button>
                    </div>
                </div>
            )}

            {/* Transaction Modals */}
            <TransactionModal
                isOpen={isDepositModalOpen}
                onClose={() => setIsDepositModalOpen(false)}
                type="deposit"
            />
            <TransactionModal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                type="withdraw"
            />

            {/* Buttons and Theme toggle */}
            <div className="flex items-center gap-x-4">
                <ToggleTheme />
                <UserButton afterSignOutUrl='/' />
            </div>
        </nav>
    );
}
