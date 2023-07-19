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

export const ExpenseService = { getExpenses, getExpense };