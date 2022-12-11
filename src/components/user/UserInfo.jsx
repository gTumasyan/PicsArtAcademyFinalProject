import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { useState, useEffect } from 'react';

// Bootstrap
import Image from 'react-bootstrap/Image';

import {
  currencyFormatter,
  getAccountBalance,
  payoutSetting,
} from '../../actions/stripe';

const UserInfo = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;
  const [balance, setBalance] = useState(0);

  const handlePayoutSettings = async () => {
    try {
      const res = await payoutSetting(token);
      // console.log("RES FOR PAYOUT SETTING LINK", res);
      window.location.href = res.data.url;
    } catch (err) {
      console.log('Unable to access settings. Try again');
    }
  };

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, []);

  return (
    <div className="flex h-80 p-8 container bg-[url('https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')] bg-cover bg-center">
      <div>
        <div className="flex">
          <div className="pr-16">
            <Image
              className="w-36  "
              src={`https://avatars.dicebear.com/api/croodles/${user.name[0]}.svg`}
              rounded
            />
          </div>
          <div className="flex flex-col justify-evenly">
            <h4 className=" regular-font text-5xl">{user.name}</h4>
            <small className=" header-font text-base">{user.email}</small>
            <small className=" header-font text-base">{`Joined ${moment(
              user.createdAt
            ).fromNow()}`}</small>
          </div>
        </div>
        {auth?.user?.stripe_seller?.charges_enabled && (
          <div className=" flex justify-between py-6">
            <div>
              <div className="text-2xl regular-font">
                Avaliable:{' '}
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(bp)}
                    </span>
                  ))}
              </div>
            </div>
            <div className="text-2xl  regular-font">
              <div>
                Payouts
                <span
                  onClick={handlePayoutSettings}
                  className="bg-light pointer"
                ></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
