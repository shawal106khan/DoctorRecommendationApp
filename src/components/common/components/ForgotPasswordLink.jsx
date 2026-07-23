import { Link } from "react-router-dom";

const ForgotPasswordLink = ({ to = "/forgot-password" }) => {
  return (
    <div className="text-right mt-2">
      <Link
        to={to}
        className="text-xs font-semibold text-[#1A6FA8] hover:text-[#155e8f] hover:underline transition"
      >
        Forgot password?
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;
