import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { diffDays, getHotelById, isAlreadyBooked } from '../../actions/hotels';
import { toast } from 'react-toastify';
import { BiBed, BiCalendarAlt } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { getSessionId } from '../../actions/stripe';
import { loadStripe } from '@stripe/stripe-js';

const SingleHotel = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { auth } = useSelector((state) => ({ ...state }));

  const [hotel, setHotel] = useState({});
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSingleHotel = async () => {
    try {
      const res = await getHotelById(params.id);
      if (res.data) {
        console.log(res.data);
        setHotel(res.data);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    // if (!auth) history.push("/login");
    // console.log(auth.token, match.params.hotelId);

    console.log(auth.token, params.id);

    let res = await getSessionId(auth.token, params.id);
    console.log('get sessionid resposne', res.data.sessionId);

    const stripe = await loadStripe(`${import.meta.env.VITE_APP_STRIPE_KEY}`);

    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log('Shitak e)) ', result));
  };

  useEffect(() => {
    getSingleHotel();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, params.id).then((res) => {
        // if (res.data.ok)
        setAlreadyBooked(true);
      });
    }
  }, []);

  return (
    <div className="container border border-red-400">
      {Object.keys(hotel).length && (
        <div>
          <h1>{alreadyBooked}</h1>
          <div className="flex flex-col justify-center p-4 container w-full">
            <div className="flex justify-center items-center">
              <img
                src={`${import.meta.env.VITE_APP_API}/hotel/image/${params.id}`}
                alt={hotel.title}
                // className="w-100 position-sticky top-30"
              />
            </div>
            <div className="max-w-7xl flex flex-col justify-center p-8 container w-full">
              <h2 className="header-font text-grey text-4xl sm:text-3xl">
                {hotel.title}
              </h2>
              <p className="regular-font text-grey text-base sm:text-base sm:pt-6">
                {hotel.content}
              </p>
              <p className="regular-font text-grey text-base sm:text-base sm:pt-6">
                <GoLocation />
                {hotel.location}
              </p>
              <p className="regular-font text-grey text-base sm:text-base sm:pt-6">
                <BiCalendarAlt />
                for {diffDays(hotel.from, hotel.to)}{' '}
                {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
              </p>
              <p className="regular-font text-grey text-base sm:text-base sm:pt-6">
                <BiBed />
                {hotel.bed}
              </p>
              <p className="regular-font text-grey text-base sm:text-base sm:pt-6">
                Available from {new Date(hotel.from).toLocaleDateString()}
              </p>

              <div>
                <button
                  className=" my-2 h-12 w-12 px-24 py-0 flex items-center justify-center border  border-gray-300 hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
                  disabled={loading || alreadyBooked}
                  onClick={handleBooking}
                >
                  {loading
                    ? 'Loading...'
                    : alreadyBooked
                    ? 'Already Booked'
                    : auth && auth.token
                    ? 'Book Now'
                    : 'Login to Book'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleHotel;
