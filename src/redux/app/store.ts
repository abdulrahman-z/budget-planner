import { configureStore } from '@reduxjs/toolkit';
import expenses from '../features/expenses';
import budget from '../features/budget';

const store  = configureStore({
    reducer : {
        expense: expenses,
        budget: budget
    }
})

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;