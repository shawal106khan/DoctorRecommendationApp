import { useEffect, useMemo, useRef, useState } from "react";

const DropdownSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select",
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const activeLabelFromValue = useMemo(() => {
    const match = options.find((o) => String(o.value) === String(value));
    return match?.label || "";
  }, [options, value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange?.({
      target: { name, value: option.value },
    });
    setOpen(false);
  };

  const displayText = useMemo(() => {
    if (activeLabelFromValue) return activeLabelFromValue;
    return placeholder;
  }, [activeLabelFromValue, placeholder]);

  return (
    <div className="mb-5" ref={wrapperRef}>
      {label && (
        <label className="block text-xs text-gray-600 mb-1 font-heading">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-3 border rounded-md shadow-lg shadow-blue-200
                   text-sm text-gray-700 font-serif
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   flex items-center justify-between"
      >
        <span className={activeLabelFromValue ? "" : "text-gray-400"}>
          {displayText}
        </span>
        <span className="text-gray-500 text-xl">▾</span>
      </button>

      {open && (
        <div
          className="mt-2 w-full max-h-64 overflow-auto rounded-md border bg-white shadow-lg"
          role="listbox"
        >
          {options.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              No options available
            </div>
          )}
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
              role="option"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
