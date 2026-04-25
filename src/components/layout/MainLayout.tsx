import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-20 flex-1 bg-[#FDFDFD]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
