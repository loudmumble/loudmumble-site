import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import Hog from "./pages/Hog";
import StructuredAnarchy from "./pages/StructuredAnarchy";
import NotFound from "./pages/NotFound";
import { createMarshaldClient } from "./lib/fleet/marshald-client";
import { createDarkwardenClient } from "./lib/fleet/darkwarden-client";

function FleetInit() {
  useEffect(() => {
    const marshaldUrl = import.meta.env.VITE_MARSHALD_URL || "";
    const dwUrl = import.meta.env.VITE_DW_URL || "";
    const dwToken = import.meta.env.VITE_DW_TOKEN || "";
    const dwCa = import.meta.env.VITE_DW_CA || "";

    // Marshald registration
    const mc = createMarshaldClient(marshaldUrl);
    if (mc) {
      mc.register().catch(() => {});
    }

    // Darkwarden enrollment
    const dw = createDarkwardenClient(dwUrl, dwToken, dwCa);
    if (dw) {
      dw.enroll().then((svid) => {
        if (svid) {
          dw.startAutoRenewal();
        }
      }).catch(() => {});
    }
  }, []);

  return null;
}

const App = () => (
  <HashRouter>
    <FleetInit />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/structured-anarchy" element={<StructuredAnarchy />} />
      <Route path="/hog" element={<Hog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>
);

export default App;
