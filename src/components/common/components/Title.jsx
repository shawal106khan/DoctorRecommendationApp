const Title = ({
  heading,
  subheading,
  classNameHeading,
  classNameSubheading,
}) => {
  return (
    <div className="mb-6 sm:mb-8 text-center">
      {heading && (
        <h1
          className={`text-lg sm:text-3xl font-bold tracking-tight text-[#0D2E4E] ${classNameHeading || ""}`}
        >
          {heading}
        </h1>
      )}
      {/* <div className="w-40 h-1 bg-[#1A6FA8] rounded-full mt-2 mx-auto" /> */}
      {subheading && (
        <p
          className={`text-[#6B839A] text-xs sm:text-sm mt-1.5 sm:mt-3 leading-relaxed ${classNameSubheading || ""}`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
};

export default Title;
