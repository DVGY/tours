const server = {
  servers: [
    {
      url: 'http://localhost:1337/api/v1', // url
      description: 'Local server', // name
    },
    {
      url: 'https://tours-api-prod.herokuapp.com', // url
      description: 'Production server', // name
    },
  ],
};

export { server };
