import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "sign-in", element: <div>SignIn</div> },
      { path: "sign-up", element: <SignUp /> },
      { path: "write", element: <div>Write</div> },
      // {
      //   path: 'blogs/:id',
      //   element: (
      //     <ProtectedRoute>
      //       <CardDetail />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
