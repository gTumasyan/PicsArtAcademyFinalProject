import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteHotel, sellerHotels } from '../../actions/hotels';
import HotelCard from '../cards/HotelCard';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Connected = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [hotels, setHotels] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [id, setId] = useState(null);

  const getSellerHotels = async () => {
    try {
      const res = await sellerHotels(token);
      if (res.data) {
        setHotels(res.data);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteHotel(token, id);
      toast.success('Hotel delted successfully! 🔥');
      setSmShow(false);
      getSellerHotels();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSellerHotels();
  }, []);

  return (
    <>
      <div className="container border border-red-400 p-6 ">
        <div className="mt-4">
          <div
            md={12}
            className="mb-4 d-flex justify-content-between align-items-center"
          >
            <h3 className="text-6xl header-font pl-8">Your Hotels</h3>
            <Link
              to="/hotels/new"
              className="text-2xl my-4 h-12 w-50 px-6 py-0 flex items-center justify-center hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
            >
              + Add Hotel
            </Link>
          </div>
        </div>
        <div>
          <div className="flex justify-between flex-wrap  flex-col sm:flex-row">
            {hotels && hotels.length ? (
              hotels.map((hotel) => {
                return (
                  <div key={hotel._id} className="flex">
                    <Link
                      to={`/hotels/${hotel._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <HotelCard
                        hotel={hotel}
                        isOwner={true}
                        setSmShow={setSmShow}
                        setId={setId}
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <h4 className="border border-red-400 p-16 text-2xl header-font">
                No Hotels Found!
              </h4>
            )}
          </div>
          <Modal
            className="container flex border border-red-400 p-16 text-xl header-font"
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header>
              <Modal.Title id="example-modal-sizes-title-sm">
                Are you sure?
              </Modal.Title>
            </Modal.Header>
            <div className="flex gap-4">
              <button
                className="my-2 h-12 w-12 px-12 py-0 flex items-center justify-center border  border-gray-300 hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
                onClick={() => setSmShow(false)}
              >
                Close
              </button>
              <button
                className="my-2 h-12 w-12 px-12 py-0 flex items-center justify-center border  border-gray-300 hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
                onClick={deleteHandler}
              >
                Delete
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Connected;
