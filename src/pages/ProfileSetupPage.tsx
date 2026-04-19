import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { updateUserProfile } from '../services/auth';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function ProfileSetupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, name, role } = location.state || {};

  const [fullName, setFullName] = useState(name || '');
  const [title, setTitle] = useState('');
  const [selectedRole, setSelectedRole] = useState(role || '');
  const [isLoading, setIsLoading] = useState(false);

  const roles = ['Midwife', 'Intern', 'Student', 'Other'];

  const handleSubmit = async () => {
    if (!fullName.trim()) return;

    setIsLoading(true);
    try {
      // Update user profile
      await updateUserProfile(email, {
        fullName: `${title} ${fullName}`.trim(),
        role: selectedRole,
        title
      });

      // Redirect based on role
      redirectBasedOnRole(selectedRole);
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case 'supervisor':
        navigate('/supervisor');
        break;
      case 'care':
        navigate('/care');
        break;
      default:
        navigate('/dashboard');
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
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
              alt="New beginning"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          <div className="card p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Tell us about yourself
            </h1>
            
            <div className="space-y-6 mt-6">
              <Input
                label="Full name + Title (Mrs, Miss, Ms, Dr, etc.)"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Dr. Sarah Johnson"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Your role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRole(r.toLowerCase())}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        selectedRole === r.toLowerCase()
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={!fullName.trim() || !selectedRole}
                fullWidth
                className="text-lg mt-8"
              >
                Enter MediNova
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
