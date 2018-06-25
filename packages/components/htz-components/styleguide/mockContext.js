const mockContext = () => {
  console.log('mocking context');
  return {
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
