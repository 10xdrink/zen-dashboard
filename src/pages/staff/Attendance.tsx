import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import HeaderBar from '@/components/layout/HeaderBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { mockEmployees } from '@/data/mockEmployees';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

type AttendanceStatus = 'Pending' | 'Present' | 'Absent' | 'Half Day';

interface AttendanceRecord {
  employeeId: string | number;
  checkIn?: Date; // store as Date for easier calculations
  checkOut?: Date;
  breakStart?: Date | null; // currently ongoing break start time
  breaks: number; // accumulated break minutes
  overtime: number; // in minutes
  status: AttendanceStatus;
  notes?: string;
}

const Attendance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [records, setRecords] = useState<AttendanceRecord[]>(() =>
    mockEmployees.map(emp => ({ employeeId: emp.id, status: 'Pending', breaks: 0, overtime: 0, breakStart: null }))
  );

  const [modalOpen, setModalOpen] = useState(false);
  // search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All'|AttendanceStatus>('All');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | number>('');
  const [selectedStatus, setSelectedStatus] = useState<AttendanceStatus>('Present');
  const [notes, setNotes] = useState('');

  const { toast } = useToast();

  const [notifications, setNotifications] = useState<Array<{
    id: number;
    type: 'late' | 'checkin' | 'checkout' | 'overtime';
    employee: string;
    time: string;
    message: string;
  }>>([{
      id: 1,
      type: 'late',
      employee: 'Dr Deepa Gill',
      time: '10:15 AM',
      message: 'Arrived 15 minutes late'
    },
    {
      id: 2,
      type: 'checkin',
      employee: 'Aditya Iyer',
      time: '10:00 AM',
      message: 'Checked in on time'
    },
    {
      id: 3,
      type: 'overtime',
      employee: 'Priyanka Reddy',
      time: '8:30 PM',
      message: 'Working 30 minutes overtime'
    }
  ]);

  const [pendingLeaveRequests, setPendingLeaveRequests] = useState([
    { id: 1, employee: 'Ramu Chowdary', type: 'Sick Leave', from: '2025-06-14', to: '2025-06-15', reason: 'Fever' },
    { id: 2, employee: 'Dr Rousan Periera', type: 'Casual Leave', from: '2025-06-20', to: '2025-06-20', reason: 'Personal work' },
  ]);

  const handleLeaveAction = (id: number, approved: boolean) => {
    setPendingLeaveRequests(prev => prev.filter(req => req.id !== id));
    toast({
      title: approved ? 'Leave Approved' : 'Leave Rejected',
      description: `Leave request has been ${approved ? 'approved' : 'rejected'}.`
    });
  };

  // Fake live notifications every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const lateEmp = mockEmployees[Math.floor(Math.random() * mockEmployees.length)];
      toast({ title: 'Late Arrival', description: `${lateEmp.name} has not checked in yet.` });
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckIn = (id: string|number)=>{
  setRecords(prev=>prev.map(r=> r.employeeId===id ? {...r, checkIn:new Date(), status:'Present'}: r));
  toast({title:'Check-In',description:`${mockEmployees.find(e=>e.id===id)?.name} checked in.`});
};
const handleStartBreak = (id:string|number)=>{
  setRecords(prev=>prev.map(r=> r.employeeId===id ? {...r, breakStart:new Date()} : r));
};
const handleEndBreak = (id:string|number)=>{
  setRecords(prev=>prev.map(r=> {
    if(r.employeeId!==id || !r.breakStart) return r;
    const minutes = Math.floor((Date.now()- r.breakStart.getTime())/60000);
    return {...r, breakStart:null, breaks: r.breaks+minutes};
  }));
};
const handleCheckOut = (id:string|number)=>{
  setRecords(prev=>prev.map(r=> r.employeeId===id ? {...r, checkOut:new Date()} : r));
  toast({title:'Check-Out', description:`${mockEmployees.find(e=>e.id===id)?.name} checked out.`});
};

const handleManualSave = () => {
    if (!selectedEmployeeId) return;
    setRecords(prev =>
      prev.map(r =>
        r.employeeId === selectedEmployeeId
          ? { ...r, status: selectedStatus, notes, checkIn: new Date() }
          : r
      )
    );
    toast({ title: 'Attendance Updated', description: 'Manual entry saved.' });
    setModalOpen(false);
    setSelectedEmployeeId('');
    setNotes('');
  };

  // calculate overtime every minute
useEffect(() => {
  const timer = setInterval(() => {
    setRecords(prev => prev.map(rec => {
      if(rec.checkOut) return rec; // no overtime after checkout
      if(rec.checkIn){
        const shiftEnd = new Date();
        shiftEnd.setHours(20,0,0,0); // 20:00
        if(new Date() > shiftEnd){
          const diff = Math.floor((Date.now() - shiftEnd.getTime())/60000);
          return { ...rec, overtime: diff };
        }
      }
      return rec;
    }))
  }, 60000);
  return () => clearInterval(timer);
},[]);

