import { Expense } from "../constants/data";
//import { ExpenseItem } from "../redux/features/expenses";
import { apiConfigs } from "./apiConfig";
import request from "./axiosConfig";

const getExpenses = () => {
    return request({
      url: apiConfigs.routes.getExpenses,
      method: "GET",
    });
};

const getExpense = (id:string) => {
    return request({
      url: apiConfigs.routes.getExpenses+`/${id}`,
      method: "GET",
    });
};

const addExpense = (data:Expense) => {
  return request({
    url: apiConfigs.routes.getExpenses,
    method: "POST",
    data: data
  });
};

const updateExpense = (id:string,data:Expense) => {
  return request({
    url: apiConfigs.routes.getExpenses+`/${id}`,
    method: "PUT",
    data: data
  });
};

const deleteExpense = (id:string) => {
  return request({
    url: apiConfigs.routes.getExpenses+`/${id}`,
    method: "DELETE",
  });
};


//budget


const getBudget = (id: string) => {
  return request({
    url: apiConfigs.routes.getBudget+`/${id}`,
    method: "GET",
  });
}

const setBudget = (budget: {id: string, name: string, budget: number}) => {
  return request({
    url: apiConfigs.routes.getBudget+`/${budget.id}`,
    method: "PUT",
    data: budget
  });
}

const getLoginStatus =(id: string) => {
  return request({
    url: apiConfigs.routes.getBudget+`/${id}`,
    method: "GET",
  });
}

export const ExpenseService = { getExpenses, getExpense, addExpense, updateExpense, deleteExpense, getBudget, setBudget, getLoginStatus };