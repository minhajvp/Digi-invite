'use client';
import { useState } from 'react';
import { useInvitationStore } from '@/store/useInvitationStore';
import { Input, Label, Textarea } from './ui/Input';
import { Loader2, Upload } from 'lucide-react';

interface Props {
  initialData?: any;
}

export default function InvitationForm({ initialData }: Props) {
  const store = useInvitationStore();
  const { 
    eventType, setEventType, templateId, setTemplateId, updateField, resetStore 
  } = store;

  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [error, setError] = useState('');

  // Initialize store if initialData is provided
  useState(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        if (key === 'eventType') setEventType(initialData[key]);
        else if (key === 'templateId') setTemplateId(initialData[key]);
        else updateField(key as any, initialData[key]);
      });
    } else {
      resetStore();
    }
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.url) updateField('coverImage', data.url);
      } catch (err) {
        console.error('Image upload failed', err);
      }
      setIsUploadingImage(false);
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingAudio(true);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.url) updateField('musicUrl', data.url);
      } catch (err) {
        console.error('Audio upload failed', err);
      }
      setIsUploadingAudio(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setError('');
    try {
      const url = initialData 
        ? `/api/invitations/${initialData.slug}` 
        : '/api/invitations';
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store)
      });
      const data = await res.json();
      if (data.slug) {
        setPublishedUrl(`${window.location.origin}/invite/${data.slug}`);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      console.error('Publish failed', err);
      setError('Something went wrong. Please try again.');
    }
    setIsPublishing(false);
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl space-y-6 h-full overflow-y-auto no-scrollbar">
      
      {publishedUrl && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg flex flex-col gap-2">
          <p className="font-semibold">Successfully Published!</p>
          <a href={publishedUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline break-all">
            {publishedUrl}
          </a>
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <Label>Event Type</Label>
            <select 
              value={eventType} 
              onChange={(e) => setEventType(e.target.value as any)}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2 border text-slate-800"
            >
              <option value="wedding">Wedding</option>
              <option value="housewarming">House Warming</option>
              <option value="both">Combined</option>
            </select>
          </div>
          <div>
            <Label>Template</Label>
            <select 
              value={templateId} 
              onChange={(e) => setTemplateId(e.target.value)}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2 border text-slate-800"
            >
              {(eventType === 'wedding' || eventType === 'both') && (
                <>
                  <option value="wedding-1">Royal Gold (Wedding)</option>
                  <option value="wedding-2">Floral Pastel (Wedding)</option>
                  <option value="wedding-3">Emerald Elegance (Wedding)</option>
                </>
              )}
              {(eventType === 'housewarming' || eventType === 'both') && (
                <>
                  <option value="housewarming-1">Modern Minimal (Housewarming)</option>
                  <option value="housewarming-2">Classic Home (Housewarming)</option>
                </>
              )}
              {eventType === 'both' && (
                <>
                  <option value="combined-1">Grand Celebration (Combined)</option>
                  <option value="combined-2">Floral Combined (Combined)</option>
                  <option value="combined-3">White Elegance (Combined)</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Media</h2>
        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-2">
              Cover Image {isUploadingImage && <Loader2 size={14} className="animate-spin text-indigo-600" />}
            </Label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploadingImage} />
          </div>
          <div>
            <Label className="flex items-center gap-2">
              Background Audio {isUploadingAudio && <Loader2 size={14} className="animate-spin text-indigo-600" />}
            </Label>
            <Input type="file" accept="audio/*" onChange={handleAudioUpload} disabled={isUploadingAudio} />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Event Details</h2>
        <div className="space-y-4">
          
          {/* Wedding Specific Fields */}
          {(eventType === 'wedding' || eventType === 'both') && (
            <div className="space-y-4">
              <div>
                <Label>Event Sub-Heading</Label>
                <Input value={store.eventSubHead || ''} onChange={(e) => updateField('eventSubHead', e.target.value)} placeholder="Together with their families" />
              </div>
              
              {/* Bride Details */}
              <div className="p-4 bg-slate-50 border rounded-lg space-y-4">
                <h3 className="font-medium text-slate-700">Bride's Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Bride Name</Label>
                    <Input value={store.brideName || ''} onChange={(e) => updateField('brideName', e.target.value)} />
                  </div>
                  <div>
                    <Label>Bride Address</Label>
                    <Input value={store.brideAddress || ''} onChange={(e) => updateField('brideAddress', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Bride Father Name</Label>
                    <Input value={store.brideFatherName || ''} onChange={(e) => updateField('brideFatherName', e.target.value)} />
                  </div>
                  <div>
                    <Label>Bride Mother Name</Label>
                    <Input value={store.brideMotherName || ''} onChange={(e) => updateField('brideMotherName', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Groom Details */}
              <div className="p-4 bg-slate-50 border rounded-lg space-y-4">
                <h3 className="font-medium text-slate-700">Groom's Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Groom Name</Label>
                    <Input value={store.groomName || ''} onChange={(e) => updateField('groomName', e.target.value)} />
                  </div>
                  <div>
                    <Label>Groom Address</Label>
                    <Input value={store.groomAddress || ''} onChange={(e) => updateField('groomAddress', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Groom Father Name</Label>
                    <Input value={store.groomFatherName || ''} onChange={(e) => updateField('groomFatherName', e.target.value)} />
                  </div>
                  <div>
                    <Label>Groom Mother Name</Label>
                    <Input value={store.groomMotherName || ''} onChange={(e) => updateField('groomMotherName', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Housewarming Specific Fields */}
          {(eventType === 'housewarming' || eventType === 'both') && (
            <div className="p-4 bg-slate-50 border rounded-lg space-y-4">
              <h3 className="font-medium text-slate-700">Housewarming Details</h3>
              <div className="space-y-4">
                <div>
                  <Label>House / Villa Name</Label>
                  <Input value={store.houseName || ''} onChange={(e) => updateField('houseName', e.target.value)} placeholder="e.g. Dream Villa" />
                </div>
                <div>
                  <Label>New Address</Label>
                  <Input value={store.houseAddress || ''} onChange={(e) => updateField('houseAddress', e.target.value)} placeholder="Full address of the new house" />
                </div>
              </div>
            </div>
          )}

          {/* Common Fields */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <Label>Family / Event Address</Label>
              <Input value={store.familyAddress || ''} onChange={(e) => updateField('familyAddress', e.target.value)} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Input type="date" value={store.eventDate || ''} onChange={(e) => updateField('eventDate', e.target.value)} />
              </div>
              <div>
                <Label>Time</Label>
                <Input type="time" value={store.eventTime || ''} onChange={(e) => updateField('eventTime', e.target.value)} />
              </div>
            </div>

            <div>
              <Label>Location Name</Label>
              <Input value={store.locationName || ''} onChange={(e) => updateField('locationName', e.target.value)} />
            </div>

            <div>
              <Label>Google Maps Link</Label>
              <Input value={store.googleMapLink || ''} onChange={(e) => updateField('googleMapLink', e.target.value)} />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea value={store.eventDescription || ''} onChange={(e) => updateField('eventDescription', e.target.value)} />
            </div>

            <div>
              <Label>Sharing Happiness Text</Label>
              <Input value={store.sharingHappinessText || ''} onChange={(e) => updateField('sharingHappinessText', e.target.value)} />
            </div>

            <div>
              <Label>With Love (Relative/Family Names)</Label>
              <Input value={store.withLove || ''} onChange={(e) => updateField('withLove', e.target.value)} placeholder="e.g. Relatives & Friends" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end gap-4 pb-10">
        <button className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors">Save Draft</button>
        <button 
          onClick={handlePublish}
          disabled={isPublishing}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center gap-2"
        >
          {isPublishing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              {initialData ? 'Updating...' : 'Publishing...'}
            </>
          ) : (
            initialData ? 'Update Invitation' : 'Publish Invitation'
          )}
        </button>
      </div>
    </div>
  );
}
