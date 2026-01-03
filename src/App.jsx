import Header from "./components/common/components/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const user = null;
  return (
    <>
      {/* Routes */}
      <Header user={user} />
      <AppRoutes />
    </>
  );
}
export default App;
