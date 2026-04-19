import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';

export function LandingPage() {
  const navigate = useNavigate();
  const [isNew, setIsNew] = useState<boolean | null>(null);

  const handleSelection = (newUser: boolean) => {
    setIsNew(newUser);
    setTimeout(() => {
      navigate('/token');
    }, 300);
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper pt-24">
        <div className="w-full max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden mb-8 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200"
              alt="Healthcare professionals"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Welcome to MediNova
              </h1>
              <p className="text-white/90 text-lg">
                Empowering healthcare professionals worldwide
              </p>
            </div>
          </div>

          {/* Selection Card */}
          <div className="card p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
              Is this your first time on this platform?
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleSelection(true)}
                className="text-lg py-4 px-8"
                variant="primary"
              >
                Yes, I'm New
              </Button>
              
              <Button
                onClick={() => handleSelection(false)}
                className="text-lg py-4 px-8"
                variant="secondary"
              >
                No, I've Been Here
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
              <a 
                href="/about" 
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 underline"
              >
                About MediNova
              </a>
              <a 
                href="/partnership" 
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 underline"
              >
                Partner With Us
              </a>
              <a 
                href="/contact" 
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 underline"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
