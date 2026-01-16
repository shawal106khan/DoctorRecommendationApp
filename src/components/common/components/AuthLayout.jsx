import AuthSideImage from "./AuthSideImage";

const AuthLayout = ({ image, children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Illustration */}
      <AuthSideImage
        image={image}
        className="
          hidden lg:flex w-2/5
          bg-gradient-to-br from-blue-700 to-blue-900
          justify-center items-center px-16
        "
      />

      {/* Right Content */}
      <div className="w-full lg:w-5/6 flex items-center justify-center bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
