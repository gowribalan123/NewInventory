import React, { useState } from "react";
import { FolderOpen, Database, Trash2 } from "lucide-react";

/**
 * RestoreDatabase.jsx
 * UI replicated from your screenshot
 * Matches classic Restore Database / Delete Database window
 * You can integrate this exactly like BrandIndex.jsx pattern
 */

export default function RestoreDatabase() {
  const [activeTab, setActiveTab] = useState("restore");
  const [dbName, setDbName] = useState("SiftProfitPlus");
  const [backupPath, setBackupPath] = useState("");

  const handleBrowse = () => {
    // later connect to file picker
    alert("Browse backup file");
  };

  const handleRestore = () => {
    console.log("Restore clicked", { dbName, backupPath });
  };

  const handleDelete = () => {
    console.log("Delete clicked", { dbName });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      
      {/* Window */}
      <div className="w-[500px] bg-slate-200 border border-slate-400 shadow-xl">

        {/* Title bar */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-3 py-1 flex items-center justify-between">
          <span className="text-sm font-semibold">Restore</span>
          <div className="flex gap-2">
            <button className="hover:bg-red-500 px-2">×</button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex gap-2 p-2 border-b bg-slate-300">
          <Database className="w-5 h-5 cursor-pointer" />
          <FolderOpen className="w-5 h-5 cursor-pointer" />
          <Trash2 className="w-5 h-5 cursor-pointer" />
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-slate-200">
          <button
            onClick={() => setActiveTab("restore")}
            className={`px-4 py-2 text-sm border-r ${
              activeTab === "restore"
                ? "bg-white border-t border-l border-r border-slate-400"
                : "bg-slate-200"
            }`}
          >
            Restore Database
          </button>

          <button
            onClick={() => setActiveTab("delete")}
            className={`px-4 py-2 text-sm ${
              activeTab === "delete"
                ? "bg-white border-t border-l border-r border-slate-400"
                : "bg-slate-200"
            }`}
          >
            Delete Database
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-white border m-3">

          {activeTab === "restore" && (
            <div className="space-y-4">

              {/* Database Name */}
              <div className="flex items-center gap-3">
                <label className="w-40 text-sm">New Database Name</label>
                <input
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  className="border px-2 py-1 text-sm w-full"
                />
              </div>

              {/* Backup Path */}
              <div className="flex items-center gap-3">
                <label className="w-40 text-sm">Back Up Location</label>
                <input
                  value={backupPath}
                  onChange={(e) => setBackupPath(e.target.value)}
                  className="border px-2 py-1 text-sm w-full"
                />

                <button
                  onClick={handleBrowse}
                  className="border px-2 py-1 bg-slate-200 hover:bg-slate-300"
                >
                  <FolderOpen className="w-4 h-4" />
                </button>
              </div>

              {/* Restore Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleRestore}
                  className="bg-blue-600 text-white px-4 py-1 text-sm hover:bg-blue-700"
                >
                  Restore
                </button>
              </div>

            </div>
          )}

          {activeTab === "delete" && (
            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <label className="w-40 text-sm">Database Name</label>
                <input
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  className="border px-2 py-1 text-sm w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-1 text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
