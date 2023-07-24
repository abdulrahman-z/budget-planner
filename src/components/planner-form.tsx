import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Balance from "./Balance";
import { useDispatch, useSelector } from "react-redux";
import { getBudget, logOut, setBudget } from "../redux/features/budget";
import { useAppDispatch } from "../hooks/expense-dispatch";
import { RootState } from "../redux/app/store";

const container = {
  background: "#444",
  height: "360px",
  width: "550px",
};

function PlannerForm() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const Budget = useSelector((state: RootState) => state.budget.budget);
  const [plannedBudget, setPlannedBudget] = useState<number>(Budget);
  const userId = useSelector((state: RootState) => state.budget.id);

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(getBudget(userId));

    return () => {};
  }, [appDispatch, userId]);

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        style={{ padding: "8px", margin: "8px 0" }}
        onClick={() => dispatch(logOut())}
      >
        Logout
      </Button>
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
                {Budget}
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
                let updateBudget = {
                  budget: plannedBudget,
                  id: "1",
                  name: "Brad Kirlin",
                };
                appDispatch(setBudget(updateBudget));
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
