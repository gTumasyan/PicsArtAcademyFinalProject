import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { allHotels } from '../actions/hotels';
import { Link } from 'react-router-dom';
import HotelCard from '../components/cards/HotelCard';

const Hotels = () => {
  const [hotels, setHotels] = useState('');
  const [visible, setVisible] = useState(3);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  const getAllHotels = async () => {
    try {
      const res = await allHotels();
      if (res.data) {
        setHotels(res.data);
      }
    } catch (err) {
      toast.error('Err');
    }
  };

  useEffect(() => {
    getAllHotels();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center border border-red-400 header-font ">
        {hotels && hotels.length ? (
          hotels.slice(0, visible).map((hotel) => (
            <div key={hotel._id} md={3}>
              <Link
                to={`/hotels/${hotel._id}`}
                className="text-decoration-none text-dark"
              >
                <HotelCard hotel={hotel} />
              </Link>
            </div>
          ))
        ) : (
          <span className=" p-8 text-3xl header-font">No hotels found!</span>
        )}
      </div>
      <div className="flex items-center justify-center">
        <button
          className="container my-2 h-12 w-fluid px-24 py-0 flex items-center justify-center border  border-gray-300 hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
          type="submit"
          onClick={showMoreItems}
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default Hotels;
