import React, { Suspense } from "react";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transaction from "./components/Transaction";
import { Box, Typography } from "@mui/material";
import EditModal from "./components/EditModal";
import ExpenseItem from "./components/ExpenseItem";
const LazyMain = React.lazy(() => import("./components/Main"));
const LazyTransaction = React.lazy(() => import("./components/Transaction"));

function App() {
  return (
    <div className="App">
      <Box>
        <Typography
          style={{ textAlign: "center", padding: "24px 0" }}
          variant="h3"
        >
          Budget Planner
        </Typography>
      </Box>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={`Loading...`}>
                <LazyMain />
              </Suspense>
            }
          />
          <Route
            path="/view"
            element={
              <Suspense fallback={`Loading...`}>
                <LazyTransaction />
              </Suspense>
            }
          />
          <Route path="/view/:id" element={<ExpenseItem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
