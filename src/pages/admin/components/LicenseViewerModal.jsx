const LicenseViewerModal = ({ open, onClose, fileURL, fileName }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Doctor License</h2>

        {fileURL ? (
          <iframe
            src={fileURL}
            title={fileName}
            className="w-full h-[400px] border rounded"
          />
        ) : (
          <p className="text-gray-500 text-sm">No license uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default LicenseViewerModal;
