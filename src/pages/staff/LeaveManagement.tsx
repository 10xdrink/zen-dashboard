import React, { useState, ChangeEvent, FormEvent } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import HeaderBar from '@/components/layout/HeaderBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, FileText, Settings, Users, BarChart2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LeaveRequest {
  id: number;
  employeeName: string;
  department: string;
  type: 'Annual' | 'Sick' | 'Casual' | 'Other';
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  comment?: string;
  replacement?: string;
}

interface Policy {
  annual: number;
  sick: number;
  casual: number;
  holidays: { date: string; name: string }[];
}

const mockEmployees = [
  'Alice Johnson',
  'Bob Smith',
  'Carol Lee',
  'David Patel',
  'Eva Zhang',
];

const initialRequests: LeaveRequest[] = [
  { id: 1, employeeName: 'Alice Johnson', department: 'Engineering', type: 'Annual', startDate: '2025-07-01', endDate: '2025-07-05', days: 5, status: 'Pending' },
  { id: 2, employeeName: 'Bob Smith', department: 'Marketing', type: 'Sick', startDate: '2025-06-20', endDate: '2025-06-22', days: 3, status: 'Pending' },
  { id: 3, employeeName: 'Carol Lee', department: 'HR', type: 'Casual', startDate: '2025-08-10', endDate: '2025-08-11', days: 2, status: 'Pending' },
];

