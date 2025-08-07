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

/* ---------------- Constants ---------------- */
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

/* ---------------- Styles & Helpers ---------------- */
const stockStatusColors: Record<string, string> = {
  "In Stock": "bg-green-100 text-green-600",
  "Low Stock": "bg-yellow-100 text-yellow-600",
  "Out of Stock": "bg-red-100 text-red-600",
};

const categories = ["Pain Relief", "Antibiotics", "Vitamins", "Supplements", "Others"];
const stockStatuses = ["In Stock", "Low Stock", "Out of Stock"];

const getExpiryStatus = (expiryDate: string): ExpiryStatus => {
  const today = new Date();
  const expDate = new Date(expiryDate);
  const diffDays = (expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return "expired";
  if (diffDays <= 30) return "soon";
  return "ok";
};

/* ---------------- Summary Cards Data ---------------- */
const summaryCards = [
  {
    title: "Total Medicines",
    value: "2,567",
    subtitle: "Different types",
    icon: "🔒",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Total Stock",
    value: "3,190",
    subtitle: "Units available",
    icon: "📦",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
    subtitleColor: "text-green-600",
  },
  {
    title: "Low Stock Items",
    value: "03",
    subtitle: "Need restocking",
    icon: "🔔",
    iconBg: "bg-red-100",
    iconText: "text-red-600",
    subtitleColor: "text-red-600",
  },
  {
    title: "Total Value",
    value: "$20,928.3",
    subtitle: "Inventory worth",
    icon: "💰",
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
    subtitleColor: "text-purple-600",
  },
];

/* ---------------- Main Component ---------------- */
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
    const search =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase());
    const cat = filterCategory === "All Categories" || m.category === filterCategory;
    const stk = filterStockStatus === "All" || m.stockStatus === filterStockStatus;
    return search && cat && stk;
  });

  const startEditing = (m: Medicine) => {
    setEditingId(m.id);
    setEditForm(m);
  };

  const cancelEditing = () => setEditingId(null);

  const handleEditChange = (field: keyof Medicine, value: string | number) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = (id: string) => {
    if (!editForm.name.trim() || !editForm.supplier.trim() || !editForm.expiryDate.trim()) {
      alert("All required fields must be filled");
      return;
    }
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...editForm, id } : m)));
    setEditingId(null);
  };

  const deleteMedicine = (id: string) => {
    if (window.confirm("Delete this item?")) {
      setMedicines((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen w-full">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-6">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6  border border-gray-200 flex flex-col items-start"
          >
            {/* Title */}
            <div className="text-gray-500 text-sm font-medium mb-3">{card.title}</div>

            {/* Icon and Value side by side */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${card.iconBg} ${card.iconText} flex items-center justify-center text-base`}
              >
                {card.icon}
              </div>
              <div className="text-gray-900 text-3xl font-bold">{card.value}</div>
            </div>

            {/* Subtitle */}
            <div className={`text-xs font-normal ${card.subtitleColor}`}>{card.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Medicine Inventory */}
      <div className="w-full">
        {/* Header & Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 w-full">
          <h1 className="text-2xl font-bold">Medicine Inventory</h1>
          <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-md text-sm whitespace-nowrap">
            <Plus className="w-4 h-4" /> Add New Medicine
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 w-full">
          <div className="flex items-center border border-gray-200 px-3 py-2 rounded-md bg-gray-50">
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
            className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50 text-sm w-full"
          >
            <option>All Categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={filterStockStatus}
            onChange={(e) => setFilterStockStatus(e.target.value)}
            className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50 text-sm w-full"
          >
            <option>All</option>
            {stockStatuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block border border-gray-200 rounded-lg  overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <thead className="bg-blue-50 text-gray-700 text-sm border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">SL</th>
                <th className="py-3 px-4 text-left border-l">Medicine Name</th>
                <th className="py-3 px-4 text-left border-l">Company</th>
                <th className="py-3 px-4 text-left border-l">Stock</th>
                <th className="py-3 px-4 text-left border-l">Price</th>
                <th className="py-3 px-4 text-left border-l">Expiry Date</th>
                <th className="py-3 px-4 text-left border-l">Status</th>
                <th className="py-3 px-4 text-left border-l">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {filteredMedicines.map((m, i) =>
                editingId === m.id ? (
                  <tr key={m.id} className="bg-gray-100 border-b border-gray-200">
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4 border-l">
                      <input
                        type="text"
                        className="border w-full rounded px-2 py-1"
                        value={editForm.name}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-4 border-l">
                      <input
                        type="text"
                        className="border w-full rounded px-2 py-1"
                        value={editForm.supplier}
                        onChange={(e) => handleEditChange("supplier", e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-4 border-l">
                      <input
                        type="number"
                        min={0}
                        className="border w-full rounded px-2 py-1"
                        value={editForm.quantity}
                        onChange={(e) => handleEditChange("quantity", Number(e.target.value))}
                      />
                    </td>
                    <td className="py-3 px-4 border-l">
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        className="border w-full rounded px-2 py-1"
                        value={editForm.price}
                        onChange={(e) => handleEditChange("price", Number(e.target.value))}
                      />
                    </td>
                    <td className="py-3 px-4 border-l">
                      <input
                        type="date"
                        className="border w-full rounded px-2 py-1"
                        value={editForm.expiryDate}
                        onChange={(e) => handleEditChange("expiryDate", e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-4 border-l">
                      <select
                        className="border rounded px-2 py-1 w-full"
                        value={editForm.stockStatus}
                        onChange={(e) => handleEditChange("stockStatus", e.target.value)}
                      >
                        {stockStatuses.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 border-l flex gap-2">
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
                  <tr key={m.id} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4 border-l font-semibold">
                      <div className="flex items-center gap-2">
                        <Tablet className="w-4 h-4 text-blue-500" />
                        <span>{m.name}</span>
                      </div>
                      <div className="text-xs italic text-gray-500 mt-1 ml-6">Batch: {m.batch}</div>
                    </td>
                    <td className="py-3 px-4 border-l">{m.supplier}</td>
                    <td className="py-3 px-4 border-l">{m.quantity}</td>
                    <td className="py-3 px-4 border-l">${m.price.toFixed(2)}</td>
                    <td className="py-3 px-4 border-l">
                      {(() => {
                        const s = getExpiryStatus(m.expiryDate);
                        if (s === "expired")
                          return (
                            <span className="text-red-600 font-semibold">
                              {m.expiryDate} (Expired)
                            </span>
                          );
                        if (s === "soon")
                          return (
                            <span className="text-orange-500 font-semibold">
                              {m.expiryDate} (Expiring Soon)
                            </span>
                          );
                        return m.expiryDate;
                      })()}
                    </td>
                    <td className="py-3 px-4 border-l">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          stockStatusColors[m.stockStatus]
                        }`}
                      >
                        {m.stockStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-l flex gap-2">
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

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-4 w-full">
          {filteredMedicines.map((m) => (
            <div
              key={m.id}
              className="border border-gray-200 rounded-lg p-4  bg-white space-y-2"
            >
              <div className="flex justify-between items-center">
                <div className="font-bold text-base">{m.name}</div>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    stockStatusColors[m.stockStatus]
                  }`}
                >
                  {m.stockStatus}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Company:</strong> {m.supplier}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Batch:</strong> {m.batch}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Quantity:</strong> {m.quantity}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Price:</strong> ${m.price.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Expiry:</strong>{" "}
                {(() => {
                  const s = getExpiryStatus(m.expiryDate);
                  if (s === "expired")
                    return (
                      <span className="text-red-600 font-semibold">
                        {m.expiryDate} (Expired)
                      </span>
                    );
                  if (s === "soon")
                    return (
                      <span className="text-orange-500 font-semibold">
                        {m.expiryDate} (Expiring Soon)
                      </span>
                    );
                  return m.expiryDate;
                })()}
              </div>
              <div className="flex gap-2 pt-2">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineInventory;
