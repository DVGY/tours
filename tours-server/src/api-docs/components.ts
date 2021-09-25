const component = {
  components: {
    schemas: {
      // todo model
      Trips: {
        type: 'object', // data type
        properties: {
          id: {
            type: 'string', // data-type
            description: 'A trip id', // desc
            example: '6145a6c4991f41fb47f63bfe', // example of an id
          },
          name: {
            type: 'string', // data-type
            description: 'Name of Trip', // desc
            example: 'The Visitor Palace', // example of a title
            unique: true,
            required: true,
          },
          slug: {
            type: 'string', // data type
            description: 'Name of Trip, used in client trip search', // desc
            example: 'the visitor palace', // example of a completed value
          },
          duration: {
            type: 'number', // data type
            description: 'Total Number of Days', // desc
            example: 4, // example of a completed value
            required: true,
          },
          price: {
            type: 'number', // data type
            description: 'Price of Trip', // desc
            example: '220', // example of a completed value
          },
          priceDiscount: {
            type: 'number', // data type
            description: 'Discount on Trip', // desc
            example: '10', // example of a completed value
          },
          difficulty: {
            type: 'string', // data type
            description: 'Trip difficulty level (Easy, Medium, Hard)', // desc
            example: 'medium', // example of a completed value
          },
          ratingsAverage: {
            type: 'number', // data type
            description: 'Average ratings of a Trip', // desc
            example: '4.4', // example of a completed value
            default: 4.5,
          },
          ratingsQuantity: {
            type: 'number',
            description: 'Number of ratings of a Trip', // desc
            example: '50',
            default: 0,
          },
          summary: {
            type: 'string', // data type
            description: 'A short summary of Trip', // desc
            example: 'This is best ............', // example of a completed value
          },
          description: {
            type: 'string', // data type
            description: 'A short description of Trip', // desc
            example: 'The tours of the .....', // example of a completed value
          },
          imageCover: {
            type: 'string', // data type
            description: 'A cover photo/image url of a Trip', // des
            example: 'https://www.myimageurl.com',
          },
          images: {
            type: 'array',
            description: 'All images/photos url of a Trip', // des
            example: [
              'https://www.myimageurl1.com',
              'https://www.myimageurl2.com',
            ],
          },
          createdAt: {
            type: 'string',
            description: 'Timestamp when Trip was created', // des
            example: 'https://www.myimageurl.com',
          },
          guides: {
            $ref: '#/components/schemas/user',
          },
          startDates: {
            type: 'array',
            description: 'Start dates of each trip location', // des
            example: [
              '2021-06-19T09:00:00.000Z',
              '2021-07-20T09:00:00.000Z',
              '2021-08-18T09:00:00.000Z',
            ],
          },
          startLocation: {
            type: 'object',
            description: 'Geo JSON Point',
            example: {
              description: 'Banff, CAN',
              type: 'Point',
              coordinates: [-115.570154, 51.178456],
              address: '224 Banff Ave, Banff, AB, Canada',
            },
            properties: {
              coordinates: {
                type: 'array',
              },
              address: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
            },
            // longitute, latitude
          },
          locations: {
            type: 'array',
            description: 'Geo JSON Points',
          },

          secretTrip: {
            type: 'boolean',
            description: 'Special Secret Trips ',
          },
        },
      },

      // error model
      Error: {
        type: 'object', //data type
        properties: {
          message: {
            type: 'string', // data type
            description: 'Error message', // desc
            example: 'Not found', // example of an error message
          },
          internal_code: {
            type: 'string', // data type
            description: 'Error internal code', // desc
            example: 'Invalid parameters', // example of an error internal code
          },
        },
      },
    },
  },
};

export { component };
