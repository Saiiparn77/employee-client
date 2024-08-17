import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import Logo from "../../components/Logo";

function EmployeeInfo() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [employeeInfo, setEmployeeInfo] = useState({});

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/employee/${token}`
      );
      setEmployeeInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/employee-login");
  };

  useEffect(() => {
    if (!token) {
      return navigate("/employee-login");
    } else {
      const decoded = jwtDecode(token);
      if (!decoded.employee) {
        return navigate("/employee-login");
      } else {
        getUserInfo();
      }
    }
  }, []);

  return (
    <div className="employee-info">
      {/* employee information container */}
      <div className="employee-information-container">
        <div className="title2">
          <Logo width={"30px"} />
          <div>Employee System</div>
        </div>
        <div className="emp-info">
          <div className="emp-key">รหัสพนักงาน</div>
          <div>{employeeInfo.id}</div>
        </div>

        <div className="emp-info">
          <div className="emp-key">ชื่อ-นามสกุล</div>
          <div> {`${employeeInfo.fname}-${employeeInfo.lname}`}</div>
        </div>

        <div className="emp-info">
          <div className="emp-key">ชื่อเล่น </div>
          <div> {employeeInfo.nick_name}</div>
        </div>

        <div className="emp-info">
          <div className="emp-key">ชื่อ-นามสกุล</div>
          <div> {`${employeeInfo.fname}-${employeeInfo.lname}`}</div>
        </div>

        <div className="emp-info">
          <div className="emp-key">ค่าแรงต่อวัน</div>
          <div> {employeeInfo.wage_per_date || `-`}</div>
        </div>

        <div className="emp-info">
          <div className="emp-key">จำนวนวันทำงาน</div>
          <div> {employeeInfo.num_of_work_date || `-`}</div>
        </div>

        <div className="emp-info">
          <div className="emp-key">ค่ากะ</div>
          <div> {employeeInfo.num_of_work_date || `-`}</div>
        </div>

        <div className="emp-info">
          <div className="emp-key">OT ต่อชั่วโมง</div>
          <div> {employeeInfo.ot_per_hour || `-`}</div>
        </div>

        <div className="emp-info">
          <div className="emp-key">จำนวน OT ที่ทำงาน</div>
          <div> {employeeInfo.num_of_ot_hours || `-`}</div>
        </div>

        <div className="emp-info">
          <div className="emp-key">ยอดเงิน OT ที่ได้รับ</div>
          <div> {employeeInfo.ot_summary || `-`}</div>
        </div>

        <div className="emp-info">
          <div className="emp-key">ยอดรวมทั้งหมด</div>
          <div> {employeeInfo.total_salary || `-`}</div>
        </div>

        <div onClick={logout} className="logout-menu">
          <CgLogOut /> ออกจากระบบ
        </div>
      </div>
    </div>
  );
}

export default EmployeeInfo;
