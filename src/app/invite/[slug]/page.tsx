import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Invitation from '@/models/Invitation';
import TemplateRenderer from '@/components/templates/TemplateRenderer';

export default async function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  await dbConnect();
  const data = await Invitation.findOne({ slug }).lean();

  if (!data) {
    return notFound();
  }

  // Auto-disable logic
  const now = new Date();
  const eventDateStr = data.eventDate;
  let isExpired = false;
  if (eventDateStr) {
    const eventDate = new Date(`${eventDateStr}T00:00:00`);
    eventDate.setDate(eventDate.getDate() + 1); // 1 day grace period
    if (now > eventDate) {
      isExpired = true;
    }
  }

  if (!data.isActive || isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-amber-50 font-serif">
        <div className="text-center p-8 border border-amber-900/30 bg-zinc-900/50 rounded-2xl">
          <h1 className="text-4xl font-['var(--font-great-vibes)'] text-amber-500 mb-4">Event Concluded</h1>
          <p className="text-zinc-400 font-sans tracking-widest text-sm uppercase">This invitation is no longer active.</p>
        </div>
      </div>
    );
  }

  const plainData = JSON.parse(JSON.stringify(data));

  return (
    <div className="w-full min-h-screen bg-zinc-950">
      <div className="max-w-md mx-auto min-h-screen bg-zinc-950 relative shadow-2xl overflow-hidden">
        <TemplateRenderer data={plainData} />
      </div>
    </div>
  );
}
