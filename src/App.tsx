import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import BlogDetail from "./pages/BlogDetail";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";

import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./state/store";
import { selectCurrentUser } from "./features/authSlice";

function ProtectedRoute() {
  const user = useSelector(selectCurrentUser);
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}

function PublicOnlyRoute() {
  const user = useSelector(selectCurrentUser);
  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "blogs/:id", element: <BlogDetail /> },
      {
        element: <PublicOnlyRoute />,
        children: [
          { path: "sign-in", element: <SignIn /> },
          { path: "sign-up", element: <SignUp /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "write", element: <div>Write</div> },
          // { path: "blogs/:id", element: <CardDetail /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
