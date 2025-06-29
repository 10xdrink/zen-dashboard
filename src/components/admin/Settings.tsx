
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Settings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure system preferences and user management</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Settings features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
