import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Body } from "./components/Body"
import { Login } from "./components/Login"
import { SignUp } from "./Components/SignUp"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import { Profile } from "./components/Profile"
import { User } from "./components/User"

function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={ <Body/>}>
            <Route path="/" element={<User/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/signup" element={<SignUp />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App