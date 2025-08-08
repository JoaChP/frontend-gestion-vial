import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function BoletaForm() {
  const [numero, setNumero] = useState("");
  const [fecha, setFecha] = useState<Date | null>(null);
  const [monto, setMonto] = useState("");
  const [empresa, setEmpresa] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fecha) return;

    const nuevaBoleta = {
      numero,
      fechaEmision: format(fecha, "yyyy-MM-dd"), // para el backend
      monto: parseFloat(monto),
      empresa,
    };

    try {
      const res = await fetch("https://localhost:7118/api/boletas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaBoleta),
      });

      if (!res.ok) throw new Error("Error al guardar la boleta");

      alert("✅ Boleta guardada exitosamente");
      setNumero("");
      setFecha(null);
      setMonto("");
      setEmpresa("");
    } catch (err) {
      console.error(err);
      alert("❌ Error al guardar la boleta");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block font-medium">Número de Boleta</label>
        <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block font-medium">Fecha de Emisión</label>
        <DatePicker
          selected={fecha}
          onChange={(date: Date | null) => setFecha(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/mm/aaaa"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Monto</label>
        <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block font-medium">Empresa</label>
        <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Guardar Boleta
      </button>
    </form>
  );
}