const LeaveManagement: React.FC = () => {
  // Leave Requests state
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempComment, setTempComment] = useState('');
  const [tempReplacement, setTempReplacement] = useState('');

  // Policies state
  const [policy, setPolicy] = useState<Policy>({
    annual: 20,
    sick: 10,
    casual: 7,
    holidays: [
      { date: '2025-08-15', name: 'Independence Day' },
    ],
  });
  const [newHolidayDate, setNewHolidayDate] = useState('');
  const [newHolidayName, setNewHolidayName] = useState('');

  // Handlers for Request Processing
  const startEdit = (req: LeaveRequest) => {
    setEditingId(req.id);
    setTempComment(req.comment || '');
    setTempReplacement(req.replacement || '');
  };
  const cancelEdit = () => {
    setEditingId(null);
    setTempComment('');
    setTempReplacement('');
  };
  const saveDecision = (status: 'Approved' | 'Rejected') => {
    setRequests(rs =>
      rs.map(r => r.id === editingId
        ? { ...r, status, comment: tempComment, replacement: status === 'Approved' ? tempReplacement : undefined }
        : r
      )
    );
    cancelEdit();
  };

  // Handlers for Policies
  const updatePolicy = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPolicy(p => ({ ...p, [name]: Number(value) }));
  };
  const addHoliday = () => {
    if (!newHolidayDate || !newHolidayName) return;
    setPolicy(p => ({
      ...p,
      holidays: [...p.holidays, { date: newHolidayDate, name: newHolidayName }]
    }));
    setNewHolidayDate('');
    setNewHolidayName('');
  };
  const removeHoliday = (idx: number) => {
    setPolicy(p => ({
      ...p,
      holidays: p.holidays.filter((_, i) => i !== idx)
    }));
  };

  // Reports derived
  const employeeSummary = requests.reduce<Record<string, { taken: number }>>((acc, r) => {
    if (!acc[r.employeeName]) acc[r.employeeName] = { taken: 0 };
    if (r.status === 'Approved') acc[r.employeeName].taken += r.days;
    return acc;
  }, {});
  const departmentSummary = requests.reduce<Record<string, { taken: number }>>((acc, r) => {
    if (!acc[r.department]) acc[r.department] = { taken: 0 };
    if (r.status === 'Approved') acc[r.department].taken += r.days;
    return acc;
  }, {});
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {/* Header */}
        <HeaderBar pageTitle="Leave Management" pageSubtitle="Manage employee leave requests, policies, and reports" />
        
        {/* Stats Summary */}
        <div className="flex justify-end space-x-4 px-6 pt-4">
          <div className="bg-white/90 shadow-sm rounded-lg p-3 text-center border border-gray-100">
            <p className="text-2xl font-bold text-amber-500">{requests.filter(r => r.status === 'Pending').length}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
          <div className="bg-white/90 shadow-sm rounded-lg p-3 text-center border border-gray-100">
            <p className="text-2xl font-bold text-green-500">{requests.filter(r => r.status === 'Approved').length}</p>
            <p className="text-xs text-gray-500">Approved</p>
          </div>
          <div className="bg-white/90 shadow-sm rounded-lg p-3 text-center border border-gray-100">
            <p className="text-2xl font-bold text-blue-500">{policy.annual}</p>
            <p className="text-xs text-gray-500">Annual Days</p>
          </div>
        </div>
        
        <div className="p-6 pt-2">
        
        {/* Tabs Section */}
        <Tabs defaultValue="requests" className="w-full">
          <div className="bg-white px-6 py-4 mb-6 rounded-lg shadow-sm">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="requests" className="flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Requests</span>
              </TabsTrigger>
              <TabsTrigger value="policies" className="flex items-center justify-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Policies</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center justify-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>Reports</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Leave Request Processing */}
          <TabsContent value="requests">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Pending Leave Requests</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Dept.</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map(r => (
                    <React.Fragment key={r.id}>
                      <TableRow>
                        <TableCell>{r.employeeName}</TableCell>
                        <TableCell>{r.department}</TableCell>
                        <TableCell>{r.type}</TableCell>
                        <TableCell>{r.startDate}</TableCell>
                        <TableCell>{r.endDate}</TableCell>
                        <TableCell>{r.days}</TableCell>
                        <TableCell>
                          {r.status === 'Pending' && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
                          )}
                          {r.status === 'Approved' && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
                          )}
                          {r.status === 'Rejected' && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {r.status === 'Pending' && (
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => startEdit(r)}>
                                <Clock className="h-3 w-3" />
                                Process
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                      {editingId === r.id && (
                        <TableRow>
                          <TableCell colSpan={8}>
                            <div className="space-y-2">
                              <Textarea
                                placeholder="Manager comments..."
                                value={tempComment}
                                onChange={e => setTempComment(e.target.value)}
                              />
                              <div>
                                <label className="block text-sm">Assign Replacement:</label>
                                <select
                                  className="border rounded p-1 w-full"
                                  value={tempReplacement}
                                  onChange={e => setTempReplacement(e.target.value)}
                                >
                                  <option value="">— none —</option>
                                  {mockEmployees.map(emp => (
                                    <option key={emp} value={emp}>{emp}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={cancelEdit} className="flex items-center gap-1">
                                  <XCircle className="h-3 w-3" />
                                  Cancel
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => saveDecision('Rejected')} className="flex items-center gap-1">
                                  <XCircle className="h-3 w-3" />
                                  Reject
                                </Button>
                                <Button variant="default" size="sm" onClick={() => saveDecision('Approved')} className="flex items-center gap-1 bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="h-3 w-3" />
                                  Approve
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Leave Policy Management */}
          <TabsContent value="policies">
            <div className="p-6 bg-white rounded-lg shadow-sm space-y-6">
              <h2 className="text-lg font-semibold">Leave Policy Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm">Annual Leave (days/year)</label>
                  <Input
                    name="annual"
                    type="number"
                    value={policy.annual}
                    onChange={updatePolicy}
                  />
                </div>
                <div>
                  <label className="block text-sm">Sick Leave (days/year)</label>
                  <Input
                    name="sick"
                    type="number"
                    value={policy.sick}
                    onChange={updatePolicy}
                  />
                </div>
                <div>
                  <label className="block text-sm">Casual Leave (days/year)</label>
                  <Input
                    name="casual"
                    type="number"
                    value={policy.casual}
                    onChange={updatePolicy}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-medium">Holiday Calendar</h3>
                <div className="space-y-2">
                  {policy.holidays.map((h, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span>{h.date} – {h.name}</span>
                      <Button size="icon" variant="ghost" onClick={() => removeHoliday(i)}>✕</Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={newHolidayDate}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setNewHolidayDate(e.target.value)}
                    />
                    <Input
                      placeholder="Holiday name"
                      value={newHolidayName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setNewHolidayName(e.target.value)}
                    />
                    <Button size="sm" onClick={addHoliday}>Add</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Leave Reports */}
          <TabsContent value="reports">
            <div className="p-6 bg-white rounded-lg shadow-sm space-y-6">
              <h2 className="text-lg font-semibold">Leave Reports</h2>

              {/* Employee-wise Summary */}
              <div>
                <h3 className="font-medium mb-2">Employee-wise Summary</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Days Taken</TableHead>
                      <TableHead>Remaining (Annual)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(employeeSummary).map(([emp, data]) => (
                      <TableRow key={emp}>
                        <TableCell>{emp}</TableCell>
                        <TableCell>{data.taken}</TableCell>
                        <TableCell>{policy.annual - data.taken}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Department-wise Analysis */}
              <div>
                <h3 className="font-medium mb-2">Department-wise Analysis</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Days Taken</TableHead>
                      <TableHead>Avg per Employee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(departmentSummary).map(([dept, data]) => {
                      const count = requests.filter(r => r.department === dept && r.status === 'Approved').length || 1;
                      return (
                        <TableRow key={dept}>
                          <TableCell>{dept}</TableCell>
                          <TableCell>{data.taken}</TableCell>
                          <TableCell>{(data.taken / count).toFixed(1)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Leave Trend Report */}
              <div>
                <h3 className="font-medium mb-2">Leave Trend Over Time</h3>
                <p className="text-sm text-gray-600">[Chart placeholder – integrate your charting library here]</p>
                <Button size="sm">Export Detailed Report</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </main>
    </div>
  );
};

export default LeaveManagement;
