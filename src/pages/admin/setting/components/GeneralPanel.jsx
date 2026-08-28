import { useEffect, useState } from "react";
import {
  getAdminSettings,
  updateAdminSettings,
} from "../../../../services/adminSettingsService";
import LoadingSpinner from "../../../../components/common/components/LoadingSpinner";
import { Save, Mail, Phone } from "lucide-react";

const GeneralPanel = () => {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAdminSettings();
        setSettings(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updatedSettings = await updateAdminSettings(settings);
      setSettings(updatedSettings);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!settings)
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );

  const inputClass =
    "mt-1.5 w-full h-11 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px] mb-1">
          General
        </p>
        <h2 className="text-lg font-bold text-[#0D2E4E]">General Settings</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide">
            Support Email
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8AAEC8] mt-0.5"
            />
            <input
              name="support_email"
              value={settings.support_email || ""}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
              placeholder="support@medconnect.pk"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide">
            Support Phone
          </label>
          <div className="relative">
            <Phone
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8AAEC8] mt-0.5"
            />
            <input
              name="support_phone"
              value={settings.support_phone || ""}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
              placeholder="+92 300 0000000"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
        >
          <Save size={14} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default GeneralPanel;
