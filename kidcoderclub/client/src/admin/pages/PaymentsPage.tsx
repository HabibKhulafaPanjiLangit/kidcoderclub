import React, { useState } from 'react';
import { Search, DollarSign, CreditCard, RefreshCw, CheckCircle, Clock, XCircle, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Payment } from '../types';

const PaymentsPage: React.FC = () => {
  const { payments, updatePayment } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return XCircle;
      case 'refunded': return RefreshCw;
      default: return DollarSign;
    }
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (payment: Payment, newStatus: Payment['status']) => {
    updatePayment(payment.id, { status: newStatus });
  };

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Gateway</h1>
        <p className="text-gray-600">Monitor and manage payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-gray-900">${pendingAmount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((payments.filter(p => p.status === 'completed').length / payments.length) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 whitespace-nowrap">ID</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500">User</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Amount</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Method</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Status</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Date</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500">Description</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                const StatusIcon = getStatusIcon(payment.status);
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm text-gray-600">#{payment.id.substring(0, 8)}...</span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-semibold">
                            {payment.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900 truncate">{payment.userName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900">
                        ${payment.amount.toFixed(2)} {payment.currency}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-gray-600 whitespace-nowrap">{payment.paymentMethod}</td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <StatusIcon className="w-4 h-4 flex-shrink-0" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-gray-600 whitespace-nowrap">{payment.transactionDate}</td>
                    <td className="px-3 py-4 text-gray-600">
                      <span className="block max-w-xs truncate" title={payment.description}>
                        {payment.description}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-start gap-1">
                        {payment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(payment, 'completed')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(payment, 'failed')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Decline"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {payment.status === 'completed' && (
                          <button
                            onClick={() => handleStatusChange(payment, 'refunded')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Refund"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;