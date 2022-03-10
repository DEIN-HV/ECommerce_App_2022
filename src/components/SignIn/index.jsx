import Button from "../Form/Button";
import "./styles.scss";

const SignIn = props => {
    return (
        <div className="singin">
            <div className="wrap">
                <h2>Login</h2>
            </div>

            <div className="formWrap">
                <form >
                    <div className="socialSignIn">
                        <div className="row">
                            <Button>
                                Sign in with Google
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn