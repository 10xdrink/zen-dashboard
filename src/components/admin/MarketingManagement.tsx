
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const MarketingManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Marketing & Promotions</CardTitle>
          <CardDescription>Manage campaigns, loyalty programs, and customer engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Marketing management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
