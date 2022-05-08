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
import { checkUserSession, setCurrentUser } from "./redux/User/user.actions"
import Dashboard from "./pages/Dashboard";
import WithAuth from "./hoc/withAuth"
import WithAdminAuth from "./hoc/withAdminAuth";
import Admin from "./pages/Admin";
import AdminToolbar from "./components/AdminToolbar";

const initialState = {
  currentUser: null,
}

const App = props => {
  const { setCurrentUser, currentUser } = props
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <div className="App">
      <AdminToolbar />
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

        <Route path='/admin' element={
          <WithAdminAuth>
            <MainLayout>
              <Admin />
            </MainLayout>
          </WithAdminAuth>
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
