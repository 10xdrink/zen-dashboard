import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DownloadIcon, FileDown } from "lucide-react";

// Type definitions
interface BookingPatternsProps {
  doctor?: string;
  dateRange: {
    from: Date;
    to: Date;
  };
}

// Mock data for the heatmap calendar
const generateHeatmapData = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`); // 8:00 to 19:00
  
  return days.map(day => ({
    day,
    hours: hours.map(hour => ({
      hour,
      count: Math.floor(Math.random() * 10) // Random count between 0-10
    }))
  }));
};

// Mock data for seasonal trends
const generateSeasonalTrends = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    currentYear: 50 + Math.floor(Math.random() * 150),
    previousYear: 40 + Math.floor(Math.random() * 120)
  }));
};

// Mock data for service popularity
const generateServicePopularity = () => {
  const services = [
    { name: 'Annual Checkup', category: 'General' },
    { name: 'Dental Cleaning', category: 'Dental' },
    { name: 'Skin Consultation', category: 'Dermatology' },
    { name: 'Blood Test', category: 'Laboratory' },
    { name: 'Physical Therapy', category: 'Rehabilitation' },
    { name: 'Eye Examination', category: 'Ophthalmology' },
    { name: 'Vaccination', category: 'Preventive' },
    { name: 'Nutrition Consultation', category: 'Wellness' },
    { name: 'Mental Health Session', category: 'Psychiatry' },
    { name: 'Pediatric Checkup', category: 'Pediatrics' }
  ];
  
  return services.map(service => ({
    ...service,
    count: 10 + Math.floor(Math.random() * 500)
  })).sort((a, b) => b.count - a.count);
};

// Mock data for doctor utilization
const generateDoctorUtilization = () => {
  const doctors = [
    { id: 'dr1', name: 'Dr. Adams', specialty: 'General Medicine' },
    { id: 'dr2', name: 'Dr. Wilson', specialty: 'Pediatrics' },
    { id: 'dr3', name: 'Dr. Lee', specialty: 'Cardiology' },
    { id: 'dr4', name: 'Dr. Garcia', specialty: 'Dermatology' },
    { id: 'dr5', name: 'Dr. Patel', specialty: 'Neurology' }
  ];
  
  return doctors.map(doctor => ({
    ...doctor,
    utilization: 30 + Math.floor(Math.random() * 70) // Random utilization between 30-100%
  }));
};

const BookingPatterns: React.FC<BookingPatternsProps> = ({ doctor, dateRange }) => {
  const [yearComparison, setYearComparison] = React.useState<string>("false");
  
  // Generate mock data
  const heatmapData = generateHeatmapData();
  const seasonalData = generateSeasonalTrends();
  const servicePopularity = generateServicePopularity();
  const doctorUtilization = generateDoctorUtilization();

  // Helper to get max value for heatmap color scale
  const maxHeatmapValue = Math.max(...heatmapData.flatMap(d => d.hours.map(h => h.count)));

  return (
    <div className="space-y-6">
      {/* Peak Hours Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Peak Hours Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Hour labels */}
              <div className="flex mb-2">
                <div className="w-24"></div> {/* Empty space for day labels */}
                {heatmapData[0].hours.map((hour, idx) => (
                  <div key={idx} className="flex-1 text-xs text-center">
                    {hour.hour}
                  </div>
                ))}
              </div>
              
              {/* Heatmap rows */}
              {heatmapData.map((day, dayIdx) => (
                <div key={dayIdx} className="flex items-center mb-1">
                  <div className="w-24 text-sm font-medium">{day.day}</div>
                  {day.hours.map((hour, hourIdx) => {
                    const intensity = (hour.count / maxHeatmapValue) * 100;
                    return (
                      <div 
                        key={`${dayIdx}-${hourIdx}`} 
                        className="flex-1 h-8 mx-0.5 rounded cursor-pointer"
                        style={{ 
                          backgroundColor: `rgba(34, 197, 94, ${intensity / 100})`,
                          border: '1px solid #e5e7eb'
                        }}
                        title={`${day.day}, ${hour.hour}: ${hour.count} appointments`}
                      />
                    );
                  })}
                </div>
              ))}
              
              {/* Color scale */}
              <div className="flex justify-end items-center mt-4 text-xs text-gray-500">
                <div>Less</div>
                <div className="mx-1 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i}
                      className="w-4 h-4"
                      style={{ backgroundColor: `rgba(34, 197, 94, ${i / 4})` }}
                    />
                  ))}
                </div>
                <div>More</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Seasonal Trends */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Seasonal Trends</CardTitle>
            <Select value={yearComparison} onValueChange={setYearComparison}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Year Comparison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Year-over-Year</SelectItem>
                <SelectItem value="false">Current Year Only</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end">
              {seasonalData.map((month, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                  {/* Current year bar */}
                  <div 
                    className="w-4/5 bg-green-500 rounded-t"
                    style={{ height: `${(month.currentYear / 200) * 100}%` }}
                    title={`${month.month}: ${month.currentYear} appointments`}
                  />
                  
                  {/* Previous year bar (only shown if comparison is enabled) */}
                  {yearComparison === "true" && (
                    <div 
                      className="w-4/5 bg-gray-400 rounded-t mt-0.5"
                      style={{ height: `${(month.previousYear / 200) * 100}%` }}
                      title={`${month.month} (last year): ${month.previousYear} appointments`}
                    />
                  )}
                  
                  {/* Month label */}
                  <div className="text-xs mt-1">{month.month}</div>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            {yearComparison === "true" && (
              <div className="flex justify-center mt-4 text-sm">
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-green-500 mr-1" />
                  <span>2025</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 mr-1" />
                  <span>2024</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Service Popularity */}
        <Card>
          <CardHeader>
            <CardTitle>Service Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {servicePopularity.map((service, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-32 md:w-48 text-sm truncate" title={service.name}>
                    {service.name}
                  </div>
                  <div className="flex-1 h-5 mx-2 relative">
                    <div className="absolute top-0 left-0 bottom-0 bg-green-100 rounded w-full" />
                    <div 
                      className="absolute top-0 left-0 bottom-0 bg-green-500 rounded"
                      style={{ width: `${(service.count / servicePopularity[0].count) * 100}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm text-right">{service.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Doctor Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Doctor Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {doctorUtilization.map((doctor, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative h-28 w-28">
                  {/* Background circle */}
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    {/* Progress arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={doctor.utilization > 80 ? "#ef4444" : doctor.utilization > 60 ? "#22c55e" : "#cbd5e1"}
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 45 * (doctor.utilization / 100)} ${2 * Math.PI * 45 * (1 - doctor.utilization / 100)}`}
                      strokeDashoffset={2 * Math.PI * 45 * 0.25}
                    />
                  </svg>
                  
                  {/* Percentage text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-semibold">{doctor.utilization}%</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium mt-2">{doctor.name}</h4>
                <span className="text-xs text-gray-500">{doctor.specialty}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Export toolbar */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="flex items-center gap-2">
          <FileDown className="h-4 w-4" />
          Export CSV
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <DownloadIcon className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default BookingPatterns;
