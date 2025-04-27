import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUserData = createAsyncThunk("user/fetchUserData" , async ()=>{
    const response = await fetch("/api/fetchUserData")
    if(response.ok){
        const userData = await response.json();
        return userData;
    }
})

const addIncomeTransactions = createAsyncThunk("user/addIncomeTransactions" , async (inputs : {source : string, amount : number, date : Date}) =>{
    try {
        const response = await fetch("/api/income" , {
          method : "POST",
          headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify(inputs)
        })
        if(response.ok){
            const data = await response.json();
            return data;
        }
      } catch (error) {
        return error
      }
})

const addExpenseTransactions = createAsyncThunk("user/addExpenseTransactions" , async (inputs : {category : string, amount : number, date : Date}) =>{
    try {
        const response = await fetch("/api/expense" , {
          method : "POST",
          headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify(inputs)
        })
        if(response.ok){
            const data = await response.json();
            return data;
        }
      } catch (error) {
        return error
      }
})

const deleteTransaction = createAsyncThunk("user/deleteTransaction" , async (storeSelectedItem : TransactionType | object)=>{
    try {
        const response = await fetch("/api/delete" , {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(storeSelectedItem)
        })
         if(response.ok){
            const data = await response.json();
            return data
         }
    } catch (error) {
        return error
    }
})

const updateTransaction = createAsyncThunk("user/updateTransaction" , async (updateValues : {
    sourceCat : string,
    amount : number,
    date : Date,
    _id : string,
    type: string
}) =>{
    try {
        const response = await fetch("/api/updateTransaction" , {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updateValues)
        })
         if(response.ok){
            const data = await response.json();
            return data
         }
    } catch (error) {
        return error
    }
})



const deleteIncome = createAsyncThunk("user/deleteIncome" , async (storeSelectedItem : IncomeType | null)=>{
    try {
        const response = await fetch("/api/deleteIncome" , {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(storeSelectedItem)
        })
         if(response.ok){
            const data = await response.json();
            return data
         }
    } catch (error) {
        return error
    }
})


const updateIncome = createAsyncThunk("user/updateIncome" , async (updateValues : {
    source : string,
    amount : number,
    date : Date,
    _id : string,
}) =>{
    try {
        const response = await fetch("/api/updateIncome" , {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updateValues)
        })
         if(response.ok){
            const data = await response.json();
            return data
         }
    } catch (error) {
        return error
    }
})

const deleteExpense = createAsyncThunk("user/deleteExpense" , async (storeSelectedItem : ExpenseType | null)=>{
    try {
        const response = await fetch("/api/deleteExpense" , {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(storeSelectedItem)
        })
         if(response.ok){
            const data = await response.json();
            return data
         }
    } catch (error) {
        return error
    }
})


const updateExpense = createAsyncThunk("user/updateExpense" , async (updateValues : {
    category : string,
    amount : number,
    date : Date,
    _id : string,
}) =>{
    try {
        const response = await fetch("/api/updateExpense" , {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updateValues)
        })
         if(response.ok){
            const data = await response.json();
            return data
         }
    } catch (error) {
        return error
    }
})


export type TransactionType = {
    _id: string;
    type: "Income" | "Expense";
    userID : string,
    income?: IncomeType,
    expense?: ExpenseType
  };
  

export type ExpenseType = {
    category : string,
    amount : number,
    date : Date,
    _id : string,
    transactionID : string
}

export type IncomeType = {
    source : string,
    amount : number,
    date : Date,
    _id : string,
    transactionID : string
}

export type EntireUserDataTypes = {
  income : IncomeType[],
  expense : ExpenseType[],
  transaction : TransactionType[]
}

type InitialStateType = {
    loading : boolean,
    error : string | null,
    entireUserData : EntireUserDataTypes,
}

const initialState : InitialStateType = {
    loading : false,
    error : null,
    entireUserData : {
        income : [],
        expense : [],
        transaction : []
    }
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {},

    extraReducers(builder) {
        builder.addCase(fetchUserData.pending , (state)=>{
            state.loading = true;
        }).addCase(fetchUserData.fulfilled , (state , action)=>{
            state.loading = false;
            state.entireUserData = action.payload;
        }).addCase(fetchUserData.rejected , (state)=>{
            state.error = "Error. Could not be added.....";
        })
    },
})

export default userSlice.reducer
export {addIncomeTransactions , addExpenseTransactions ,fetchUserData , deleteTransaction, updateTransaction , deleteIncome , updateIncome , deleteExpense , updateExpense}