import Navbar from "./src/components/Navbar";
import Footer from "./src/components/Footer";
import { Outlet } from "react-router-dom";


const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </>
  );
};

export default App;
