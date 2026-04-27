export interface Devotional {
  id: string;
  theme: string;
  subject: string;
  scripture: string;
  scripture_ref: string;
  reflection: string;
  prayer: string;
  declaration: string;
  createdAt: string;
  createdBy: string;
}

export type DevotionalInput = Omit<Devotional, 'id' | 'createdAt' | 'createdBy'>;
