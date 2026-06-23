import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import Hog from "./pages/Hog";
import NotFound from "./pages/NotFound";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/hog" element={<Hog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>
);

export default App;
