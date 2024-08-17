import { Outlet } from "react-router-dom";
// import { SmallSidebar, BigSidebar, Navbar } from "../../components";

const SharedLayout = () => {
  return (
    <div>
      <main className="dashboard">
        {/* <SmallSidebar /> */}
        {/* <BigSidebar /> */}
        <div>
          {/* <Navbar /> */}
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SharedLayout;
