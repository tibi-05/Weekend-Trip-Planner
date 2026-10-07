export type TripLength = 'Day trip' | '2-day overnight';
export type Interest = 'Outdoors' | 'History' | 'Coastal' | 'Food' | 'Culture';

export interface Activity {
  name: string;
  cost: number;
  tags: Interest[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  travelTime: string;
  transportType: string;
  returnFare: number;
  eligibleForFreeBus: boolean;
  overnightCost?: number; // Estimated cost for 1 night (hostel/budget B&B)
  activities: Activity[];
}

export const destinations: Destination[] = [
  {
    id: '1', name: 'Stonehaven', description: 'Charming coastal town with historic ruins.', travelTime: '30 mins', transportType: 'Stagecoach Bus / ScotRail', returnFare: 9, eligibleForFreeBus: true, overnightCost: 40,
    activities: [
      { name: 'Walk to Dunnottar Castle', cost: 0, tags: ['Outdoors', 'Coastal'] },
      { name: 'Dunnottar Castle Entry', cost: 10.5, tags: ['History'] },
      { name: 'Fish & Chips by the Harbor', cost: 12, tags: ['Food', 'Coastal'] },
      { name: 'Aunty Betty\'s Ice Cream', cost: 5, tags: ['Food'] },
      { name: 'Stonehaven Tolbooth Museum', cost: 0, tags: ['History', 'Culture'] }
    ]
  },
  {
    id: '2', name: 'Dundee', description: 'Scotland\'s sunniest city with rich design history.', travelTime: '1 hr 15 mins', transportType: 'ScotRail / Megabus', returnFare: 22, eligibleForFreeBus: false, overnightCost: 35,
    activities: [
      { name: 'V&A Museum Dundee', cost: 0, tags: ['Culture', 'History'] },
      { name: 'RRS Discovery Entry', cost: 12, tags: ['History', 'Coastal'] },
      { name: 'Walk up Dundee Law', cost: 0, tags: ['Outdoors'] },
      { name: 'Lunch at a trendy cafe', cost: 15, tags: ['Food'] },
      { name: 'McManus Art Gallery & Museum', cost: 0, tags: ['Culture', 'History'] }
    ]
  },
  {
    id: '3', name: 'Banchory', description: 'Gateway to Royal Deeside.', travelTime: '50 mins', transportType: 'Stagecoach Bus', returnFare: 11, eligibleForFreeBus: true, overnightCost: 45,
    activities: [
      { name: 'Walk at Falls of Feugh', cost: 0, tags: ['Outdoors'] },
      { name: 'Crathes Castle & Gardens Entry', cost: 15, tags: ['History', 'Outdoors'] },
      { name: 'Scolty Hill Hike', cost: 0, tags: ['Outdoors'] },
      { name: 'Coffee & Cake at a local bakery', cost: 8, tags: ['Food'] }
    ]
  },
  {
    id: '4', name: 'Ballater', description: 'Victorian village in the heart of Deeside.', travelTime: '1 hr 30 mins', transportType: 'Stagecoach Bus', returnFare: 15, eligibleForFreeBus: true, overnightCost: 50,
    activities: [
      { name: 'Walk around the village and river', cost: 0, tags: ['Outdoors'] },
      { name: 'Old Royal Station', cost: 0, tags: ['History', 'Culture'] },
      { name: 'Hike Craigendarroch', cost: 0, tags: ['Outdoors'] },
      { name: 'Lunch at a traditional pub', cost: 18, tags: ['Food'] }
    ]
  },
  {
    id: '5', name: 'Braemar', description: 'Highland village surrounded by mountains.', travelTime: '2 hrs 15 mins', transportType: 'Stagecoach Bus', returnFare: 18, eligibleForFreeBus: true, overnightCost: 55,
    activities: [
      { name: 'Braemar Castle Entry', cost: 10, tags: ['History'] },
      { name: 'Walk the Linn of Dee (if accessible)', cost: 0, tags: ['Outdoors'] },
      { name: 'Highland Heritage Centre', cost: 0, tags: ['Culture'] },
      { name: 'Hearty dinner', cost: 22, tags: ['Food'] },
      { name: 'Morrone hike', cost: 0, tags: ['Outdoors'] }
    ]
  },
  {
    id: '6', name: 'Edinburgh', description: 'Scotland\'s historic and vibrant capital.', travelTime: '2 hrs 30 mins', transportType: 'ScotRail / Megabus', returnFare: 35, eligibleForFreeBus: false, overnightCost: 40,
    activities: [
      { name: 'Hike Arthur\'s Seat', cost: 0, tags: ['Outdoors'] },
      { name: 'National Museum of Scotland', cost: 0, tags: ['Culture', 'History'] },
      { name: 'Edinburgh Castle Entry', cost: 19.5, tags: ['History'] },
      { name: 'Walk the Royal Mile', cost: 0, tags: ['Culture', 'History'] },
      { name: 'Street food or local lunch', cost: 14, tags: ['Food'] },
      { name: 'Scottish National Gallery', cost: 0, tags: ['Culture'] }
    ]
  },
  {
    id: '7', name: 'Glasgow', description: 'A bustling city known for its art and music.', travelTime: '2 hrs 40 mins', transportType: 'ScotRail / Megabus', returnFare: 35, eligibleForFreeBus: false, overnightCost: 35,
    activities: [
      { name: 'Kelvingrove Art Gallery', cost: 0, tags: ['Culture', 'History'] },
      { name: 'Riverside Museum', cost: 0, tags: ['Culture'] },
      { name: 'Walk through Glasgow Necropolis', cost: 0, tags: ['Outdoors', 'History'] },
      { name: 'Dinner in the West End', cost: 20, tags: ['Food'] },
      { name: 'Explore the Botanical Gardens', cost: 0, tags: ['Outdoors'] }
    ]
  },
  {
    id: '8', name: 'Inverness', description: 'Capital of the Highlands.', travelTime: '2 hrs 15 mins', transportType: 'ScotRail', returnFare: 32, eligibleForFreeBus: false, overnightCost: 45,
    activities: [
      { name: 'Inverness Castle Viewpoint', cost: 7, tags: ['History'] },
      { name: 'Walk the Ness Islands', cost: 0, tags: ['Outdoors'] },
      { name: 'Visit Culloden Moor (via local bus)', cost: 14, tags: ['History'] },
      { name: 'Lunch near the river', cost: 16, tags: ['Food'] }
    ]
  },
  {
    id: '9', name: 'Cruden Bay', description: 'Beautiful beach and dramatic castle ruins.', travelTime: '1 hr', transportType: 'Stagecoach Bus', returnFare: 10, eligibleForFreeBus: true, overnightCost: 45,
    activities: [
      { name: 'Walk along Cruden Bay Beach', cost: 0, tags: ['Coastal', 'Outdoors'] },
      { name: 'Slains Castle Ruins Walk', cost: 0, tags: ['History', 'Coastal', 'Outdoors'] },
      { name: 'Lunch at the Kilmarnock Arms', cost: 18, tags: ['Food'] }
    ]
  },
  {
    id: '10', name: 'Peterhead', description: 'Busy fishing port with a fascinating prison museum.', travelTime: '1 hr 15 mins', transportType: 'Stagecoach Bus', returnFare: 12, eligibleForFreeBus: true, overnightCost: 40,
    activities: [
      { name: 'Peterhead Prison Museum', cost: 12, tags: ['History', 'Culture'] },
      { name: 'Walk around the marina', cost: 0, tags: ['Coastal'] },
      { name: 'Fresh Seafood Lunch', cost: 15, tags: ['Food', 'Coastal'] }
    ]
  },
  {
    id: '11', name: 'Fraserburgh', description: 'Coastal town with Scotland\'s lighthouse museum.', travelTime: '1 hr 30 mins', transportType: 'Stagecoach Bus', returnFare: 14, eligibleForFreeBus: true, overnightCost: 40,
    activities: [
      { name: 'Museum of Scottish Lighthouses', cost: 9, tags: ['History', 'Coastal', 'Culture'] },
      { name: 'Walk along the beach', cost: 0, tags: ['Coastal', 'Outdoors'] },
      { name: 'Local cafe lunch', cost: 12, tags: ['Food'] }
    ]
  },
  {
    id: '12', name: 'Elgin', description: 'Historic town in Moray with a beautiful ruined cathedral.', travelTime: '1 hr 30 mins', transportType: 'ScotRail / Stagecoach Bus', returnFare: 20, eligibleForFreeBus: true, overnightCost: 45,
    activities: [
      { name: 'Elgin Cathedral Ruins', cost: 10, tags: ['History'] },
      { name: 'Johnstons of Elgin Mill Tour', cost: 0, tags: ['Culture'] },
      { name: 'Walk in Cooper Park', cost: 0, tags: ['Outdoors'] },
      { name: 'Lunch in town', cost: 15, tags: ['Food'] }
    ]
  },
  {
    id: '13', name: 'Montrose', description: 'Coastal town known for its wildlife basin.', travelTime: '45 mins', transportType: 'ScotRail', returnFare: 16, eligibleForFreeBus: false, overnightCost: 40,
    activities: [
      { name: 'Montrose Basin Wildlife Centre', cost: 7, tags: ['Outdoors', 'Coastal'] },
      { name: 'Walk on Montrose Beach', cost: 0, tags: ['Coastal', 'Outdoors'] },
      { name: 'Montrose Air Station Heritage Centre', cost: 8, tags: ['History'] },
      { name: 'Pub lunch', cost: 14, tags: ['Food'] }
    ]
  },
  {
    id: '14', name: 'Arbroath', description: 'Famous for its abbey and "smokies" (smoked haddock).', travelTime: '1 hr', transportType: 'ScotRail', returnFare: 18, eligibleForFreeBus: false, overnightCost: 40,
    activities: [
      { name: 'Arbroath Abbey', cost: 10, tags: ['History'] },
      { name: 'Try an Arbroath Smokie', cost: 8, tags: ['Food', 'Culture'] },
      { name: 'Arbroath Cliff Trail Walk', cost: 0, tags: ['Outdoors', 'Coastal'] },
      { name: 'Signal Tower Museum', cost: 0, tags: ['History', 'Coastal'] }
    ]
  },
  {
    id: '15', name: 'Inverurie', description: 'Bustling market town in the Garioch.', travelTime: '25 mins', transportType: 'ScotRail / Stagecoach Bus', returnFare: 8, eligibleForFreeBus: true, overnightCost: 45,
    activities: [
      { name: 'Hike Bennachie (requires local bus/taxi or long walk)', cost: 5, tags: ['Outdoors'] },
      { name: 'Explore town center and farmers market (Saturdays)', cost: 0, tags: ['Culture', 'Food'] },
      { name: 'Lunch at a local cafe', cost: 14, tags: ['Food'] },
      { name: 'Easter Aquhorthies Stone Circle (long walk)', cost: 0, tags: ['History', 'Outdoors'] }
    ]
  },
  {
    id: '16', name: 'Huntly', description: 'Historic town with a grand ruined castle.', travelTime: '45 mins', transportType: 'ScotRail', returnFare: 15, eligibleForFreeBus: false, overnightCost: 45,
    activities: [
      { name: 'Huntly Castle Entry', cost: 7.5, tags: ['History'] },
      { name: 'Walk along the River Deveron', cost: 0, tags: ['Outdoors'] },
      { name: 'Dean\'s of Huntly Shortbread Visitor Centre', cost: 0, tags: ['Culture', 'Food'] },
      { name: 'Lunch in the town square', cost: 12, tags: ['Food'] }
    ]
  },
  {
    id: '17', name: 'Pitlochry', description: 'Victorian town nestled in the Perthshire hills.', travelTime: '2 hrs 45 mins', transportType: 'ScotRail / Citylink', returnFare: 40, eligibleForFreeBus: false, overnightCost: 50,
    activities: [
      { name: 'Pitlochry Dam & Fish Ladder', cost: 0, tags: ['Outdoors', 'Culture'] },
      { name: 'Walk to Black Spout Waterfall', cost: 0, tags: ['Outdoors'] },
      { name: 'Blair Athol Distillery Tour', cost: 20, tags: ['Culture', 'Food'] },
      { name: 'Dinner at a traditional Scottish pub', cost: 22, tags: ['Food'] }
    ]
  },
  {
    id: '18', name: 'Stirling', description: 'The historic heart of Scotland.', travelTime: '2 hrs 15 mins', transportType: 'ScotRail / Citylink', returnFare: 35, eligibleForFreeBus: false, overnightCost: 45,
    activities: [
      { name: 'Stirling Castle Entry', cost: 17.5, tags: ['History'] },
      { name: 'National Wallace Monument', cost: 11, tags: ['History', 'Culture'] },
      { name: 'Walk around the Old Town', cost: 0, tags: ['History', 'Outdoors'] },
      { name: 'Lunch near the castle', cost: 16, tags: ['Food'] }
    ]
  },
  {
    id: '19', name: 'Perth', description: 'The "Fair City" on the River Tay.', travelTime: '1 hr 40 mins', transportType: 'ScotRail / Megabus', returnFare: 28, eligibleForFreeBus: false, overnightCost: 40,
    activities: [
      { name: 'Perth Art Gallery', cost: 0, tags: ['Culture', 'History'] },
      { name: 'Walk on Kinnoull Hill for views', cost: 0, tags: ['Outdoors'] },
      { name: 'Scone Palace (local bus needed)', cost: 18, tags: ['History'] },
      { name: 'Coffee and cake by the river', cost: 10, tags: ['Food'] }
    ]
  },
  {
    id: '20', name: 'Aviemore', description: 'Hub for the Cairngorms National Park.', travelTime: '3 hrs', transportType: 'ScotRail (via Inverness) / Bus', returnFare: 45, eligibleForFreeBus: true, overnightCost: 55,
    activities: [
      { name: 'Hike around Loch an Eilein', cost: 0, tags: ['Outdoors'] },
      { name: 'Cairngorm Brewery Tour', cost: 10, tags: ['Culture', 'Food'] },
      { name: 'Strathspey Steam Railway', cost: 22, tags: ['History', 'Culture'] },
      { name: 'Hearty dinner after hiking', cost: 20, tags: ['Food'] }
    ]
  }
];
