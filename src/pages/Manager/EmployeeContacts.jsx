import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NavLinksSidebar from "../../components/์NavLinksSidebar";
import { jwtDecode } from "jwt-decode";

function EmployeesContact() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");
  //เรียกดูข้อมูลพนักงาน
  const fetchAllEmployees = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/employee");
      setEmployees(data.employees);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/manager-login");
    } else {
      const decoded = jwtDecode(token);
      if (!decoded.manager) {
        return navigate("/manager-login");
      } else {
        fetchAllEmployees();
      }
    }
  }, []);

  return (
    <div className="employee-management">
      {/* sidebar */}
      <NavLinksSidebar />
      {/* content container */}
      <div className="content-container">
        <br></br>
        <br></br>
        {/* <button
          onClick={() => {
            navigate("/add-employee");
          }}
          className="add-employee-nav-btn"
        >
          เพิ่มข้อมูลพนักงาน <IoPersonAddSharp />
        </button> */}
        {/* Table */}
        <table id="employee">
          {/*  */}
          <tr>
            <th>รหัส</th>
            <th>ชื่อ-นามสกุล</th>
            <th>ชื่อเล่น</th>
            <th>เบอร์ติดต่อ</th>
            <th>LINE</th>
            <th>E-mail</th>
            <th>ตัวเลือก</th>
          </tr>
          {employees.length > 0 &&
          //ลูปเพื่อแสดงผลข้อมูลพนักงานทั้งหมด
            employees.map((emp, index) => {
              return (
                <tr key={index}>
                  <td>{emp.id}</td>
                  <td>{`${emp.fname}-${emp.lname}`}</td>
                  <td>{emp.nick_name}</td>
                  <td>{emp.phone_number || `-`}</td>
                  <td>{emp.line || `-`}</td>
                  <td>{emp.email || `-`}</td>
                  <td className="option-col">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        navigate("/edit-employee-contact/" + emp.id);
                      }}
                    >
                      แก้ไข
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default EmployeesContact;
