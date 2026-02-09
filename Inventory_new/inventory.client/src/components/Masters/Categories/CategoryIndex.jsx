import { useState } from "react";
import CategoriesForm from "./CategoriesForm";
import CategoriesList from "./CategoriesList";

export default function CategoryIndex() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Laptops", group: "Electronics" },
    { id: 2, name: "Sofas", group: "Furniture" },
    { id: 3, name: "Shirts", group: "Clothing" },
    { id: 4, name: "Smartphones", group: "Electronics" },
    { id: 5, name: "Desks", group: "Furniture" },
  ]);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleSave = (categoryData) => {
    if (categoryData.id) {
      setCategories(categories.map((c) => (c.id === categoryData.id ? categoryData : c)));
      setEditingCategory(null);
    } else {
      const newCategory = {
        id: categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
        ...categoryData,
      };
      setCategories([...categories, newCategory]);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleDeleteSelected = (ids) => {
    if (window.confirm(`Are you sure you want to delete ${ids.length} categories?`)) {
      setCategories(categories.filter((c) => !ids.includes(c.id)));
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  return (
    <div className="w-full space-y-6">

      {/* PAGE HEADER */}
      <div className="bg-white border border-gray-200 rounded-md px-5 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Categories
        </h1>
        <p className="text-sm text-gray-500">
          Create and manage categories under category groups
        </p>
      </div>

      {/* FORM */}
      <CategoriesForm onSave={handleSave} editingCategory={editingCategory} onCancel={handleCancelEdit}
      />

      {/* LIST */}
      <CategoriesList data={categories} onEdit={handleEdit} onDelete={handleDelete} onDeleteSelected={handleDeleteSelected}
      />

    </div>
  );
}
