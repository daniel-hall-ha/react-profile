import NavBar from "./components/NavBar";
import "./App.css";
import Profile from "./sections/Profile";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Portfolios from "./sections/Portfolios";
import Certifications from "./sections/Certificates";
import Footer from "./sections/Footer";
import { useEffect } from "react";
import FetchData from "./middlewares/fetchData";
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchData("skills"));
    dispatch(FetchData("education"));
    dispatch(FetchData("certificates"));
    dispatch(FetchData("portfolios"));
    dispatch(FetchData("experience"));
  }, [dispatch]);

  return (
    <>
      <div className="w-screen h-fit text-gray-700 bg-cover bg-center dark:text-white dark:bg-gray-900">
        <NavBar />
        <Profile />
        <Skills />
        <Education />
        <Experience />
        <Portfolios />
        <Certifications />
        <Footer />
      </div>
    </>
  );
}

export default App;
