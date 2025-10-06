export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-neutral-900">Privacy Policy</h1>
        <p className="text-sm text-neutral-500">
          Last updated: October 6, 2025
        </p>
      </header>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Information We Collect</h2>
          <p className="text-sm text-neutral-600">
            At Restoran Kiisi, we collect information you provide directly to us, such as when you make a reservation, 
            place an order, create an account, or contact us for support.
          </p>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">Personal Information</h3>
            <ul className="space-y-2 text-sm text-neutral-600 ml-4">
              <li>• Name and contact information (email, phone number)</li>
              <li>• Reservation and order history</li>
              <li>• Dietary preferences and special requests</li>
              <li>• Payment information (processed securely through third-party providers)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">Automatically Collected Information</h3>
            <ul className="space-y-2 text-sm text-neutral-600 ml-4">
              <li>• Website usage data and analytics</li>
              <li>• Device information and browser type</li>
              <li>• IP address and location data</li>
              <li>• Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">How We Use Your Information</h2>
          <p className="text-sm text-neutral-600">
            We use the information we collect to provide, maintain, and improve our services:
          </p>
          <ul className="space-y-2 text-sm text-neutral-600 ml-4">
            <li>• Process reservations and orders</li>
            <li>• Communicate with you about your dining experience</li>
            <li>• Send you updates about our menu and special offers (with your consent)</li>
            <li>• Improve our website and services</li>
            <li>• Comply with legal obligations</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Information Sharing</h2>
          <p className="text-sm text-neutral-600">
            We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
          </p>
          <ul className="space-y-2 text-sm text-neutral-600 ml-4">
            <li>• With your explicit consent</li>
            <li>• To trusted service providers who assist in operating our website and conducting our business</li>
            <li>• When required by law or to protect our rights and safety</li>
            <li>• In connection with a business transfer or acquisition</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Data Security</h2>
          <p className="text-sm text-neutral-600">
            We implement appropriate security measures to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Your Rights</h2>
          <p className="text-sm text-neutral-600">
            Under applicable data protection laws, you have the right to:
          </p>
          <ul className="space-y-2 text-sm text-neutral-600 ml-4">
            <li>• Access and review your personal information</li>
            <li>• Correct inaccurate or incomplete information</li>
            <li>• Request deletion of your personal information</li>
            <li>• Object to or restrict processing of your information</li>
            <li>• Withdraw consent for marketing communications</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Cookies and Tracking</h2>
          <p className="text-sm text-neutral-600">
            We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, 
            and personalize content. You can control cookie settings through your browser preferences.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Contact Us</h2>
          <p className="text-sm text-neutral-600">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-2 text-sm text-neutral-600">
            <p><strong>Email:</strong> privacy@restorankiisi.ee</p>
            <p><strong>Phone:</strong> +372 555 12345</p>
            <p><strong>Address:</strong> Tallinn Old Town, Estonia</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Changes to This Policy</h2>
          <p className="text-sm text-neutral-600">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by 
            posting the new policy on this page and updating the "Last updated" date.
          </p>
        </div>
      </div>
    </div>
  );
}
