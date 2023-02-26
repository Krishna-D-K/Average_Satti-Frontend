import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import About from './Pages/About';
import Admin from './Pages/Admin';
import Content from './Pages/Content';
import Contribute from './Pages/Contribute';
import Course from './Pages/Course';
import Home from "./Pages/Home";
import Login from './Pages/Login';

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path = "/" element = {<Home />} />
        <Route exact path = "/login" element = {!user? <Login />: <Navigate to = "/admin" />} />
        <Route exact path = "/courses" element = {<Course />} />
        <Route exact path = "/content/:code" element = {<Content />} />
        <Route exact path = "/about" element = {<About />} />
        <Route exact path = "/admin" element = {user ? <Admin/> : <Navigate to = "/login" />} />
        <Route exact path = "/contribute/:code" element = {<Contribute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
