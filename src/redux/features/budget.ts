import { createSlice } from'@reduxjs/toolkit';
import { ExpenseData } from '../../constants/data';

export const totalSpentAmount = ExpenseData.reduce((acc, curr) => {
    return acc += curr.amountSpent;
},0)

const initialState = {
    budget : 40000
}

const budgetSlice = createSlice({
    name: "Budget",
    initialState,
    reducers: {
        setBudget : (state, action) => {
            state.budget = action.payload;
        }
    }
})

export default budgetSlice.reducer;
export const { setBudget } = budgetSlice.actions;