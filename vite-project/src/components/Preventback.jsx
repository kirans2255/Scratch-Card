import { Navigate } from "react-router-dom";

function preventback({ children }) {
    let token = localStorage.getItem("token");
    if (token) {
        return <Navigate to={"/dashboard"} />
    } else {
        return children;
    }
}

export default preventback;