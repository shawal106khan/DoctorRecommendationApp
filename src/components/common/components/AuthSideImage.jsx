const AuthSideImage = ({
  image,
  alt = "Auth Illustration",
  className = "",
}) => {
  return (
    <div className={className}>
      <img src={image} alt={alt} className="w-3/4 max-w-md object-contain" />
    </div>
  );
};

export default AuthSideImage;
