import './style.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import UserList from './components/UserList';
import Adduser from './components/Adduser';
import Edituser from './components/Edituser';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/edituser/:id" element={<Edituser />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
