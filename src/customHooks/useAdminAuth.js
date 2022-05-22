import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { checkUserSession } from "../redux/User/user.actions";
import { checkIsAdmin } from "../utils";

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
})

const useAdminAuth = props => {

    const { currentUser } = useSelector(mapState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkIsAdmin(currentUser)) {
            navigate("/login");
        }
    }, [currentUser]);

    return currentUser;
}

export default useAdminAuth;