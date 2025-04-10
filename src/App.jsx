import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Body } from "./components/Body"
import { Login } from "./components/Login"
import { SignUp } from "./Components/SignUp"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import { Chats } from "./components/Chats"
import { Profile } from "./components/Profile"


function App() {

  return (

    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={ <Body/>}>
            <Route path="/" element={<Chats/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/register" element={<SignUp />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>

  )
}

export default App
