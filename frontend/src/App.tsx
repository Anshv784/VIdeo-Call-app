import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Reciever} from "../Components/Reciever.tsx"
import {Sender} from "../Components/Sender.tsx"
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/sender" element={<Sender/>}/>  
        <Route path="/reciever" element={<Reciever/>}/>    
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
