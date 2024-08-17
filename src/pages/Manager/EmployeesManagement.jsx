import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavLinksSidebar from "../../components/์NavLinksSidebar";
import { jwtDecode } from "jwt-decode";


function EmployeesManagement() {

  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");
  const fetchAllEmployees = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/employee");
      setEmployees(data.employees);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "คุณต้องการที่จะลบ พนักงานใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบเลย!",
        cancelButtonText: "ไม่ ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteEmployeeById(id);
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
  };

  const deleteEmployeeById = async (employeeId) => {
    try {
      await axios.delete("http://localhost:3000/employee/" + employeeId);
      fetchAllEmployees();
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
        <button
          onClick={() => {
            navigate("/add-employee");
          }}
          className="add-employee-nav-btn"
        >
          เพิ่มข้อมูลพนักงาน <IoPersonAddSharp />
        </button>
        {/* Table */}
        <table id="employee">
          {/*  */}
          <tr>
            <th>รหัส</th>
            <th>ชื่อ-นามสกุล</th>
            <th>ชื่อเล่น</th>
            <th>ค่าแรง / วัน</th>
            <th>จำนวนวัน</th>
            <th>บวกค่ากะ</th>
            <th>OT / ชั่วโมง</th>
            <th>จำนวน OT</th>
            <th>ยอดเงิน OT</th>
            <th>ยอดรวม</th>
            <th>ตัวเลือก</th>
          </tr>
          {employees.length > 0 &&
            employees.map((emp, index) => {
              return (
                <tr key={index}>
                  <td>{emp.id}</td>
                  <td>{`${emp.fname}-${emp.lname}`}</td>
                  <td>{emp.nick_name}</td>
                  <td>{emp.wage_per_date || `-`}</td>
                  <td>{emp.num_of_work_date || `-`}</td>
                  <td>ค่ากะ</td>
                  <td>{emp.ot_per_hour || `-`}</td>
                  <td>{emp.num_of_ot_hours || `-`}</td>
                  <td>{emp.ot_summary || `-`}</td>
                  <td>{emp.total_salary || `ยอดรวม`}</td>
                  <td className="option-col">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        navigate("/edit-employee/" + emp.id);
                      }}
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(emp.id);
                      }}
                      className="delete-btn"
                    >
                      ลบ
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

export default EmployeesManagement;
