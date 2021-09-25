const getATrip = {
  // method of operation
  get: {
    tags: ['Get A Trip'], // operation's tag.
    description: 'Get A Trip', // operation's desc.
    operationId: 'getATrip', // unique operation id.
    parameters: [
      {
        name: 'id', // name of the param
        in: 'path', // location of the param
        schema: { type: 'string', default: null },
        required: false, // Mandatory param
        description: 'id of Trip', // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Get A Trip', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Trips', // Todo model
            },
          },
        },
      },
    },
  },
};

export { getATrip };
