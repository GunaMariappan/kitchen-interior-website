import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/WhatsappButton/WhatsappButton";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Designs from "./pages/Designs";
import DesignDetails from "./pages/DesignDetails";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Enquiries from "./pages/Admin/Enquiries";
import AdminDesigns from "./pages/Admin/Designs";
import DesignForm from "./pages/Admin/DesignForm";
import AdminProjects from "./pages/Admin/Projects";
import ProjectForm from "./pages/Admin/ProjectForm";

const PublicSite = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/designs" element={<Designs />} />
      <Route path="/designs/:slug" element={<DesignDetails />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    <WhatsAppButton />
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="designs" element={<AdminDesigns />} />
        <Route path="designs/new" element={<DesignForm />} />
        <Route path="designs/edit/:slug" element={<DesignForm />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/edit/:slug" element={<ProjectForm />} />
      </Route>

      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}

export default App;