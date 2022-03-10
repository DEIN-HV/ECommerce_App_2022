import Logo from "../../assets/logo.png"
import "./styles.scss";
import { Link } from "react-router-dom";
import Registration from "../../pages/Registration";

const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/registration">
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/registration">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;