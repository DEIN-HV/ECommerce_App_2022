import Homepage from "./pages/Homepage";
import "./default.scss"
import Header from "./components/Header";
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// import Login from "./pages/Login";
// import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <Homepage />

      {/* <Routes>
        <Route path='/' element={
          <MainLayout>
            <Homepage />
          </MainLayout>
        } />

        <Route path='/registration' element={
          <MainLayout>
            <Registration />
          </MainLayout>
        } />

        <Route path='/login' element={
          <MainLayout>
            <Login />
          </MainLayout>
        } />

        <Route path='/signup' element={
          <MainLayout>
            <SignUp />
          </MainLayout>
        } />

      </Routes> */}
    </div>
  );
}

export default App;
