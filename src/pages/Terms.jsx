import Breadcrumbs from '../components/ui/Breadcrumbs'

export default function Terms() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-cream">
      <div className="container-custom py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]} />
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-soft">
          <h1 className="text-3xl font-display font-bold text-charcoal mb-6">Terms & Conditions</h1>
          <div className="prose prose-sm text-gray-600 space-y-4">
            <p className="text-sm text-gray-500">Last updated: January 2026</p>
            <p>
              By accessing and using FoodHub's website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">1. Use of Service</h2>
            <p>Our services are intended for personal, non-commercial use. You must be at least 18 years old to place an order. You agree to provide accurate and complete information when using our services.</p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">2. Orders & Payment</h2>
            <p>All orders are subject to acceptance and availability. Prices are listed in Pakistani Rupees (PKR) and are subject to change without notice. Payment must be made through the methods available on our platform.</p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">3. Delivery</h2>
            <p>We strive to deliver within the estimated time frames but delays may occur due to unforeseen circumstances. Risk of loss and title for items pass to you upon delivery.</p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">4. Promotions & Offers</h2>
            <p>Promotional offers and discount codes are subject to specific terms and cannot be combined unless explicitly stated. We reserve the right to modify or cancel promotions at any time.</p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">5. Limitation of Liability</h2>
            <p>FoodHub shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific order in question.</p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">6. Changes to Terms</h2>
            <p>We reserve the right to update these Terms & Conditions at any time. Continued use of our services after changes constitutes acceptance of the new terms.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
