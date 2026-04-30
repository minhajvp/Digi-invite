import Sidebar from '@/components/admin/Sidebar';
import dbConnect from '@/lib/mongodb';
import Invitation from '@/models/Invitation';
import Link from 'next/link';
import InvitationListRow from '@/components/admin/InvitationListRow';

export const dynamic = 'force-dynamic';

export default async function AdminList() {
  await dbConnect();
  // Fetch invitations and convert to plain objects for client component
  const rawInvitations = await Invitation.find({}).sort({ createdAt: -1 }).lean();
  const invitations = rawInvitations.map(inv => ({
    ...inv,
    _id: inv._id.toString(),
    createdAt: inv.createdAt?.toISOString(),
    updatedAt: inv.updatedAt?.toISOString(),
  }));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Invitations</h1>
            <p className="text-slate-500 mt-1">Manage and track your digital invitations</p>
          </div>
          <Link href="/admin" className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            Create New
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-600">
                <th className="p-4 font-semibold text-sm uppercase tracking-wider">Event</th>
                <th className="p-4 font-semibold text-sm uppercase tracking-wider">Names</th>
                <th className="p-4 font-semibold text-sm uppercase tracking-wider">Date</th>
                <th className="p-4 font-semibold text-sm uppercase tracking-wider">Status</th>
                <th className="p-4 font-semibold text-sm uppercase tracking-wider text-right px-8">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((inv) => (
                <InvitationListRow key={inv._id} invitation={inv} />
              ))}
              {invitations.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium">No invitations found</p>
                      <p className="text-sm">Get started by creating your first invitation.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
