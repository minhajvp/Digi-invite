import InvitationForm from '@/components/admin/InvitationForm';
import LivePreview from '@/components/admin/LivePreview';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Form Panel */}
      <div className="w-1/3 min-w-[400px] h-full overflow-hidden flex flex-col shadow-xl z-10">
        <div className="bg-white p-4 border-b shrink-0 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Create Invitation</h1>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <InvitationForm />
        </div>
      </div>
      
      {/* Live Preview Panel */}
      <LivePreview />
    </div>
  );
}
