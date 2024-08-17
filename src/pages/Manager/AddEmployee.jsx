import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavLinksSidebar from "../../components/์NavLinksSidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function AddEmployee() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    nick_name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const { fname, lname, nick_name, password } = values;
    if (!fname || !lname || !nick_name || !password) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    addEmployee();
  };

  const addEmployee = async () => {
    try {
      await axios.post("http://localhost:3000/employee", {
        ...values,
      });
      setError("");
      setSuccess("เพิ่มพนักงานของคุณเรียบร้อย");
    } catch (err) {
      const { msg } = err.response.data;
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
      }
    }
  }, []);

  return (
    <div className="add-employee">
      {/* sidebar */}
      <NavLinksSidebar />
      <div className="add-employee-form">
        <div className="title">
          <IoPersonAddSharp /> เพิ่มข้อมูลพนักงาน
        </div>
        <div className="note">กรอกข้อมูลเพื่อเพิ่ม ข้อมูลพนักงาน</div>
        <div className="underline"></div>
        {/* alert */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <input
          placeholder="ชื่อ"
          name="fname"
          className="form-input"
          value={values.fname}
          onChange={handleChange}
        ></input>
        <input
          placeholder="นามสกุล"
          name="lname"
          className="form-input"
          value={values.lname}
          onChange={handleChange}
        ></input>
        <input
          placeholder="ชื่อเล่น"
          name="nick_name"
          className="form-input"
          value={values.nick_name}
          onChange={handleChange}
        ></input>
        <input
          placeholder="**รหัสผ่าน สำหรับพนักงาน"
          className="form-input"
          value={values.password}
          onChange={handleChange}
          name="password"
          type={passwordVisible ? "text" : "password"}
        ></input>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "12px" }}>แสดงรหัสผ่าน</label>
          <input
            type="checkbox"
            onChange={() => {
              setPasswordVisible(!passwordVisible);
            }}
          ></input>
        </div>
        <button onClick={onSubmit} className="login-submit-btn" type="submit">
          เพิ่มพนักงาน
        </button>
      </div>
    </div>
  );
}

export default AddEmployee;
