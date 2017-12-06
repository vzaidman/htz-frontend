import dynamic from 'next/dynamic';

const views = {
  'com.polobase.PinterestEmbed': dynamic(import('./elements/Pinterest')),
  'com.polobase.TwitterEmbed': dynamic(import('./elements/Twitter')),
  'com.polobase.YouTubeEmbed': dynamic(import('./elements/Youtube')),
  'com.polobase.VimeoEmbed': dynamic(import('./elements/Vimeo')),
  'com.polobase.WazeEmbed': dynamic(import('./elements/Waze')),
  'com.polobase.BandCampEmbed': dynamic(import('./elements/BandCamp')),
  'com.polobase.GoogleMapEmbed': dynamic(import('./elements/GoogleMap')),
  'com.polobase.ReutersEmbed': dynamic(import('./elements/StandardVideo')),
  'com.polobase.BloombergEmbed': dynamic(import('./elements/StandardVideo')),
  'com.polobase.CNNEmbed': dynamic(import('./elements/StandardVideo')),
  'com.polobase.GuardianEmbed': dynamic(import('./elements/StandardVideo')),
  'com.polobase.MakoEmbed': dynamic(import('./elements/StandardVideo')),
  'com.polobase.InstagramEmbed': dynamic(import('./elements/Instagram')),
  'com.polobase.FacebookEmbed': dynamic(import('./elements/Facebook')),
  'com.polobase.NYTEmbed': dynamic(import('./elements/NYT')),
  'com.polobase.ArtiMediaEmbed': dynamic(import('./elements/ArtiMedia')),
  'com.polobase.SoundCloudEmbed': dynamic(import('./elements/StandardAudio')),
  'com.polobase.FM103Embed': dynamic(import('./elements/StandardAudio')),
  'com.polobase.PlayBuzzEmbed': dynamic(import('./elements/PlayBuzz')),
  'com.polobase.TlineEmbed': dynamic(import('./elements/Tline')),
  'com.polobase.GiphyEmbed': dynamic(import('./elements/Giphy')),
  'com.polobase.FacebookComments': dynamic(
    import('./elements/FacebookComments')
  ),
  'com.polobase.fileUpload': dynamic(import('./elements/FileUpload')),
};

export default views;
