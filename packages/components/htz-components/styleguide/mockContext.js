const mockContext = () => {
  console.log('mocking context');
  return {
    dataSources: {
      PapiAPI: {
        getList: data => {
          console.log('got to mock context data source getList');
        },
        getCmLink: data => {
          console.log('got to mock context  getCmLink data source');
        },
      },
    },
    listsLoader: {
      load: data => {
        console.log('got to mock context', data);
      },
    },
    cmlinkLoader: {
      load: data => {
        console.log('got to mock context', data);
      },
    },
  };
};

export default mockContext;
