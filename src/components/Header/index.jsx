import Logo from "../../assets/logo.png"
import "./styles.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";
import { connect } from "react-redux";
import { w } from "react-router-dom"


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
                                <Link to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
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

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(Header);