import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2, X, Check, Tablet } from "lucide-react";

/* ---------------- Types ---------------- */

interface Medicine {
  id: string;
  name: string;
  category: string;
  stockStatus: string;
  quantity: number;
  supplier: string;
  price: number;
  expiryDate: string;
  batch: string;
}

type ExpiryStatus = "expired" | "soon" | "ok";

/* ---------------- Constants/Mock Data ---------------- */

const initialMedicines: Medicine[] = [
  {
    id: "#M001",
    name: "Paracetamol",
    category: "Pain Relief",
    stockStatus: "In Stock",
    quantity: 120,
    supplier: "HealthCorp",
    price: 5.5,
    expiryDate: "2025-12-31",
    batch: "BATCH001",
  },
  {
    id: "#M002",
    name: "Amoxicillin",
    category: "Antibiotics",
    stockStatus: "Low Stock",
    quantity: 15,
    supplier: "MedSuppliers",
    price: 12.0,
    expiryDate: "2024-08-15",
    batch: "BATCH002",
  },
  {
    id: "#M003",
    name: "Ibuprofen",
    category: "Pain Relief",
    stockStatus: "Out of Stock",
    quantity: 0,
    supplier: "PharmaPlus",
    price: 8.75,
    expiryDate: "2023-11-30",
    batch: "BATCH003",
  },
];

const stockStatusColors: Record<string, string> = {
  "In Stock": "bg-green-100 text-green-600",
  "Low Stock": "bg-yellow-100 text-yellow-600",
  "Out of Stock": "bg-red-100 text-red-600",
};

const categories = ["Pain Relief", "Antibiotics", "Vitamins", "Supplements", "Others"];
const stockStatuses = ["In Stock", "Low Stock", "Out of Stock"];

/* ---------------- Helper ---------------- */

const getExpiryStatus = (expiryDate: string): ExpiryStatus => {
  const today = new Date();
  const expDate = new Date(expiryDate);
  const diffDays = (expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return "expired";
  if (diffDays <= 30) return "soon";
  return "ok";
};

/* ---------------- Component ---------------- */

const MedicineInventory: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStockStatus, setFilterStockStatus] = useState("All");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Medicine>({
    id: "",
    name: "",
    category: categories[0],
    stockStatus: stockStatuses[0],
    quantity: 0,
    supplier: "",
    price: 0,
    expiryDate: "",
    batch: "",
  });

  const filteredMedicines = medicines.filter((m) => {
    const search = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.toLowerCase().includes(searchTerm.toLowerCase());
    const cat = filterCategory === "All Categories" || m.category === filterCategory;
    const stk = filterStockStatus === "All" || m.stockStatus === filterStockStatus;
    return search && cat && stk;
  });

  const startEditing = (m: Medicine) => {
    setEditingId(m.id);
    setEditForm(m);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleEditChange = (field: keyof Medicine, value: string | number) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = (id: string) => {
    if (!editForm.name.trim() || !editForm.supplier.trim() || !editForm.expiryDate.trim()) {
      alert("All required fields must be filled");
      return;
    }
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...editForm, id } : m))
    );
    setEditingId(null);
  };

  const deleteMedicine = (id: string) => {
    if (window.confirm("Delete this item?")) {
      setMedicines((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h1 className="text-2xl font-bold">Medicine Inventory</h1>
        <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-md text-sm">
          <Plus className="w-4 h-4" /> Add New Medicine
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex items-center border border-gray-200 px-3 py-2 rounded-md bg-gray-50 flex-grow md:w-[487px]">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            placeholder="Search medicines..."
            className="bg-transparent outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50 text-sm flex-grow md:w-[487px]"
        >
          <option>All Categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={filterStockStatus}
          onChange={(e) => setFilterStockStatus(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50 text-sm flex-grow md:w-[487px]"
        >
          <option>All</option>
          {stockStatuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-[700px] w-full border-collapse">
          <thead className="bg-blue-50 text-gray-700 text-sm border-b border-gray-200">
            <tr>
              <th className="py-3 px-4">SL</th>
              <th className="py-3 px-4">Medicine Name</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Expiry Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {filteredMedicines.map((m, i) =>
              editingId === m.id ? (
                <tr key={m.id} className="bg-gray-100">
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      className="border w-full rounded px-2 py-1"
                      value={editForm.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      className="border w-full rounded px-2 py-1"
                      value={editForm.supplier}
                      onChange={(e) =>
                        handleEditChange("supplier", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min={0}
                      className="border w-full rounded px-2 py-1"
                      value={editForm.quantity}
                      onChange={(e) =>
                        handleEditChange("quantity", Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      className="border w-full rounded px-2 py-1"
                      value={editForm.price}
                      onChange={(e) =>
                        handleEditChange("price", Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="date"
                      className="border w-full rounded px-2 py-1"
                      value={editForm.expiryDate}
                      onChange={(e) =>
                        handleEditChange("expiryDate", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-3 px-4">
                    <select
                      className="border rounded px-2 py-1 w-full"
                      value={editForm.stockStatus}
                      onChange={(e) =>
                        handleEditChange("stockStatus", e.target.value)
                      }
                    >
                      {stockStatuses.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                      onClick={() => saveEdit(m.id)}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                      onClick={cancelEditing}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 font-semibold">
                      <Tablet className="w-4 h-4 text-blue-500" /> {m.name}
                    </div>
                    <div className="text-xs italic text-gray-500">
                      Batch: {m.batch}
                    </div>
                  </td>
                  <td className="py-3 px-4">{m.supplier}</td>
                  <td className="py-3 px-4">{m.quantity}</td>
                  <td className="py-3 px-4">${m.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    {(() => {
                      const s = getExpiryStatus(m.expiryDate);
                      if (s === "expired") {
                        return (
                          <span className="text-red-600 font-semibold">
                            {m.expiryDate} (Expired)
                          </span>
                        );
                      }
                      if (s === "soon") {
                        return (
                          <span className="text-orange-500 font-semibold">
                            {m.expiryDate} (Expiring Soon)
                          </span>
                        );
                      }
                      return m.expiryDate;
                    })()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        stockStatusColors[m.stockStatus]
                      }`}
                    >
                      {m.stockStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      className="p-1 rounded hover:bg-blue-100 text-blue-600"
                      onClick={() => startEditing(m)}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 rounded hover:bg-red-100 text-red-600"
                      onClick={() => deleteMedicine(m.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineInventory;
