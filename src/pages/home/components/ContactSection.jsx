import { useEffect, useState } from "react";
import { getAdminSettings } from "../../../services/adminSettingsService";
import { submitComplaint } from "../../../services/contactService";
import { Mail, Phone, Send } from "lucide-react";

const ContactSection = () => {
  const [settings, setSettings] = useState({
    support_email: "",
    support_phone: "",
  });
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getAdminSettings();
      setSettings({
        support_email: data.support_email || "",
        support_phone: data.support_phone || "",
      });
    };
    load();
  }, []);

  const mailTo = settings.support_email
    ? `mailto:${settings.support_email}`
    : "mailto:support@example.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await submitComplaint(form);
      alert("Complaint submitted successfully");
      setForm({ full_name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-11 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10";

  return (
    <section id="contact" className="py-12 sm:py-20 bg-[#F7FAFE] px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#E8F4FD] text-[#1A6FA8] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Get In Touch
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2E4E] tracking-tight">
            Contact Support
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0] rounded-full mt-3 mx-auto" />
          <p className="text-[#6B839A] mt-4 text-sm max-w-xl mx-auto">
            Questions about doctor profiles, appointments, or platform usage?
            Our support team is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Contact info card */}
          <div className="md:col-span-2 bg-white border border-[#D6E6F2] rounded-2xl shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden flex flex-col">
            <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0]" />
            <div className="p-5 sm:p-7 flex flex-col flex-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(26,111,168,0.30)]">
                <Mail size={20} className="text-white" />
              </div>
              <h3 className="text-[#0D2E4E] font-bold text-lg mb-2">
                Get in Touch
              </h3>
              <p className="text-[#6B839A] text-sm mb-6 leading-relaxed">
                Send us an email and our admin team will respond as soon as
                possible.
              </p>

              <a
                href={mailTo}
                className="inline-flex items-center gap-2 h-11 px-5 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all mb-6"
              >
                <Mail size={14} /> Email Support
              </a>

              <div className="border-t border-[#D6E6F2] pt-5 space-y-3 mt-auto">
                <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                  Direct Contact
                </p>
                <a
                  href={mailTo}
                  className="flex items-center gap-2 text-sm text-[#1A6FA8] font-semibold hover:underline"
                >
                  <Mail size={13} />{" "}
                  {settings.support_email || "support@example.com"}
                </a>
                {settings.support_phone && (
                  <p className="flex items-center gap-2 text-sm text-[#6B839A]">
                    <Phone size={13} className="text-[#38B2A0]" />{" "}
                    {settings.support_phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Complaint form */}
          <div className="md:col-span-3 bg-white border border-[#D6E6F2] rounded-2xl shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#336aac] to-[#38B2A0]" />
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
                <h3 className="text-[#0D2E4E] font-bold text-lg">
                  Submit a Complaint
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Ahmad Khan"
                      value={form.full_name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Complaint Subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Describe your issue in detail..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className=" w-full sm:w-auto flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
                >
                  <Send size={14} />
                  {loading ? "Submitting..." : "Submit Complaint"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
