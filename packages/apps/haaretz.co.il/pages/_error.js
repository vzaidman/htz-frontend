// @flow
import React from 'react';
import Error404 from '../components/Errors/Error404';
import Error500 from '../components/Errors/Error500';
import ErrorPageLayout from '../layouts/ErrorPageLayout';
import HomePageSlotsLayout from '../layouts/HomePageSlotsLayout';

type Props = {
  url: { query: { status: number, }, },
};

export default function Error({
  url: {
    query: { status, },
  },
}: Props) {
  return (
    <ErrorPageLayout
      render={({ slots, }) => (status === 404 || status === 500 ? (
        <HomePageSlotsLayout
          slots={slots}
          render={() => (status !== 404 ? <Error404 /> : <Error500 />)}
        />
      ) : (
        <p>{status}</p>
      ))
      }
    />
  );
}
