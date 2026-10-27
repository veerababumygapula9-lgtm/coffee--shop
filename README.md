# Coffee Shop Mobile App

React + Vite + Tailwind CSS implementation of the Coffee Shop Figma design, laid out as a mobile website (full-screen on phones, a centred mobile-width column on desktop).

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/App.jsx`: root component, screen switching, cart and favorites state
- `src/components/`: reusable UI (BottomNav, ProductCard, CategoryTabs, SearchBar, QuantitySelector, PromoBanner, ScreenHeader)
- `src/screens/`: Onboarding, Home, Detail, Cart, OrderTracking
- `src/data/mockData.js`: menu items, categories, sizes, pricing helpers
- `src/assets/icons.jsx`: single place to swap the icon set
- `public/images/`: product and onboarding images (cropped from the design's asset sheet)

The image files are low resolution because they were cropped from the Figma asset sheet.
Replace them with full-size exports using the same filenames for sharper results.
