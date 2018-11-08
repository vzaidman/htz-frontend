import { friendlyRoutes, } from '../../../../routes/routes';

export default function (
  nextStage,
  router,
  paramString = null,
  ignoreQueryParam = false
) {
  const [ pathWithoutQuery, queryPartFromPath, ] = router.asPath.split(/\?(.+)/);
  const cleanPathWithoutQuery = pathWithoutQuery.substr(
    0,
    pathWithoutQuery.lastIndexOf('/')
  );
  const computedAsPath = `${cleanPathWithoutQuery}/${
    friendlyRoutes[nextStage]
  }${
    queryPartFromPath && !ignoreQueryParam
      ? `?${queryPartFromPath}${paramString ? `&${paramString}` : ''}`
      : paramString
        ? `?${paramString}`
        : ''
  }`;

  const pathObj = {
    asPath: computedAsPath,
    pathName: {
      pathname: `/promotions-page/${nextStage}${
        paramString && !ignoreQueryParam ? `?${paramString}` : ''
      }`,
      query: router.query,
    },
  };
  return pathObj;
}
