import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hospital: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Get in touch for partnership opportunities or support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6">
                <Mail className="w-6 h-6 text-primary-600 mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</h3>
                <a href="mailto:semiloreawoniyi@gmail.com" className="text-primary-600 hover:underline">
                  semiloreawoniyi@gmail.com
                </a>
              </Card>
              
              <Card className="p-6">
                <Phone className="w-6 h-6 text-medical-600 mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Phone</h3>
                <p className="text-gray-600 dark:text-gray-400">+234 XXX XXX XXXX</p>
              </Card>
              
              <Card className="p-6">
                <MapPin className="w-6 h-6 text-yellow-600 mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">Global - Remote First</p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <Card className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@hospital.com"
                        required
                      />
                    </div>
                    
                    <Input
                      label="Hospital/Organization"
                      value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                      placeholder="St. Mary's Hospital"
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us how we can help..."
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all"
                        required
                      />
                    </div>
                    
                    <Button type="submit" fullWidth className="text-lg">
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
