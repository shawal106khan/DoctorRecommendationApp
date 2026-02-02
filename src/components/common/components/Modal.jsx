const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="bg-slate-200 w-full max-w-lg rounded-lg shadow-lg">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-lg font-mono text-blue-600">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-4 font-serif text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
