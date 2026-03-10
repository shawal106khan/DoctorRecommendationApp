import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../../../../components/common/components/Input";

const SecurityPanel = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password criteria
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

    setLoading(true);
    try {
      // 🔹 Backend call placeholder
      toast.success("Password updated successfully");
      setPasswords({ current: "", newPass: "", confirmPass: "" });
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Security</h3>

      <Input
        label="Current password"
        type={showPasswords ? "text" : "password"}
        name="current"
        placeholder="Current Password"
        value={passwords.current}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 w-full"
      />

      <Input
        label="New password"
        type={showPasswords ? "text" : "password"}
        name="newPass"
        placeholder="New Password"
        value={passwords.newPass}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 w-full mt-3"
      />

      <Input
        label="Confirm Password"
        type={showPasswords ? "text" : "password"}
        name="confirmPass"
        placeholder="Confirm New Password"
        value={passwords.confirmPass}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 w-full mt-3"
      />

      {/* Show/Hide toggle below all fields */}
      <label className="flex items-center gap-2 mt-2 text-sm">
        <input
          type="checkbox"
          checked={showPasswords}
          onChange={() => setShowPasswords(!showPasswords)}
          className="accent-blue-600"
        />
        Show Passwords
      </label>

      {/* Live password criteria */}
      <div className="mt-2 space-y-1 text-sm">
        {criteria.map((c, idx) => {
          const passed = c.test(passwords.newPass);
          return (
            <div
              key={idx}
              className={`flex items-center gap-2 ${
                passed ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="font-bold">{passed ? "✔" : "✖"}</span>
              <span>{c.label}</span>
            </div>
          );
        })}
      </div>

      {/* Confirm password mismatch */}
      {passwords.confirmPass && passwords.newPass !== passwords.confirmPass && (
        <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
      )}

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 mt-3"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
};

export default SecurityPanel;
