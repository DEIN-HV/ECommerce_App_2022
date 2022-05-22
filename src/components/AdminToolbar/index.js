import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkIsAdmin } from "../../utils";
import "./styles.scss";

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
})

const AdminToolbar = props => {

    const { currentUser } = useSelector(mapState);
    const isAdmin = checkIsAdmin(currentUser);

    if (!isAdmin) return null;

    return (
        <div className="adminToolbar">
            <ul>
                <li>
                    <Link to="/admin">
                        My Admin
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminToolbar;