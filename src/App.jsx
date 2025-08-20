import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProtectedRoute from './pages/routes/ProtectedRoute'
import AppRoutes from './pages/routes/AppRoutes'

function App() {

  return (
    <>
      {/* <Login /> */}
      {/* <Header /> */}
      {/* <SubHeader /> */}
      {/* <SubData /> */}
      {/* <SubDetail />
      <Footer /> */}
      <Router>
        <AppRoutes />
      </Router>
    </>
  )
}

export default App














































































