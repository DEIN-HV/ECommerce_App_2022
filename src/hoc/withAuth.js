import UseAuth from "../customHooks/useAuth";

const WithAuth = props => UseAuth(props) && props.children;

export default WithAuth;