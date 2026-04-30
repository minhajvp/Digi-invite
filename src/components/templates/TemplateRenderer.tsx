'use client';
import { IInvitation } from '@/models/Invitation';
import WeddingTemplate1 from './WeddingTemplate1';
import WeddingTemplate2 from './WeddingTemplate2';
import WeddingTemplate3 from './WeddingTemplate3';
import HousewarmingTemplate1 from './HousewarmingTemplate1';
import CombinedTemplate1 from './CombinedTemplate1';
import CombinedTemplate2 from './CombinedTemplate2';
import CombinedTemplate3 from './CombinedTemplate3';

interface Props {
  data: Partial<IInvitation>;
}

export default function TemplateRenderer({ data }: Props) {
  const { templateId } = data;

  switch (templateId) {
    case 'wedding-1':
      return <WeddingTemplate1 data={data} />;
    case 'wedding-2':
      return <WeddingTemplate2 data={data} />;
    case 'wedding-3':
      return <WeddingTemplate3 data={data} />;
    case 'housewarming-1':
      return <HousewarmingTemplate1 data={data} />;
    case 'combined-1':
      return <CombinedTemplate1 data={data} />;
    case 'combined-2':
      return <CombinedTemplate2 data={data} />;
    case 'combined-3':
      return <CombinedTemplate3 data={data} />;
    default:
      return <div className="p-8 text-center mt-20">Select a template</div>;
  }
}
