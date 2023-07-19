import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { ExpenseData } from "../../constants/data";
import { ExpenseService } from "../../api/service";

const initialState = {
    expenseList: [],
    expenseItem: {}
}


export const fetchExpensesList = createAsyncThunk("Expense/getData",async() => {
    return  await ExpenseService.getExpenses().then((response) => {
        return response;
    })
})

export const fetchExpenseData = createAsyncThunk("Expense/getDataFromId",async(id: string) => {
    return  await ExpenseService.getExpense(id).then((response) => {
        return response;
    })
})



const ExpenseSlice = createSlice({
    name: "Expense",
    initialState,
    reducers:{
        // remove : (state, action) => {
        //     //state.expenseList = state.expenseList.filter((listItem: any) => listItem.id !== action.payload.id)
        // },
        // update : (state, action) => {
        //     if(state.expenseList.length > 0){
        //     let existingItem = state.expenseList.find((item:any) => item.id === action.payload.id);
        //     // if(existingItem){
        //     //     existingItem.id = action.payload.id;
        //     //     existingItem.category = action.payload.category;
        //     //     existingItem.amountSpent = action.payload.amountSpent;
        //     //     existingItem.date = action.payload.date;
        //     // }
        //  }
        //     //console.log(current(state));
        // },
        // addItem : (state, action) => {
        //     state.expenseList.push(action.payload);
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExpensesList.pending, (state, action) => {
            //console.log(action)
            state.expenseList = []
        })
        builder.addCase(fetchExpensesList.fulfilled, (state, action) => {
            //console.log(action)
            state.expenseList = action.payload
            //console.log(current(state))
        })
        builder.addCase(fetchExpensesList.rejected, (state, action) => {
            //console.log(action)
            state.expenseList = []
        })

        builder.addCase(fetchExpenseData.pending, (state, action) => {
            //console.log(action)
            state.expenseItem = {}
        })
        builder.addCase(fetchExpenseData.fulfilled, (state, action) => {
            //console.log(action)
            state.expenseItem = action.payload
            //console.log(current(state))
        })
        builder.addCase(fetchExpenseData.rejected, (state, action) => {
            //console.log(action)
            state.expenseItem = {}
        })
    }
})


export default ExpenseSlice.reducer;
//export const { remove, update, addItem } = ExpenseSlice.actions;