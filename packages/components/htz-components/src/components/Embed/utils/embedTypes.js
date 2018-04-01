/** ************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the Embed's elements map, it is generated
 * from the `embedTypesFileTemplate.js` file is this directory.
 * *************************************************************** */
import React from 'react';
import dynamic from 'next/dynamic';

const embeds = {
  'com.polobase.ArtiMediaEmbed': () => import('../elements/ArtiMedia'),
  'com.polobase.BandCampEmbed': () => import('../elements/BandCamp'),
  'com.polobase.FacebookEmbed': () => import('../elements/Facebook'),
  'com.polobase.FacebookComments': () => import('../elements/FacebookComments'),
  'com.polobase.fileUpload': () => import('../elements/FileUpload'),
  'com.polobase.GiphyEmbed': () => import('../elements/Giphy'),
  'com.polobase.GoogleMapEmbed': () => import('../elements/GoogleMap'),
  'com.polobase.InstagramEmbed': () => import('../elements/Instagram'),
  'com.polobase.NYTEmbed': () => import('../elements/NYT'),
  'com.polobase.PinterestEmbed': () => import('../elements/Pinterest'),
  'com.polobase.PlayBuzzEmbed': () => import('../elements/PlayBuzz'),
  'com.polobase.SoundCloudEmbed': () => import('../elements/StandardAudio'),
  'com.polobase.FM103Embed': () => import('../elements/StandardAudio'),
  'com.polobase.ReutersEmbed': () => import('../elements/StandardVideo'),
  'com.polobase.BloombergEmbed': () => import('../elements/StandardVideo'),
  'com.polobase.CNNEmbed': () => import('../elements/StandardVideo'),
  'com.polobase.GuardianEmbed': () => import('../elements/StandardVideo'),
  'com.polobase.MakoEmbed': () => import('../elements/StandardVideo'),
  'com.polobase.TlineEmbed': () => import('../elements/Tline'),
  'com.polobase.TwitterEmbed': () => import('../elements/Twitter'),
  'com.polobase.VimeoEmbed': () => import('../elements/Vimeo'),
  'com.polobase.WazeEmbed': () => import('../elements/Waze'),
  'com.polobase.YouTubeEmbed': () => import('../elements/Youtube'),
};

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ inputTemplate, }) => (
  <p>{`There is no template for ${inputTemplate} yet`}</p>
);

const getEmbed = embedType => {
  const embedPath = embeds[embedType] || null;

  if (embedPath) {
    return new Promise((resolve, reject) => {
      dynamic(
        embedPath()
          .then(Embed => resolve(Embed))
          .catch(err => reject(err))
      );
    });
  }
  return new Promise(resolve => resolve(DefaultComponent));
};

export default embedType => getEmbed(embedType);
