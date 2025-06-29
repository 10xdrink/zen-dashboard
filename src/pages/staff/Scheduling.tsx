import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import HeaderBar from '@/components/layout/HeaderBar';
import {
  Calendar as RBCalendar,
  dateFnsLocalizer,
  Views,
  Event as RBCEvent,
} from 'react-big-calendar';
import { startOfWeek, parse, format, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { mockEmployees } from '@/data/mockEmployees';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface ShiftEvent extends RBCEvent {
  id: number;
  employeeId: string | number;
  start: Date;
  end: Date;
  backgroundColor?: string;
}

const DragAndDropCalendar = withDragAndDrop<ShiftEvent>(RBCalendar);

const defaultShifts: ShiftEvent[] = mockEmployees.slice(0, 5).map((emp, idx) => {
  const day = new Date();
  day.setDate(day.getDate() + idx);
  const start = new Date(day.setHours(10, 0, 0, 0));
  const end = new Date(day.setHours(20, 0, 0, 0));
  return {
    id: idx + 1,
    employeeId: emp.id,
    title: `${emp.name} (10-8)`,
    start,
    end,
    allDay: false,
  };
});

const shiftPatterns = [
  { id: 1, name: 'Morning', start: 8, end: 16, color: '#4ade80' },
  { id: 2, name: 'Evening', start: 16, end: 0, color: '#60a5fa' },
  { id: 3, name: 'Night', start: 0, end: 8, color: '#f43f5e' },
  { id: 4, name: 'Full Day', start: 10, end: 20, color: '#a78bfa' },
];

const holidays = [
  { date: '2025-06-15', name: 'Sunday' },
  { date: '2025-06-22', name: 'Sunday' },
  { date: '2025-06-29', name: 'Sunday' },
  { date: '2025-08-15', name: 'Independence Day' },
];

const Scheduling: React.FC = () => {
  const [events, setEvents] = useState<ShiftEvent[]>(defaultShifts);
  const [view, setView] = useState<keyof typeof Views | string>('week');
  const [activeTab, setActiveTab] = useState('weekly');
  const [selectedPattern, setSelectedPattern] = useState<number>(1);
  const [selectedEmployees, setSelectedEmployees] = useState<Array<string | number>>([]);
  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
  
  const { toast } = useToast();

  const onEventResize = ({ event, start, end }: any) => {
    setEvents(prev =>
      prev.map(ev => (ev.id === event.id ? { ...ev, start, end } : ev))
    );
  };

  const onEventDrop = ({ event, start, end }: any) => {
    const overlap = events.some(ev =>
      ev.employeeId === (event as ShiftEvent).employeeId &&
      ev.id !== event.id &&
      ((start >= ev.start && start < ev.end) || (end > ev.start && end <= ev.end))
    );
    if (overlap) {
      toast({ title: 'Conflict', description: 'Employee already has a shift during that time.' });
      return;
    }
    setEvents(prev =>
      prev.map(ev => (ev.id === event.id ? { ...ev, start, end } : ev))
    );
  };

  const addTemplateShift = (pattern: { start: number; end: number }) => {
    const emp = mockEmployees[Math.floor(Math.random() * mockEmployees.length)];
    const today = new Date();
    const start = new Date(today.setHours(pattern.start, 0, 0, 0));
    const end = new Date(today.setHours(pattern.end, 0, 0, 0));
    setEvents(prev => [
      ...prev,
      {
        id: prev.length + 1,
        employeeId: emp.id,
        title: `${emp.name} (${pattern.start}:00-${pattern.end}:00)`,
        start,
        end,
        allDay: false,
      },
    ]);
  };

  const generateBulkSchedule = () => {
    if (selectedEmployees.length === 0) {
      toast({ title: 'Error', description: 'Please select at least one employee' });
      return;
    }
    
    const pattern = shiftPatterns.find(p => p.id === selectedPattern)!;
    const newEvents: ShiftEvent[] = [];
    let eventId = events.length + 1;
    
    selectedEmployees.forEach(empId => {
      const emp = mockEmployees.find(e => e.id === empId)!;
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      const currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const isHoliday = holidays.some(h => h.date === dateStr);
        
        if (!isHoliday) {
          const shiftStart = new Date(currentDate);
          shiftStart.setHours(pattern.start, 0, 0, 0);
          
          const shiftEnd = new Date(currentDate);
          shiftEnd.setHours(pattern.end === 0 ? 24 : pattern.end, 0, 0, 0);
          
          if (pattern.end === 0) {
            shiftEnd.setDate(shiftEnd.getDate() + 1);
          }
          
          newEvents.push({
            id: eventId++,
            employeeId: empId,
            title: `${emp.name} (${pattern.name})`,
            start: shiftStart,
            end: shiftEnd,
            allDay: false,
            backgroundColor: pattern.color,
          });
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    setEvents(prev => [...prev, ...newEvents]);
    toast({ title: 'Success', description: `Generated ${newEvents.length} shifts` });
    setSelectedEmployees([]);
  };

  const toggleEmployeeSelection = (empId: string | number) => {
    setSelectedEmployees(prev =>
      prev.includes(empId) ? prev.filter(id => id !== empId) : [...prev, empId]
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <HeaderBar pageTitle="Schedule Management" pageSubtitle="Manage staff shifts and schedules" />
        <div className="p-6">

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Roster</TabsTrigger>
            <TabsTrigger value="shifts">Shift Management</TabsTrigger>
          </TabsList>
          
          {/* Weekly View */}
          <TabsContent value="weekly">
            <div className="mb-4">
              <Tabs value={String(view)} onValueChange={val => setView(val)} className="mb-4">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex gap-4">
                <div className="flex-1">
                  <DndProvider backend={HTML5Backend}>
                    <DragAndDropCalendar
                      localizer={localizer}
                      events={events}
                      defaultView={Views.WEEK}
                      view={view}
                      onView={setView}
                      style={{ height: '60vh' }}
                      onEventResize={onEventResize}
                      onEventDrop={onEventDrop}
                      resizable
                      eventPropGetter={event => {
                        const ev = event as ShiftEvent;
                        const conflict = events.some(e =>
                          e.employeeId === ev.employeeId &&
                          e.id !== ev.id &&
                          ((ev.start >= e.start && ev.start < e.end) ||
                          (ev.end > e.start && ev.end <= e.end))
                        );
                        return {
                          style: {
                            backgroundColor: conflict ? '#dc2626' : ev.backgroundColor || '#3174ad',
                            opacity: conflict ? 0.8 : 1,
                          },
                        };
                      }}
                    />
                  </DndProvider>
                </div>
                <div className="w-44 shrink-0 space-y-3">
                  <h2 className="font-medium mb-2">Shift Templates</h2>
                  {shiftPatterns.map(p => (
                    <Button
                      key={p.id}
                      variant="outline"
                      className="w-full flex items-center gap-2"
                      onClick={() => addTemplateShift({ start: p.start, end: p.end })}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Monthly View */}
          <TabsContent value="monthly">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Monthly Roster Planning</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-medium mb-2">1. Select Shift Pattern</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {shiftPatterns.map(pattern => (
                        <div
                          key={pattern.id}
                          className={`p-3 border rounded-md cursor-pointer ${
                            selectedPattern === pattern.id ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => setSelectedPattern(pattern.id)}
                        >
                          <div className="font-medium">{pattern.name}</div>
                          <div className="text-sm text-gray-500">
                            {pattern.start}:00 - {pattern.end === 0 ? '24:00' : `${pattern.end}:00`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-medium mb-2">2. Select Date Range</h3>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-sm">Start Date</label>
                        <Input
                          type="date"
                          value={dateRange.start.toISOString().split('T')[0]}
                          onChange={e => setDateRange(prev => ({ ...prev, start: new Date(e.target.value) }))}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm">End Date</label>
                        <Input
                          type="date"
                          value={dateRange.end.toISOString().split('T')[0]}
                          onChange={e => setDateRange(prev => ({ ...prev, end: new Date(e.target.value) }))}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-medium mb-2">3. Generate Schedule</h3>
                    <Button onClick={generateBulkSchedule} className="w-full">
                      Generate Shifts
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium mb-2">4. Select Employees</h3>
                  <div className="border rounded-md p-2 h-64 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mockEmployees.map(emp => (
                        <div
                          key={emp.id}
                          className={`p-2 border rounded flex items-center gap-2 cursor-pointer ${
                            selectedEmployees.includes(emp.id) ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => toggleEmployeeSelection(emp.id)}
                        >
                          <input
                            type="checkbox"
                            checked={selectedEmployees.includes(emp.id)}
                            readOnly
                            className="h-4 w-4"
                          />
                          <span>{emp.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-md font-medium mb-2">Holidays & Leave</h3>
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium mb-2">Upcoming Holidays</div>
                      <div className="space-y-1">
                        {holidays.slice(0, 3).map((holiday, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{holiday.name}</span>
                            <span>{new Date(holiday.date).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Shift Management View */}
          <TabsContent value="shifts">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Shift Pattern Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-3">Available Shift Patterns</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead>Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shiftPatterns.map(pattern => {
                        const duration =
                          pattern.end > pattern.start
                            ? pattern.end - pattern.start
                            : 24 - pattern.start + pattern.end;
                        return (
                          <TableRow key={pattern.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pattern.color }} />
                                {pattern.name}
                              </div>
                            </TableCell>
                            <TableCell>{pattern.start}:00</TableCell>
                            <TableCell>{pattern.end === 0 ? '24:00' : `${pattern.end}:00`}</TableCell>
                            <TableCell>{duration} hours</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-3">Workload Distribution</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Morning Shift</span>
                        <span className="text-sm">{events.filter(e => e.title.includes('Morning')).length} assignments</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Evening Shift</span>
                        <span className="text-sm">{events.filter(e => e.title.includes('Evening')).length} assignments</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }} />
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Night Shift</span>
                        <span className="text-sm">{events.filter(e => e.title.includes('Night')).length} assignments</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Break &amp; Overtime Management</h4>
                      <div className="text-sm text-gray-600">
                        <p>• Standard break: 60 minutes for 8+ hour shifts</p>
                        <p>• Overtime starts after 8 hours of work</p>
                        <p>• Night shift allowance: +15%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Scheduling;
