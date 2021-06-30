import React, { FC, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

import { ITripsQueryParams } from '../../pages/trips/TripsShow';
import { Dispatcher } from '../../types/commonTypes';

interface IPaginationProps {
  postsPerPage: number;
  totalPosts: number;
  queryParams: ITripsQueryParams;
  stateSetterQueryParams: Dispatcher<ITripsQueryParams>;
}

const Pagination: FC<IPaginationProps> = ({
  postsPerPage,
  totalPosts,
  queryParams,
  stateSetterQueryParams,
}) => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(
    queryParams.paginate
  );

  const pageNumbers = [];
  const numberOfPageNavigateButton = Math.ceil(totalPosts / postsPerPage);
  for (let i = 1; i <= numberOfPageNavigateButton; i++) {
    pageNumbers.push(i);
  }
  const handlePageChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    click = 'isPageNumber'
  ) => {
    let pageNumber = 0;
    if (click === 'isPrev') {
      setCurrentPageNumber((prevPageNumber) => prevPageNumber - 1);
      pageNumber = currentPageNumber - 1;
    }
    if (click === 'isNext') {
      setCurrentPageNumber((prevPageNumber) => prevPageNumber + 1);
      pageNumber = currentPageNumber + 1;
    }
    if (click === 'isPageNumber') {
      pageNumber = parseInt(e.currentTarget.innerText);
      setCurrentPageNumber(pageNumber);
    }
    stateSetterQueryParams({
      ...queryParams,
      paginate: pageNumber,
    });
  };

  return (
    <Flex alignItems='center'>
      <Box
        as={Button}
        colorScheme='teal'
        size='sm'
        variant='ghost'
        isDisabled={currentPageNumber === 1 ? true : false}
        onClick={(e) => handlePageChange(e, 'isPrev')}
      >
        Prev
      </Box>
      {pageNumbers.map((number) => (
        <Box
          size='sm'
          as={Button}
          mr={1}
          ml={1}
          key={number}
          onClick={(e) => handlePageChange(e, 'isPageNumber')}
          borderRadius='sm'
          bg={currentPageNumber === number ? 'gray.300' : 'white'}
          color='teal'
        >
          {number}
        </Box>
      ))}
      <Box
        as={Button}
        colorScheme='teal'
        size='sm'
        variant='ghost'
        isDisabled={
          currentPageNumber === numberOfPageNavigateButton ? true : false
        }
        onClick={(e) => handlePageChange(e, 'isNext')}
      >
        Next
      </Box>
    </Flex>
  );
};

export default Pagination;
