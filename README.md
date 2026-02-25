## Velora — Non‑custodial Crypto Payments for Merchants

Velora is a premium fintech demo that shows how Nigerian freelancers and merchants can accept **USDC** and **SOL** via clean, non‑custodial payment links – with a calm, Stripe‑grade UX and fully simulated payment flows.

This repository is optimized for **grant demos and product walk‑through videos**: everything runs locally, no real wallets or APIs are required, but the UX feels production‑grade.

---

## Demo Story: From Landing to Settlement

The recommended demo flow:

1. **Landing page**
   - Calm, black fintech landing with:
     - Hero explaining non‑custodial USDC / SOL payments.
     - “How Velora Works” 3‑step explainer.
     - Dashboard preview and trust section.
   - Click **“Get Started”** → `/auth/login`.

2. **Login (Simulated Google Auth)**
   - Route: `/auth/login`
   - Click **“Continue with Google”**:
     - Shows “Connecting to Google…” for ~1.5s.
     - Saves a demo user in `localStorage`:
       ```json
       {
         "name": "Demo Merchant",
         "email": "merchant@gmail.com",
         "role": "Owner",
         "wallet": ""
       }
       ```
     - Redirects to `/dashboard`.

3. **Dashboard (Invoice‑first experience)**
   - Route: `/dashboard`
   - Features:
     - Black gradient background and premium cards.
     - KPI row (Total Volume, Total Invoices, Paid Invoices).
     - **Invoice generator** (`Create Invoice`) with:
       - Amount (USDC)
       - Merchant wallet
       - On submit:
         - Creates an in‑memory `Invoice`:
           ```ts
           interface Invoice {
             id: string;
             amount: number;
             merchantWallet: string;
             status: "pending" | "paid";
             createdAt: Date;
           }
           ```
         - Navigates to `/pay/[invoiceId]?amount=...&wallet=...`.
     - Invoices panel showing latest invoices and **Paid / Pending** badges.

4. **Customer Payment Link (Wallet + Card + Bank)**
   - Route: `/pay/[invoiceId]`
   - Shows:
     - Invoice ID and amount in USDC.
     - Merchant wallet (truncated).
     - **Copy Invoice Link** (copies the full shareable URL).
     - **Pay with Wallet** (simulated):
       - “Confirm in wallet…” then “Payment completed”.
       - Marks `invoice_<id> = "paid"` in `localStorage`.
     - **Pay with Card** button → `/pay/[invoiceId]/card`.
     - **Pay with Bank Transfer** button → `/pay/[invoiceId]/bank`.

5. **Card Flow (Stripe‑style, Simulated)**
   - Route: `/pay/[invoiceId]/card`
   - 3‑state flow:
     - `idle`: card fields + “Pay” button.
     - `processing`: loader + “Processing payment securely…”.
     - `success`: green check, “Payment Successful”.
   - On success:
     - Sets `localStorage.setItem("invoice_<id>", "paid")`.
     - Redirects to `/dashboard`.

6. **Bank Transfer Flow (Simulated Webhook)**
   - Route: `/pay/[invoiceId]/bank`
   - Shows:
     - Bank: Zenith Bank
     - Account: Velora Demo Settlement
     - Number: `1234567890`
     - Reference: `INV-xxxxxx` (derived from invoice ID)
     - Copy buttons for account number and reference.
   - “I’ve Completed Transfer”:
     - Shows “Confirming transfer…” with subtle pulse.
     - Marks `invoice_<id>` as `"paid"` in `localStorage`.
     - Redirects to `/dashboard`.

7. **Dashboard After Payment**
   - Route: `/dashboard`
   - On mount, dashboard checks `localStorage` for each invoice:
     - If `invoice_<id> === "paid"`, status becomes **Paid**.
   - KPI row updates Total Volume / Paid Invoices in real time.

8. **Profile & Architecture**
   - `/profile`: Manage demo merchant profile (name, role, wallet), persisted in `localStorage`.
   - `/architecture`: Visual architecture diagram showing:
     - Frontend → Invoice API → Payment Orchestrator → Paystack / Flutterwave / Solana → Webhook Listener → Merchant Wallet.

Throughout the app, a thin banner reminds reviewers that this is a **Demo Mode – All payments simulated** environment.

---

## Tech Stack

- **Framework**: Next.js 16 App Router (TypeScript)
- **Styling**:
  - Tailwind CSS v4 design tokens (HSL) with a consistent black theme
  - Custom components with shadcn‑style tokens
- **Animation**: framer‑motion for subtle fades and motion
- **State & Storage**:
  - React client components
  - `localStorage` for simulated auth, invoices, and payment status

---

## Running Locally

Clone the repo:

```bash
git clone https://github.com/Focus1010/velora.git
cd velora
```

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

For the best demo experience:

1. Start on `/` (landing).
2. Click **Get Started** → `/auth/login`.
3. Continue with Google → `/dashboard`.
4. Create an invoice → follow the payment links.

---

## Notes & Limitations

- **All payments are simulated** – there are **no real card, bank, or crypto charges**.
- Data is stored in **`localStorage` only** and is reset when storage is cleared.
- Wallet integration and real Paystack/Flutterwave hooks are described in the `/architecture` view but not implemented, to keep the demo safe and self‑contained.

This project is intentionally tuned to look and feel like a real, investor‑ready product while remaining frictionless to run and demo locally. 
