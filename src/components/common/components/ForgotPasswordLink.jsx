import { Link } from "react-router-dom";

const ForgotPasswordLink = ({ to = "/forgot-password" }) => {
  return (
    <div className="text-right mt-1">
      <Link
        to={to}
        className="text-xs font-medium text-blue-600 hover:underline"
      >
        Forgot password?
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;
