import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import NavLinksSidebar from "../../components/์NavLinksSidebar";

function EditEmployee() {
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

  const fetchEmployeeDetails = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/employee/${id}/manager`);
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
          <IoPersonAddSharp /> แก้ไขข้อมูลพนักงาน
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
          placeholder="ชื่อเล่น"
          className="form-input"
          onChange={handleChange}
          name="nick_name"
          value={values.nick_name}
          type="text"
        ></input>

        <input
          placeholder="ค่าแรง / วัน"
          name="wage_per_date"
          value={values.wage_per_date}
          className="form-input"
          onChange={handleChange}
        ></input>

        <input
          placeholder="จำนวนวัน"
          name="num_of_work_date"
          value={values.num_of_work_date}
          className="form-input"
          onChange={handleChange}
        ></input>

        <input
          placeholder="บวกค่ากะ"
          name="test"
          value={""}
          className="form-input"
          onChange={handleChange}
        ></input>

        <input
          placeholder="OT / ชั่วโมง"
          name="ot_per_hour"
          value={values.ot_per_hour}
          className="form-input"
          onChange={handleChange}
        ></input>

        <input
          placeholder="จำนวนชั่วโมง OT"
          name="num_of_ot_hours"
          value={values.num_of_ot_hours}
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

export default EditEmployee;
