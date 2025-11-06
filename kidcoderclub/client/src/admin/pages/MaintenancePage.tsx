import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  Wifi, 
  HardDrive, 
  Cpu, 
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Settings,
  Download,
  Upload
} from 'lucide-react';

const MaintenancePage: React.FC = () => {
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [lastCheck, setLastCheck] = useState('2024-03-15 14:30:00');

  const systemHealth = [
    {
      name: 'Web Server',
      status: 'healthy',
      uptime: '99.9%',
      icon: Server,
      lastCheck: '2 minutes ago'
    },
    {
      name: 'Database',
      status: 'healthy',
      uptime: '99.8%',
      icon: Database,
      lastCheck: '1 minute ago'
    },
    {
      name: 'Network',
      status: 'warning',
      uptime: '98.5%',
      icon: Wifi,
      lastCheck: '5 minutes ago'
    },
    {
      name: 'Storage',
      status: 'healthy',
      uptime: '100%',
      icon: HardDrive,
      lastCheck: '3 minutes ago'
    },
    {
      name: 'CPU Usage',
      status: 'healthy',
      uptime: '45%',
      icon: Cpu,
      lastCheck: '1 minute ago'
    },
    {
      name: 'Memory',
      status: 'warning',
      uptime: '78%',
      icon: Activity,
      lastCheck: '2 minutes ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const runDiagnostics = () => {
    setIsRunningDiagnostics(true);
    setTimeout(() => {
      setIsRunningDiagnostics(false);
      setLastCheck(new Date().toLocaleString());
    }, 3000);
  };

  const maintenanceTasks = [
    {
      name: 'Database Cleanup',
      description: 'Remove old logs and optimize database performance',
      lastRun: '2024-03-14',
      frequency: 'Weekly'
    },
    {
      name: 'Cache Clear',
      description: 'Clear application cache to improve performance',
      lastRun: '2024-03-15',
      frequency: 'Daily'
    },
    {
      name: 'Backup Creation',
      description: 'Create full system backup',
      lastRun: '2024-03-15',
      frequency: 'Daily'
    },
    {
      name: 'Security Scan',
      description: 'Run security vulnerability scan',
      lastRun: '2024-03-13',
      frequency: 'Weekly'
    }
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Maintenance & Troubleshooting</h1>
        <p className="text-gray-600">Monitor system health and perform maintenance tasks</p>
      </div>

      {/* System Health Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">System Health</h2>
          <button
            onClick={runDiagnostics}
            disabled={isRunningDiagnostics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isRunningDiagnostics ? 'animate-spin' : ''}`} />
            {isRunningDiagnostics ? 'Running Diagnostics...' : 'Run Diagnostics'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {systemHealth.map((system, index) => {
            const Icon = system.icon;
            const StatusIcon = getStatusIcon(system.status);
            return (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{system.name}</h3>
                      <p className="text-sm text-gray-600">{system.lastCheck}</p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${getStatusColor(system.status)}`}>
                    <StatusIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Uptime/Usage</span>
                  <span className="font-semibold text-gray-800">{system.uptime}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">System Status: Operational</p>
              <p className="text-sm text-blue-600">Last full system check: {lastCheck}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Tasks */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Maintenance Tasks</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {maintenanceTasks.map((task, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{task.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Last run: {task.lastRun}</span>
                      <span>Frequency: {task.frequency}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Run Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow text-left">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Export Logs</h3>
          <p className="text-sm text-gray-600">Download system logs for analysis</p>
        </button>

        <button className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow text-left">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Import Config</h3>
          <p className="text-sm text-gray-600">Upload configuration files</p>
        </button>

        <button className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow text-left">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">System Settings</h3>
          <p className="text-sm text-gray-600">Configure system parameters</p>
        </button>

        <button className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow text-left">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
            <RefreshCw className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Restart Services</h3>
          <p className="text-sm text-gray-600">Restart system services</p>
        </button>
      </div>
    </div>
  );
};

export default MaintenancePage;