import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { totalSpentAmount } from "../redux/features/budget";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/expense-dispatch";
import { fetchExpensesList } from "../redux/features/expenses";
import { Expense } from "../constants/data";
import { RootState } from "../redux/app/store";

function Balance() {
  const plannedBudget = useSelector((state: RootState) => state.budget.budget);
  const expenseList = useSelector(
    (state: RootState) => state.expense.expenseList
  );

  const getBalanceAmount = useCallback(() => {
    let totalSpentAmount: number = 0;
    const amountSpent: number[] = expenseList.map((expense: Expense) =>
      Number(expense.amountSpent)
    );
    totalSpentAmount = amountSpent.reduce(
      (acc: number, curr: number) => (acc += curr),
      0
    );
    const calculatedBalance = plannedBudget - totalSpentAmount;
    return calculatedBalance;
  }, [expenseList, plannedBudget]);

  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(fetchExpensesList());
  }, [plannedBudget, appDispatch]);

  return (
    <Box style={{ margin: "24px 0" }}>
      <Typography style={{ color: "#fff", textAlign: "center" }} variant="h4">
        <span style={{ marginRight: "16px" }}>Balance:</span>
        {getBalanceAmount()}
      </Typography>
      {getBalanceAmount() < 0 ? (
        <Typography
          style={{ color: "#fff", textAlign: "center", margin: "8px 0" }}
        >{`You have spent Rs.${Math.abs(
          getBalanceAmount()
        )} more than the planned Budget.`}</Typography>
      ) : null}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "24px 0",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate("/view");
          }}
        >
          VIEW EXPENSES
        </Button>
      </Box>
    </Box>
  );
}

export default Balance;
