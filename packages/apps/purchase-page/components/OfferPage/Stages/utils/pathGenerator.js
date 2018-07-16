import { friendlyRoutes, } from '../../../../routes/routes';

export default function (nextStage, router, paramString = null) {
  const [ pathWithoutQuery, queryPartFromPath, ] = router.asPath.split(/\?(.+)/);
  const cleanPathWithoutQuery = pathWithoutQuery.substr(
    0,
    pathWithoutQuery.lastIndexOf('/')
  );
  const computedAsPath = `${cleanPathWithoutQuery}/${
    friendlyRoutes[nextStage]
  }${
    queryPartFromPath
      ? `?${queryPartFromPath}${paramString ? `&${paramString}` : ''}`
      : paramString ? `?${paramString}` : ''
  }`;

  const pathObj = {
    asPath: computedAsPath,
    pathName: `/promotions-page/${nextStage}`,
  };
  console.log('retuning object from path generator', pathObj);
  return pathObj;
}
