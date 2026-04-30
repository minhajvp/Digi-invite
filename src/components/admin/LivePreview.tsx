'use client';
import { useInvitationStore } from '@/store/useInvitationStore';
import TemplateRenderer from '@/components/templates/TemplateRenderer';

export default function LivePreview() {
  const store = useInvitationStore();

  return (
    <div className="flex-1 bg-slate-100 flex items-center justify-center p-4 lg:p-8 h-screen overflow-hidden">
      <div className="relative w-full max-w-[375px] h-[812px] bg-white rounded-[2rem] shadow-2xl border-[8px] border-slate-900 overflow-hidden ring-4 ring-slate-800/10 shrink-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-50"></div>
        <div className="w-full h-full overflow-y-auto no-scrollbar relative bg-slate-50">
          <TemplateRenderer data={store} />
        </div>
      </div>
    </div>
  );
}
