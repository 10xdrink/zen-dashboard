
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const FinanceManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Management</CardTitle>
          <CardDescription>Comprehensive financial tracking and reporting</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Financial management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
