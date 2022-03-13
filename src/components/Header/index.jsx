import Logo from "../../assets/logo.png"
import "./styles.scss";
import { Link } from "react-router-dom";
import Registration from "../../pages/Registration";
import { auth } from "../../firebase/utils"

const Header = props => {
    const { currentUser } = props;

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
                                <span onClick={() => auth.signOut()}>
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
                                <Link to="/signin">
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