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
          className={`text-lg font-bold font-heading text-gray-900 mb-2 text-center ${
            classNameHeading || ""
          }`}
        >
          {heading}
        </h1>
      )}
      {subheading && (
        <p
          className={`text-gray-500 text-xs  font-body text-center ${
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
