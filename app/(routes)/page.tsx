"use client";

import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from 'axios'
import Admin from "@/components/Admin/Admin";
import Client from "@/components/Client/Client";
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../store/slices/authSlice/thunks'
import { RootState } from "@/store";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [userAuth, setUserAuth] = useState(null)
  const { userAuth } = useSelector((state: RootState) => state.auth)


  return (
    <div>
      {userAuth?.roleId == 1 && <Admin></Admin>}
      {userAuth?.roleId == 2 && <Client></Client>}
    </div>
  );
}
