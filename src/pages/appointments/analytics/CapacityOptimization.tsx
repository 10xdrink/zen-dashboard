import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CapacityOptimizationProps {
  doctor?: string;
  dateRange: {
    from: Date;
    to: Date;
  };
}

// Mock data for KPI cards
const kpiData = {
  resourceUtilization: 85,
  bookingEfficiency: 2.3, // days average lead time
  revenuePerSlot: 125, // dollars
  openSlotPercentage: 12 // percentage
};

// Mock data for resource utilization over time
const generateResourceUtilization = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const doctors = ['Dr. Adams', 'Dr. Wilson', 'Dr. Lee', 'Dr. Garcia', 'Dr. Patel'];
  
  return days.map(day => ({
    day,
    utilization: doctors.map(doctor => ({
      doctor,
      value: 30 + Math.floor(Math.random() * 70) // Random utilization between 30-100%
    }))
  }));
};

// Mock data for revenue per slot distribution
const generateRevenueDistribution = () => {
  const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  
  return timeSlots.map(time => ({
    time,
    min: 50 + Math.floor(Math.random() * 30),
    max: 100 + Math.floor(Math.random() * 150),
    median: 80 + Math.floor(Math.random() * 80),
    outliers: Math.random() > 0.7 ? [200 + Math.floor(Math.random() * 100)] : []
  }));
};

// Mock growth opportunities
const growthOpportunities = [
  {
    id: 'opp1',
    description: 'Add Saturday morning slots — current utilization at 95%',
    impact: 'High',
    type: 'Capacity'
  },
  {
    id: 'opp2',
    description: 'Promote dental cleanings on Tuesday afternoons',
    impact: 'Medium',
    type: 'Marketing'
  },
  {
    id: 'opp3',
    description: 'Consider adding another pediatrician on Mondays',
    impact: 'High',
    type: 'Staffing'
  },
  {
    id: 'opp4',
    description: 'Reduce the buffer time between appointments to 10 minutes',
    impact: 'Medium',
    type: 'Efficiency'
  },
  {
    id: 'opp5',
    description: 'Allocate more slots for high-revenue services',
    impact: 'High',
    type: 'Revenue'
  }
];

const CapacityOptimization: React.FC<CapacityOptimizationProps> = ({ doctor, dateRange }) => {
  const utilizationData = generateResourceUtilization();
  const revenueDistribution = generateRevenueDistribution();
  
  // Get the highest utilization for color coding
  const maxUtilizationValue = Math.max(...utilizationData.flatMap(d => 
    d.utilization.map(u => u.value)
  ));
  
  // Get max value for revenue scaling
  const maxRevenueValue = Math.max(...revenueDistribution.flatMap(d => [d.max, ...d.outliers]));
  
  // Helper function to get color based on utilization
  const getUtilizationColor = (value: number) => {
    if (value < 40) return 'bg-slate-200';
    if (value < 60) return 'bg-blue-300';
    if (value < 80) return 'bg-green-400';
    return 'bg-red-500';
  };
  
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Resource Utilization */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Resource Utilization</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Percentage of available appointment slots that are booked across all resources.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-end">
                <span className="text-3xl font-bold">{kpiData.resourceUtilization}%</span>
                <span className="text-sm text-green-500 ml-2 mb-1">▲ 3%</span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-green-500 h-1.5 rounded-full" 
                  style={{ width: `${kpiData.resourceUtilization}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 mt-1">Room & staff capacity</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Booking Efficiency */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Booking Efficiency</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Average lead time in days between booking and appointment date.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-end">
                <span className="text-3xl font-bold">{kpiData.bookingEfficiency}</span>
                <span className="text-sm text-green-500 ml-2 mb-1">▼ 0.5</span>
              </div>
              <span className="text-xs text-gray-400 mt-1">avg. days lead time</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Revenue per Slot */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Revenue per Slot</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Average revenue generated per appointment time slot.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-end">
                <span className="text-3xl font-bold">${kpiData.revenuePerSlot}</span>
                <span className="text-sm text-green-500 ml-2 mb-1">▲ $12</span>
              </div>
              <span className="text-xs text-gray-400 mt-1">avg. per appointment</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Open Slot Percentage */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Open Slot %</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Percentage of appointment slots that remain unbooked.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-end">
                <span className="text-3xl font-bold">{kpiData.openSlotPercentage}%</span>
                <span className="text-sm text-red-500 ml-2 mb-1">▲ 2%</span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-amber-500 h-1.5 rounded-full" 
                  style={{ width: `${kpiData.openSlotPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 mt-1">potential capacity</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Utilization Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {utilizationData.map((day, dayIdx) => (
                <div key={dayIdx}>
                  <div className="text-sm font-medium mb-1">{day.day}</div>
                  <div className="flex h-10">
                    {day.utilization.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`flex-1 ${getUtilizationColor(item.value)} ${idx > 0 ? 'ml-0.5' : ''}`}
                        title={`${item.doctor}: ${item.value}% utilization`}
                      >
                        <div className="h-full flex items-center justify-center text-xs font-medium text-slate-800">
                          {item.value}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-slate-200 mr-1"></div>
                  <span>&lt;40%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-300 mr-1"></div>
                  <span>40-60%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 mr-1"></div>
                  <span>60-80%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 mr-1"></div>
                  <span>&gt;80%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Revenue per Slot Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue per Slot Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] flex items-end justify-between">
              {revenueDistribution.map((slot, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {/* Box and whisker */}
                  <div className="relative flex flex-col items-center">
                    {/* Max line */}
                    <div className="h-0.5 w-4 bg-slate-400 absolute" style={{ 
                      bottom: `${(slot.max / maxRevenueValue) * 200}px`
                    }}></div>
                    
                    {/* Vertical line */}
                    <div className="w-0.5 bg-slate-400" style={{ 
                      height: `${((slot.max - slot.min) / maxRevenueValue) * 200}px`,
                      bottom: `${(slot.min / maxRevenueValue) * 200}px`,
                      position: 'absolute'
                    }}></div>
                    
                    {/* Min line */}
                    <div className="h-0.5 w-4 bg-slate-400 absolute" style={{ 
                      bottom: `${(slot.min / maxRevenueValue) * 200}px`
                    }}></div>
                    
                    {/* Median box */}
                    <div className="h-6 w-4 bg-green-500 absolute" style={{ 
                      bottom: `${(slot.median / maxRevenueValue) * 200 - 3}px`
                    }}></div>
                    
                    {/* Outliers */}
                    {slot.outliers.map((value, i) => (
                      <div 
                        key={i} 
                        className="h-2 w-2 rounded-full bg-red-500 absolute" 
                        style={{ bottom: `${(value / maxRevenueValue) * 200}px` }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Time label */}
                  <div className="text-xs mt-2">{slot.time}</div>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
              <div className="flex items-center">
                <div className="w-4 h-2 bg-green-500 mr-1"></div>
                <span>Median</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-slate-400 mr-1"></div>
                <span>Min/Max Range</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <span>Outliers</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Growth Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growthOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-slate-50 border rounded-md p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="font-medium">{opportunity.description}</span>
                      <Badge 
                        className={`ml-2 ${
                          opportunity.impact === 'High' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {opportunity.impact} Impact
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">Type: {opportunity.type}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Apply
                    </Button>
                    <Button variant="ghost" size="sm">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CapacityOptimization;
