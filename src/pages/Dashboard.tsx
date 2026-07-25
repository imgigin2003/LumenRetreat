import { PageTransition } from '@/ui/PageTransition';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';

export default function Dashboard() {
  return (
    <PageTransition>
      <DashboardLayout />
    </PageTransition>
  );
}
