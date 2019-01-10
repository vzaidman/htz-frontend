import React from 'react';
// import PropTypes from 'prop-types';
import HomePageLayout from '../layouts/HomePageLayout';
import HomePageSlotsLayout from '../layouts/HomePageSlotsLayout';
import MainSlot from '../components/HomePage/MainSlot';

function HomePage() {
  return (
    <HomePageLayout
      render={({ slots, }) => (
        <HomePageSlotsLayout
          rowBgc="white"
          slots={slots}
          render={main => <MainSlot main={main} />}
        />
      )}
    />
  );
}

export default HomePage;
