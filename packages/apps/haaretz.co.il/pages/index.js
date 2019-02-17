import React from 'react';
// import PropTypes from 'prop-types';
import HomePageLayout from '../layouts/HomePageLayout';
import SlotsLayout from '../components/HomePage/SlotsLayout';

function HomePage() {
  return <HomePageLayout
    render={
      ({ slots, globalLazyload, }) => (
        <SlotsLayout slots={slots} globalLazyload={globalLazyload} />
      )
    }
  />;
}

export default HomePage;
