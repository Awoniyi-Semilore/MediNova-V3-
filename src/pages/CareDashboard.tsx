import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { createPatient } from '../services/patient';
import { getHospitalPatients, getUpcomingAppointments } from '../services/hospital';
import { notificationManager } from '../services/notifications';
import type { Patient } from '../types';
import { 
  UserPlus, 
  Users, 
  Calendar,
  Search,
  ChevronRight,
  Baby,
  Phone,
  CheckCircle2,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

const REGISTRATION_STEPS = [
  {
    title: "Ask: 'What is your full name, and how would you like to be addressed?'",
    instruction: "Note his/her title. Ask if they didn't say.",
    field: 'fullName',
    placeholder: 'e.g., Mrs. Sarah Johnson',
    type: 'text',
    encouragement: "Almost there! You're doing great."
  },
  {
    title: "Baby's name?",
    instruction: "Enter 'nil' if not provided",
    field: 'babyName',
    placeholder: "Baby's name or 'nil'",
    type: 'text',
    encouragement: "Take your time, no rush."
  },
  {
    title: "Gender?",
    field: 'gender',
    type: 'select',
    options: [
      { value: 'male', label: 'Male', icon: '👦' },
      { value: 'female', label: 'Female', icon: '👧' }
    ],
    encouragement: "Perfect! Keep going."
  },
  {
    title: "Date of birth?",
    instruction: "Enter 'nil' if not provided",
    field: 'dateOfBirth',
    type: 'date',
    encouragement: "Great work!"
  },
  {
    title: "Phone number - start with country code",
    field: 'phoneNumber',
    placeholder: '+234...',
    type: 'tel',
    helper: "Include country code (e.g., +234, +1, +44)",
    encouragement: "You're almost done!"
  },
  {
    title: "Alternative phone?",
    instruction: "Enter 'nil' if not provided",
    field: 'alternativePhone',
    placeholder: '+234... or nil',
    type: 'tel',
    encouragement: "Nice attention to detail!"
  },
  {
    title: "Patient type?",
    field: 'patientType',
    type: 'select',
    options: [
      { value: 'antenatal', label: 'Antenatal', icon: '🤰' },
      { value: 'postnatal', label: 'Postnatal', icon: '👶' },
      { value: 'general', label: 'General', icon: '🏥' }
    ],
    encouragement: "Excellent choice!"
  },
  {
    title: "Next appointment?",
    field: 'nextAppointment',
    type: 'date',
    allowNotSure: true,
    encouragement: "Great planning!"
  },
  {
    title: "Any notes?",
    instruction: "Enter 'nil' if not provided",
    field: 'notes',
    placeholder: 'Condition, special needs...',
    type: 'textarea',
    encouragement: "Excellent! You're all set."
  }
];

export function CareDashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newPatientId, setNewPatientId] = useState('');
  
  // Form state
  const [formData, setFormData] = useState<Partial<Patient>>({});
  const [antenatalData, setAntenatalData] = useState({
    weeks: '',
    months: '',
    trimester: 'first',
    estimate: '',
    expectedDeliveryDate: ''
  });
  const [postnatalData, setPostnatalData] = useState({
    deliveryDate: '',
    babyName: '',
    babyGender: ''
  });

  useEffect(() => {
    if (user?.hospitalId) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [patientsData, appointmentsData] = await Promise.all([
        getHospitalPatients(user!.hospitalId!),
        getUpcomingAppointments(user!.hospitalId!, 7)
      ]);
      setPatients(patientsData);
      setUpcomingAppointments(appointmentsData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    if (registrationStep < REGISTRATION_STEPS.length - 1) {
      setRegistrationStep(prev => prev + 1);
    } else {
      handleSavePatient();
    }
  };

  const handlePrevStep = () => {
    if (registrationStep > 0) {
      setRegistrationStep(prev => prev - 1);
    }
  };

  const handleSavePatient = async () => {
    try {
      const patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> = {
        ...formData as any,
        hospitalId: user!.hospitalId!,
        registeredBy: user!.id,
        // Add antenatal/postnatal specific data
        ...(formData.patientType === 'antenatal' && {
          pregnancyWeeks: parseInt(antenatalData.weeks) || undefined,
          pregnancyMonths: parseInt(antenatalData.months) || undefined,
          trimester: antenatalData.trimester as any,
          pregnancyEstimate: antenatalData.estimate as any,
          expectedDeliveryDate: antenatalData.expectedDeliveryDate ? new Date(antenatalData.expectedDeliveryDate) : undefined
        }),
        ...(formData.patientType === 'postnatal' && {
          deliveryDate: postnatalData.deliveryDate ? new Date(postnatalData.deliveryDate) : undefined,
          babyName: postnatalData.babyName,
          babyGender: postnatalData.babyGender as any
        })
      };

      const newPatient = await createPatient(patientData);
      
      // Schedule reminder
      if (newPatient.nextAppointment) {
        await notificationManager.sendNotification({
          to: newPatient.phoneNumber,
          message: notificationManager.generateReminderMessage('7day', newPatient.fullName, newPatient.nextAppointment),
          patientName: newPatient.fullName,
          appointmentDate: newPatient.nextAppointment,
          type: 'welcome'
        });
      }

      setNewPatientId(newPatient.id);
      setShowSuccess(true);
      setShowRegistration(false);
      loadData();
    } catch (err) {
      console.error('Error saving patient:', err);
    }
  };

  const resetRegistration = () => {
    setRegistrationStep(0);
    setFormData({});
    setAntenatalData({ weeks: '', months: '', trimester: 'first', estimate: '', expectedDeliveryDate: '' });
    setPostnatalData({ deliveryDate: '', babyName: '', babyGender: '' });
    setShowSuccess(false);
    setShowRegistration(true);
  };

  const currentStep = REGISTRATION_STEPS[registrationStep];

  if (loading || isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="page-container">
      <Header showNav />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200"
              alt="Care"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-3xl font-bold text-white mb-2">Patient Care</h1>
              <p className="text-white/80">Register and manage patients with ease</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" onClick={() => setShowRegistration(true)}>
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-all"
            >
              <UserPlus className="w-8 h-8 text-primary-600 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Register Patient</h3>
              <p className="text-sm text-gray-500 mt-1">Add new patient</p>
            </Card>
            
            <Card className="p-6">
              <Users className="w-8 h-8 text-medical-600 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{patients.length}</h3>
              <p className="text-sm text-gray-500 mt-1">Total Patients</p>
            </Card>
            
            <Card className="p-6">
              <Calendar className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{upcomingAppointments.length}</h3>
              <p className="text-sm text-gray-500 mt-1">This Week</p>
            </Card>
            
            <Card className="p-6">
              <Baby className="w-8 h-8 text-pink-600 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {patients.filter(p => p.patientType === 'antenatal').length}
              </h3>
              <p className="text-sm text-gray-500 mt-1">Antenatal</p>
            </Card>
          </div>

          {/* Recent Patients */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Recent Patients
              </h2>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Next Appointment</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.slice(0, 10).map((patient) => (
                    <tr 
                      key={patient.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {patient.fullName}
                        </div>
                        {patient.babyName && (
                          <div className="text-sm text-gray-500">Baby: {patient.babyName}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          patient.patientType === 'antenatal' 
                            ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                            : patient.patientType === 'postnatal'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {patient.patientType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {patient.phoneNumber}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {patient.nextAppointment 
                          ? new Date(patient.nextAppointment).toLocaleDateString()
                          : 'Not scheduled'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Registration Modal */}
      <Modal
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        title={`Step ${registrationStep + 1} of ${REGISTRATION_STEPS.length}`}
        maxWidth="lg"
      >
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all"
              style={{ width: `${((registrationStep + 1) / REGISTRATION_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step content */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {currentStep.title}
            </h3>
            {currentStep.instruction && (
              <p className="text-sm text-gray-500 mb-4">{currentStep.instruction}</p>
            )}

            {/* Input fields based on type */}
            {currentStep.type === 'text' && (
              <input
                type="text"
                value={(formData as any)[currentStep.field] || ''}
                onChange={(e) => setFormData({ ...formData, [currentStep.field]: e.target.value })}
                placeholder={currentStep.placeholder}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
            )}

            {currentStep.type === 'tel' && (
              <div>
                <input
                  type="tel"
                  value={(formData as any)[currentStep.field] || ''}
                  onChange={(e) => setFormData({ ...formData, [currentStep.field]: e.target.value })}
                  placeholder={currentStep.placeholder}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                {currentStep.helper && (
                  <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                    <span className="text-primary-500">📌</span> {currentStep.helper}
                  </p>
                )}
              </div>
            )}

            {currentStep.type === 'date' && (
              <div>
                <input
                  type="date"
                  value={(formData as any)[currentStep.field] || ''}
                  onChange={(e) => setFormData({ ...formData, [currentStep.field]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                {currentStep.allowNotSure && (
                  <button
                    onClick={() => setFormData({ ...formData, [currentStep.field]: undefined })}
                    className="mt-2 text-sm text-primary-600 hover:underline"
                  >
                    ⏳ Not sure yet
                  </button>
                )}
              </div>
            )}

            {currentStep.type === 'textarea' && (
              <textarea
                value={(formData as any)[currentStep.field] || ''}
                onChange={(e) => setFormData({ ...formData, [currentStep.field]: e.target.value })}
                placeholder={currentStep.placeholder}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
            )}

            {currentStep.type === 'select' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentStep.options?.map((option: any) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, [currentStep.field]: option.value })}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      (formData as any)[currentStep.field] === option.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{option.icon}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Antenatal specific fields */}
            {formData.patientType === 'antenatal' && currentStep.field === 'nextAppointment' && (
              <div className="mt-4 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Pregnancy Details</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">How far along?</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="number"
                        placeholder="Weeks"
                        value={antenatalData.weeks}
                        onChange={(e) => setAntenatalData({ ...antenatalData, weeks: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                      <input
                        type="number"
                        placeholder="Months"
                        value={antenatalData.months}
                        onChange={(e) => setAntenatalData({ ...antenatalData, months: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Trimester</label>
                    <div className="flex gap-2 mt-1">
                      {['first', 'second', 'third'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setAntenatalData({ ...antenatalData, trimester: t })}
                          className={`flex-1 py-2 rounded-lg border text-sm capitalize ${
                            antenatalData.trimester === t
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Expected Delivery Date</label>
                    <input
                      type="date"
                      value={antenatalData.expectedDeliveryDate}
                      onChange={(e) => setAntenatalData({ ...antenatalData, expectedDeliveryDate: e.target.value })}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Postnatal specific fields */}
            {formData.patientType === 'postnatal' && currentStep.field === 'nextAppointment' && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Delivery Details</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Delivery Date</label>
                    <input
                      type="date"
                      value={postnatalData.deliveryDate}
                      onChange={(e) => setPostnatalData({ ...postnatalData, deliveryDate: e.target.value })}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Baby's Name</label>
                    <input
                      type="text"
                      value={postnatalData.babyName}
                      onChange={(e) => setPostnatalData({ ...postnatalData, babyName: e.target.value })}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Baby's Gender</label>
                    <div className="flex gap-2 mt-1">
                      {[
                        { value: 'male', label: '👦 Male' },
                        { value: 'female', label: '👧 Female' }
                      ].map((g) => (
                        <button
                          key={g.value}
                          onClick={() => setPostnatalData({ ...postnatalData, babyGender: g.value })}
                          className={`flex-1 py-2 rounded-lg border ${
                            postnatalData.babyGender === g.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Encouragement message */}
          <div className="text-center">
            <p className="text-primary-600 font-medium">{currentStep.encouragement}</p>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={handlePrevStep}
              disabled={registrationStep === 0}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={
                currentStep.type !== 'select' && !(formData as any)[currentStep.field] && 
                !(currentStep.field === 'nextAppointment' && currentStep.allowNotSure)
              }
              className="flex-1"
            >
              {registrationStep === REGISTRATION_STEPS.length - 1 ? 'Save' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Success!"
        maxWidth="sm"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Great work! You've successfully added a new patient.
            </h3>
            <p className="text-sm text-gray-500 mt-1">Patient ID: {newPatientId}</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Please let her know we'll send reminders before her next appointment.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setShowSuccess(false);
                navigate('/care');
              }}
              className="flex-1"
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={resetRegistration}
              className="flex-1"
            >
              Register New Patient
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
