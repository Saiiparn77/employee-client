import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginEmployee from "./pages/LoginEmployee";
import LoginManager from "./pages/LoginManager";
// import ProtectedRoute from "./pages/ProtectedRoute";
// import SharedLayout from "./pages/SharedLayout";
import EmployeesManagement from "./pages/Manager/EmployeesManagement";
import AddEmployee from "./pages/Manager/AddEmployee";
import EditEmployee from "./pages/Manager/EditEmployee";
import EmployeeInfo from "./pages/Employee/EmployeeInfo";
import HandlerRoute from "./components/HandlerRoute";

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
        <Route path="/manager-login" element={<LoginManager />} />
        <Route path="*" element={<LoginEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
