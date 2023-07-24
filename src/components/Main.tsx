import { useSelector } from "react-redux";
import Login from "./Login";
import PlannerForm from "./planner-form";
import { RootState } from "../redux/app/store";

function Main() {
  const isLoggedIn = useSelector((state: RootState) => state.budget.loggedIn);
  const userId = useSelector((state: RootState) => state.budget.id);

  return <div>{isLoggedIn ? <PlannerForm /> : <Login errMsg={userId} />}</div>;
}

export default Main;
