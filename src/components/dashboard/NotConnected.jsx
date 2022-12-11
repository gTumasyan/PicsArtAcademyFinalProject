import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createConnectAccount } from '../../actions/stripe';

const NotConnected = () => {
  // Will be deleted
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      window.location.href = res.data;
    } catch (err) {
      toast.error('Stripe connect failed, Try again.');
      setLoading(false);
    }
  };
  return (
    <div className="border border-red-400 p-16">
      <div>
        <div className="text-center text-2xl header-font">
          <div className="p-5 pointer">
            <h4>Setup payouts to post hotel rooms</h4>
            <p className="lead">
              <strong>HotelBooking.am</strong> partners with stripe to transfer
              earnings to your bank accout
            </p>
            <button
              className="btn btn-primary mb-3"
              onClick={submitHandler}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Setup Payouts'}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotConnected;
