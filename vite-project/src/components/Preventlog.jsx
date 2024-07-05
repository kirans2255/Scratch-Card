import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Preventlog({ children }) {
    let token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to={"/"} />
    } else{
        return children
    }
}


export default Preventlog;