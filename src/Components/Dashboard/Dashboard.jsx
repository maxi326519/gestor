import SideBar from './SideBar/SideBar';
import Products from './Products/Products';
import Users from './Users/Users';

import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <SideBar/>
      <Users/>
    </div>
  );
}