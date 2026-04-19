import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '../components/ui/Card';
import { Heart, Users, Globe, Award, Shield, Sparkles } from 'lucide-react';

export function AboutPage() {
  const features = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Our platform puts patients first, ensuring every healthcare professional has the tools they need to provide exceptional care.'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Learn together with peers through interactive cases and simulations designed by medical experts.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Supporting healthcare professionals across the world with localized content and multilingual support.'
    },
    {
      icon: Award,
      title: 'Evidence-Based',
      description: 'All training materials are based on the latest medical research and best practices.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security ensures patient data and hospital information remain protected.'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Smart recommendations and personalized learning paths powered by advanced AI.'
    }
  ];

  return (
    <div className="page-container">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              About MediNova
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Empowering healthcare professionals with cutting-edge training and patient management tools. 
              We're building the future of medical education, one case at a time.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-primary-50 to-medical-50 dark:from-primary-900/20 dark:to-medical-900/20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                To democratize medical education and improve patient outcomes worldwide by providing 
                accessible, high-quality training to healthcare professionals everywhere.
              </p>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
              Why Choose MediNova?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tokens Info */}
        <section id="tokens" className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Understanding Access Tokens
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  MediNova uses a secure token-based access system to ensure only authorized personnel 
                  can access hospital-specific data and training materials.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Hospital Token</h4>
                    <p className="text-sm">For general staff access to training modules</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Supervisor Token</h4>
                    <p className="text-sm">For managers to oversee staff progress</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Care Token</h4>
                    <p className="text-sm">For patient registration and management</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}