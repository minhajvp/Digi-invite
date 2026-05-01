import { create } from 'zustand';
import { IInvitation } from '@/models/Invitation';

type InvitationState = Partial<IInvitation> & {
  updateField: (field: keyof IInvitation, value: any) => void;
  setEventType: (type: 'wedding' | 'housewarming' | 'both') => void;
  setTemplateId: (id: string) => void;
  resetStore: () => void;
};

export const useInvitationStore = create<InvitationState>((set) => ({
  eventType: 'wedding',
  templateId: 'wedding-1', // Default template
  primarySide: 'bride',
  eventSubHead: 'Together with their families',
  brideName: 'Meera',
  brideAddress: 'House of Joy, Kerala',
  brideFatherName: 'Mr. Krishnan',
  brideMotherName: 'Mrs. Radha',
  groomName: 'Arjun',
  groomAddress: 'Heritage Villa, Kerala',
  groomFatherName: 'Mr. Ramachandran',
  groomMotherName: 'Mrs. Lakshmi',
  familyAddress: 'The Family, Kochi',
  withLove: 'The Extended Family & Friends',
  eventDate: '2027-12-15',
  eventTime: '10:00',
  locationName: 'Grand Hyatt, Kochi',
  googleMapLink: 'https://maps.google.com',
  eventDescription: 'Join us to celebrate our new beginning.',
  sharingHappinessText: 'We look forward to your presence.',
  musicUrl: '',
  coverImage: '',
  houseName: '',
  houseAddress: '',
  
  updateField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setEventType: (type) => set({ eventType: type }),
  setTemplateId: (id) => set({ templateId: id }),
  resetStore: () => set({
    eventType: 'wedding',
    templateId: 'wedding-1',
    primarySide: 'bride',
    eventSubHead: 'Together with their families',
    brideName: 'Meera',
    brideAddress: 'House of Joy, Kerala',
    brideFatherName: 'Mr. Krishnan',
    brideMotherName: 'Mrs. Radha',
    groomName: 'Arjun',
    groomAddress: 'Heritage Villa, Kerala',
    groomFatherName: 'Mr. Ramachandran',
    groomMotherName: 'Mrs. Lakshmi',
    familyAddress: 'The Family, Kochi',
    withLove: 'The Extended Family & Friends',
    eventDate: '2027-12-15',
    eventTime: '10:00',
    locationName: 'Grand Hyatt, Kochi',
    googleMapLink: 'https://maps.google.com',
    eventDescription: 'Join us to celebrate our new beginning.',
    sharingHappinessText: 'We look forward to your presence.',
    musicUrl: '',
    coverImage: '',
    houseName: '',
    houseAddress: '',
  }),
}));
