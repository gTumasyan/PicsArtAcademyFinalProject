import React from 'react';

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-center text-center items-center p-8 container ">
        <div className="pb-4 sm:p-0 sm:pr-4">
          <h4 className="header-font text-grey text-xl">About</h4>
          <p className="regular-font max-w-xl ">
            Welcome to Overlook, where comfort is everything. Beautiful room
            presentations, straightforward booking & reservation options, & a
            whole lot more awaits here.
          </p>
        </div>
      </div>
      <div className="container footer text-grey text-center p-2 bg-red-400  header-font">
        www.overlook.am | All rights reserved!
      </div>
    </>
  );
};

export default Footer;
