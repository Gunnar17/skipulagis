import PrivateRoute from '../../components/PrivateRoute';

const AdminDashboard: React.FC = () => (
  <PrivateRoute roles={[ 'admin', 'consultant' ]}>
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      {/* Dashboard content */}
    </div>
  </PrivateRoute>
);

export default AdminDashboard;