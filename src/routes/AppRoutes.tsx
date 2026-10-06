import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/About";
import Convert from "@/pages/Convert";
import Home from "@/pages/Home";
import Merge from "@/pages/Merge";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Donate from "@/pages/Donate";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="convert" element={<Convert />} />
        <Route path="merge" element={<Merge />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="donate" element={<Donate />} />
        <Route path="tools" element={<Navigate to="/" replace />} />
        <Route path="tools/*" element={<Navigate to="/convert" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
