import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HandlerRoute() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/employee-login");
    } else {
      const decoded = jwtDecode(token);
      if (decoded.employee) {
        return navigate("/employee");
      } else if (decoded.manager) {
        return navigate("/manager");
      }
    }
  }, []);
}

export default HandlerRoute;
