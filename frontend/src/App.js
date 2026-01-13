import Navbar from "./components/NavBar";
import Home from "./pages/Home";
//import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Navbar />
      {/* Switch manually for now */}
      <Home />
      {/* <Login /> */}
    </div>
  );
}

export default App;
