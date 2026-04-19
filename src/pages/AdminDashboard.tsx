import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import {
  getAllHospitals,
  getAllStaff,
  getAllPatients,
  createHospital
} from '../services/hospital';
import { copyToClipboard } from '../utils/helpers';
import type { Hospital, User, Patient } from '../types';
import {
  Settings,
  Copy,
  Check,
  Search,
  Plus,
  Users,
  FileText,
  Activity,
  ChevronRight,
  Globe,
  Mail
} from 'lucide-react';

const ADMIN_TOKEN = 'ADMIN-MEDINOVA-2026';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [staff, setStaff] = useState<User[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);

  const [newHospital, setNewHospital] = useState({
    name: '',
    country: '',
    contactEmail: '',
    phone: '',
    paymentInfo: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [h, s, p] = await Promise.all([
        getAllHospitals(),
        getAllStaff(),
        getAllPatients()
      ]);
      setHospitals(h);
      setStaff(s);
      setPatients(p);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(ADMIN_TOKEN);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleCreateHospital = async () => {
    await createHospital(
      newHospital.name,
      newHospital.country,
      newHospital.contactEmail,
      newHospital.phone,
      newHospital.paymentInfo,
      newHospital.notes
    );
    setNewHospital({
      name: '',
      country: '',
      contactEmail: '',
      phone: '',
      paymentInfo: '',
      notes: ''
    });
    loadData();
  };

  const filtered = hospitals.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || isLoading) return <LoadingSpinner fullScreen />;
  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="page-container">
      <Header showNav />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SUPER ADMIN</h1>
              <p className="text-gray-500">System Administration</p>
            </div>
          </div>

          {/* TOKEN */}
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Admin Token</h3>
                <code>{ADMIN_TOKEN}</code>
              </div>

              <button onClick={handleCopy} className="flex gap-2">
                {copiedToken ? <Check /> : <Copy />}
                Copy
              </button>
            </div>
          </Card>

          {/* SEARCH */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              className="w-full pl-10 p-3 border rounded-lg"
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

            <Card
              className="p-4 cursor-pointer"
              onClick={handleCreateHospital}
            >
              <Plus />
              <h3>Create Hospital</h3>
            </Card>

            <Card className="p-4">
              <Users />
              <p>{staff.length} Staff</p>
            </Card>

            <Card className="p-4">
              <FileText />
              <p>Cases</p>
            </Card>

            <Card className="p-4">
              <Activity />
              <p>Analytics</p>
            </Card>

          </div>

          {/* CREATE HOSPITAL */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Create Hospital</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Name"
                value={newHospital.name}
                onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
              />
              <Input placeholder="Country"
                value={newHospital.country}
                onChange={(e) => setNewHospital({ ...newHospital, country: e.target.value })}
              />
              <Input placeholder="Email"
                value={newHospital.contactEmail}
                onChange={(e) => setNewHospital({ ...newHospital, contactEmail: e.target.value })}
              />
              <Input placeholder="Phone"
                value={newHospital.phone}
                onChange={(e) => setNewHospital({ ...newHospital, phone: e.target.value })}
              />
            </div>

            <Button className="mt-4" onClick={handleCreateHospital}>
              Create Hospital
            </Button>
          </Card>

          {/* TABLE */}
          <Card className="p-6">
            <h2 className="text-xl mb-4">
              Hospitals ({filtered.length})
            </h2>

            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Staff</th>
                  <th>Patients</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(h => (
                  <tr key={h.id}>
                    <td>{h.name}</td>
                    <td>{h.country}</td>
                    <td>{h.staffCount}</td>
                    <td>{h.patientCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  );
}