# VibeFinder

VibeFinder is an AI-powered web application that curates and displays trending local experiences and events based on real-time social media video analysis, presented visually on a map.

## Overview

Stop doomscrolling, start discovering: Your AI guide to trending local spots.

VibeFinder helps users discover genuinely trending and atmospheric local spots by analyzing social media content in real-time. The application presents recommendations on an interactive map, allowing users to easily visualize what's happening around them.

## Core Features

### AI-Powered Social Curation
Scans Instagram and TikTok videos in real-time to identify trending venues, events, and experiences. Extracts key information like atmosphere, crowd, and activity type.

### Interactive Map View
Displays curated recommendations on an interactive map, allowing users to easily visualize what's happening around them.

### Real-time Trend Insights
Shows *why* a place is trending by integrating short video clips, user sentiment, and key activity highlights directly into recommendations.

### Personalized 'Vibe' Matching
Learns user preferences for atmosphere, crowd, and activity from their social media behavior to tailor recommendations.

## Technical Architecture

### Frontend
- Next.js with TypeScript
- Tailwind CSS for styling
- React for UI components

### Backend
- Supabase for data storage and authentication
- API integrations with social media platforms
- OpenAI for natural language processing

### APIs
- EnsembleData for social media scraping
- SocialKit Video Analysis API for content analysis
- OpenAI (GPT-4/3.5) for natural language processing
- Google Maps Geocoding/Places API for location data
- Supabase for backend services

## Data Model

### User
- userId
- preferences (vibes, location, saved_locations)
- onboarding_complete

### Recommendation
- recommendationId
- title
- description
- venue_name
- location
- social_media_url
- trend_score
- vibe_tags
- image_url
- video_url
- timestamp

### Venue
- venueId
- name
- address
- latitude
- longitude
- categories

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/vistara-apps/vibefinder.git
cd vibefinder
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
OPENAI_API_KEY=your_openai_api_key
ENSEMBLE_DATA_API_KEY=your_ensemble_data_api_key
SOCIALKIT_API_KEY=your_socialkit_api_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Business Model

VibeFinder operates on a freemium subscription model:
- Free tier: Basic recommendations and limited features
- Premium tier ($5/month): Advanced filtering, personalized vibe matching, and more

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for providing the GPT models
- Google for Maps API
- Supabase for backend services
- All the contributors to this project

