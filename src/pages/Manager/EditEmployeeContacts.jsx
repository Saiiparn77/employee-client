import { MdContactPhone } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import NavLinksSidebar from "../../components/์NavLinksSidebar";

function EditEmployeeContracts() {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    nick_name: "",
    password: "",
    wage_per_date: "",
    num_of_work_date: "",
  });
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
//เรียกดูข้อมูลพนักงานคนนั้นด้วย id
  const fetchEmployeeDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/employee/${id}/manager`
      );
      setValues(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async () => {
    const { fname, lname, nick_name, password } = values;
    if (!fname || !lname || !nick_name || !password) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    await updateEmployee();
  };
//แก้ไขข้อมูลการติดต่อของพนักงานด้วย id
  const updateEmployee = async () => {
    try {
      await axios.put("http://localhost:3000/employee/" + id, {
        ...values,
      });
      setError("");
      setSuccess("เเก้ไขพนักงานของคุณเรียบร้อย");
      navigate("/");
    } catch (err) {
      const msg = err.response.data;
      setSuccess("");
      setError(msg);
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
        fetchEmployeeDetails();
      }
    }
  }, []);

  return (
    <div className="add-employee">
      {/* sidebar */}
      <NavLinksSidebar />
      <div className="add-employee-form">
        <div className="title">
          <MdContactPhone /> แก้ไขข้อมูลการติดต่อพนักงาน
        </div>
        <div className="note">แก้ไขข้อมูลสำหรับพนักงานของคุณ</div>
        <div className="underline"></div>
        {/* alert */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <input
          placeholder="ชื่อ"
          name="fname"
          value={values.fname}
          className="form-input"
          onChange={handleChange}
        ></input>
        <input
          placeholder="นามสกุล"
          name="lname"
          className="form-input"
          onChange={handleChange}
          value={values.lname}
        ></input>
        <input
          placeholder="เบอร์ติดต่อ"
          name="phone_number"
          value={values.phone_number}
          className="form-input"
          onChange={handleChange}
        ></input>

        <input
          placeholder="LINE"
          name="line"
          value={values.line}
          className="form-input"
          onChange={handleChange}
        ></input>

        <input
          placeholder="E-mail"
          name="email"
          value={values.email}
          className="form-input"
          onChange={handleChange}
        ></input>

        {/* 26 */}

        <button onClick={onSubmit} className="login-submit-btn" type="submit">
          ยืนยันการแก้ไข
        </button>
      </div>
    </div>
  );
}

export default EditEmployeeContracts;
