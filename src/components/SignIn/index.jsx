import Button from "../Form/Button";
import "./styles.scss";
import { signInWithGoogle } from "../../firebase/utils";
import { Component } from "react"



class SignIn extends Component {

    handleSubmit = async e => {
        e.preventDefault();
    }
    render() {
        return (
            <div className="singin">
                <div className="wrap">
                    <h2>Login</h2>
                </div>

                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
                        <div className="socialSignIn">
                            <div className="row">
                                <Button onClick={signInWithGoogle}>
                                    Sign in with Google
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignIn