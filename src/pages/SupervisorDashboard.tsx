import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { getHospitalById, getHospitalStaff, updateHospitalStats } from '../services/hospital';
import { registerStaff } from '../services/auth';
import { copyToClipboard, downloadAsPDF } from '../utils/helpers';
import type { Hospital, User } from '../types';
import { 
  Users, 
  UserPlus, 
  FileText, 
  Copy, 
  Check,
  Building2,
  TrendingUp,
  Calendar,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react';

export function SupervisorDashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [staff, setStaff] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  
  // Add staff form
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('');
  const [isAddingStaff, setIsAddingStaff] = useState(false);

  useEffect(() => {
    if (user?.hospitalId) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [hospitalData, staffData] = await Promise.all([
        getHospitalById(user!.hospitalId!),
        getHospitalStaff(user!.hospitalId!)
      ]);
      setHospital(hospitalData);
      setStaff(staffData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToken = async (token: string) => {
    await copyToClipboard(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleAddStaff = async () => {
    if (!newStaffEmail || !newStaffName || !newStaffRole) return;
    
    setIsAddingStaff(true);
    try {
      await registerStaff(
        newStaffEmail,
        newStaffName,
        newStaffRole as any,
        user!.hospitalId!,
        hospital?.name || ''
      );
      await loadData();
      setShowAddStaff(false);
      setNewStaffEmail('');
      setNewStaffName('');
      setNewStaffRole('');
    } catch (err) {
      console.error('Error adding staff:', err);
    } finally {
      setIsAddingStaff(false);
    }
  };

  const handleDownloadReport = () => {
    const report = `
MediNova Supervisor Report
Hospital: ${hospital?.name}
Date: ${new Date().toLocaleDateString()}

Staff Count: ${staff.length}
Tokens:
- Hospital: ${hospital?.tokens.hospital}
- Supervisor: ${hospital?.tokens.supervisor}
- Care: ${hospital?.tokens.care}

Staff List:
${staff.map(s => `- ${s.fullName} (${s.email}) - ${s.role}`).join('\\n')}
    `;
    downloadAsPDF(report, `medinova-report-${Date.now()}.txt`);
  };

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
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200"
              alt="Supervisor"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-6 h-6 text-white" />
                <h1 className="text-3xl font-bold text-white">{hospital?.name}</h1>
              </div>
              <p className="text-white/80">Supervisor Dashboard</p>
            </div>
          </div>

          {/* Tokens Section */}
          <Card className="p-6 mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                Hospital Access Tokens
              </h2>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">
              ⚠️ Never share tokens outside your staff
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4">
              {hospital && [
                { key: 'Hospital', value: hospital.tokens.hospital },
                { key: 'Supervisor', value: hospital.tokens.supervisor },
                { key: 'Care', value: hospital.tokens.care }
              ].map((token) => (
                <div 
                  key={token.key}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-xs text-gray-500 uppercase mb-1">{token.key}</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 font-mono text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                      {token.value}
                    </code>
                    <button
                      onClick={() => handleCopyToken(token.value)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {copiedToken === token.value ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-6 text-center hover:shadow-md transition-shadow">
              <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {staff.length}
              </div>
              <div className="text-sm text-gray-500">Staff</div>
            </Card>
            <Card className="p-6 text-center hover:shadow-md transition-shadow">
              <UserPlus className="w-8 h-8 text-medical-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {hospital?.patientCount || 0}
              </div>
              <div className="text-sm text-gray-500">Patients</div>
            </Card>
            <Card className="p-6 text-center hover:shadow-md transition-shadow">
              <FileText className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                0
              </div>
              <div className="text-sm text-gray-500">Cases</div>
            </Card>
          </div>

          {/* Staff Management */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Staff Activity
              </h2>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={handleDownloadReport}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button
                  onClick={() => setShowAddStaff(true)}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Staff
                </Button>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['Today', 'This Week', 'This Month', 'All Time'].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Staff List */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Cases</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Avg%</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((member) => (
                    <tr 
                      key={member.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {member.fullName}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">{member.role}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {member.progress?.completedCases || 0}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                          {member.progress?.averageScore || 0}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          View Details
                        </button>
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

      {/* Add Staff Modal */}
      <Modal
        isOpen={showAddStaff}
        onClose={() => setShowAddStaff(false)}
        title="Add New Staff Member"
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={newStaffName}
            onChange={(e) => setNewStaffName(e.target.value)}
            placeholder="Dr. Jane Smith"
          />
          <Input
            label="Email"
            type="email"
            value={newStaffEmail}
            onChange={(e) => setNewStaffEmail(e.target.value)}
            placeholder="jane@hospital.com"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Midwife', 'Intern', 'Student', 'Care Staff'].map((role) => (
                <button
                  key={role}
                  onClick={() => setNewStaffRole(role.toLowerCase().replace(' ', '_'))}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    newStaffRole === role.toLowerCase().replace(' ', '_')
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700'
                      : 'border-gray-200 dark:border-gray-700'
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
              onClick={() => setShowAddStaff(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddStaff}
              isLoading={isAddingStaff}
              disabled={!newStaffEmail || !newStaffName || !newStaffRole}
              className="flex-1"
            >
              Add Staff
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
