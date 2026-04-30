'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Power, Edit3, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  invitation: any;
}

export default function InvitationListRow({ invitation }: Props) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(invitation.isActive);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const toggleStatus = async () => {
    setIsToggling(true);
    try {
      const res = await fetch(`/api/invitations/${invitation.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      });
      if (res.ok) {
        setIsActive(!isActive);
      }
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
    setIsToggling(false);
  };

  const deleteInvitation = async () => {
    if (!confirm('Are you sure you want to delete this invitation?')) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/invitations/${invitation.slug}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error('Failed to delete invitation', err);
    }
    setIsDeleting(false);
  };

  const isExpired = invitation.eventDate ? new Date(`${invitation.eventDate}T00:00:00`) < new Date() : false;

  return (
    <tr className="border-b hover:bg-slate-50 transition-colors">
      <td className="p-4 capitalize text-slate-800">{invitation.eventType}</td>
      <td className="p-4">
        <Link 
          href={`/admin/list/${invitation.slug}`}
          className="font-medium text-indigo-600 hover:underline"
        >
          {invitation.eventType === 'housewarming' 
            ? invitation.houseName 
            : `${invitation.brideName} & ${invitation.groomName}`}
        </Link>
      </td>
      <td className="p-4 text-slate-600">{invitation.eventDate}</td>
      <td className="p-4">
        {isExpired ? (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold uppercase">Expired</span>
        ) : isActive ? (
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold uppercase">Active</span>
        ) : (
          <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs font-semibold uppercase">Disabled</span>
        )}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <a 
            href={`/invite/${invitation.slug}`} 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
            title="View Live"
          >
            <ExternalLink size={18} />
          </a>
          <Link 
            href={`/admin/edit/${invitation.slug}`}
            className="p-2 text-slate-400 hover:text-amber-600 transition-colors"
            title="Edit"
          >
            <Edit3 size={18} />
          </Link>
          <button 
            onClick={toggleStatus}
            disabled={isToggling}
            className={`p-2 transition-colors ${isActive ? 'text-emerald-500 hover:text-emerald-700' : 'text-slate-300 hover:text-emerald-500'}`}
            title={isActive ? 'Disable' : 'Enable'}
          >
            <Power size={18} />
          </button>
          <button 
            onClick={deleteInvitation}
            disabled={isDeleting}
            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
