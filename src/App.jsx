import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import { Body } from "./components/Body"
import { Login } from "./components/Login"
import { SignUp } from "./components/SignUp"
import { Provider, useSelector } from "react-redux"
import appStore from "./utils/appStore"
import { Profile } from "./components/Profile"
import { User } from "./components/User"
import { ToastContainer } from "react-toastify";
import { Chats } from "./components/Chats"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <ToastContainer />
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={ <Body/>}>
            <Route path="/" element={<User/>}/>
            <Route
                path="/login"
                element={<ProtectedLoginRoute><Login /></ProtectedLoginRoute>}
            />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/chat/:toUser" element={<Chats />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

const ProtectedLoginRoute = ({ children }) => {
  const user = useSelector((state) => state.user); 
  if (user) {

    return <Navigate to="/" />;
  }

  return children;
};

export default App