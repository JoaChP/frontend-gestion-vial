// src/pages/ListarBoletasPage.tsx
import { useEffect, useState } from "react";

type Boleta = {
  id: number;
  numero: string;
  fechaEmision: string;
  monto: number;
  empresa: string;
};

export default function ListarBoletasPage() {
  const [boletas, setBoletas] = useState<Boleta[]>([]);

  useEffect(() => {
    const cargarBoletas = async () => {
      try {
        const res = await fetch("https://localhost:7118/api/boletas");
        const data = await res.json();
        setBoletas(data);
      } catch (err) {
        console.error("Error al cargar boletas", err);
      }
    };

    cargarBoletas();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Listado de Boletas</h1>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">#</th>
            <th className="border px-4 py-2 text-left">Número</th>
            <th className="border px-4 py-2 text-left">Fecha</th>
            <th className="border px-4 py-2 text-left">Monto</th>
            <th className="border px-4 py-2 text-left">Empresa</th>
          </tr>
        </thead>
        <tbody>
          {boletas.map((b, idx) => (
            <tr key={b.id}>
              <td className="border px-4 py-2">{idx + 1}</td>
              <td className="border px-4 py-2">{b.numero}</td>
              <td className="border px-4 py-2">{new Date(b.fechaEmision).toLocaleDateString("es-CR")}</td>
              <td className="border px-4 py-2">₡ {b.monto.toLocaleString()}</td>
              <td className="border px-4 py-2">{b.empresa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
