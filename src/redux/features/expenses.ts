import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { ExpenseData } from "../../constants/data";
import { ExpenseService } from "../../api/service";
import {  Expense } from "../../constants/data";

export interface ExpenseItem {
        createdAt: string
        name: string,
        avatar: string,
        category: string,
        amountSpent: number,
        date: string,
        id: string
}

const initialExpenseList: Array<ExpenseItem> = [];

const initialState = {
    expenseList: initialExpenseList,
    expenseItem: {},
    newListItem: {}
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

export const addExpenseData = createAsyncThunk("Expense/add",async(data: Expense) => {
    return  await ExpenseService.addExpense(data).then((response) => {
        return response;
    })
})

export const updateExpense = createAsyncThunk("Expense/update",async(data: Expense) => {
    if(data.id){
        return  await ExpenseService.updateExpense(data.id,data).then((response) => {
            return response;
        })
    } 
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
        resetNewExpenseItem: (state) => {
            state.newListItem = {};
        }
    },
    extraReducers: (builder) => {

        //1. fetch all lists
        builder.addCase(fetchExpensesList.pending, (state, action) => {
            //console.log(action)
            state.expenseList = [];
        })
        builder.addCase(fetchExpensesList.fulfilled, (state, action) => {
            //console.log(action)
            state.expenseList = action.payload;
            //console.log(current(state))
        })
        builder.addCase(fetchExpensesList.rejected, (state, action) => {
            //console.log(action)
            state.expenseList = [];
        })

        //2. fetch list using id
        builder.addCase(fetchExpenseData.pending, (state, action) => {
            //console.log(action)
            state.expenseItem = {};
        })
        builder.addCase(fetchExpenseData.fulfilled, (state, action) => {
            //console.log(action)
            state.expenseItem = action.payload;
            //console.log(current(state))
        })
        builder.addCase(fetchExpenseData.rejected, (state, action) => {
            //console.log(action)
            state.expenseItem = {};
        })

        //3. add new listitem
        builder.addCase(addExpenseData.pending, (state, action) => {
            //console.log(action)
            state.newListItem = {};
        })
        builder.addCase(addExpenseData.fulfilled, (state, action) => {
            //console.log(action)
            state.newListItem = action.payload;
            //console.log(current(state));
            state.expenseList.push(action.payload);
        })
        builder.addCase(addExpenseData.rejected, (state, action) => {
            //console.log(action)
            state.newListItem = {};
        })


        //4. update existing item

        // builder.addCase(updateExpense.pending, (state, action) => {
        //     //console.log(action)
        //     state.newListItem = {};
        // })
        builder.addCase(updateExpense.fulfilled, (state, action) => {
            //console.log(action)

            if(state.expenseList.length > 0){
                    let existingItem = state.expenseList.find((item:any) => item.id === action.payload.id);
                    if(existingItem){
                        existingItem.id = action.payload.id;
                        existingItem.category = action.payload.category;
                        existingItem.amountSpent = action.payload.amountSpent;
                        existingItem.date = action.payload.date;
                        existingItem.avatar =  action.payload.avatar;
                        existingItem.createdAt =  action.payload.createdAt;
                        existingItem.name =  action.payload.name;
                    }
                }
            //state.expenseList[action.payload.id] = action.payload;
        })
        // builder.addCase(updateExpense.rejected, (state, action) => {
        //     //console.log(action)
        //     state.newListItem = {};
        // })

    }
})


export default ExpenseSlice.reducer;
export const { resetNewExpenseItem } = ExpenseSlice.actions;