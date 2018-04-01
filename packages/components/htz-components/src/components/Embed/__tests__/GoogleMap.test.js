import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import GoogleMap from '../elements/GoogleMap';

it('Google-Maps static ', () => {
  const snapshot = felaSnapshotter(
    <GoogleMap
      content="shoken 21 tel aviv"
      caption="static - satellite - eng"
      credit="static - satellite - eng"
      embedType="static"
      elementType="embedElement"
      settings={{
        language: 'en',
        satellite: 'true',
      }}
      inputTemplate="com.polobase.GoogleMapEmbed"
      contentId="7.4456"
      contentName="static - satellite - eng"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Google-Maps directions ', () => {
  const snapshot = felaSnapshotter(
    <GoogleMap
      content="shoken 21 tel aviv"
      caption="shoken 21 tel aviv ---> tony vespa habima tel aviv"
      credit="directions - noSatellite - eng"
      embedType="directions"
      elementType="embedElement"
      settings={{
        mode: 'walking',
        destination: 'tony vespa habima tel aviv',
        language: 'en',
        satellite: 'false',
        units: 'metric',
        waypoints: 'סורה מארה',
      }}
      inputTemplate="com.polobase.GoogleMapEmbed"
      contentId="7.4458"
      contentName="directions - noSatellite - eng"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Google-Maps search ', () => {
  const snapshot = felaSnapshotter(
    <GoogleMap
      content="קופיקס בתל אביב"
      caption="קופיקס בתל אביב"
      credit="search- satellite - eng"
      embedType="search"
      elementType="embedElement"
      settings={{
        language: 'en',
        satellite: 'true',
      }}
      inputTemplate="com.polobase.GoogleMapEmbed"
      contentId="7.4460"
      contentName="search- satellite - eng"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Google-Maps street view ', () => {
  const snapshot = felaSnapshotter(
    <GoogleMap
      content="streetView"
      caption="street view"
      credit="street view"
      embedType="streetView"
      elementType="embedElement"
      settings={{
        heading: 'none',
        coordinates: '32.05216,34.772368',
        language: 'en',
        satellite: 'false',
        pitch: '00',
        fov: '20',
      }}
      inputTemplate="com.polobase.GoogleMapEmbed"
      contentId="7.4963"
      contentName="street view"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
