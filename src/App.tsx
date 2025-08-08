// src/App.tsx
import SidebarMenu from "./components/SidebarMenu";
import { Routes, Route } from "react-router-dom";
import BoletasPage from "./pages/BoletasPage";
import NuevaBoletaPage from "./pages/NuevaBoletaPage";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <SidebarMenu />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            GEIGV Muni Santa Cruz
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Gestor de Información de Gestión Vial de la Municipalidad de Santa Cruz
          </p>
        </header>

        <Routes>
          <Route path="/boletas" element={<BoletasPage />} />
          <Route path="/boletas/nueva" element={<NuevaBoletaPage />} />
        </Routes>
      </main>
    </div>
  );
}
