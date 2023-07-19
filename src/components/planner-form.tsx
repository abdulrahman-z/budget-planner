import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Balance from "./Balance";
import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "../redux/features/budget";
import { ExpenseService } from "../api/service";

const container = {
  background: "#444",
  height: "600px",
  width: "550px",
};

function PlannerForm() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const Budget = useSelector((state: any) => state.budget.budget);
  const [plannedBudget, setPlannedBudget] = useState<number>(Budget);
  const dispatch = useDispatch();

  return (
    <div>
      <Box style={container}>
        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ margin: "24px 0" }}>
            {isEdit ? (
              <input
                type="number"
                min={1}
                value={plannedBudget}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPlannedBudget(Number(e.target.value));
                }}
              />
            ) : (
              <Typography
                variant="h4"
                style={{ color: "#fff", textAlign: "center" }}
              >
                {plannedBudget}
              </Typography>
            )}
          </div>
          {!isEdit ? (
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Update Budget
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                dispatch(setBudget(plannedBudget));
                setIsEdit(false);
              }}
            >
              Set Budget
            </Button>
          )}
        </form>
        <Box>
          <Balance />
        </Box>
      </Box>
    </div>
  );
}

export default PlannerForm;
