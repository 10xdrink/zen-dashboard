import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Pause, Bell } from "lucide-react";

// Mock event types
type EventType = "check-in" | "start" | "complete" | "delay" | "next";

// Mock event data
interface Event {
  id: string;
  type: EventType;
  timestamp: Date;
  message: string;
  urgent: boolean;
}

// Mock alert data
interface Alert {
  id: string;
  type: "delay" | "check-in" | "next";
  message: string;
  action: string;
}

// Generate mock events
const generateMockEvents = (): Event[] => {
  return [
    {
      id: "e1",
      type: "check-in",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      message: "John Doe checked in",
      urgent: false
    },
    {
      id: "e2",
      type: "start",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      message: "Dr. Smith started treatment for John Doe",
      urgent: false
    },
    {
      id: "e3",
      type: "delay",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      message: "Room 2 running 15 min late",
      urgent: true
    },
    {
      id: "e4",
      type: "complete",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      message: "Jane Smith's appointment completed",
      urgent: false
    },
    {
      id: "e5",
      type: "next",
      timestamp: new Date(),
      message: "Next patient: Bob Johnson",
      urgent: true
    }
  ];
};

// Generate mock alerts
const generateMockAlerts = (): Alert[] => {
  return [
    {
      id: "a1",
      type: "delay",
      message: "Dr. Lee is 20 min behind schedule",
      action: "Notify patients"
    },
    {
      id: "a2",
      type: "check-in",
      message: "Mary Quinn hasn't arrived yet (due 5 min ago)",
      action: "Send reminder"
    },
    {
      id: "a3",
      type: "next",
      message: "Prepare room for Alex Zhang in 5 min",
      action: "Mark ready"
    }
  ];
};

const LiveUpdatesView: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(generateMockEvents());
  const [alerts, setAlerts] = useState<Alert[]>(generateMockAlerts());
  const [playing, setPlaying] = useState(true);
  
  // Format time relative to now
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 minute ago";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return "1 hour ago";
    return `${diffHours} hours ago`;
  };

  // Get icon for event type
  const getEventIcon = (type: EventType) => {
    switch(type) {
      case "check-in": return "👤";
      case "start": return "🏁";
      case "complete": return "✅";
      case "delay": return "⏱️";
      case "next": return "⏭️";
      default: return "📝";
    }
  };

  // Auto-generate a new event every few seconds while playing
  useEffect(() => {
    if (!playing) return;
    
    const mockMessages = [
      "Patient checked in",
      "Treatment started",
      "Appointment completed",
      "Next patient arriving",
      "Room ready for next appointment"
    ];
    
    const types: EventType[] = ["check-in", "start", "complete", "next", "check-in"];
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockMessages.length);
      const newEvent: Event = {
        id: `e${Date.now()}`,
        type: types[randomIndex],
        timestamp: new Date(),
        message: mockMessages[randomIndex],
        urgent: Math.random() > 0.8,
      };
      
      setEvents(prev => [newEvent, ...prev.slice(0, 19)]); // Keep last 20 events
    }, 8000);
    
    return () => clearInterval(interval);
  }, [playing]);

  // Handle alert action
  const handleAlertAction = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Activity Feed */}
      <Card className="h-[600px]">
        <CardHeader className="pb-2 flex flex-row justify-between items-center">
          <CardTitle className="text-sm font-medium">Live Activity Feed</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setPlaying(!playing)}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[550px] p-4">
            {events.map((event) => (
              <div 
                key={event.id}
                className={`mb-3 p-2 rounded-lg ${event.urgent ? "bg-amber-50" : "bg-gray-50"}`}
              >
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatRelativeTime(event.timestamp)}</span>
                  {event.urgent && <Badge variant="outline" className="text-amber-500 border-amber-200">Priority</Badge>}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span>{getEventIcon(event.type)}</span>
                  <span>{event.message}</span>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Alerts Panel */}
      <Card className="h-[600px]">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <Badge>{alerts.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[520px] text-gray-400">
              <Bell className="h-8 w-8 mb-2" />
              <p>No active alerts</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className={`shadow-sm border-l-4 ${
                  alert.type === 'delay' ? 'border-l-amber-500' : 
                  alert.type === 'check-in' ? 'border-l-blue-500' : 'border-l-green-500'
                }`}>
                  <CardContent className="p-4">
                    <h4 className="font-medium">{alert.message}</h4>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" onClick={() => handleAlertAction(alert.id)}>
                        {alert.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveUpdatesView;
