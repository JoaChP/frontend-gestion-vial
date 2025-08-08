// src/pages/BoletasPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoletas, deleteBoleta } from '../api/api';

export default function BoletasPage() {
  const [boletas, setBoletas] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getBoletas();
      setBoletas(res.data);
    } catch (err) {
      console.error('Error al cargar boletas', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Boletas</h2>

      <button
        onClick={() => navigate('/boletas/nueva')}
        className="mb-4 px-4 py-2 bg-white dark:bg-zinc-800 border rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700"
      >
        Crear boleta
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm">
          <thead className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Número</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Empresa</th>
              <th className="p-2 border">Monto</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {boletas.map((b) => (
              <tr key={b.id} className="text-center">
                <td className="p-2 border">{b.id}</td>
                <td className="p-2 border">{b.numero}</td>
                <td className="p-2 border">{new Date(b.fechaEmision).toLocaleDateString('es-ES')}</td>
                <td className="p-2 border">{b.empresa}</td>
                <td className="p-2 border">{b.monto}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => deleteBoleta(b.id).then(load)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => navigate(`/boletas/editar/${b.id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
