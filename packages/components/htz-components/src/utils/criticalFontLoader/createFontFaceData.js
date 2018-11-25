const createFontFaceData = (fullFontName, subsetFontName, subsetData, variationsData) => {
  const variationsFontFacesData = variationsData
    .map(({ files, properties, }) => ({
      family: fullFontName,
      files,
      properties,
    }));

  if (typeof subsetData !== 'undefined') {
    const { files, properties, } = subsetData;
    const subsetFontFaceData = {
      family: subsetFontName,
      files,
      properties,
    };
    return [
      subsetFontFaceData,
      ...variationsFontFacesData,
    ];
  }

  return variationsFontFacesData;
};

export default createFontFaceData;
