import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-14 sm:pt-16">
        <Outlet />
      </main>
    </div>
  );
}
