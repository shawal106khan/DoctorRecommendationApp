import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../../../../components/common/components/Input";
import { updateAdminPassword } from "../../../../services/adminSettingsService";
import { Shield, Save, CheckCircle2, XCircle } from "lucide-react";

const SecurityPanel = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);

  const criteria = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "At least one uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "At least one lowercase letter", test: (p) => /[a-z]/.test(p) },
    { label: "At least one number", test: (p) => /[0-9]/.test(p) },
  ];

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const allPassed = criteria.every((c) => c.test(passwords.newPass));
    if (!passwords.current || !passwords.newPass || !passwords.confirmPass) {
      toast.error("Please fill all fields");
      return;
    }
    if (!allPassed) {
      toast.error("New password does not meet all requirements");
      return;
    }
    if (passwords.newPass !== passwords.confirmPass) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwords.current === passwords.newPass) {
      toast.error("New password must be different");
      return;
    }

    setLoading(true);
    try {
      await updateAdminPassword(passwords.newPass);
      toast.success("Password updated successfully");
      setPasswords({ current: "", newPass: "", confirmPass: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px] mb-1">
          Security
        </p>
        <h2 className="text-lg font-bold text-[#0D2E4E]">Login & Security</h2>
      </div>

      <div className="space-y-4">
        <Input
          label="Current Password"
          type={showPasswords ? "text" : "password"}
          name="current"
          placeholder="Current Password"
          value={passwords.current}
          onChange={handleChange}
        />
        <Input
          label="New Password"
          type={showPasswords ? "text" : "password"}
          name="newPass"
          placeholder="New Password"
          value={passwords.newPass}
          onChange={handleChange}
        />
        <Input
          label="Confirm Password"
          type={showPasswords ? "text" : "password"}
          name="confirmPass"
          placeholder="Confirm New Password"
          value={passwords.confirmPass}
          onChange={handleChange}
        />
      </div>

      {/* Show/hide toggle */}
      <label className="flex items-center gap-2 cursor-pointer w-fit">
        <input
          type="checkbox"
          checked={showPasswords}
          onChange={() => setShowPasswords(!showPasswords)}
          className="accent-[#1A6FA8]"
        />
        <span className="text-xs font-semibold text-[#4A6680]">
          Show Passwords
        </span>
      </label>

      {/* Password criteria */}
      {passwords.newPass && (
        <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl p-4 space-y-2">
          <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-2">
            Password Requirements
          </p>
          {criteria.map((c, idx) => {
            const passed = c.test(passwords.newPass);
            return (
              <div
                key={idx}
                className={`flex items-center gap-2 text-xs font-medium ${passed ? "text-green-600" : "text-red-500"}`}
              >
                {passed ? (
                  <CheckCircle2 size={13} className="flex-shrink-0" />
                ) : (
                  <XCircle size={13} className="flex-shrink-0" />
                )}
                {c.label}
              </div>
            );
          })}
        </div>
      )}

      {/* Mismatch warning */}
      {passwords.confirmPass && passwords.newPass !== passwords.confirmPass && (
        <p className="text-red-500 text-xs font-semibold flex items-center gap-1.5">
          <XCircle size={12} /> Passwords do not match
        </p>
      )}

      <div className="flex justify-end pt-2">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(239,68,68,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
        >
          <Shield size={14} />
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default SecurityPanel;
