import React from 'react';
// import PropTypes from 'prop-types';
import HomePageLayout from '../layouts/HomePageLayout';
import SlotsLayout from '../components/HomePage/SlotsLayout';

function HomePage() {
  return <HomePageLayout render={({ slots, }) => <SlotsLayout slots={slots} />} />;
}

export default HomePage;
