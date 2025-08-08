import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoleta } from "../api/api";

export default function NuevaBoletaPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numero: "",
    fechaEmision: "",
    monto: "",
    empresa: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBoleta({
      ...formData,
      monto: Number(formData.monto), // ✅ conversión necesaria
    });
    navigate("/boletas");
  };

  return (
    <section className="p-6">
      <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-2">
        GEIGV Muni Santa Cruz
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
        Gestor de Información de Gestión Vial de la Municipalidad de Santa Cruz
      </p>

      <h2 className="text-2xl font-bold mb-6">Agregar Nueva Boleta</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="flex flex-col">
          <label htmlFor="numero" className="mb-1 font-medium">Número de Boleta</label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="fechaEmision" className="mb-1 font-medium">Fecha de Emisión</label>
          <input
            type="date"
            id="fechaEmision"
            name="fechaEmision"
            value={formData.fechaEmision}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="monto" className="mb-1 font-medium">Monto</label>
          <input
            type="number"
            id="monto"
            name="monto"
            value={formData.monto}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="empresa" className="mb-1 font-medium">Empresa</label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
        </div>

        <button type="submit" className="bg-zinc-100 hover:bg-zinc-200 text-black px-4 py-2 rounded">
          Guardar Boleta
        </button>
      </form>
    </section>
  );
}
