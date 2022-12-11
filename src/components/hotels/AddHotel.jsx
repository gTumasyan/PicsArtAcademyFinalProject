import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { createHotel } from '../../actions/hotels';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { DatePicker } from 'antd';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
const { RangePicker } = DatePicker;

const initialState = {
  title: '',
  content: '',
  image: '',
  price: '',
  from: '',
  to: '',
  bed: '',
};

const initialImage = 'https://via.placeholder.com/200x200.png?text=HotelImage';

const AddHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState(initialState);
  const [location, setLocation] = useState('');
  const [preview, setPreview] = useState(initialImage);

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
      formData.append('location', location);
      formData.append('price', values.price);
      formData.append('bed', values.bed);
      formData.append('from', values.from);
      formData.append('to', values.to);
      values.image && formData.append('image', values.image);

      const res = await createHotel(token, formData);
      toast.success('New hotel is posted');
      setValues(initialState);
      setPreview(initialImage);
      setLocation('');
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className="container bg-red-400 p-5 text-center">
        <h2 className="text-4xl regular-font">Add Hotel</h2>
      </div>

      <div className=" container border border-red-400 p-6 ">
        <div className="flex w-100">
          <div className="w-1/2 ">
            <label className="w-50 pointer ">
              <img src={preview} alt="preview_image" className="img m-2" />
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
                    setLocation(place.formatted_address);
                  }}
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
    </>
  );
};

export default AddHotel;
