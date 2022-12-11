import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HotelCard from './cards/HotelCard';
import { userHotelBookings } from '../actions/hotels';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Bookings = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [hotels, setHotels] = useState([]);

  const getBookedHotels = async () => {
    try {
      const res = await userHotelBookings(token);
      console.log('Hello res => ', res);
      setHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookedHotels();
  }, []);

  return (
    <>
      <div>
        <div>
          {hotels && hotels.length ? (
            hotels.map((hotel) => {
              return (
                <div key={hotel._id} md={3}>
                  <Link
                    to={`/hotels/${hotel._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <HotelCard hotel={hotel} />
                  </Link>
                </div>
              );
            })
          ) : (
            <h4 className="border border-red-400 p-16 text-2xl header-font">
              {' '}
              No Hotels Found!
            </h4>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookings;
