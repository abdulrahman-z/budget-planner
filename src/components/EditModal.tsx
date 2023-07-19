import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
//import { addItem, remove, update } from "../redux/features/expenses";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  mode: "Edit" | "Delete" | "Add";
  rowData?: {
    id: number;
    category: string;
    amountSpent: number;
    date: string;
  };
  expenseList?: {
    id: number;
    category: string;
    amountSpent: number;
    date: string;
  }[];
}

export default function EditModal(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState(props.rowData);
  const [category, setCategory] = React.useState(props.rowData?.category || "");
  const [amount, setAmount] = React.useState(props.rowData?.amountSpent || 0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={handleOpen}>
        {props.mode === "Add" ? (
          <AddIcon
            style={{
              padding: "24px",
              float: "right",
              margin: "16px 24px",
              cursor: "pointer",
            }}
          />
        ) : (
          props.mode
        )}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form>
              {props.mode === "Add" && (
                <>
                  <Typography style={{ textAlign: "center" }}>
                    Add new Expense details
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "24px 0",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="category"
                      style={{
                        border: 0,
                        borderBottom: "1px solid #333",
                        outline: 0,
                      }}
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <br />
                    <input
                      type="number"
                      placeholder="amount"
                      min={1}
                      style={{
                        border: 0,
                        borderBottom: "1px solid #333",
                        outline: 0,
                      }}
                      value={amount}
                      onChange={(e) => {
                        setAmount(Number(e.target.value));
                      }}
                    />
                    <br />
                    <Button
                      variant="outlined"
                      onClick={() => {
                        // let newData = {
                        //   id: props.expenseList.length + 1,
                        //   category: category,
                        //   amountSpent: amount,
                        //   date: new Date().toLocaleDateString(),
                        // };
                        //dispatch(addItem(newData));
                        navigate("/view");
                        setOpen(false);
                      }}
                    >
                      ADD
                    </Button>
                  </div>
                </>
              )}

              {props.mode === "Edit" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="text"
                    style={{
                      border: 0,
                      borderBottom: "1px solid #333",
                      outline: 0,
                    }}
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="number"
                    min={1}
                    style={{
                      border: 0,
                      borderBottom: "1px solid #333",
                      outline: 0,
                    }}
                    value={amount}
                    onChange={(e) => {
                      setAmount(Number(e.target.value));
                    }}
                  />
                  <br />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      let updatedData = {
                        ...rowData,
                        category: category,
                        amountSpent: amount,
                      };
                      //dispatch(update(updatedData));
                      navigate("/view");
                      setOpen(false);
                    }}
                  >
                    UPDATE
                  </Button>
                </div>
              )}

              {props.mode === "Delete" && (
                <>
                  <Typography style={{ textAlign: "center" }}>
                    Confirmation To Delete
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ margin: "10% 40%" }}
                    onClick={() => {
                      //dispatch(remove(rowData));
                      navigate("/view");
                      setOpen(false);
                    }}
                  >
                    DELETE
                  </Button>
                </>
              )}
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
