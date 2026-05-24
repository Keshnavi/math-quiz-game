import{BrowserRouter, Routes,Route} from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import Game from './Components/Game'
import Leaderboard from './Components/Leaderboard'




function App() {
  return (
    <div className="App">
    {<BrowserRouter>
      <Routes>
        <Route path = "/home" element={<Home/>}></Route>
        <Route path = "/signup" element={<Signup/>}></Route>
        <Route path = "/" element={<Login/>}></Route>
        <Route path = "/game" element={<Game/>}></Route>
        <Route path = "/leaderboard" element={<Leaderboard/>}></Route>
   
      </Routes>
    </BrowserRouter>}
  </div>
    
  )
}

export default App
