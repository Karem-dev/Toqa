import Main from "../components/Main";
import Featuerd from "../components/Featuerd";
import AboutUs from "../components/About";
import CoursesSection from "../components/CoursesSection";
import ComingSoonSection from "../components/ComingSoonSection";
import CustomerOpinionsSlider from "../components/Customers";
import Footer from "../components/Footer";
import TeacherSlider from './../components/Instructors';
import Nav from "../components/Nav";
function Home() {
  return (
    <>
    <Nav/>
      <Main  />
      <Featuerd />
      <AboutUs />
      {/* <WhyUsSection /> */}
      <CoursesSection />
      <TeacherSlider  />
      <ComingSoonSection />
      {/* <Contact/> */}
      <CustomerOpinionsSlider />
      <Footer />
    </>
  );
}

export default Home;
