export interface FallbackActivity {
  id: string;
  title: string;
  description: string;
  cost: number;
}

export const fallbacks: FallbackActivity[] = [
  {
    id: 'f1',
    title: 'Footdee (Fittie) Walk',
    description: 'Wander around the charming old fishing village at the end of the beach. Completely free!',
    cost: 0
  },
  {
    id: 'f2',
    title: 'Old Aberdeen & Seaton Park',
    description: 'Explore the historic university campus and take a relaxing stroll through the park.',
    cost: 0
  },
  {
    id: 'f3',
    title: 'Duthie Park & Winter Gardens',
    description: 'Visit the beautiful botanical gardens and greenhouses.',
    cost: 0
  }
];