const statusBadge = (status: AttendanceStatus) => {
    const color =
      status === 'Present'
        ? 'bg-green-100 text-green-800'
        : status === 'Absent'
        ? 'bg-red-100 text-red-800'
        : status === 'Half Day'
        ? 'bg-amber-100 text-amber-800'
        : 'bg-gray-100 text-gray-800';
    return <Badge className={color}>{status}</Badge>;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <HeaderBar pageTitle="Attendance Management" pageSubtitle="Track and manage staff attendance" />
        <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="daily">Daily View</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="realtime">Live&nbsp;Updates</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            {/* Sticky control bar */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-backdrop-blur:bg-white/60 border-b border-gray-200 px-6 py-3">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="ghost" size="sm">←</Button>
                  <Input type="date" className="h-8 w-36" />
                  <Button variant="ghost" size="sm">→</Button>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    value={searchTerm}
                    onChange={e=>setSearchTerm(e.target.value)}
                    placeholder="Search employee…" className="h-8 w-48 flex-grow"
                  />
                  <Select value={statusFilter} onValueChange={val=>setStatusFilter(val as any)}>
                    <SelectTrigger className="h-8 w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {['All','Pending','Present','Absent','Half Day'].map(s=> (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={() => setModalOpen(true)}>Manual Entry</Button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-b-lg shadow-sm mt-4">
              <div className="mb-4 p-4">
                <h2 className="text-lg font-semibold">Today's Schedule</h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Break (min)</TableHead>
                    <TableHead>Overtime (min)</TableHead>
<TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records
                    .filter(rec=>{
                      const emp= mockEmployees.find(e=>e.id===rec.employeeId)!;
                      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
                      const matchesStatus = statusFilter==='All' || rec.status===statusFilter;
                      return matchesSearch && matchesStatus;
                    })
                    .map(rec => {
                    const emp = mockEmployees.find(e => e.id === rec.employeeId)!;
                    return (
                      <TableRow key={rec.employeeId.toString()}>
                        <TableCell>{emp.name}</TableCell>
                        <TableCell className="text-center w-32">10:00 - 20:00</TableCell>
                        <TableCell>{statusBadge(rec.status)}</TableCell>
                        <TableCell className="text-right">{rec.breaks}</TableCell>
                        <TableCell className="text-right">{rec.overtime}</TableCell>
                        <TableCell>
                          {rec.status==='Pending' && (
                            <Button size="sm" onClick={()=>handleCheckIn(rec.employeeId)}>Check&nbsp;In</Button>
                          )}
                          {rec.status==='Present' && !rec.breakStart && (
                            <Button size="sm" variant="outline" onClick={()=>handleStartBreak(rec.employeeId)}>Start Break</Button>
                          )}
                          {rec.status==='Present' && rec.breakStart && (
                            <Button size="sm" variant="outline" onClick={()=>handleEndBreak(rec.employeeId)}>End Break</Button>
                          )}
                          {rec.status!=='Pending' && !rec.checkOut && (
                            <Button size="sm" variant="destructive" onClick={()=>handleCheckOut(rec.employeeId)}>Check&nbsp;Out</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="manual">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Manual Attendance Entry</h2>
                  <div className="flex gap-4 mb-4">
                    <Button size="sm" onClick={() => setModalOpen(true)}>Add New Entry</Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {records.filter(r => r.status !== 'Pending').map(rec => {
                        const emp = mockEmployees.find(e => e.id === rec.employeeId)!;
                        return (
                          <TableRow key={rec.employeeId.toString()}>
                            <TableCell>{emp.name}</TableCell>
                            <TableCell>{new Date().toLocaleDateString()}</TableCell>
                            <TableCell>{statusBadge(rec.status)}</TableCell>
                            <TableCell>{rec.notes || '-'}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Pending Leave Requests</h2>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingLeaveRequests.map(req => (
                        <TableRow key={req.id}>
                          <TableCell>{req.employee}</TableCell>
                          <TableCell>{req.type}</TableCell>
                          <TableCell>{new Date(req.from).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(req.to).toLocaleDateString()}</TableCell>
                          <TableCell>{req.reason}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="bg-green-50 hover:bg-green-100 text-green-700" 
                                onClick={() => handleLeaveAction(req.id, true)}>
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="bg-red-50 hover:bg-red-100 text-red-700"
                                onClick={() => handleLeaveAction(req.id, false)}>
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="realtime">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Real-time Attendance Updates</h2>
              <div className="space-y-4">
                {notifications.map(note => (
                  <div key={note.id} className={`p-4 rounded-md border-l-4 ${
                    note.type === 'late' ? 'border-amber-500 bg-amber-50' : 
                    note.type === 'overtime' ? 'border-blue-500 bg-blue-50' : 
                    'border-green-500 bg-green-50'
                  }`}>
                    <div className="flex justify-between">
                      <div className="font-medium">{note.employee}</div>
                      <div className="text-sm text-gray-500">{note.time}</div>
                    </div>
                    <p className="text-sm mt-1">{note.message}</p>
                  </div>
                ))}
                
                <div className="mt-6">
                  <h3 className="text-md font-medium mb-2">Live Monitoring</h3>
                  <div className="p-4 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <div>Currently monitoring: <span className="font-medium">{mockEmployees.length} employees</span></div>
                      <Badge className="bg-green-100 text-green-800">Live</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Present</div>
                        <div className="text-xl font-bold">{records.filter(r => r.status === 'Present').length}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Absent</div>
                        <div className="text-xl font-bold">{records.filter(r => r.status === 'Absent').length}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Late</div>
                        <div className="text-xl font-bold">2</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">On Break</div>
                        <div className="text-xl font-bold">1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        {/* Manual Entry Dialog */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Manual Attendance Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select value={String(selectedEmployeeId)} onValueChange={val => setSelectedEmployeeId(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map(emp => (
                    <SelectItem key={emp.id} value={String(emp.id)}>{emp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={val => setSelectedStatus(val as AttendanceStatus)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {['Present','Absent','Half Day'].map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Notes / reason" value={notes} onChange={e=>setNotes(e.target.value)} />
            </div>
            <DialogFooter>
              <Button onClick={handleManualSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Attendance;
