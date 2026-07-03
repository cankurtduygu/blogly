import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import BlogDetail from "./pages/Blog/BlogDetail";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store, { persistor } from "./store/store";
import { selectCurrentUser } from "./store/authSlice";
import Write from "./pages/Write/Write";
import Profile from "./pages/Profile/Profile";
import { Analytics } from "@vercel/analytics/react";
import { PersistGate } from "redux-persist/lib/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

function ProtectedRoute() {
  const user = useSelector(selectCurrentUser);
  return user ? <Outlet /> : <Navigate to="/" />;
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
          { path: "write", element: <Write /> },
          { path: "profile", element: <Profile /> },
          { path: "blogs/:id/edit", element: <Write /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <RouterProvider router={router} />
          <Analytics />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
