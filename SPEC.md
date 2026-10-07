# Weekend Trip Planner - Specifications

## Overview
A web app to plan cheap weekend or day trips from Aberdeen using public transport, primarily aimed at university students.

## User Inputs
- **Trip Length:** Select between a "Day trip" or a "2-day overnight" trip.
- **Budget:** Maximum spend limit in pounds (£).
- **Interests:** Selectable tags such as Outdoors, History, Coastal, and Food.
- **Free Bus Pass:** A toggle for "Under-22 / Free Bus Pass" which, when activated, sets all bus fares in the calculations to £0.

## Itinerary Generation & Data
- The app will rely on a curated list of realistic public transport trips starting from Aberdeen (e.g., Stonehaven and Dunnottar Castle, Royal Deeside, Dundee, Cruden Bay).
- The list will be filtered based on the user's inputs (budget, length, interests).
- **Google Maps API:** We will integrate the Google Maps API for mapping and location enhancements.

## Presentation of the Plan
- **Timeline format:** Trips are displayed as a step-by-step timeline.
- **Transport info:** The timeline will highlight the operator and transport type (e.g., "ScotRail Train" or "Stagecoach Bus") instead of specific service numbers to prevent issues with changing timetables.
- **Costs:** Estimated costs will be shown alongside activities and transport, with a clear note indicating that prices may vary.
- **Ranking:** If multiple itineraries match the user's inputs, they will be sorted and shown in order of relevance (best match first).

## Handling Low Budgets
- If the user's budget is too small to travel outside the city, the app will display a friendly message explaining the situation.
- It will then suggest free or very cheap local activities to do within Aberdeen (e.g., visiting Footdee, walking through Old Aberdeen and Seaton Park, or visiting Duthie Park).

## Tech Stack
- Plain HTML, CSS, and vanilla JavaScript (Single-page app).
- No frameworks or build steps.
- Uses Google Maps API for external integrations.
