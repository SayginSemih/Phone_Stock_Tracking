import { useEffect, useState } from 'react'
import './App.css'
import Header from "./component/Header/Header.jsx"
import Footer from "./component/Footer/Footer.jsx"
import AddPhone from "./pages/AddPhone/AddPhone.jsx"
import PhoneList from './pages/PhoneListe/PhoneList.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import axios from "axios";
import SellPhone from './pages/SellPhone/SellPhone.jsx'
import SellInformation from './pages/SellInformation/SellInformation.jsx'

function NotFound() {

  return (
    <>
      <center><h1>SAYFA BULUNAMADI</h1></center>
    </>
  )
}

function Logout() {
  localStorage.removeItem('token');
  window.location.href="/";
}

function App() {

  const [isLogin, setLogin] = useState(false)
  const [username, setUserName] = useState("");

  useEffect(() => {
    axios.post("http://localhost:3001/check-user", {
      token: localStorage.getItem("token")
    }).then(response => {
      console.log(response.data)
      if (response.data.data == "1") {
        setUserName(response.data.username)
        setLogin(true)
      }
    })
      .catch(err => {
        setUserName("")
        console.log("BAŞARISIZ")
        setLogin(false)
      })
  }, [])

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={isLogin ? <PhoneList /> : <LoginPage />} />
          <Route path="/login" element={isLogin ? <PhoneList /> : <LoginPage />} />
          <Route path="/phonelist" element={isLogin ? <PhoneList /> : <LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/addphone" element={isLogin ? <AddPhone /> : <LoginPage />} />
          <Route path="/sell-phone" element={isLogin ? <SellPhone /> : <LoginPage />} />
          <Route path="/sell-list" element={isLogin ? <SellInformation /> : <LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
