import { BiBed } from 'react-icons/bi';
import { BiCalendarAlt } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { diffDays } from '../../actions/hotels';
import moment from 'moment/moment';
import { useNavigate } from 'react-router';

const HotelCard = ({ hotel, isOwner = false, setSmShow, setId }) => {
  const navigate = useNavigate();
  const navigateToEdit = (e) => {
    e.preventDefault();
    navigate('/hotels/edit', { state: { id: hotel._id } });
  };

  const openDeleteModal = (e) => {
    e.preventDefault();
    setSmShow(true);
    setId(hotel._id);
  };

  return (
    <div className="m-2 max-w-xs rounded overflow-hidden shadow-lg">
      <img
        className="w-full "
        src={`${import.meta.env.VITE_APP_API}/hotel/image/${hotel._id}`}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 header-font">{hotel.title}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="inline-block  px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <GoLocation />
          {hotel.location}
        </div>

        <div className="flex">
          <div className="inline-block s px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <BiBed /> {hotel.bed} bed
          </div>
          <div className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <BiCalendarAlt />
            for {diffDays(hotel.from, hotel.to)}{' '}
            {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
          </div>
        </div>
        <div className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <small>
            Available from {new Date(hotel.from).toLocaleDateString()}
          </small>
        </div>
        <div className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <small>
            <i>Posted {moment(hotel.createdAt).fromNow()}</i>
          </small>
        </div>
      </div>

      {isOwner && (
        <div className="flex pl-4 gap-4">
          <button
            variant="warning"
            onClick={navigateToEdit}
            className="my-2 h-10 w-12 px-12 py-0 flex items-center justify-center border  border-gray-300 hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
          >
            Edit
          </button>
          <button
            variant="danger"
            onClick={openDeleteModal}
            className="my-2 h-10 w-12 px-12 py-0 flex items-center justify-center border  border-gray-300 hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelCard;
