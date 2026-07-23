import { X, FileText, ExternalLink } from "lucide-react";

const LicenseViewerModal = ({ open, onClose, fileURL }) => {
  if (!open) return null;

  // Open in new tab and close modal
  if (fileURL) {
    window.open(fileURL, "_blank");
    onClose();
    return null;
  }

  // Only show modal if no file
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_20px_60px_rgba(0,0,0,0.25)] w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/25 flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <p className="text-white font-bold text-sm">Doctor License</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-4">
            <FileText size={24} className="text-[#1A6FA8]" />
          </div>
          <p className="text-[#0D2E4E] font-bold mb-1">No License Uploaded</p>
          <p className="text-[#6B839A] text-sm">
            This doctor has not uploaded a license yet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LicenseViewerModal;
