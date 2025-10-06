# Phase 1 Data Model – Restoran Kiisi Web Experience

## Entities

### MenuCategory
- **Fields**: `id (UUID)`, `slug (string, unique)`, `name (string)`, `description (string)`, `displayOrder (int)`, `isSeasonal (boolean)`, `imageUrl (string?)`, `locations (array<RestaurantLocation.id>)`, `updatedAt (datetime)`
- **Relationships**: One-to-many with `MenuItem`; many-to-many with `Promotion` for spotlighted dishes.
- **Caching Tags**: `menu-category:{slug}` (triggered via `revalidateTag`).

### MenuItem
- **Fields**: `id (UUID)`, `slug (string, unique)`, `categoryId (UUID)`, `name (string)`, `description (string)`, `price (decimal)`, `dietaryTags (array<string>)`, `isAvailable (boolean)`, `heroImageUrl (string?)`, `locationOverrides (array<LocationPriceOverride>)`, `spiceLevel (enum: mild|medium|hot)`, `updatedAt (datetime)`
- **Relationships**: Belongs to `MenuCategory`; optional promotions via join table.
- **State Transitions**: `draft -> published -> retired`; availability toggled per service windows.
- **Caching Tags**: `menu-item:{slug}`, and parent category tag.

### Promotion
- **Fields**: `id (UUID)`, `code (string?)`, `title (string)`, `subtitle (string)`, `body (markdown)`, `startAt (datetime)`, `endAt (datetime)`, `audience (enum: public|catering|loyalty)`, `ctaLabel (string)`, `ctaUrl (string)`, `isActive (boolean)`
- **Relationships**: Many-to-many with `MenuCategory`/`MenuItem`; referenced by navigation secondary links.
- **Caching Tags**: `promotion:{id}`.

### RestaurantLocation
- **Fields**: `id (UUID)`, `slug (string, unique)`, `name (string)`, `address (structured)`, `phone (string)`, `email (string)`, `mapEmbedId (string)`, `amenities (array<string>)`, `preferredRegion (string)`, `createdAt`, `updatedAt`
- **Relationships**: One-to-many to `OrderSession`, `ReservationRequest`, `LocationHours`, `ReservationPolicy`.
- **Caching Tags**: `location:{slug}`.

### LocationHours
- **Fields**: `id (UUID)`, `locationId (UUID)`, `dayOfWeek (int 0-6)`, `openTime (time)`, `closeTime (time)`, `isClosed (boolean)`, `specialDate (date?)`, `message (string?)`, `createdAt`
- **Usage**: Drives service-hour gating for ordering/reservation flows.

### ReservationPolicy
- **Fields**: `id (UUID)`, `locationId (UUID)`, `maxPartySize (int)`, `minPartySize (int)`, `bookingIntervalMinutes (int)`, `bufferMinutes (int)`, `waitlistEnabled (boolean)`, `createdAt`
- **Usage**: Supplements availability algorithm and informs UI copy.

### OrderSession
- **Fields**: `id (UUID)`, `status (enum: pending|submitted|cancelled|ready)`, `serviceType (enum: pickup|dine-in)`, `locationId (UUID)`, `guestProfileId (UUID?)`, `cartItems (array<OrderLine>)`, `subtotal (decimal)`, `tax (decimal)`, `total (decimal)`, `paymentMode (enum: pay_on_site|invoice_email)`, `invoiceEmailSentAt (datetime?)`, `requestedReadyAt (datetime?)`, `specialInstructions (string?)`, `createdAt`
- **Relationships**: Belongs to `RestaurantLocation`; optional `GuestProfile`.
- **State Transitions**: `pending -> submitted -> ready`; `pending -> cancelled`.
- **Caching Tags**: Not CDN cached; use `order-state:{id}` for UI revalidation.

### ReservationRequest
- **Fields**: `id (UUID)`, `status (enum: pending|confirmed|waitlisted|cancelled)`, `partySize (int)`, `requestedAt (datetime)`, `confirmedAt (datetime?)`, `locationId (UUID)`, `guestProfileId (UUID?)`, `contactName (string)`, `contactEmail (string)`, `contactPhone (string)`, `notes (string?)`, `nearestAlternatives (array<datetime>)`, `createdAt`
- **Relationships**: Belongs to `RestaurantLocation`; optional `GuestProfile`.
- **Caching Tags**: `reservation-window:{locationId}` (database-driven via revalidateTag).

### GuestProfile
- **Fields**: `id (UUID)`, `email (string, unique)`, `passwordHash (string, bcrypt)`, `firstName (string)`, `lastName (string)`, `phone (string?)`, `loyaltyId (string?)`, `defaultLocationId (UUID?)`, `marketingOptIn (boolean)`, `lastLoginAt (datetime)`, `createdAt`, `updatedAt`
- **Relationships**: One-to-many with `OrderSession` and `ReservationRequest`.
- **Constraints**: Email stored lowercase unique; password hashed with bcrypt + pepper and maintain history of last 5 hashes; marketing opt-in must be explicit per GDPR.

### NavigationLink
- **Fields**: `id (UUID)`, `label (string)`, `type (enum: primary|secondary|mobile)`, `href (string)`, `icon (string?)`, `badge (string?)`, `priority (int)`, `isActive (boolean)`
- **Relationships**: None; data managed via seed script.

### LocationPriceOverride (Embedded)
- **Fields**: `locationId (UUID)`, `price (decimal)`, `isAvailable (boolean)`, `notes (string?)`
- **Usage**: Allows per-location menu variations without duplicating menu items.

## Derived Types
- **OrderLine**: `{ menuItemId: string; quantity: number; customizations?: string[]; price: decimal; notes?: string }`
- **AvailabilitySlot**: `{ time: datetime; isAvailable: boolean; reason?: string }`

## Data Access Patterns
- Prisma client (Data Proxy) for read-heavy marketing routes; PlanetScale used for consistency.
- Server Actions (`createOrder`, `checkAvailability`, `createReservation`, `updateProfile`, `cancelReservation`) handle all mutations and trigger `revalidateTag` for related entities.
- Availability calculations query `LocationHours` + `ReservationPolicy` and persist snapshots to `ReservationRequest.nearestAlternatives`—no external cache in MVP.

## Security & Compliance Notes
- Password storage: bcrypt cost 12 + application-level pepper; rotate pepper quarterly.
- Reservation/contact data retained 90 days, then anonymized.
- Invoice-by-email captures consent flag and stores sent timestamp for audit.
- Ensure personal data queries scoped by location for least privilege.

## Outstanding Considerations
- Track post-MVP story to adopt managed cache (Redis or Vercel KV) if availability query latency becomes an issue.
- Loyalty integration may add external IDs per order; reserved columns available (`loyaltyId`).

