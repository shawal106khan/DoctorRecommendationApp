import { useNavigate } from "react-router-dom";

const PublicFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0D2E4E] text-white/70">
      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />

      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <p className="text-white font-bold text-sm">
              Doctor Recommendation and Appointment Platform
            </p>
          </div>
          <p className="text-sm leading-relaxed text-white/50">
            A secure doctor appointment platform connecting patients with
            verified and admin-approved healthcare professionals.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Platform</h4>
          <ul className="space-y-2.5 text-sm">
            <li
              onClick={() => navigate("/login")}
              className="hover:text-white cursor-pointer transition"
            >
              Login
            </li>
            <li
              onClick={() => navigate("/signup")}
              className="hover:text-white cursor-pointer transition"
            >
              Register
            </li>
          </ul>
        </div>

        {/* For Doctors */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">For Doctors</h4>
          <ul className="space-y-2.5 text-sm">
            <li
              onClick={() => navigate("/login")}
              className="hover:text-white cursor-pointer transition"
            >
              Join as Doctor
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Legal</h4>
          <ul className="space-y-2.5 text-sm">
            <li
              onClick={() => navigate("/privacy")}
              className="hover:text-white cursor-pointer transition"
            >
              Privacy Policy
            </li>
            <li
              onClick={() => navigate("/terms")}
              className="hover:text-white cursor-pointer transition"
            >
              Terms & Conditions
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} MedConnect Swat. All rights reserved.
        &nbsp;·&nbsp; Built for Swat District Healthcare
      </div>
    </footer>
  );
};

export default PublicFooter;
