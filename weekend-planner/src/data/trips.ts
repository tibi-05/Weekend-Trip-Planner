export type TripLength = 'Day trip' | '2-day overnight';

export interface TripSegment {
  time?: string;
  activity?: string;
  transportType?: string;
  cost: number;
  eligibleForFreeBus?: boolean;
}

export interface Trip {
  id: string;
  title: string;
  description: string;
  tags: string[];
  type: TripLength;
  timeline: TripSegment[];
}

export const trips: Trip[] = [
  {
    id: '1',
    title: 'Stonehaven & Dunnottar Castle',
    description: 'A beautiful coastal trip with historical ruins.',
    tags: ['Coastal', 'History', 'Outdoors'],
    type: 'Day trip',
    timeline: [
      { time: '09:00', transportType: 'Stagecoach Bus', cost: 4.5, eligibleForFreeBus: true },
      { time: '10:00', activity: 'Walk to Dunnottar Castle', cost: 0 },
      { time: '11:00', activity: 'Castle Entry', cost: 10.5 },
      { time: '13:00', activity: 'Lunch at the harbor (estimated)', cost: 15 },
      { time: '15:00', transportType: 'Stagecoach Bus (Return)', cost: 4.5, eligibleForFreeBus: true }
    ]
  },
  {
    id: '2',
    title: 'Royal Deeside Explorer',
    description: 'Explore the royal connections and beautiful forests.',
    tags: ['History', 'Outdoors'],
    type: 'Day trip',
    timeline: [
      { time: '08:30', transportType: 'Stagecoach Bus', cost: 8.5, eligibleForFreeBus: true },
      { time: '10:00', activity: 'Walk around Ballater', cost: 0 },
      { time: '12:30', activity: 'Pub Lunch', cost: 18 },
      { time: '15:00', transportType: 'Stagecoach Bus (Return)', cost: 8.5, eligibleForFreeBus: true }
    ]
  },
  {
    id: '3',
    title: 'Dundee Weekend Getaway',
    description: 'A weekend of culture, museums, and food.',
    tags: ['History', 'Food', 'Coastal'],
    type: '2-day overnight',
    timeline: [
      { time: 'Day 1 10:00', transportType: 'ScotRail Train', cost: 25, eligibleForFreeBus: false },
      { time: 'Day 1 12:00', activity: 'V&A Museum Entry', cost: 0 },
      { time: 'Day 1 15:00', activity: 'Hostel Check-in (1 night)', cost: 30 },
      { time: 'Day 1 19:00', activity: 'Dinner', cost: 20 },
      { time: 'Day 2 10:00', activity: 'Discovery Point', cost: 12 },
      { time: 'Day 2 14:00', transportType: 'ScotRail Train (Return)', cost: 25, eligibleForFreeBus: false }
    ]
  }
];
