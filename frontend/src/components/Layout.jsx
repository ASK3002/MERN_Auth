import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-800 ">{children}</main>
    </>
  );
}
