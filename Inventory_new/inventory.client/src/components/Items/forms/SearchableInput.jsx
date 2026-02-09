import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function SearchableInput({ label, name, value, onChange, items, onItemsChange, placeholder }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const inputStyle = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-all";
    const labelStyle = "block text-xs font-medium text-gray-600 mb-1.5";

    const filteredItems = value ? items.filter(item => item.toLowerCase().includes(value.toLowerCase())) : items;
    const exactMatch = items.some(item => item.toLowerCase() === value?.toLowerCase());

    const handleSelect = (item) => {
        onChange({ target: { name, value: item } });
        setShowDropdown(false);
    };

    const handleAdd = () => {
        if (value && !exactMatch) {
            onItemsChange([...items, value]);
            setShowDropdown(false);
        }
    };

    return (
        <div>
            <label className={labelStyle}>{label}</label>
            <div className="relative">
                <input
                    className={inputStyle}
                    name={name}
                    value={value || ''}
                    onChange={(e) => {
                        onChange(e);
                        if (!showDropdown) setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    placeholder={placeholder || `Type or select a ${label.toLowerCase()}`}
                    autoComplete="off"
                />
                {showDropdown && (
                    <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto mt-1">
                        {filteredItems.map(item => (
                            <div key={item} className="px-3 py-2 hover:bg-blue-50 cursor-pointer" onMouseDown={() => handleSelect(item)}>{item}</div>
                        ))}
                        {value && !exactMatch && (<div className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center text-blue-600 font-medium" onMouseDown={handleAdd}><Plus size={16} className="mr-2" /> Add "{value}"</div>)}
                    </div>
                )}
            </div>
        </div>
    );
}