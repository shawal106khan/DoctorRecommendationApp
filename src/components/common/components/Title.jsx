const Title = ({
  heading,
  subheading,
  classNameHeading,
  classNameSubheading,
}) => {
  return (
    <div className="mb-8">
      {heading && (
        <h1
          className={`text-2xl font-bold font-serif text-gray-900 mb-2 text-center ${
            classNameHeading || ""
          }`}
        >
          {heading}
        </h1>
      )}
      {subheading && (
        <p
          className={`text-gray-500 mb-8 font-serif text-center ${
            classNameSubheading || ""
          }`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
};

export default Title;
