import React from 'react';
import Card from '../components/Card';

interface HistoryItem {
  id: string;
  date: string;
  symptoms: string;
  diagnosis: string;
  urgency: 'normal' | 'medium' | 'emergency';
}

const History: React.FC = () => {
  const [history, setHistory] = React.useState<HistoryItem[]>([]);

  React.useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('symptomHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      normal: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      emergency: 'bg-red-100 text-red-800'
    };
    return colors[urgency as keyof typeof colors] || colors.normal;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Consultation History</h1>
        
        {history.length === 0 ? (
          <Card>
            <p className="text-gray-500 text-center py-8">
              No consultation history available
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">{item.date}</p>
                    <h3 className="font-semibold mt-1">{item.diagnosis}</h3>
                    <p className="text-gray-600 mt-2">{item.symptoms}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getUrgencyColor(item.urgency)}`}>
                    {item.urgency}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;