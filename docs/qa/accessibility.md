# Accessibility Sweep - Navigation, Order, Reserve

**Timestamp**: 2025-10-05 09:18 +03:00

## Navigation
- Confirmed landmarks: top-level `<header>` uses semantic `<nav>` groups with `aria-label` for primary, secondary, and mobile menus.
- Missing `aria-current="page"` on active links; rely on color only for state. Recommend adding to meet WCAG 1.4.1 for non-color cues and improve screen reader feedback.
- No skip link present for bypassing navigation; add `<a href="#main" class="sr-only focus:not-sr-only">` pattern on layout.

## Order Flow (`src/app/(transactions)/order/order-form.tsx`)
- Form controls have associated `<label>` elements with `htmlFor`, good baseline accessibility.
- Success and error alerts render visually but lack `role="status"` / `aria-live` region, so screen readers will miss updates; add `aria-live="assertive"` for errors and `polite` for confirmations.
- Submit button copies change to "Submitting." but form does not expose busy state; consider `aria-busy="true"` or `disabled` plus `aria-live` feedback.
- Menu item dropdown renders currency string as `?` placeholder (`{item.name} ? {item.price}`) due to encoding issue; fix to output plain text `EUR` or fallback label for clarity.

## Reserve Flow (`src/app/(transactions)/reserve/reservation-form.tsx`)
- Similar label coverage; form provides contextual instructions in plain text.
- Nearest-slot messaging currently appears only via text update in success block; ensure fallback list is conveyed with semantic list or `aria-live` message when available.
- Date/time input uses `datetime-local`; confirm localization for assistive tech and ensure server-side validation mirrors UI expectations.

## General Follow-Ups
1. Add `aria-current="page"` to navigation items based on `usePathname()` comparison.
2. Introduce shared `StatusMessage` component with `role="status"` and `aria-live` for order/reservation feedback.
3. Normalize currency formatting with `Intl.NumberFormat` to avoid garbled glyphs in dropdown labels.
4. Include a skip link in `(marketing)` and `(transactions)` layouts for keyboard users.

