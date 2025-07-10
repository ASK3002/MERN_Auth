import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100">{children}</main>
    </>
  );
}
