import { Outlet } from "react-router-dom";
import Navbar from "../Shered/Navbar";
import Footer from "../Shered/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className='  min-h-[calc(100vh-150px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
