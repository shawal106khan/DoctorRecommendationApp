import Header from "./components/common/components/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const user = null;
  return (
    <>
      <h1 className="text-3xl font-bold">Tailwind Works!</h1>
      {/* Routes */}
      <Header user={user} />
      <AppRoutes />
    </>
  );
}
export default App;
