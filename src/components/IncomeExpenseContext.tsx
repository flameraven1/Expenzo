import { ExpenseType, IncomeType } from '@/lib/features/userSlice';
import { useAppSelector } from '@/lib/hook';
import { RootState } from '@/lib/store';
import React, {ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

type ContextType = {
  totalIncome : number,
  totalExpense : number, 
  setTotalIncome : (totalIncome : number)=>void,
  setTotalExpense : (totalExpense : number)=>void, 
}

type ProviderProps = {
  children: ReactNode;
};

const IncomeExpenseContext = createContext<ContextType | null>(null)

export const IncomeExpenseProvider = ({children} : ProviderProps) => {
  const {income , expense} = useAppSelector((state : RootState)=>state.user.entireUserData)
  const [totalIncome , setTotalIncome] = useState<number>(0);
  const [totalExpense , setTotalExpense] = useState<number>(0);

  useEffect(()=>{
    if(!income && !expense){
      return
    }else{
      let total = income.reduce((acc , item : IncomeType)=> Number(item.amount) + acc , 0) 
      setTotalIncome(total)
      
      let totalEx = expense.reduce((acc , item : ExpenseType)=> Number(item.amount) + acc , 0) 
      setTotalExpense(totalEx)
    }
  } , [income , expense])

  return (
    <IncomeExpenseContext.Provider value={{totalExpense , totalIncome , setTotalExpense , setTotalIncome}}>
      {children}
    </IncomeExpenseContext.Provider>
  )
}

export const userIncomeExpenseContext = () =>{
  const context = useContext(IncomeExpenseContext)
  if (!context) throw new Error("useUserData must be used within a UserDataProvider");
  return context; 
}

