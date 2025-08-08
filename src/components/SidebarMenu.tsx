// src/components/SidebarMenu.tsx
import { Link } from "react-router-dom";
import { FilePlus, FileText, ChevronLeft } from "lucide-react";

const SidebarMenu = () => {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 shadow-md flex flex-col p-4 gap-4">
      <button className="border p-2 rounded-md w-fit">
        <ChevronLeft />
      </button>

      <nav className="flex flex-col gap-2 mt-4">
        <Link
          to="/boletas/nueva"
          className="inline-flex items-center gap-2 text-violet-600 hover:underline"
        >
          <FilePlus className="w-5 h-5" />
          Nueva Boleta
        </Link>
        <Link
          to="/boletas"
          className="inline-flex items-center gap-2 text-violet-600 hover:underline"
        >
          <FileText className="w-5 h-5" />
          Listado de Boletas
        </Link>
      </nav>
    </aside>
  );
};

export default SidebarMenu;
