import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardTabs = () => {
  const params = useLocation();

  return (
    <div className="flex container">
      <ul className="flex regular-font text-2xl p-8 hover:bg-red-400 hover:text-white">
        <li className="pr-8">
          <Link
            className={`nav-link ${
              params.pathname === '/dashboard/bookings' && 'active'
            }`}
            to="/dashboard/bookings"
          >
            Your Bookings
          </Link>
        </li>
        <li className=" hover:text-white">
          <Link
            className={`nav-link ${
              params.pathname === '/dashboard/seller' && 'active'
            }`}
            to="/dashboard/seller"
          >
            Your Hotels
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardTabs;
