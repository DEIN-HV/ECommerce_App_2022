import Homepage from "./pages/Homepage";
import "./default.scss"
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./components/SignIn";
import { Component } from "react"
import { auth, handleUserProfile } from "./firebase/utils";
import { onSnapshot } from "firebase/firestore"
import SignUp from "./components/SignUp";
import Login from "./pages/Login"
import Registration from "./pages/Registration";
import Recovery from "./pages/Recovery";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions"

const initialState = {
  currentUser: null,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        onSnapshot(userRef, snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          })
        })
      }

      setCurrentUser(userAuth);

    })
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.props
    return (
      <div className="App">

        <Routes>
          <Route path='/' element={
            currentUser
              ? <MainLayout>
                <Homepage />
              </MainLayout>
              : <Navigate to="/login" />
          } />

          <Route path='/registration' element={
            currentUser
              ? <Navigate to="/" />
              : <MainLayout>
                <Registration />
              </MainLayout>
          } />

          <Route path='/login' element={
            currentUser
              ? <Navigate to="/" />
              : <MainLayout>
                <Login />
              </MainLayout>
          } />

          <Route path='/recovery' element={
            currentUser
              ? <Navigate to="/" />
              : <MainLayout>
                <Recovery />
              </MainLayout>
          } />

        </Routes>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
