import Privacy from "../pages/public/privacy/Privacy";
import Terms from "../pages/public/privacy/Terms";

function PrivacyRoutes() {
  return [
    {
      path: "/privacy",
      element: <Privacy />,
    },
    {
      path: "/terms",
      element: <Terms />,
    },
  ];
}
export default PrivacyRoutes;
