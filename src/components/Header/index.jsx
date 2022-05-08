import Logo from "../../assets/logo.png"
import "./styles.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";
import { useDispatch, useSelector } from "react-redux"
import { signOutStart } from "../../redux/User/user.actions";


const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

const Header = props => {

    const { currentUser } = useSelector(mapStateToProps);
    console.log(currentUser)
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutStart())
    }

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="callToActions">
                    {currentUser
                        ? <ul>
                            <li>
                                <Link to="/dashboard">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <span className="link" onClick={() => signOut()}>
                                    Logout
                                </span>
                            </li>
                        </ul>

                        : <ul>
                            <li>
                                <Link to="/registration">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    }

                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null,
}

export default Header;

// export default connect(mapStateToProps, null)(Header);