import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const mapState = ({ user }) => ({
//     currentUser: user.currentUser
// });

const UseAuth = props => {
    const { currentUser } = useSelector(({ user }) => (
        { currentUser: user.currentUser })
    );

    const navigate = useNavigate();

    useEffect(() => {
        console.log(currentUser)
        if (!currentUser) navigate("/login");
    }
        , [currentUser]);

    return currentUser;
}

export default UseAuth;