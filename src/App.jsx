import {Routes, Route} from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { Register } from "./components/auth/Register"
import { Login } from "./components/auth/login"
import { ApplicationViews } from "./views/ApplicationViews"

export const App = () => {
  return (
    <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route 
      path="*" 
      element={
        <Authorized>
            <ApplicationViews/>
        </Authorized>
        }
      />
    
  </Routes>
  )
}
  
