import Sidebar from '@/components/admin/Sidebar';
import dbConnect from '@/lib/mongodb';
import Invitation from '@/models/Invitation';
import { notFound } from 'next/navigation';
import InvitationForm from '@/components/admin/InvitationForm';
import LivePreview from '@/components/admin/LivePreview';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function EditInvitation({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  
  const invitation = await Invitation.findOne({ slug }).lean();
  if (!invitation) notFound();

  // Convert MongoDB object to plain object
  const plainInvitation = {
    ...invitation,
    _id: invitation._id.toString(),
    createdAt: (invitation as any).createdAt?.toISOString(),
    updatedAt: (invitation as any).updatedAt?.toISOString(),
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/list" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Edit Invitation</h1>
              <p className="text-xs text-slate-500">Modify your invitation details and templates</p>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 overflow-y-auto no-scrollbar">
            <InvitationForm initialData={plainInvitation} />
          </div>
          <div className="w-1/2 bg-slate-200 p-8 overflow-y-auto no-scrollbar">
            <LivePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
