export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-neutral-900">Terms of Service</h1>
        <p className="text-sm text-neutral-500">
          Last updated: October 6, 2025
        </p>
      </header>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Acceptance of Terms</h2>
          <p className="text-sm text-neutral-600">
            By accessing and using the Restoran Kiisi website and services, you accept and agree to be bound by the 
            terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Reservations and Bookings</h2>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">Reservation Policy</h3>
            <ul className="space-y-2 text-sm text-neutral-600 ml-4">
              <li>• Reservations are subject to availability and restaurant capacity</li>
              <li>• We hold reservations for 15 minutes past the reserved time</li>
              <li>• Large party reservations may require a deposit or credit card guarantee</li>
              <li>• Cancellations should be made at least 24 hours in advance</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">Modifications and Cancellations</h3>
            <ul className="space-y-2 text-sm text-neutral-600 ml-4">
              <li>• Changes to reservations must be made through our website or by phone</li>
              <li>• No-shows may be subject to cancellation fees for large parties</li>
              <li>• We reserve the right to modify or cancel reservations due to unforeseen circumstances</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Orders and Payment</h2>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">Order Terms</h3>
            <ul className="space-y-2 text-sm text-neutral-600 ml-4">
              <li>• All prices are subject to change without notice</li>
              <li>• Menu items and availability may vary</li>
              <li>• Orders are processed in the order they are received</li>
              <li>• Estimated ready times are approximate and may vary</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">Payment Policy</h3>
            <ul className="space-y-2 text-sm text-neutral-600 ml-4">
              <li>• Payment is due at the time of service unless otherwise arranged</li>
              <li>• We accept cash, credit cards, and contactless payments</li>
              <li>• Invoice-by-email orders must be settled within 24 hours</li>
              <li>• All prices include applicable taxes</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Gift Cards</h2>
          <ul className="space-y-2 text-sm text-neutral-600 ml-4">
            <li>• Gift cards have no expiration date</li>
            <li>• Gift cards cannot be exchanged for cash</li>
            <li>• Lost or stolen gift cards cannot be replaced</li>
            <li>• Gift cards are valid at all Restoran Kiisi locations</li>
            <li>• Change will be provided for purchases under the card value</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">User Conduct</h2>
          <p className="text-sm text-neutral-600">
            Users agree not to use the service to:
          </p>
          <ul className="space-y-2 text-sm text-neutral-600 ml-4">
            <li>• Violate any applicable laws or regulations</li>
            <li>• Transmit harmful, offensive, or inappropriate content</li>
            <li>• Interfere with the operation of our website or services</li>
            <li>• Attempt to gain unauthorized access to our systems</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Limitation of Liability</h2>
          <p className="text-sm text-neutral-600">
            Restoran Kiisi shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
            including but not limited to loss of profits, data, or use, incurred by you or any third party, whether in 
            an action in contract or tort, arising from your access to or use of our services.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Intellectual Property</h2>
          <p className="text-sm text-neutral-600">
            All content on this website, including text, graphics, logos, images, and software, is the property of 
            Restoran Kiisi and is protected by copyright and other intellectual property laws.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Privacy</h2>
          <p className="text-sm text-neutral-600">
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, 
            to understand our practices.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Governing Law</h2>
          <p className="text-sm text-neutral-600">
            These terms shall be governed by and construed in accordance with the laws of Estonia, without regard to 
            its conflict of law provisions.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Changes to Terms</h2>
          <p className="text-sm text-neutral-600">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting 
            on this page. Your continued use of our services after any changes constitutes acceptance of the new terms.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Contact Information</h2>
          <p className="text-sm text-neutral-600">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-sm text-neutral-600">
            <p><strong>Email:</strong> legal@restorankiisi.ee</p>
            <p><strong>Phone:</strong> +372 555 12345</p>
            <p><strong>Address:</strong> Tallinn Old Town, Estonia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
