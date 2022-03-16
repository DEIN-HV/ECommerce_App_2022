import Homepage from "./pages/Homepage";
import "./default.scss"
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import SignIn from "./components/SignIn";
import { Component } from "react"
import { auth, handleUserProfile } from "./firebase/utils";
import { onSnapshot } from "firebase/firestore"
import SignUp from "./components/SignUp";

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

    this.authListener = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {
        console.log(userAuth)
        const userRef = await handleUserProfile(userAuth);
        // onSnapshot(userRef, snapshot => {
        //   this.setState({
        //     id: snapshot.id,
        //     ...snapshot.data(),
        //   })
        // })

      }

      this.setState({
        ...initialState
      })
    })
  }

  componentWillUnmount() {
    // this.authListener();
  }

  render() {
    const { currentUser } = this.state
    return (
      <div className="App">

        <Routes>
          <Route path='/' element={
            currentUser
              ? <MainLayout currentUser={currentUser}>
                <Homepage />
              </MainLayout>
              : <Navigate to="/signin" />
          } />

          <Route path='/registration' element={
            <MainLayout currentUser={currentUser}>
              <SignUp />
            </MainLayout>
          } />

          <Route path='/signin' element={
            currentUser
              ? <Navigate to="/" />
              : <MainLayout currentUser={currentUser}>
                <SignIn />
              </MainLayout>
          } />

        </Routes>
      </div>
    );
  }
}

export default App;
