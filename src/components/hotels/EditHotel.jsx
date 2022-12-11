import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { DatePicker } from 'antd';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { getHotelById, updateHotel } from '../../actions/hotels';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

const { RangePicker } = DatePicker;

const EditHotel = () => {
  const location = useLocation();

  const [locationValue, setLocationValue] = useState('');
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [values, setValues] = useState(null);

  const [preview, setPreview] = useState(
    `${import.meta.env.VITE_APP_API}/hotel/image/${location.state.id}`
  );

  const getHotel = async () => {
    try {
      const res = await getHotelById(location.state.id);
      delete res.data.image;
      setLocationValue(res.data.location);
      setValues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('location', locationValue);
      formData.append('price', values.price);
      formData.append('bed', values.bed);
      formData.append('from', values.from);
      formData.append('to', values.to);
      values.image && formData.append('image', values.image);

      const res = await updateHotel(token, formData, location.state.id);
      toast.success('Hotel is updated!');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <>
      <div className="container bg-red-400 p-5 text-center">
        <h2 className="text-4xl regular-font">Edit Hotel</h2>
      </div>

      {values && (
        <div className=" container border border-red-400 p-6 ">
          <div className="flex w-100">
            <div className="w-1/2">
              <label className="w-50 pointer ">
                <img
                  src={preview}
                  alt="preview_image"
                  className="img img-fluid m-2 w-100"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
            <div className=" px-6 py-2 regular-font">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="pb-4">
                  <Form.Label className="pr-10">Title</Form.Label>
                  <Form.Control
                    className=" border border-gray-300 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    name="title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="pb-4 flex items-center">
                  <Form.Label className="pr-4">Content</Form.Label>
                  <Form.Control
                    className=" border border-gray-300 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    name="content"
                    as="textarea"
                    value={values.content}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="pb-4">
                  <Form.Label className="pr-3">Loaction</Form.Label>

                  <ReactGoogleAutocomplete
                    placeholder=""
                    className="form-control border border-gray-300 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    apiKey={import.meta.env.VITE_APP_GOOGLE_AUTOCOMPLETE}
                    onPlaceSelected={(place) => {
                      setLocationValue(place.formatted_address);
                    }}
                    defaultValue={locationValue}
                  />
                </Form.Group>

                <Form.Group className="pb-4">
                  <Form.Label className="pr-9">Price</Form.Label>
                  <Form.Control
                    className="border border-gray-300 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="pb-3">
                  <Form.Label className="pr-2">Number of beds</Form.Label>
                  <Form.Select
                    className="   border border-gray-300 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    name="bed"
                    value={values.bed}
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </Form.Group>

                <RangePicker
                  className="mb-3 w-100"
                  onChange={(date, dateString) => {
                    setValues({
                      ...values,
                      from: dateString[0],
                      to: dateString[1],
                    });
                  }}
                  defaultValue={[
                    moment(values.from, 'YYYY-MM-DD'),
                    moment(values.to, 'YYYY-MM-DD'),
                  ]}
                  format="YYYY-MM-DD"
                />
                <div>
                  <button
                    type="submit"
                    className="my-2 appearance-none
                border border-gray-300 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
                  >
                    Save
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditHotel;
