# 1. Clone repo
git clone <your-repo-url>
cd pokemon-explorer

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

# App runs on http://localhost:3000

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



🏗️ Architecture & Trade-offs
Tech Stack

  Next.js (App Router, TypeScript) → Routing, server/client components, type safety

  Tailwind CSS → Utility-first styling for speed & consistency

  PokéAPI → Public no-auth dataset

Key Features

  List View → Pokémon grid with pagination

  Detail View → /pokemon/:id shows detailed stats and abilities

  Search / Filter / Sort → Debounced search with query params in URL (?q=pikachu&type=fire&sort=name)

  Favorites → Toggle favorite in list/detail view, persisted in localStorage

  Error + Loading States → Skeleton loaders, retry buttons, empty-state messages

Trade-offs

  Client-side fetching with fetch: simpler but requires careful request cancellation (AbortController).

  URL as single source of truth: makes app reload-safe/shareable, but adds complexity (syncing search, filter, sort with router).

  LocalStorage favorites: lightweight, no backend needed; but doesn’t sync across devices.


Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
