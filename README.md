# e-plantShopping — Paradise Nursery

A React shopping cart application for Paradise Nursery, built for the IBM final project by Indrajeet Badhel. Browse houseplants, add plants to a Redux-powered cart, and manage quantities and totals.

- **Live application:** https://indrajeet-badhel.github.io/e-plantShopping/
- **Public repository:** https://github.com/Indrajeet-Badhel/e-plantShopping

## Features

- Landing page with a greenhouse background, company introduction, and Get Started button.
- Five plant categories with six distinct plants per category (30 cards; some plants appear in more than one category).
- Each card includes a photograph, name, description, price, and Add to Cart button.
- Added plants have disabled, gray Added to Cart buttons. Removing a plant enables its buttons again across categories.
- Shared Home, Plants, and Cart navigation with a badge showing the sum of all quantities.
- Cart thumbnails, unit prices, quantities, per-plant subtotals, and total cart amount.
- Increase, decrease, and delete controls. Decreasing a quantity of one removes that item.
- Continue Shopping returns to the catalog; Checkout displays a Coming Soon message.
- Responsive layouts and keyboard-accessible controls. Photos are bundled locally; source links are in IMAGE_CREDITS.md.

## Run locally

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal, including `/e-plantShopping/`.

```sh
npm run lint
npx playwright install chromium
npm test
npm run build
npm run preview
```

The Playwright tests cover the full shopping flow, category counts, totals, cart badge, deletion and re-adding, checkout, navigation, browser history, and mobile overflow.

## Implementation

`src/CartSlice.jsx` defines `addItem`, `removeItem`, and `updateQuantity`. `src/store.js` registers the reducer, and `src/main.jsx` wraps the app in the React Redux Provider. ProductList synchronizes its `addedToCart` state with Redux using `useEffect`. Hash navigation works on GitHub Pages and supports browser Back and Forward.

Cart state lasts for the current page session; refreshing resets it. Checkout is a demonstration and does not process payments or orders.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` installs dependencies, lints, runs browser tests, builds, and deploys to GitHub Pages on pushes to `main`. GitHub Pages uses **GitHub Actions** as its source. Vite is configured with the repository base path `/e-plantShopping/`.

## Assignment submission links

1. [README.md](https://github.com/Indrajeet-Badhel/e-plantShopping/blob/main/README.md)
2. [AboutUs.jsx](https://github.com/Indrajeet-Badhel/e-plantShopping/blob/main/src/AboutUs.jsx)
3. [App.css](https://github.com/Indrajeet-Badhel/e-plantShopping/blob/main/src/App.css)
4. [App.jsx](https://github.com/Indrajeet-Badhel/e-plantShopping/blob/main/src/App.jsx)
5. [CartSlice.jsx](https://github.com/Indrajeet-Badhel/e-plantShopping/blob/main/src/CartSlice.jsx)
6. [ProductList.jsx](https://github.com/Indrajeet-Badhel/e-plantShopping/blob/main/src/ProductList.jsx)
7. [CartItem.jsx](https://github.com/Indrajeet-Badhel/e-plantShopping/blob/main/src/CartItem.jsx)

## Credits

Based on the IBM Developer Skills Network e-plantShopping starter project, under the included Apache 2.0 license. See [image credits](IMAGE_CREDITS.md) for original image sources.
