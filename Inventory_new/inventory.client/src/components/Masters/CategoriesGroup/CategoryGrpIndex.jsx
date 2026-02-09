import { useState } from "react";
import CategoryGrpForm from "./CategoryGrpForm";
import CategoryGrpList from "./CategoryGrpList";

export default function CategoryGrpIndex() {
  const [groups, setGroups] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Furniture" },
    { id: 3, name: "Clothing" },
    { id: 4, name: "Stationery" },
    { id: 5, name: "Groceries" },
  ]);
  const [editingGroup, setEditingGroup] = useState(null);

  const handleSave = (groupData) => {
    if (groupData.id) {
      setGroups(groups.map((g) => (g.id === groupData.id ? groupData : g)));
      setEditingGroup(null);
    } else {
      const newGroup = {
        id: groups.length > 0 ? Math.max(...groups.map((g) => g.id)) + 1 : 1,
        name: groupData.name,
      };
      setGroups([...groups, newGroup]);
    }
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      setGroups(groups.filter((g) => g.id !== id));
    }
  };

  const handleDeleteSelected = (ids) => {
    if (window.confirm(`Are you sure you want to delete ${ids.length} groups?`)) {
      setGroups(groups.filter((g) => !ids.includes(g.id)));
    }
  };

  const handleCancelEdit = () => {
    setEditingGroup(null);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* PAGE HEADER */}
      <div className="bg-white border border-gray-200 rounded-md px-5 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Category Groups
        </h1>
        <p className="text-sm text-gray-500">
          Create and manage item category groups
        </p>
      </div>

      {/* FORM */}
      <CategoryGrpForm onSave={handleSave} editingGroup={editingGroup} onCancel={handleCancelEdit} />

      {/* LIST */}
      <CategoryGrpList 
        data={groups} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onDeleteSelected={handleDeleteSelected}
      />

    </div>
  );
}
