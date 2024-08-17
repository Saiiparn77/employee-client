import { useState, useEffect } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginManager() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loginManager = async () => {
    const { username, password } = values;
    if (!username || !password) {
      return setError("กรุณากรอก ชื่อผู้ใช้ และ รหัสผ่าน");
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:3000/manager", {
        username,
        password,
      });
      localStorage.setItem("token", data.accessToken);
      navigate("/");
      setIsLoading(false);
    } catch (err) {
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
          <IoSettingsSharp /> ผู้จัดการ
        </div>
        <div className="note">ลงชื่อเข้าสู่ระบบสำหรับ ผู้จัดการ</div>
        <div className="underline"></div>
        {/* alert */}
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          placeholder="รหัสผู้จัดการ"
          name="username"
          className="form-input"
          type="text"
          onChange={handleChange}
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
          onClick={loginManager}
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
              navigate("/employee-login");
            }}
            className="toggle-link"
          >
            พนักงาน
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginManager;
