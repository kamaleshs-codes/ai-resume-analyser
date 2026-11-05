import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main className='mx-auto max-w-7xl px-10 py-12'>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
