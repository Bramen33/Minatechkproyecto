"use client";

import { Wallet } from "lucide-react";
import React, { useState, createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from '../../../../store/slices/balanceSlice/thunks'
import { useToast } from "@/components/ui/use-toast";
import { clearError, clearStatus } from "@/store/slices/balanceSlice";
import { RootState, AppDispatch } from '@/store'

interface ModalWalletProps {
  balanceId: number;
  balance: number;
}

const ModalWallet: React.FC<ModalWalletProps> = ({ balanceId, balance }) => {

    const { toast } = useToast();
    const [open, setOpen] = useState(false)
    const [transaction, setTransaction] = useState(0)
    const [amount, setAmount] = useState('')
    const [confirmAmount, setConfirmAmount] = useState('')

    const dispatch = useDispatch<AppDispatch>()
    const userAuth = useSelector((state: RootState)=> state.auth.userAuth)
    const {error, status} = useSelector((state: RootState)=> state.balance)

    useEffect(() => {
        if (error) {
          toast({
            title: "Error",
            description: error,
            className: "bg-red-500 text-white",
          });
    
          // Limpiar error después de un tiempo
          setTimeout(() => dispatch(clearError()), 3000);
        }

        
    }, [error, toast, dispatch])

    useEffect(() => {
      if(status == 'succeeded'){
        toast({
          title: "Éxito",
          description: 'Transacción exitosa',
          className: "bg-green-500 text-white",
        });
        
        setTimeout(() => {
          dispatch(clearStatus())
          handleClose()
        }, 500);
      }
  }, [status])

    const handleTransaction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let newBalance = 0
        if (transaction == 0 || amount == '' || confirmAmount == '') {
            toast({
                title: "Error",
                description: "Todos los campos son obligatorios.",
                className:'bg-red-500'
              })
            return
        }


        if(amount != confirmAmount){
            toast({
                title: "Error",
                description: "Los montos no coinciden.",
                className:'bg-red-500'
              })
              return
        }
        
        if (transaction == 1) {
            
            newBalance = Number(balance)+Number(amount)
        } else {
            newBalance = Number(balance)-Number(amount)
            
            if(newBalance < 0){
                toast({
                    title: "Error",
                    description: "El balance no puede ser negativo.",
                    className:'bg-red-500'
                  })
                  return 
            }
        }

      if (Number(amount) == 0 || Number(confirmAmount) == 0) {
          toast({
              title: "Error",
              description: "Los montos no pueden ser cero",
              className:'bg-red-500'
            })
          return
      }

      dispatch(updateBalance({id:balanceId, balance: newBalance, amount: Number(amount), type: transaction==1? 'deposito':'retiro'}))

        // if(status == 'succeeded'){
        //   console.log('fesgewshsrthrthhtr');
          
        //   setTimeout(() => {
        //     handleClose()  
        //   }, 500);
        // }
    }
//   useEffect(() => {
//     if (photo) {
//       setConsolidationPhotos({
//         titleComment: photo.titleComment || "",
//         description: photo.description || "",
//         problem: photo.problem || false,
//         image: photo.image || null,
//         ref: createRef(),
//         expanded: false,
//         loading: false
//       });
//     }
//   }, [photo]);

    const handleClose = () => {
        setTransaction(0)
        setAmount('')
        setConfirmAmount('')
        setOpen(false)
    }

  return (
    <React.Fragment>
      <button
        type="button"
        className=""
        onClick={()=>setOpen(!open)}
      >
        <Wallet className="h-5 w-5 mr-2 text-green-400" />
      </button>
      {open &&
      <div className="bg-black/50 z-20 fixed inset-0 flex justify-center">
        <div className="top-13 z-20 w-[280px] min-h-[300px] max-h-[300px] bg-white rounded-md mt-[200px]">
            <form className="p-6 flex flex-col gap-3" onSubmit={handleTransaction}>
                <h1 className="text-black text-center mb-2">Depositar/Retirar</h1>
                <div className="flex flex-col gap-1">
                    {/* <label htmlFor="" className="text-black">Tipo</label> */}
                    <select value={transaction} name="" id="" className="bg-white text-black border border-gray h-[40px] rounded-md pl-2" onChange={(e)=>setTransaction(parseInt(e.target.value))}>
                    <option value={0} disabled>Tipo de transacción</option>
                    <option value={1}>Depósito</option>
                    <option value={2}>Retiro</option>
                </select>
                </div>
                <div className="flex flex-col">
                    <input type="number" placeholder="Monto" value={amount} className="bg-white text-black border border-gray h-[40px] rounded-md pl-2" onChange={(e)=>setAmount(e.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <input type="number" placeholder="Confirmar monto" value={confirmAmount} className="bg-white text-black border border-gray h-[40px] rounded-md pl-2" onChange={(e)=>setConfirmAmount(e.target.value)}/>
                </div>
                <div className="flex flex-row justify-end gap-2 mt-4">
                    <button type="submit" className="bg-secondary border rounded-md text-white font-bold px-2 h-[30px]">Confirmar</button>
                    <button type="button" className="bg-white border border-secondary rounded-md text-secondary font-bold px-2 h-[30px]" onClick={handleClose}>Cancelar</button>
                </div>
            </form>
        </div>
      </div>
        }
    </React.Fragment>
  );
};

export default ModalWallet;