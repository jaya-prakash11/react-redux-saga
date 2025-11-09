import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddEditUser from "./Pages/AddEditUser";
import UserInfo from "./Pages/UserInfo";
import About from "./Pages/About";
import Header from "./component/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addUser" element={<AddEditUser />}></Route>
          <Route path="/editUser/:id" element={<AddEditUser />}></Route>
          <Route path="/userInfo/:id" element={<UserInfo />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
