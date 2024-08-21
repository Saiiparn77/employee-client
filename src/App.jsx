import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginEmployee from "./pages/LoginEmployee";
import LoginManager from "./pages/LoginManager";
// import ProtectedRoute from "./pages/ProtectedRoute";
// import SharedLayout from "./pages/SharedLayout";
import EmployeesManagement from "./pages/Manager/EmployeesManagement";
import EmployeeContacts from "./pages/Manager/EmployeeContacts";
import AddEmployee from "./pages/Manager/AddEmployee";
import EditEmployee from "./pages/Manager/EditEmployee";
import EmployeeInfo from "./pages/Employee/EmployeeInfo";
import HandlerRoute from "./components/HandlerRoute";
import EditEmployeeContracts from "./pages/Manager/EditEmployeeContacts";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HandlerRoute/>} />
        <Route path="/employee" element={<EmployeeInfo />} />
        <Route path="/manager" element={<EmployeesManagement />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/employee-login" element={<LoginEmployee />} />
        <Route path="/employee-contract" element={<EmployeeContacts />} />
        <Route path="/edit-employee-contact/:id" element={<EditEmployeeContracts />} />
        <Route path="/manager-login" element={<LoginManager />} />
        {/*หากผู้ใช้มาหน้าที่ไม่มีในระบบจะส่งไปหน้าเข้าสู่ระบบของพนักงาน*/}
        <Route path="*" element={<LoginEmployee />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
