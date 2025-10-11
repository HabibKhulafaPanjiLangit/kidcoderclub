import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
}

interface AlertCardProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alerts, onDismiss }) => {
  const getAlertStyle = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-orange-50 border-orange-200',
          icon: AlertTriangle,
          iconColor: 'text-orange-600',
          titleColor: 'text-orange-800'
        };
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-600',
          titleColor: 'text-green-800'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: Info,
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-800'
        };
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">System Alerts</h3>
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">All systems are running smoothly!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">System Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const style = getAlertStyle(alert.type);
          const Icon = style.icon;
          
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border ${style.bg} transition-all duration-200`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Icon className={`w-5 h-5 ${style.iconColor} mt-0.5`} />
                  <div>
                    <h4 className={`font-medium ${style.titleColor}`}>{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="p-1 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertCard;