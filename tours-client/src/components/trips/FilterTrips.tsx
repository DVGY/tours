import React, { FC, Dispatch, SetStateAction } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Button,
  CheckboxGroup,
  VStack,
  HStack,
  Checkbox,
  Text,
  Divider,
  Tag,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { FcClearFilters, FcFilledFilter } from 'react-icons/fc';

import { ITripsQueryParams } from '../../pages/trips/TripsShow';
import useAPI from '../../hooks/useAPI';
import { useEffect } from 'react';
import { useState } from 'react';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IFilterTripsProps {
  queryParams: ITripsQueryParams;
  stateSetterQueryParams: Dispatcher<ITripsQueryParams>;
}

const FilterTrips: FC<IFilterTripsProps> = ({
  queryParams,
  stateSetterQueryParams,
}) => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/trips`;

  const { sort, difficulty, ratingsAverage } = queryParams;
  const handleRatingsChangeEnd = (ratingsValue: number) => {
    stateSetterQueryParams({
      ...queryParams,
      ratingsAverage: ratingsValue,
    });
  };

  //   const handleApplyFilter = () =>{
  //  }

  return (
    <Flex
      bg='white'
      flexDirection='column'
      px={4}
      py={4}
      minWidth='200px'
      alignSelf='flex-start'
      position='fixed'
      display={['none', 'none', 'none', 'inherit', 'inherit', 'inherit']}
    >
      <Menu>
        <MenuButton
          as={Button}
          size='xs'
          rightIcon={<ChevronDownIcon />}
          fontSize='xs'
          isFullWidth='true'
          textAlign='start'
          fontWeight='medium'
        >
          SORT
        </MenuButton>
        <MenuList>
          <MenuItem fontSize='xs'>Newest &nbsp;</MenuItem>
          <MenuItem fontSize='xs'>
            Price &nbsp; <MdTrendingUp strokeWidth='1' />
          </MenuItem>
          <MenuItem fontSize='xs'>
            Price &nbsp; <MdTrendingDown strokeWidth='1' />
          </MenuItem>
          <MenuItem fontSize='xs'>
            Rating &nbsp; <MdTrendingUp strokeWidth='1' />
          </MenuItem>
        </MenuList>
      </Menu>
      <Divider orientation='horizontal' height='20px' />
      <VStack align='start' spacing={2} pt={1}>
        <Text fontSize='xs' fontWeight='medium'>
          RATINGS
        </Text>
        <Slider
          aria-label='slider-ex-1'
          onChange={(val) => console.log('val')}
          onChangeEnd={(val) => handleRatingsChangeEnd(val)}
          min={0}
          max={50}
          defaultValue={3.5}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text fontSize='xs'>{`${ratingsAverage}-5`}</Text>
      </VStack>
      <Divider orientation='horizontal' height='20px' />
      <Divider orientation='horizontal' height='20px' />
      <CheckboxGroup colorScheme='green' defaultValue={[]}>
        <Text fontSize='xs' fontWeight='medium'>
          TRIP DIFFICULTY
        </Text>
        <VStack align='start' spacing={2} pt={1}>
          <Checkbox size='sm' fontWeight='normal' value='difficult'>
            <Text fontSize='xs'>Difficult</Text>
          </Checkbox>
          <Checkbox size='sm' value='medium'>
            <Text fontSize='xs'>Meduim</Text>
          </Checkbox>
          <Checkbox size='sm' value='easy'>
            <Text fontSize='xs'>Easy</Text>
          </Checkbox>
        </VStack>
      </CheckboxGroup>
      <Divider orientation='horizontal' height='20px' />

      <Button
        borderRadius={0}
        type='submit'
        variant='solid'
        colorScheme='teal'
        width='full'
        // onClickC={}
      >
        <FcFilledFilter /> &nbsp; Apply
      </Button>
      <Divider orientation='horizontal' height='20px' />
      <Text fontSize='xs' fontWeight='medium'>
        Filters
      </Text>
      <HStack pt={1}>
        <Tag size='sm'>Sample Tag</Tag>
      </HStack>
      <Divider orientation='horizontal' height='20px' />
      <Button
        borderRadius={0}
        type='submit'
        variant='solid'
        colorScheme='teal'
        width='full'
      >
        <FcClearFilters /> &nbsp; Clear
      </Button>
    </Flex>
  );
};

export default FilterTrips;
