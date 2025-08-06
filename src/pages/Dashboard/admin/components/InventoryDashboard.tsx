import React, { useState } from "react";
import {
  Pill,
  Table2,
  AlarmClock,
  FlaskConical,
  Search,
  Trash2,
  Tablet,
  Plus,
  Pencil,
} from "lucide-react";

// ---------- Types ----------
interface Stat {
  title: string;
  value: string;
  icon: JSX.Element;
  bg: string;
  textColor: string;
  subText: string;
}

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

interface Medicine {
  id: string;
  name: string;
  category: string;
  stockStatus: StockStatus;
  quantity: number;
  supplier: string;
  price: number;
  expiryDate: string; // YYYY-MM-DD
  batch: string;
}

// ---------- Stats Data ----------
const stats: Stat[] = [
  {
    title: "Total Medicines",
    value: "2,567",
    icon: <Pill className="w-8 h-8 text-blue-500" />,
    bg: "bg-blue-100",
    textColor: "text-blue-600",
    subText: "Different types",
  },
  {
    title: "Total Stock",
    value: "3,190",
    icon: <Table2 className="w-8 h-8 text-green-400" />,
    bg: "bg-green-100",
    textColor: "text-green-600",
    subText: "Units available",
  },
  {
    title: "Low Stock Items",
    value: "03",
    icon: <AlarmClock className="w-8 h-8 text-red-500" />,
    bg: "bg-red-100",
    textColor: "text-red-600",
    subText: "Need restocking",
  },
  {
    title: "Total Value",
    value: "$20,928.3",
    icon: <FlaskConical className="w-8 h-8 text-pink-500" />,
    bg: "bg-purple-100",
    textColor: "text-purple-600",
    subText: "Inventory worth",
  },
];

// ---------- Medicine Data ----------
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

const stockStatusColors: Record<StockStatus, string> = {
  "In Stock": "bg-green-100 text-green-600",
  "Low Stock": "bg-yellow-100 text-yellow-600",
  "Out of Stock": "bg-red-100 text-red-600",
};

const getExpiryStatus = (expiryDate: string): "expired" | "soon" | "ok" => {
  const today = new Date();
  const expDate = new Date(expiryDate);
  const diffDays = (expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return "expired";
  if (diffDays <= 30) return "soon";
  return "ok";
};

const InventoryDashboard: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedStockStatus, setSelectedStockStatus] = useState<
    "All Stocks" | StockStatus | string
  >("All Stocks");

  const categories = [
    "All Categories",
    ...Array.from(new Set(initialMedicines.map((med) => med.category))),
  ];

  const stockStatusOptions: (StockStatus | "All Stocks")[] = [
    "All Stocks",
    "In Stock",
    "Low Stock",
    "Out of Stock",
  ];

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" || med.category === selectedCategory;

    const matchesStock =
      selectedStockStatus === "All Stocks" || med.stockStatus === selectedStockStatus;

    return matchesSearch && matchesCategory && matchesStock;
  });

  const deleteMedicine = (id: string) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setMedicines((prev) => prev.filter((med) => med.id !== id));
    }
  };

  const addMedicine = (med: Medicine) => {
    alert(`Add button clicked for ${med.name}`);
  };

  const editMedicine = (med: Medicine) => {
    alert(`Edit button clicked for ${med.name}`);
  };

  const handleAddNew = () => {
    alert("Add New Medicine clicked");
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1376px] space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-4 rounded-xl bg-white border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${stat.bg}`}>{stat.icon}</div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h2 className="text-2xl font-bold text-gray-900">{stat.value}</h2>
                </div>
              </div>
              <p className={`text-sm font-medium mt-2 ${stat.textColor}`}>
                {stat.subText}
              </p>
            </div>
          ))}
        </div>

        {/* Medicine Inventory Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Medicine Inventory
            </h1>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-1 px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 w-full">
            {/* Search */}
            <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 bg-gray-50 flex-grow">
              <Search className="text-gray-500 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            {/* Category */}
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto flex-grow"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Stock */}
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto flex-grow"
              value={selectedStockStatus}
              onChange={(e) => setSelectedStockStatus(e.target.value)}
            >
              {stockStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[700px] border-collapse">
              <thead className="bg-blue-50 text-gray-700 text-sm border-b border-gray-200">
                <tr>
                  {[
                    "SL",
                    "Medicine Name",
                    "Company",
                    "Stock",
                    "Price",
                    "Expiry Date",
                    "Status",
                    "Action",
                  ].map((head) => (
                    <th
                      key={head}
                      className="py-3 px-4 text-left font-semibold border-r border-gray-200 last:border-r-0"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((med, index) => (
                    <React.Fragment key={med.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-r border-gray-200">{index + 1}</td>
                        <td className="py-3 px-4 border-r border-gray-200">
                          <div className="flex items-center gap-2 font-semibold text-gray-800">
                            <Tablet className="w-4 h-4 text-blue-500" />
                            {med.name}
                          </div>
                          <div className="text-xs text-gray-500 italic">
                            Batch: {med.batch}
                          </div>
                        </td>
                        <td className="py-3 px-4 border-r border-gray-200">{med.supplier}</td>
                        <td className="py-3 px-4 border-r border-gray-200">{med.quantity}</td>
                        <td className="py-3 px-4 border-r border-gray-200">
                          ${med.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 border-r border-gray-200">
                          {(() => {
                            const status = getExpiryStatus(med.expiryDate);
                            if (status === "expired")
                              return (
                                <span className="text-red-600 font-semibold">
                                  {med.expiryDate} (Expired)
                                </span>
                              );
                            if (status === "soon")
                              return (
                                <span className="text-orange-500 font-semibold">
                                  {med.expiryDate} (Expiring Soon)
                                </span>
                              );
                            return med.expiryDate;
                          })()}
                        </td>
                        <td className="py-3 px-4 border-r border-gray-200">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              stockStatusColors[med.stockStatus]
                            }`}
                          >
                            {med.stockStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 flex gap-2">
                          <button
                            onClick={() => addMedicine(med)}
                            className="p-1 rounded hover:bg-green-100 text-green-600"
                            title="Add"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => editMedicine(med)}
                            className="p-1 rounded hover:bg-yellow-100 text-yellow-600"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteMedicine(med.id)}
                            className="p-1 rounded hover:bg-red-100 text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      {index !== filteredMedicines.length - 1 && (
                        <tr>
                          <td colSpan={8} className="border-b border-gray-200" />
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-400 italic">
                      No medicines found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
