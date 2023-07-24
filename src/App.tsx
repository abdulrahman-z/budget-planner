import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import NotFound from "./components/NotFound";
const LazyExpenseItem = React.lazy(() => import("./components/ExpenseItem"));
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
          <Route
            path="/view/:id"
            element={
              <Suspense fallback={`Loading...`}>
                <LazyExpenseItem />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
