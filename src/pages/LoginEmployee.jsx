import { FaUserTie } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function LoginEmployee() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const [values, setValues] = useState({
    employeeId: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loginEmployee = async () => {
    const { employeeId, password } = values;
    if (!employeeId || !password) {
      return setError("กรุณากรอก รหัสพนักงาน และ รหัสผ่าน");
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:3000/employee/login", {
        employeeId,
        password,
      });
      console.log(data);
      localStorage.setItem("token", data.accessToken);
      navigate("/");
      setIsLoading(false);
    } catch (err) {
      console.log(err)
      const { msg } = err.response.data;
      setError(msg);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="login-manager">
      <div className="form-login">
        <div className="title">
          <FaUserTie /> พนักงาน
        </div>
        <div className="note">ลงชื่อเข้าสู่ระบบสำหรับพนักงาน</div>
        <div className="underline"></div>
        {/* alert */}
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          placeholder="รหัสพนักงาน"
          name="employeeId"
          className="form-input"
          onChange={handleChange}
          type="text"
        ></input>
        <input
          placeholder="รหัสผ่านเข้าสู่ระบบ"
          name="password"
          className="form-input"
          type={passwordVisible ? "text" : "password"}
          onChange={handleChange}
        ></input>
        <div className="show-pass-container">
          <input
            type="checkbox"
            onChange={() => {
              setPasswordVisible(!passwordVisible);
            }}
          ></input>
          <label>แสดงรหัสผ่าน</label>
        </div>
        <button
          onClick={loginEmployee}
          className="login-submit-btn"
          type="submit"
          disabled={isLoading}
        >
          เข้าสู่ระบบ
        </button>
        <div className="toggle-endpoint">
          สลับไปยัง การเข้าสู่ระบบของ{" "}
          <div
            onClick={() => {
              navigate("/manager-login");
            }}
            className="toggle-link"
          >
            ผู้จัดการ
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginEmployee;
