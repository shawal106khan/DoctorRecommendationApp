import { useNavigate } from "react-router-dom";

const PublicFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">
            Doctor Recommendation & Appointments system
          </h3>
          <p className="text-sm">
            A secure doctor appointment platform connecting patients with
            verified and admin-approved healthcare professionals.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/login")}
              className="hover:text-white cursor-pointer"
            >
              Login
            </li>

            <li
              onClick={() => navigate("/signup")}
              className="hover:text-white cursor-pointer"
            >
              Register
            </li>
          </ul>
        </div>

        {/* For Doctors */}
        <div>
          <h4 className="text-white font-semibold mb-4">For Doctors</h4>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/login")}
              className="hover:text-white cursor-pointer"
            >
              Join as Doctor
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/privacy")}
              className="hover:text-white cursor-pointer"
            >
              Privacy Policy
            </li>

            <li
              onClick={() => navigate("/terms")}
              className="hover:text-white cursor-pointer"
            >
              Terms & Conditions
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} MedConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default PublicFooter;
