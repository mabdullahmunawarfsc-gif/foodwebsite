import Breadcrumbs from '../components/ui/Breadcrumbs'

export default function Privacy() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-cream">
      <div className="container-custom py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]} />
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-soft">
          <h1 className="text-3xl font-display font-bold text-charcoal mb-6">Privacy Policy</h1>
          <div className="prose prose-sm text-gray-600 space-y-4">
            <p className="text-sm text-gray-500">Last updated: January 2026</p>
            <p>
              FoodHub ("we", "our", or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
            </p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, including your name, email address, phone number, delivery address, and payment details when you place an order or create an account.</p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">2. How We Use Your Information</h2>
            <p>We use your information to process orders, deliver food, provide customer support, send promotional offers (with your consent), and improve our services.</p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">3. Data Sharing</h2>
            <p>We do not sell your personal information to third parties. We may share your data with delivery partners solely for the purpose of fulfilling your orders.</p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">5. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time by contacting us or through your account settings.</p>
            <h2 className="text-xl font-display font-bold text-charcoal mt-6">6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@foodhub.pk.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
