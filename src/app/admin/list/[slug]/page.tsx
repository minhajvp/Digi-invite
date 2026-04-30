import Sidebar from '@/components/admin/Sidebar';
import dbConnect from '@/lib/mongodb';
import Invitation from '@/models/Invitation';
import RSVP from '@/models/RSVP';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Users, Heart, Clock, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function InvitationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  
  const invitation = await Invitation.findOne({ slug }).lean();
  if (!invitation) notFound();

  const rsvps = await RSVP.find({ invitationId: invitation._id }).sort({ createdAt: -1 }).lean();
  const totalGuests = rsvps.reduce((acc, curr) => acc + (curr.guestCount || 0), 0);
  const attendingCount = rsvps.filter(r => r.attending).length;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-800">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <Link href="/admin/list" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to List
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                    {invitation.eventType === 'both' ? 'Wedding & Housewarming' : invitation.eventType} Invitation
                  </span>
                  <h1 className="text-4xl font-bold mt-4 font-serif">
                    {invitation.eventType === 'housewarming' 
                      ? invitation.houseName 
                      : `${invitation.brideName} & ${invitation.groomName}`}
                  </h1>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Created On</p>
                  <p className="font-medium">{(invitation as any).createdAt?.toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 uppercase tracking-widest">Event Date</p>
                    <p className="text-lg font-medium">{invitation.eventDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 uppercase tracking-widest">Event Time</p>
                    <p className="text-lg font-medium">{invitation.eventTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-lg font-medium">{invitation.locationName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 uppercase tracking-widest">Family</p>
                    <p className="text-lg font-medium truncate max-w-[200px]">{invitation.familyAddress}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">Invitation Message</h3>
                <p className="text-slate-600 leading-relaxed italic text-center max-w-xl mx-auto text-lg">
                  "{invitation.eventDescription}"
                </p>
              </div>
            </div>

            {/* RSVP List Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold">Responses ({rsvps.length})</h2>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="p-4 px-6 font-semibold">Guest Name</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-center">Guests</th>
                    <th className="p-4 px-6 font-semibold text-right">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp: any) => (
                    <tr key={rsvp._id.toString()} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="p-4 px-6 font-medium">{rsvp.name}</td>
                      <td className="p-4">
                        {rsvp.attending ? (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold uppercase">Attending</span>
                        ) : (
                          <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-bold uppercase">Declined</span>
                        )}
                      </td>
                      <td className="p-4 text-center font-medium">{rsvp.guestCount || 1}</td>
                      <td className="p-4 px-6 text-right text-slate-400 text-sm">
                        {rsvp.createdAt?.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {rsvps.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-400 italic">
                        No responses yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Stats & Quick Actions */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-6">RSVP Overview</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500 text-white rounded-lg">
                      <Users size={18} />
                    </div>
                    <span className="font-medium text-emerald-900">Total Guests</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-600">{totalGuests}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500 text-white rounded-lg">
                      <Heart size={18} />
                    </div>
                    <span className="font-medium text-indigo-900">Accepted</span>
                  </div>
                  <span className="text-2xl font-bold text-indigo-600">{attendingCount}</span>
                </div>
              </div>

              <div className="mt-8">
                <Link 
                  href={`/invite/${invitation.slug}`}
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-900 transition-colors"
                >
                  View Public Invitation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
