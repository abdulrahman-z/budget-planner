import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { memo, useEffect } from "react";
import EditModal from "./EditModal";
import { fetchExpensesList } from "../redux/features/expenses";
import { useAppDispatch } from "../hooks/expense-dispatch";
import moment from "moment";

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

const Transaction = memo(() => {
  const expenseData = useSelector((state: any) => state.expense.expenseList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExpensesList());
    return () => {};
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <EditModal expenseList={expenseData} mode={"Add"} />
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
          {expenseData?.map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.category}
              </StyledTableCell>
              <StyledTableCell align="right">{row.amountSpent}</StyledTableCell>
              <StyledTableCell align="right">
                {moment(row.date).format("YYYY-MMM-DD")}
              </StyledTableCell>
              <StyledTableCell align="right">
                {
                  <>
                    <Link to={`/view/${row.id}`}>VIEW</Link>
                  </>
                }
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {!expenseData && <div>{"Loading..."}</div>}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default Transaction;
