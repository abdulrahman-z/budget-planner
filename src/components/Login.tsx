import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../hooks/expense-dispatch";
import { userLoggedIn } from "../redux/features/budget";

const container = {
  background: "#fff",
  border: "1px solid #333",
  height: "300px",
  width: "550px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

type err = {
  errMsg: string;
};

function Login(props: err) {
  const [userId, setuserId] = useState<string>("");
  const appDispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //console.log(userId);
    appDispatch(userLoggedIn(userId));
    setuserId("");
  };

  return (
    <div>
      <Box style={container}>
        <form>
          <input
            style={{
              border: "1px solid #444",
              outline: 0,
              padding: "12px 8px",
            }}
            value={userId}
            placeholder="userId"
            onChange={(e) => setuserId(e.target.value)}
          />
          <br />
          <Button
            style={{ margin: "32px 24px" }}
            variant="outlined"
            color="success"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </form>
      </Box>

      {props.errMsg ? (
        <Typography
          style={{ textAlign: "center", margin: "8px 0", color: "red" }}
        >
          {props.errMsg}
        </Typography>
      ) : null}
    </div>
  );
}

export default Login;
