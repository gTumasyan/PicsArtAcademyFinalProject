import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { NavDropdown } from 'react-bootstrap';

const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.clear();
    navigate('/');
  };

  return (
    <div className="continer">
      <div className="container flex flex-col sm:flex-row sm:justify-between py-4">
        <Link to="/" className="text-5xl header-font py-8 hover:text-red-400 ">
          {' '}
          The OverLook
        </Link>
        <div className="bg-red-400 p-6 align-middle">
          {auth && auth.token ? (
            <div>
              <div className="flex text-xl uppercase regular-font ">
                {' '}
                {auth.user.name} the greatest
              </div>
              <NavDropdown.Item
                className="text-base header-font hover:text-white"
                as={Link}
                to="/dashboard/bookings"
              >
                Dashboard
              </NavDropdown.Item>
              <br />
              <NavDropdown.Item
                className="text-base  header-font  hover:text-white"
                onClick={logout}
              >
                Logout
              </NavDropdown.Item>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="text-base  header-font  hover:text-white pr-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-base  header-font  hover:text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
