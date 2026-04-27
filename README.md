# FreshNexus

FreshNexus is a grocery catalog built with Next.js. The app lets users browse products, search and filter the catalog, open product detail pages, view market insights, and add products to a small cart dropdown in the header.

## Architectural Notes

### SEO

I used the Next.js App Router because the main catalog and product detail pages benefit from server-rendered content. Product data is fetched on the server from Open Food Facts, so search engines can receive meaningful HTML instead of waiting for the browser to build the page after load.

The root layout defines default metadata for the app, while the dynamic product route has its own `generateMetadata` function. That product metadata is built from the actual product name, brand, size, category, nutrition grade, and image. This makes each product page easier to understand when shared or indexed, instead of every page having the same generic title and description.

The catalog uses query parameters for search, category, and pagination. That keeps URLs readable and shareable, for example a filtered catalog page can be opened directly without losing state. The product detail route also supports lookup by product code or slug, which gives the page a stable URL shape while still allowing fallback search behavior.

### Data Persistence

Most product and analytics data is treated as live external data. The app fetches product results, product details, news, and exchange-rate information from APIs instead of storing a copied product database inside the project. This keeps the demo lightweight and avoids stale local data.

For the cart, I used a React context provider in `CartContext`. The cart is shared across the header and product cards, so clicking the plus button can immediately update the cart count and open the dropdown. This state is currently stored in memory only. That is intentional for this version because there is no login, checkout, or backend user session yet.

If FreshNexus became a production ecommerce app, the next step would be to persist the cart in `localStorage` for guests and in a database for signed-in users. For now, keeping the cart client-side makes the UI fast and simple without adding backend complexity that the current feature set does not need.

## Running Locally

```bash
npm run dev
```

Then open `http://localhost:3000`.
