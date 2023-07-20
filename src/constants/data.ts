import Category from "../redux/constants";

export const API_URL = `https://64b8449f21b9aa6eb079bb16.mockapi.io`;

export interface Expense {
    id?: string;
    category: string;
    amountSpent: number;
    date: string;
    createdAt?: string;
    name?: string;
    avatar?:string;
}

export const ExpenseData = [
    {
        id: 1,
        category: Category.BILLS,
        date: "15/07/2023",
        amountSpent: 15000
    },
    {
        id: 2,
        category: Category.RENT,
        date: "16/07/2023",
        amountSpent: 8000
    },
    {
        id: 3,
        category: Category.ENTERTAINMENT,
        date: "17/07/2023",
        amountSpent: 1000
    },
    {
        id: 4,
        category: Category.FUEL,
        date: "18/07/2023",
        amountSpent: 1000
    },
    {
        id: 5,
        category: Category.FOOD,
        date: "19/07/2023",
        amountSpent: 5000
    },
    {
        id: 6,
        category: Category.MEDICAL,
        date: "10/07/2023",
        amountSpent: 5000
    },
    {
        id: 7,
        category: Category.SHOPPING,
        date: "05/07/2023",
        amountSpent: 9000
    },
    {
        id: 8,
        category: Category.OTHERS,
        date: "08/07/2023",
        amountSpent: 300
    },
]