import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { verifyToken } from '../services/auth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Info, ArrowRight } from 'lucide-react';

export function TokenPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!token.trim()) {
      setError('Please enter your access token');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await verifyToken(token.trim());
      
      if (result.valid) {
        // Store token info in session
        sessionStorage.setItem('medinova_token', token.trim());
        sessionStorage.setItem('medinova_token_type', result.type || '');
        sessionStorage.setItem('medinova_hospital_id', result.hospitalId || '');
        sessionStorage.setItem('medinova_hospital_name', result.hospitalName || '');
        
        // Navigate to email entry
        navigate('/email');
      } else {
        setError('Token not recognized. Please check or contact your supervisor.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper pt-24">
        <div className="w-full max-w-md mx-auto">
          {/* Image */}
          <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-8 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=800"
              alt="Access key"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          <div className="card p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Enter your access token
            </h1>
            
            <div className="space-y-6">
              <Input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="e.g., HOSP-ABC123-2026"
                error={error}
                className="text-center font-mono text-lg tracking-wider"
              />

              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>Given by your hospital supervisor</p>
              </div>

              <Button
                onClick={handleVerify}
                isLoading={isLoading}
                fullWidth
                className="text-lg"
              >
                Verify Token
                <ArrowRight className="w-5 h-5" />
              </Button>

              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Your company or hospital hasn't gotten a token?
                </p>
                <a 
                  href="/contact"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                  Contact us
                </a>
              </div>

              <div className="text-center">
                <a 
                  href="/about#tokens"
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 underline"
                >
                  # Learn more about tokens
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
