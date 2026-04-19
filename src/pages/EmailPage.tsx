import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { checkEmailForHospital, loginUser, createUser, sendNewUserNotification } from '../services/auth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Modal } from '../components/ui/Modal';
import type { User } from '../types';

export function EmailPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [existingUser, setExistingUser] = useState<User | null>(null);
  
  // New user form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [isSubmittingNewUser, setIsSubmittingNewUser] = useState(false);

  const hospitalId = sessionStorage.getItem('medinova_hospital_id') || '';
  const hospitalName = sessionStorage.getItem('medinova_hospital_name') || '';
  const tokenType = sessionStorage.getItem('medinova_token_type') || '';

  const handleContinue = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Check if email exists for this hospital
      const user = await checkEmailForHospital(email, hospitalId);

      if (user) {
        // Existing user - log them in
        setExistingUser(user);
        await loginUser(email);
        
        // Redirect based on role
        redirectBasedOnRole(user.role);
      } else {
        // New user - show registration modal
        setShowNewUserModal(true);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewUserSubmit = async () => {
    if (!newUserName.trim() || !newUserRole) {
      return;
    }

    setIsSubmittingNewUser(true);

    try {
      // Create new user
      const newUser = await createUser(
        email,
        newUserName,
        newUserRole as any,
        hospitalId,
        hospitalName
      );

      // Send notification to hospital
      const hospitalEmail = 'hospital@example.com'; // Get from hospital data
      await sendNewUserNotification(hospitalEmail, newUserName, email, newUserRole);

      // Show success and redirect to profile setup
      setShowNewUserModal(false);
      navigate('/profile-setup', { state: { email, name: newUserName, role: newUserRole } });
    } catch (err) {
      console.error('Error creating user:', err);
    } finally {
      setIsSubmittingNewUser(false);
    }
  };

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
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
              src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800"
              alt="Healthcare community"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          <div className="card p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Please enter your email
            </h1>
            
            <div className="space-y-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@hospital.com"
                error={error}
                className="text-center"
              />

              <Button
                onClick={handleContinue}
                isLoading={isLoading}
                fullWidth
                className="text-lg"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* New User Modal */}
      <Modal
        isOpen={showNewUserModal}
        onClose={() => setShowNewUserModal(false)}
        title="New User Registration"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            This email is not registered with <strong>{hospitalName}</strong>. Are you sure you work here?
          </p>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Enter your details below. A notice has been sent to {hospitalName}.
            </p>
          </div>

          <Input
            label="Full Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Dr. Jane Smith"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Midwife', 'Intern', 'Student', 'Other'].map((role) => (
                <button
                  key={role}
                  onClick={() => setNewUserRole(role.toLowerCase())}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    newUserRole === role.toLowerCase()
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowNewUserModal(false)}
              className="flex-1"
            >
              No, Go Back
            </Button>
            <Button
              onClick={handleNewUserSubmit}
              isLoading={isSubmittingNewUser}
              disabled={!newUserName.trim() || !newUserRole}
              className="flex-1"
            >
              Yes, Register
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
