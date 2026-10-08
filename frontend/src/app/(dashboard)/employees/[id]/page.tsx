import EmployeeDetailView from './EmployeeDetailView';
import { initialEmployees } from '../../../../lib/data';

export function generateStaticParams() {
  const ids: { id: string }[] = [];
  initialEmployees.forEach((emp) => {
    ids.push({ id: emp.empId });
    if (emp.id) {
      ids.push({ id: emp.id });
    }
  });
  return ids;
}

export default function EmployeeDetailPage() {
  return <EmployeeDetailView />;
}
