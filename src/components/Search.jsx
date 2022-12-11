import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { useNavigate } from 'react-router';
import moment from 'moment';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

const Search = ({ locationProps, dateProps, bedProps }) => {
  const arrDate = dateProps ? dateProps.split(',') : '';

  const navigate = useNavigate();

  const [location, setLocation] = useState(locationProps ? locationProps : '');
  const [date, setDate] = useState(arrDate);
  const [bed, setBed] = useState(bedProps ? bedProps : 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row justify-between p-4 container lg:mx-auto w-full"
      >
        <Form.Group className="mb-3">
          <ReactGoogleAutocomplete
            placeholder="Location"
            className="my-2 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            apiKey={import.meta.env.VITE_APP_GOOGLE_AUTOCOMPLETE}
            onPlaceSelected={(place) => {
              setLocation(place.formatted_address);
            }}
          />
        </Form.Group>

        <RangePicker
          className="my-2"
          onChange={(value, dateString) => setDate(dateString)}
          format="YYYY-MM-DD"
          defaultValue={
            date && [
              moment(date[0], 'YYYY-MM-DD'),
              moment(date[1], 'YYYY-MM-DD'),
            ]
          }
        />

        <Form.Group>
          <Form.Select
            name="bed"
            className="my-2 form-select appearance-none
            border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={bed}
            onChange={(e) => setBed(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Form.Select>
        </Form.Group>

        <div>
          <button
            className=" my-2 h-12 w-12 px-12 py-0 flex items-center justify-center border  border-gray-300 hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
            type="submit"
          >
            Search
          </button>
        </div>
      </Form>
    </>
  );
};

export default Search;
