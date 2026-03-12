import { useEffect, useState } from "react";
import { getAdminSettings } from "../../admin/setting/services/adminSettingsService";

const ContactSection = () => {
  const [settings, setSettings] = useState({
    support_email: "",
    support_phone: "",
  });

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

  return (
    <section id="contact" className="m-5 bg-white font-serif px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-xl md:text-3xl font-bold text-black-700">
          Contact Support
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          If you have any questions regarding doctor profiles, appointments, or
          platform usage, please contact our support team.
        </p>

        <div className="mt-10 bg-gray-50 p-10 rounded-2xl shadow-sm">
          <a
            href={mailTo}
            className="inline-block bg-blue-700 text-sm text-white px-4 py-3 mb-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Email Support
          </a>

          <p className=" text-sm text-gray-500">Or email us directly at</p>

          <a
            href={mailTo}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {settings.support_email || "support@example.com"}
          </a>

          {settings.support_phone ? (
            <p className="text-gray-700 mt-2">
              Support Phone: {settings.support_phone}
            </p>
          ) : null}

          <p className="text-gray-700 ">
            Send us an email and our admin team will respond as soon as
            possible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
