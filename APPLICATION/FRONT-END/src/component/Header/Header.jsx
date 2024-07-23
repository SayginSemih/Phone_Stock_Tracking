import "./Header.css"
import bgImage from "../../img/bg-image.png"
import { useEffect , useState , useRef } from "react"
import axios from "axios"

function Header() {

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

  function goStock() {
    window.location.href="/phonelist";
  }

  function goAddPhone() {
    window.location.href="/addphone";
  }

  function goSellPhone() {
    window.location.href="/sell-phone";
  }

  function goSellList() {
    window.location.href="/sell-list";
  }

  return (
    <>
      <div className="header-wrapper">
        <div className="logo-wrapper">
          <div className="logo">LOGO</div>
        </div>
        <div>
          <ul>
            <li onClick={goStock}>Stoklar</li>
            |
            <li onClick={goAddPhone}>Telefon Ekle/Sil</li>
            |
            <li onClick={goSellPhone}>Satış Yap</li>
            |
            <li onClick={goSellList}>Satışlar</li>
          </ul>
        </div>
        <div className="userconrol-wrapper">
          {isLogin ? (
            <>
              <div><a className="routerLoginPage" href="/logout">| Çıkış Yap</a></div>
            </>
          ) : (
            <div><a className="routerLoginPage" href="/login">| Giriş Yap</a></div>
          )}
        </div>
      </div>
      <div className="bg-image">
        <img src={bgImage} alt="" />
      </div>
    </>
  );
}

export default Header
