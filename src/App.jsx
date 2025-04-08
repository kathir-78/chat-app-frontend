import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Body } from "./components/body"
import { Login } from "./components/login"
import { SignUp } from "./Components/SignUp"


function App() {


  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={ <Body/>}>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<SignUp />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
