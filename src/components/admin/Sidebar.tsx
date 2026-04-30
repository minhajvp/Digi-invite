'use client';
import { Home, Image as ImageIcon, Settings, LayoutTemplate, Users, Power } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="w-20 lg:w-64 bg-slate-900 text-slate-300 h-full flex flex-col transition-all duration-300">
      <div className="p-4 flex items-center justify-center lg:justify-start h-16 bg-slate-950">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shrink-0 shadow-lg shadow-indigo-500/30">
          DI
        </div>
        <span className="ml-3 font-semibold text-white hidden lg:block tracking-wide">DigiInvite</span>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-3">
        <NavItem href="/admin" icon={<Home size={20} />} label="Dashboard" />
        <NavItem href="/admin/list" icon={<LayoutTemplate size={20} />} label="All Invitations" />
        <NavItem href="#" icon={<Users size={20} />} label="RSVPs" />
        <NavItem href="#" icon={<ImageIcon size={20} />} label="Media Library" />
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <NavItem href="#" icon={<Settings size={20} />} label="Settings" />
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
        >
          <div className="shrink-0"><Power size={20} /></div>
          <span className="ml-3 font-medium hidden lg:block">Logout</span>
        </button>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-indigo-500/10 text-indigo-400' 
          : 'hover:bg-slate-800 hover:text-white'
      }`}
    >
      <div className="shrink-0">{icon}</div>
      <span className="ml-3 font-medium hidden lg:block">{label}</span>
    </Link>
  );
}
