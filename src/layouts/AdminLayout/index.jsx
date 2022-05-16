import { Link } from "react-router-dom"
import Header from "../../components/Header"
import VerticalNav from "../../components/VerticalNav"

const AdminLayout = props => {
    return (
        <div className="adminLayout">
            <Header {...props} />
            <div className="controlPanel">

                <div className="sidebar">
                    <VerticalNav>
                        <ul>
                            <li>
                                <Link to="/admin">Home</Link>
                            </li>
                            <li>
                                <span className="signOut" >
                                    Sign out
                                </span>
                            </li>
                        </ul>
                    </VerticalNav>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>

        </div>
    )
}

export default AdminLayout;