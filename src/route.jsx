import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPrincipal from './pages/MenuPrincipal/MenuPrincipal.jsx'
import NumeroNequi from './pages/MenuNequi/NumeroNequi.jsx'
import ClaveNequi from './pages/MenuNequi/ClaveNequi.jsx'
import RetiroNequi from './pages/MenuNequi/RetiroNequi.jsx'
import NumeroBancolombia from './pages/MenuBancolombia/NumeroBancolombia.jsx'
import ClaveBancolombia from './pages/MenuBancolombia/ClaveBancolombia.jsx'
import RetiroBancolombia from './pages/MenuBancolombia/RetiroBancolombia.jsx'
import NumeroAlaMano from './pages/MenuAlaMano/NumeroAlaMano.jsx'
import ClaveAlaMano from './pages/MenuAlaMano/ClaveAlaMano.jsx'
import RetiroAlaMano from './pages/MenuAlaMano/RetiroAlaMano.jsx'
import ReporteNequi from "./pages/MenuNequi/ReporteNequi.jsx";
import ReporteBancolombia from "./pages/MenuBancolombia/ReporteBancolombia.jsx";
import ReporteAlaMano from "./pages/MenuAlaMano/ReporteAlaMano.jsx";

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPrincipal />} />
        <Route path="/nequi/numero" element={<NumeroNequi />} />
        <Route path="/nequi/clave" element={<ClaveNequi />} />
        <Route path="/nequi/retiro" element={<RetiroNequi />} />
        <Route path="/nequi/reporte" element={<ReporteNequi />} />
        <Route path="/bancolombia/numero" element={<NumeroBancolombia />} />
        <Route path="/bancolombia/clave" element={<ClaveBancolombia />} />
        <Route path="/bancolombia/retiro" element={<RetiroBancolombia />} />
        <Route path="/bancolombia/reporte" element={<ReporteBancolombia />} />
        <Route path="/alamano/numero" element={<NumeroAlaMano />} />
        <Route path="/alamano/clave" element={<ClaveAlaMano />} />
        <Route path="/alamano/retiro" element={<RetiroAlaMano />} />
        <Route path="/alamano/reporte" element={<ReporteAlaMano />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas
