## AegisIndex Frontend (Next.js App Router)

Marketing site and dashboard for AegisIndex.

### Key Features
- Warm, soft color palette built around Tailwind Amber (`amber-50` → `amber-900`).
- Simple client-side auth with localStorage:
  - `signin` and `signup` pages.
  - `AuthContext` stores user: `{ email }` under `aegis_auth_user`.
- Dashboard flow:
  - Gated: redirects to `signin` when not authenticated.
  - Connect Domain step, saved as `aegis_connected_domain`.
  - USDT (TRC20) wallet display with QR and copy button.
- Simple SVG logo at `public/aegisindex-logo.svg` and shown in `Navbar`.

### Routes
- `/` Marketing landing
- `/signin` Sign in
- `/signup` Sign up
- `/dashboard` Auth-required dashboard, domain connect, and wallet section
- `/billing` Placeholder billing page

### Structure (selected)
- `src/app/layout.tsx` — wraps app with `AuthProvider`.
- `src/context/AuthContext.tsx` — minimal auth, localStorage-backed.
- `src/components/Navbar.tsx` — logo + auth-aware actions; warm palette.
- `src/app/dashboard/page.tsx` — gated view, domain connect, USDT TRC20 wallet.

### Environment Variables
- `NEXT_PUBLIC_API_BASE` — Backend API base URL (defaults to `http://localhost:4000`).

### Development
```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

### Theming Notes
- Primary action: `bg-amber-600 hover:bg-amber-500 text-white`.
- Accents and links: `amber-700/800`.
- Subtle surfaces: `amber-50/100`.
- Replace legacy blues in new components for consistency.

### Updating the Wallet Address
Edit the constant in `src/app/dashboard/page.tsx`:

```ts
const walletAddressUSDT_TRC20 = 'YOUR_TRC20_USDT_ADDRESS'
```

### Changing the Logo
Replace `public/aegisindex-logo.svg` and ensure the size remains reasonable for the navbar.
