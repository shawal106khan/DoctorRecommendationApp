const AuthSideImage = ({ image, alt = "Auth Illustration" }) => {
  return (
    <div
      className="hidden lg:flex w-2/5 bg-gradient-to-br from-blue-700 to-blue-900 
                    text-white flex-col justify-center items-center px-16"
    >
      <img src={image} alt={alt} className="w-3/4 max-w-md" />
    </div>
  );
};

export default AuthSideImage;
