import { createAsyncThunk, createSlice } from'@reduxjs/toolkit';
import { ExpenseService } from '../../api/service';
//import { ExpenseData } from '../../constants/data';

export const getBudget = createAsyncThunk('Budget/getBudget', async(id: string) => {
    return await ExpenseService.getBudget(id).then((response) => {
        return response;
    });
})

export const setBudget = createAsyncThunk('Budget/setBudget', async(budget:{id:string,name:string, budget: number}) => {
    return await ExpenseService.setBudget(budget).then((response) => {
        return response;
    });
})

export const userLoggedIn = createAsyncThunk('Budget/getLoginStatus', async(userId: string) => {
    return await ExpenseService.getLoginStatus(userId).then((response) => {
        return response;
    });
})

const initialState = {
    budget : 0,
    loggedIn: false,
    id:""
}

const budgetSlice = createSlice({
    name: "Budget",
    initialState,
    reducers: {
        logOut: (state) => {
            state.loggedIn = false;
            state.id = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBudget.pending, (state, action) => {
            state.budget = 0
        })
        builder.addCase(getBudget.fulfilled, (state, action) => {
            state.budget = action.payload.budget;
        })

        //set
        builder.addCase(setBudget.fulfilled, (state, action) => {
            //console.log(action)
            state.budget = action.payload.budget;
        })


        //loggedin
        builder.addCase(userLoggedIn.fulfilled, (state, action) => {
            //console.log(action)
            state.loggedIn = true;
            state.id = action.payload.id;
        })

        builder.addCase(userLoggedIn.pending, (state, action) => {
            //console.log(action)
            state.loggedIn = false;
        })
        builder.addCase(userLoggedIn.rejected, (state, action) => {
            //console.log(action)
            state.loggedIn = false;
            state.id = action.error.message || "Error Occurred !"
        })
        
    }
})

export default budgetSlice.reducer;
export const { logOut } = budgetSlice.actions;