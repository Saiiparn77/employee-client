import Logo from "./Logo";
import { FaAddressCard } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";

function NavLinksSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/employee-login");
  };

  return (
    <div className="sidebar">
      <div>
        <div className="title2">
          <Logo width={"30px"} />
          <div>Employee System</div>
        </div>
        <ul className="menu">
          <NavLink
            to="/manager"
            key={1}
            onClick={() => {}}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{<FaAddressCard />}</span>
            รายชื่อพนักงาน
          </NavLink>
          <NavLink
            to="/add-employee"
            key={2}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{<IoPersonAdd />}</span>
            เพิ่มข้อมูลพนักงาน
          </NavLink>
        </ul>
      </div>

      {/* logout */}
      <div onClick={logout} className="logout-menu">
        <CgLogOut /> ออกจากระบบ
      </div>
    </div>
  );
}

export default NavLinksSidebar;
