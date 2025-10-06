# Server Action Contract – Ordering (Pay On Site)

## `createOrder(sessionInput)`
- **Intent**: Persist a first-party order, reserve preparation slot, and issue on-site payment instructions.
- **Visibility**: Server Action (`app/(transactions)/order/actions.ts`).
- **Input Shape** (`sessionInput`):
  ```ts
  type OrderSessionInput = {
    serviceType: 'pickup' | 'dine-in';
    locationSlug: string;
    cart: Array<{
      menuItemId: string;
      quantity: number;
      notes?: string;
      customizations?: string[];
    }>;
    contact: {
      email: string;
      phone?: string;
      name: string;
    };
    requestedReadyAt?: string; // ISO datetime
    paymentMode?: 'pay_on_site' | 'invoice_email';
    accountId?: string;
    specialInstructions?: string;
  }
  ```
- **Validation Rules**:
  - Verify location supports requested `serviceType` and is within open hours (query `LocationHours`).
  - Reject unavailable menu items or quantities outside 1–10 range.
  - If `paymentMode === 'invoice_email'`, require `contact.email` and flag for finance handoff.
- **Response Shape**:
  ```ts
  type CreateOrderResponse = {
    orderId: string;
    status: 'submitted';
    paymentMode: 'pay_on_site' | 'invoice_email';
    instructions: string; // e.g., "Pay at counter" or invoice summary
    estimatedReadyAt: string;
    revalidateTags: string[]; // ['order-state:{orderId}', 'menu-item:{slug}']
  }
  ```
- **Caching**: `Cache-Control: no-store`; use `revalidateTag` for affected menu items when availability toggles.
- **Errors**:
  - `SERVICE_CLOSED` with message containing next opening time.
  - `ITEM_UNAVAILABLE` listing offending items.
  - `VALIDATION_ERROR` for missing required fields.

## `updateOrderStatus(orderId, status)`
- **Intent**: Allow staff dashboard or automation to transition order status.
- **Input**: `{ orderId: string; status: 'submitted' | 'ready' | 'cancelled'; actor: 'system' | 'staff'; }`
- **Response**: `{ orderId: string; status: string; revalidateTags: ['order-state:{orderId}'] }`
- **Notes**: Protected via role check; used in follow-up phases.

## Supporting Fetchers
- **`getMenuForLocation(locationSlug)`**: Returns menu categories/items with availability flags; revalidate per category slug.
- **`getServiceHours(locationSlug)`**: Reads `LocationHours`; used for gating and messaging.

## Observability Requirements
- Emit span `order.create` with attributes `location`, `serviceType`, `cartItemCount`, `paymentMode`, `accountId`.
- Log structured event on `SERVICE_CLOSED` containing requested time and location.

## Tests (to be written in Phase 1)
1. Contract test ensures `createOrder` returns `SERVICE_CLOSED` outside business hours.
2. Contract test verifies pay-on-site response includes instructions and revalidate tags.
3. Integration test covers invoice-by-email path (sets `paymentMode='invoice_email'`).

