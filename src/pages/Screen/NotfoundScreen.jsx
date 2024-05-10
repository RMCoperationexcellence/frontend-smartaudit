import { logout } from "../../services/Auth/AuthService"
function NotfoundScreen() {
  return (
    <div>
        <h1>HELLO</h1>
        Not found 404 go back <button onClick={() => logout()}>ออกจากระบบ</button>
        </div>
    
  )
}

export default NotfoundScreen