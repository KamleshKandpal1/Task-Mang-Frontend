import {
  AllTask,
  CompleteTasks,
  Home,
  ImportantTasks,
  IncompleteTasks,
  Login,
  Signup,
} from "./pages";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
function App() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isLogged = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLogged);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      dispatch(authActions.login());
    } else if (isLogged === false) {
      navigation("/signup");
    }
  }, []);

  return (
    <>
      <div className="h-screen p-2 bg-gray-800 text-white relative">
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<AllTask />} />
            <Route path="/important-Tasks" element={<ImportantTasks />} />
            <Route path="/complete-Tasks" element={<CompleteTasks />} />
            <Route path="/incomplete-Tasks" element={<IncompleteTasks />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
