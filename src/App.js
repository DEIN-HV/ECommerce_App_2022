import Homepage from "./pages/Homepage";
import "./default.scss"
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./components/SignIn";
import { Component, useEffect, useState } from "react"
import { auth, handleUserProfile } from "./firebase/utils";
import { onSnapshot } from "firebase/firestore"
import SignUp from "./components/SignUp";
import Login from "./pages/Login"
import Registration from "./pages/Registration";
import Recovery from "./pages/Recovery";
import { connect, useDispatch } from "react-redux";
import { checkUserAction, setCurrentUser } from "./redux/User/user.actions"
import Dashboard from "./pages/Dashboard";
import WithAuth from "./hoc/withAuth"

const initialState = {
  currentUser: null,
}

const App = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ...initialState
  //   }
  // }

  // authListener = null;
  const { setCurrentUser, currentUser } = props
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkUserAction())

    // const authListener = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await handleUserProfile(userAuth);
    //     onSnapshot(userRef, snapshot => {
    //       setCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data(),
    //       })
    //     })
    //   }
    //   setCurrentUser(userAuth);
    // });

    // return () => {
    //   authListener();
    // }
  }, [])

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={
          <MainLayout>
            <Homepage />
          </MainLayout>

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

        <Route path='/dashboard' element={
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
        } />

      </Routes>
    </div>
  );
  // }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
