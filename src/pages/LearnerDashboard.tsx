import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { getTrainingTip } from '../services/gemini';
import { getGreeting } from '../utils/helpers';
import { 
  MapPin, 
  TrendingUp, 
  Clock, 
  BookOpen,
  ChevronRight,
  Award
} from 'lucide-react';

export function LearnerDashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [tip, setTip] = useState('');
  const [isLoadingTip, setIsLoadingTip] = useState(true);

  useEffect(() => {
    if (user) {
      loadTip();
    }
  }, [user]);

  const loadTip = async () => {
    setIsLoadingTip(true);
    try {
      const trainingTip = await getTrainingTip(
        user?.progress?.completedCases || 0,
        user?.progress?.averageScore || 0,
        user?.progress?.totalCases || 10
      );
      setTip(trainingTip);
    } catch (err) {
      setTip('Keep up the great work! Every case makes you stronger.');
    } finally {
      setIsLoadingTip(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    navigate('/');
    return null;
  }

  const greeting = getGreeting(user.fullName.split(' ')[0]);

  return (
    <div className="page-container">
      <Header showNav />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200"
              alt="Training"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {greeting}
              </h1>
              <p className="text-white/80">Ready to continue your learning journey?</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Tip - Moved UP as requested */}
              <Card className="p-6 bg-gradient-to-r from-primary-50 to-medical-50 dark:from-primary-900/20 dark:to-medical-900/20 border-primary-200 dark:border-primary-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      💡 Training Insight
                    </h3>
                    {isLoadingTip ? (
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{tip}</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* World Map Placeholder */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Explore Cases by Region
                </h2>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive world map coming soon</p>
                    <p className="text-sm text-gray-400">Click regions to unlock cases</p>
                  </div>
                </div>
              </Card>

              {/* CTA Button */}
              <Button 
                fullWidth 
                className="text-lg py-6 shadow-xl"
                onClick={() => navigate('/training')}
              >
                Continue Training
                <ChevronRight className="w-5 h-5" />
              </Button>

              {/* Recent Activity */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Recent Activity
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-8 h-8 text-primary-600 mb-2" />
                      <span className="text-xs text-center text-gray-600 dark:text-gray-400">
                        Case {i}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  Your Progress
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Overall</span>
                      <span className="font-semibold">{user.progress?.completedCases || 0}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-medical-500 rounded-full transition-all"
                        style={{ width: `${user.progress?.completedCases || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">
                        {user.progress?.completedCases || 0}
                      </div>
                      <div className="text-xs text-gray-500">Cases</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-medical-600">
                        {user.progress?.averageScore || 0}%
                      </div>
                      <div className="text-xs text-gray-500">Average</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Report Card */}
              <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Report Due
                  </h3>
                </div>
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                  2 days, 4 hours
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Report to supervisor
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
