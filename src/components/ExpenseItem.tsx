import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditModal from "./EditModal";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useAppDispatch } from "../hooks/expense-dispatch";
import { fetchExpenseData } from "../redux/features/expenses";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ExpenseItem = () => {
  let { id } = useParams();
  //console.log(expenseItem);
  //   let tempId: number = Number(
  //     window.location.pathname[window.location.pathname.length - 1]
  //   );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(fetchExpenseData(id));
    }
    return () => {};
  }, [dispatch, id]);

  const expenseItem = useSelector((state: any) => state.expense.expenseItem);
  //   let seltectedListItem = expenseData.filter((listItem: any) => {
  //     if (listItem.id === id) {
  //       return listItem;
  //     }
  //   });

  return (
    <>
      <Button
        variant="contained"
        style={{ margin: "24px 0" }}
        onClick={() => navigate("/")}
      >
        Home
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Catergory</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!expenseItem && <div>{"Loading..."}</div>}
            <StyledTableRow key={expenseItem.id}>
              <StyledTableCell component="th" scope="row">
                {expenseItem.category}
              </StyledTableCell>
              <StyledTableCell align="right">
                {expenseItem.amountSpent}
              </StyledTableCell>
              <StyledTableCell align="right">
                {moment(expenseItem.date).format("YYYY-MMM-DD")}
              </StyledTableCell>
              <StyledTableCell align="right">
                {
                  <div>
                    <EditModal
                      mode={"Edit"}
                      rowData={expenseItem}
                      //expenseList={expenseData}
                    />
                    <EditModal
                      mode={"Delete"}
                      rowData={expenseItem}
                      //expenseList={expenseData}
                    />
                  </div>
                }
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(ExpenseItem);
