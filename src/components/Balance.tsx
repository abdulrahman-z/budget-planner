import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { totalSpentAmount } from "../redux/features/budget";
import { useSelector } from "react-redux";

function Balance() {
  const plannedBudget = useSelector((state: any) => state.budget.budget);

  const getBalanceAmount = () => {
    const calculatedBalance = plannedBudget - totalSpentAmount;
    return calculatedBalance;
  };

  const [availableBalance, setAvailableBalance] = useState(getBalanceAmount());

  const navigate = useNavigate();

  return (
    <Box style={{ margin: "24px 0" }}>
      <Typography style={{ color: "#fff", textAlign: "center" }} variant="h4">
        <span style={{ marginRight: "16px" }}>Balance:</span>
        {availableBalance}
      </Typography>
      {availableBalance < 0 ? (
        <Typography
          style={{ color: "#fff", textAlign: "center", margin: "8px 0" }}
        >{`You have spent Rs.${Math.abs(
          availableBalance
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
