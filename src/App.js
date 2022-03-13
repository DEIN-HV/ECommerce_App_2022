import Homepage from "./pages/Homepage";
import "./default.scss"
import Header from "./components/Header";
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import SignIn from "./components/SignIn";
import { Component } from "react"
import { auth } from "./firebase/utils";

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
    this.authListener = auth.onAuthStateChanged(userAuth => {
      if (!userAuth)
        this.setState({
          ...initialState,
        });

      this.setState({
        currentUser: userAuth,
      })
    })
  }

  componentWillUnmount() {
    this.authListener();
  }


  render() {
    const { currentUser } = this.state
    return (
      <div className="App">

        <Routes>
          <Route path='/' element={
            <MainLayout currentUser={currentUser}>
              <Homepage />
            </MainLayout>
          } />

          <Route path='/registration' element={
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          } />

          <Route path='/login' element={
            <MainLayout currentUser={currentUser}>
              <Login />
            </MainLayout>
          } />

          <Route path='/signin' element={
            <MainLayout currentUser={currentUser}>
              <SignIn />
            </MainLayout>
          } />

        </Routes>
      </div>
    );
  }
}

export default App;
