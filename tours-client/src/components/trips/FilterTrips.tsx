import React, { FC, useState } from 'react';
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
import {
  addSortParams,
  addDifficultyParams,
  removeDifficultyParams,
} from '../../utils/helperFunctions';
import { Dispatcher } from '../../types/commonTypes';

export enum SortParams {
  newest = '-createdAt',
  oldest = 'createdAt',
  ascPrice = 'price',
  dscPrice = '-price',
  ascRatingsAverage = 'ratingsAverage',
  dscRatingsAverage = '-ratingsAverage',
}

interface IFilterTripsProps {
  queryParams: ITripsQueryParams;
  stateSetterQueryParams: Dispatcher<ITripsQueryParams>;
}

const FilterTrips: FC<IFilterTripsProps> = ({
  queryParams,
  stateSetterQueryParams,
}) => {
  const { sort, difficulty, ratingsAverage } = queryParams;
  const [ratingsValue, setRatingsValue] = useState(ratingsAverage);

  const handleRatingsChangeEnd = (ratingsValue: number) => {
    stateSetterQueryParams({
      ...queryParams,
      ratingsAverage: ratingsValue,
    });
  };

  const handleSortChange = (sortValue: string) => {
    const sortParams = addSortParams(sortValue, sort);
    stateSetterQueryParams({
      ...queryParams,
      sort: sortParams,
    });
  };

  const handleDifficulty = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const difficultyValue = e.target.name;
    const difficultyParams = e.target.checked
      ? addDifficultyParams(difficultyValue, difficulty)
      : removeDifficultyParams(difficultyValue, difficulty as string[]);
    stateSetterQueryParams({
      ...queryParams,
      difficulty: difficultyParams,
    });
  };

  const handleClearAllFilterParams = () => {
    stateSetterQueryParams({
      sort: null,
      difficulty: null,
      ratingsAverage: 1,
      paginate: 1,
      limit: 2,
    });
  };

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
          <MenuItem
            fontSize='xs'
            onClick={() => handleSortChange(SortParams.newest)}
            bg={sort?.includes('-createdAt') ? 'teal.300' : 'inherit'}
          >
            Newest &nbsp;
          </MenuItem>
          <MenuItem
            fontSize='xs'
            onClick={() => handleSortChange(SortParams.ascPrice)}
          >
            Price &nbsp; <MdTrendingUp strokeWidth='1' />
          </MenuItem>
          <MenuItem
            fontSize='xs'
            onClick={() => handleSortChange(SortParams.dscPrice)}
          >
            Price &nbsp; <MdTrendingDown strokeWidth='1' />
          </MenuItem>
          <MenuItem
            fontSize='xs'
            onClick={() => handleSortChange(SortParams.ascRatingsAverage)}
          >
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
          onChange={(val) => setRatingsValue(val)}
          onChangeEnd={(val) => handleRatingsChangeEnd(val)}
          step={0.5}
          min={1}
          max={5}
          value={ratingsValue}
          // defaultValue={0}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb zIndex={0.1} />
        </Slider>
        <Text fontSize='xs'>{`${ratingsValue} - 5`}</Text>
      </VStack>
      <Divider orientation='horizontal' height='20px' />
      <Divider orientation='horizontal' height='20px' />
      <CheckboxGroup colorScheme='green'>
        <Text fontSize='xs' fontWeight='medium'>
          TRIP DIFFICULTY
        </Text>
        <VStack align='start' spacing={2} pt={1}>
          <Checkbox
            isChecked={difficulty ? difficulty.includes('difficult') : false}
            size='sm'
            fontWeight='normal'
            name='difficult'
            onChange={(e) => handleDifficulty(e)}
          >
            <Text fontSize='xs'>Difficult</Text>
          </Checkbox>

          <Checkbox
            isChecked={difficulty ? difficulty.includes('medium') : false}
            size='sm'
            name='medium'
            onChange={(e) => handleDifficulty(e)}
          >
            <Text fontSize='xs'>Meduim</Text>
          </Checkbox>
          <Checkbox
            isChecked={difficulty ? difficulty.includes('easy') : false}
            size='sm'
            name='easy'
            onChange={(e) => handleDifficulty(e)}
          >
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
        // type='submit'
        variant='solid'
        colorScheme='teal'
        width='full'
        onClick={handleClearAllFilterParams}
      >
        <FcClearFilters /> &nbsp; Clear
      </Button>
    </Flex>
  );
};

export default FilterTrips;
