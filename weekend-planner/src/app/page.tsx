'use client';

import { useEffect, useRef, useState } from 'react';
import { destinations, Destination, Activity, TripLength, Interest } from '../data/destinations';
import { fallbacks } from '../data/fallback';

const INTERESTS: Interest[] = ['Outdoors', 'History', 'Coastal', 'Food', 'Culture'];
const LENGTHS: TripLength[] = ['Day trip', '2-day overnight'];

interface TripPlan {
  destination: Destination;
  transportCost: number;
  overnightCost: number;
  activities: Activity[];
  totalCost: number;
  budget: number;
}

// What was asked for when nothing fit, so the message doesn't change as the form is edited
interface NoTrip {
  budget: number;
  overnight: boolean;
}

const gbp = (n: number) => `£${n.toFixed(2)}`;

export default function Home() {
  const [budgetText, setBudgetText] = useState('50');
  const [length, setLength] = useState<TripLength>('Day trip');
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [freeBus, setFreeBus] = useState<boolean>(false);
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [noTrip, setNoTrip] = useState<NoTrip | null>(null);
  const resultRef = useRef<HTMLElement>(null);

  // On a phone the result is below the form, so bring it into view
  useEffect(() => {
    if ((plan || noTrip) && window.innerWidth < 1024) {
      resultRef.current?.scrollIntoView?.({ block: 'start' });
    }
  }, [plan, noTrip]);

  const toggleInterest = (interest: Interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const generateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    setNoTrip(null);
    setPlan(null);

    const budget = Math.max(0, Number(budgetText) || 0);
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
            totalCost,
            budget,
          };
        }
      }
    }

    if (bestPlan) {
      setPlan(bestPlan);
    } else {
      setNoTrip({ budget, overnight: length === '2-day overnight' });
    }
  };

  return (
    <main className="flex-1">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-16 lg:py-16">
        <form onSubmit={generateTrip} className="space-y-10">
          <div className="space-y-4">
            <h1 className="font-semibold text-sea">Weekend Trip Planner</h1>
            <p className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
              Where can{' '}
              <span className="whitespace-nowrap">
                £
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  required
                  aria-label="Budget in pounds"
                  value={budgetText}
                  onChange={e => setBudgetText(e.target.value)}
                  className="budget-input border-b-[6px] border-gorse bg-transparent text-heather outline-none focus-visible:border-heather"
                />
              </span>{' '}
              take you?
            </p>
            <p className="max-w-md text-lg text-ink/70">
              Day trips and overnighters from Aberdeen by bus and train. No car needed.
            </p>
          </div>

          <fieldset>
            <legend className="mb-3 font-bold">How long have you got?</legend>
            <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-mist">
              {LENGTHS.map(option => (
                <label
                  key={option}
                  className="cursor-pointer rounded-full px-5 py-2.5 font-semibold text-ink/70 transition-colors has-checked:bg-ink has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-heather"
                >
                  <input
                    type="radio"
                    name="length"
                    value={option}
                    checked={length === option}
                    onChange={() => setLength(option)}
                    className="sr-only"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-bold">What are you into?</legend>
            <p className="mb-3 text-sm text-ink/70">Pick any. Places with more of these come first.</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(interest => {
                const on = selectedInterests.includes(interest);
                return (
                  <button
                    type="button"
                    key={interest}
                    aria-pressed={on}
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full border-2 px-4 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heather ${on ? 'border-heather bg-heather text-white' : 'border-mist bg-white text-ink/80 hover:border-heather'}`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={freeBus}
              onChange={e => setFreeBus(e.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-heather"
            />
            <span>
              <span className="block font-bold">I have an Under-22 bus pass</span>
              <span className="block text-sm text-ink/70">Bus fares become free. Trains still cost.</span>
            </span>
          </label>

          <button
            type="submit"
            className="rounded-full bg-ink px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-sea focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-heather"
          >
            Plan my trip
          </button>
        </form>

        <section ref={resultRef} aria-live="polite" className="scroll-mt-4 self-start lg:sticky lg:top-8">
          {plan && <PlanView key={plan.destination.id + plan.totalCost} plan={plan} />}

          {noTrip && (
            <div className="rounded-2xl bg-white p-6 ring-1 ring-mist sm:p-8">
              <h2 className="text-3xl font-extrabold tracking-tight">Stay local this time</h2>
              <p className="mt-2 text-ink/70">
                {gbp(noTrip.budget)} doesn&apos;t cover a return fare{noTrip.overnight ? ' and a night away' : ''}.
                Raise your budget, or try these free spots in Aberdeen.
              </p>
              <ul className="mt-6 space-y-5">
                {fallbacks.map(f => (
                  <li key={f.id} className="border-l-4 border-gorse pl-4">
                    <p className="font-bold">{f.title}</p>
                    <p className="text-ink/70">{f.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!plan && !noTrip && (
            <div className="rounded-2xl border-2 border-dashed border-mist p-8">
              <p className="font-bold">Every trip starts and ends in Aberdeen.</p>
              <p className="mt-1 text-ink/70">
                Set your budget, pick what you&apos;re into, and your route will show up here.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function PlanView({ plan }: { plan: TripPlan }) {
  const { destination: dest, transportCost, overnightCost, activities, totalCost, budget } = plan;
  const activityCost = totalCost - transportCost - overnightCost;
  const overnight = overnightCost > 0;
  const pct = (n: number) => `${budget > 0 ? (n / budget) * 100 : 0}%`;
  // Overnight trips split activities across the two days, with the stay in between
  const day1 = overnight ? activities.slice(0, Math.ceil(activities.length / 2)) : activities;
  const day2 = overnight ? activities.slice(day1.length) : [];
  const ticketNote = transportCost === 0 && dest.returnFare > 0 ? 'free with your bus pass' : 'return ticket';

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-mist sm:p-8">
      <h2 className="text-4xl font-extrabold tracking-tight">{dest.name}</h2>
      <p className="mt-1 text-ink/70">{dest.description}</p>

      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <p>
            <span className="text-2xl font-extrabold tabular-nums">{gbp(totalCost)}</span>
            <span className="text-ink/70"> of {gbp(budget)}</span>
          </p>
          <p className="text-sm font-semibold tabular-nums text-sea">{gbp(budget - totalCost)} to spare</p>
        </div>
        <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-granite" aria-hidden="true">
          <span className="bg-sea" style={{ width: pct(transportCost) }} />
          <span className="bg-heather" style={{ width: pct(overnightCost) }} />
          <span className="bg-gorse" style={{ width: pct(activityCost) }} />
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/70">
          <Legend colour="bg-sea" label="Travel" amount={transportCost} />
          {overnight && <Legend colour="bg-heather" label="Stay" amount={overnightCost} />}
          <Legend colour="bg-gorse" label="Things to do" amount={activityCost} />
        </ul>
      </div>

      <ol className="route mt-8">
        <Stop major title="Leave Aberdeen" detail={`${dest.transportType}, about ${dest.travelTime}, ${ticketNote}`} cost={transportCost} />
        {day1.map(act => <ActivityStop key={act.name} act={act} />)}
        {overnight && (
          <Stop major title={`Stay the night in ${dest.name}`} detail="Hostel or budget B&B" cost={overnightCost} />
        )}
        {day2.map(act => <ActivityStop key={act.name} act={act} />)}
        <Stop major title="Back to Aberdeen" detail={`About ${dest.travelTime}, on the same ticket`} />
      </ol>

      <p className="mt-8 text-sm text-ink/70">Prices are estimates. Check fares before you travel.</p>
    </div>
  );
}

function ActivityStop({ act }: { act: Activity }) {
  return <Stop title={act.name} detail={act.tags.join(', ')} cost={act.cost} />;
}

function Stop({ title, detail, cost, major = false }: { title: string; detail: string; cost?: number; major?: boolean }) {
  return (
    <li className="relative pb-6 pl-9 last:pb-0">
      <span
        aria-hidden="true"
        className={`absolute rounded-full ${major ? 'left-0 top-1 size-4 bg-ink ring-4 ring-white' : 'left-[3px] top-[7px] size-2.5 border-2 border-heather bg-white'}`}
      />
      <div className="flex justify-between gap-4">
        <div>
          <p className={major ? 'font-bold' : 'font-semibold'}>{title}</p>
          <p className="text-sm text-ink/70">{detail}</p>
        </div>
        {cost !== undefined && (
          <p className="shrink-0 font-semibold tabular-nums">{cost === 0 ? 'Free' : gbp(cost)}</p>
        )}
      </div>
    </li>
  );
}

function Legend({ colour, label, amount }: { colour: string; label: string; amount: number }) {
  return (
    <li className="flex items-center gap-1.5">
      <span aria-hidden="true" className={`size-2.5 rounded-full ${colour}`} />
      {label} {gbp(amount)}
    </li>
  );
}
