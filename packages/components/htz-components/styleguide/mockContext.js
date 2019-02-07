const mockContext = () => {
  console.log('mocking context');
  return {
    dataSources: {
      PapiAPI: {
        getList: data => {
          console.log('got to mock context data source getList');
        },
        getContent: data => {
          console.log('got to mock context data source getContent', data);
        },
        getCmLink: data => {
          console.log('got to mock context  getCmLink data source');
        },
      },
      FinanceAPI: {
        getAssetsList: data => {
          console.log('got to mock context getAssetsList data source', data);
        },
      },
      TableScoreAPI: {
        retrieveTableScore: data => {
          console.log('got to mock context retrieveTableScore data source', data);
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
