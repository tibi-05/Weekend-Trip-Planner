'use client';

import { useState } from 'react';
import { destinations, Destination, Activity, TripLength, Interest } from '../data/destinations';
import { fallbacks } from '../data/fallback';

const INTERESTS: Interest[] = ['Outdoors', 'History', 'Coastal', 'Food', 'Culture'];

interface TripPlan {
  destination: Destination;
  transportCost: number;
  overnightCost: number;
  activities: Activity[];
  totalCost: number;
}

export default function Home() {
  const [budget, setBudget] = useState<number>(50);
  const [length, setLength] = useState<TripLength>('Day trip');
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [freeBus, setFreeBus] = useState<boolean>(false);
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [showFallback, setShowFallback] = useState<boolean>(false);

  const toggleInterest = (interest: Interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const generateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFallback(false);
    setPlan(null);

    const maxActivities = length === 'Day trip' ? 4 : 8;
    let bestPlan: TripPlan | null = null;
    let bestScore = -1;

    for (const dest of destinations) {
      const transportCost = (freeBus && dest.eligibleForFreeBus) ? 0 : dest.returnFare;
      const overnightCost = length === '2-day overnight' ? (dest.overnightCost || 40) : 0;
      let remainingBudget = budget - transportCost - overnightCost;

      if (remainingBudget < 0) continue;

      // Sort activities: matching interests first, then cheapest
      const sortedActivities = [...dest.activities].sort((a, b) => {
        const aMatch = a.tags.some(t => selectedInterests.includes(t));
        const bMatch = b.tags.some(t => selectedInterests.includes(t));
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return a.cost - b.cost;
      });

      const selectedActs: Activity[] = [];
      let score = 0;

      for (const act of sortedActivities) {
        if (selectedActs.length >= maxActivities) break;
        if (remainingBudget >= act.cost) {
          selectedActs.push(act);
          remainingBudget -= act.cost;
          if (act.tags.some(t => selectedInterests.includes(t))) {
            score += 1;
          }
        }
      }

      if (selectedActs.length > 0) {
        const totalCost = transportCost + overnightCost + selectedActs.reduce((sum, a) => sum + a.cost, 0);
        if (score > bestScore) {
          bestScore = score;
          bestPlan = {
            destination: dest,
            transportCost,
            overnightCost,
            activities: selectedActs,
            totalCost
          };
        }
      }
    }

    if (bestPlan) {
      setPlan(bestPlan);
    } else {
      setShowFallback(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7f6] text-[#1c2b23] p-4 md:p-8 tartan-pattern font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center p-6 bg-white rounded-xl shadow-md tartan-border">
          <h1 className="text-4xl font-bold text-[#1c4b64] mb-2 font-serif">Weekend Trip Planner</h1>
          <p className="text-[#4a6741] font-medium text-lg">Plan an affordable public transport trip from Aberdeen.</p>
        </header>
        
        <form onSubmit={generateTrip} className="bg-white p-8 rounded-xl shadow-lg border border-[#e5e7eb] space-y-6 relative overflow-hidden">
          <div>
            <label className="block font-semibold mb-3 text-[#1c4b64] text-lg">Trip Length</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-slate-50 transition flex-1">
                <input type="radio" name="length" value="Day trip" checked={length === 'Day trip'} onChange={() => setLength('Day trip')} className="accent-[#1c4b64] w-4 h-4" />
                <span className="font-medium">Day trip</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-slate-50 transition flex-1">
                <input type="radio" name="length" value="2-day overnight" checked={length === '2-day overnight'} onChange={() => setLength('2-day overnight')} className="accent-[#1c4b64] w-4 h-4" />
                <span className="font-medium">2-day overnight</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-3 text-[#1c4b64] text-lg">Budget (£)</label>
            <input 
              type="number" 
              min="0" 
              value={budget} 
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full border-2 border-gray-200 focus:border-[#4a6741] focus:ring-0 rounded-lg p-3 text-lg transition outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-3 text-[#1c4b64] text-lg">Interests</label>
            <div className="flex flex-wrap gap-3">
              {INTERESTS.map(interest => (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition ${selectedInterests.includes(interest) ? 'bg-[#1c4b64] border-[#1c4b64] text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-[#1c4b64] hover:text-[#1c4b64]'}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <label className="flex items-center gap-3 font-semibold cursor-pointer">
              <input type="checkbox" checked={freeBus} onChange={(e) => setFreeBus(e.target.checked)} className="w-5 h-5 accent-[#4a6741] rounded" />
              <span className="text-[#1c2b23]">I have an Under-22 / Free Bus Pass</span>
            </label>
            <p className="text-sm text-gray-500 mt-2 ml-8">Sets eligible bus fares to £0.</p>
          </div>

          <button type="submit" className="w-full bg-[#4a6741] text-white font-bold py-4 rounded-lg hover:bg-[#3d5635] shadow-md transition text-lg flex justify-center items-center gap-2">
            Plan My Trip
          </button>
        </form>

        {plan && (
          <div className="bg-white p-8 rounded-xl shadow-xl tartan-border">
            <h2 className="text-3xl font-bold mb-3 text-[#1c4b64] font-serif">Trip to {plan.destination.name}</h2>
            <p className="text-gray-700 mb-6 text-lg">{plan.destination.description}</p>
            
            <div className="space-y-6">
              <div className="bg-[#f8faf9] p-5 rounded-lg border border-[#d3dfd8]">
                <h3 className="font-bold text-lg mb-3 text-[#4a6741] uppercase tracking-wide text-sm">Transport & Accommodation</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center text-gray-800">
                    <span>Transport: {plan.destination.transportType} <span className="text-gray-500 text-sm">(approx. {plan.destination.travelTime})</span></span>
                    <span className="font-semibold text-[#1c4b64]">£{plan.transportCost.toFixed(2)}</span>
                  </li>
                  {length === '2-day overnight' && (
                    <li className="flex justify-between items-center text-gray-800">
                      <span>Accommodation (1 night hostel/B&B)</span>
                      <span className="font-semibold text-[#1c4b64]">£{plan.overnightCost.toFixed(2)}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 text-[#4a6741] uppercase tracking-wide text-sm">Suggested Activities</h3>
                <ul className="space-y-3">
                  {plan.activities.map((act, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <div>
                        <span className="font-medium text-gray-800 block">{act.name}</span>
                        <span className="text-xs text-gray-500">{act.tags.join(', ')}</span>
                      </div>
                      <span className="font-semibold text-[#1c4b64]">£{act.cost.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 flex justify-between items-end border-t-2 border-gray-100">
                <span className="font-bold text-xl text-gray-800">Estimated Total:</span>
                <span className="font-extrabold text-4xl text-[#8c2020]">£{plan.totalCost.toFixed(2)}</span>
              </div>
              <p className="text-xs text-center text-gray-400 mt-4 italic">All prices are estimates and may vary.</p>
            </div>
          </div>
        )}

        {showFallback && (
          <div className="bg-[#fff9f9] p-8 rounded-xl shadow-lg border-2 border-[#8c2020]">
            <h2 className="text-2xl font-bold text-[#8c2020] mb-3 font-serif">Budget Too Low!</h2>
            <p className="text-[#6b1818] mb-6 text-lg">
              We couldn't find a trip outside the city that fits your budget. Here are some great free things to do right here in Aberdeen:
            </p>
            <ul className="space-y-4">
              {fallbacks.map(f => (
                <li key={f.id} className="bg-white p-5 rounded-lg shadow-sm border border-red-100">
                  <span className="font-bold text-lg text-[#1c4b64] block mb-1">{f.title}</span>
                  <span className="text-gray-700">{f.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
