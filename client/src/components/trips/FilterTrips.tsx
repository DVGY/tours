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
import { FcClearFilters } from 'react-icons/fc';

import {
  ITripsQueryParams,
  PAGE_RESULTS_LIMIT,
} from '../../pages/trips/TripsShow';
import {
  addOrRemoveSortParams,
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

export interface IFilterTripsProps {
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
    const sortParams = addOrRemoveSortParams(sortValue, sort);
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
      limit: PAGE_RESULTS_LIMIT,
    });
  };

  const queryParamsKeyIconMap = [
    {
      id: 1,
      paramsKey: SortParams.newest,
      text: 'Newest',
      IconComponent: null,
    },
    {
      id: 2,
      paramsKey: SortParams.ascPrice,
      text: 'Price',
      IconComponent: <MdTrendingUp strokeWidth='1' />,
    },
    {
      id: 3,
      paramsKey: SortParams.dscPrice,
      text: 'Price',
      IconComponent: <MdTrendingDown strokeWidth='1' />,
    },
    {
      id: 4,
      paramsKey: SortParams.ascRatingsAverage,
      text: 'Ratings',
      IconComponent: <MdTrendingUp strokeWidth='1' />,
    },
  ];
  return (
    <Flex
      bg='white'
      flexDirection='column'
      px={[4, 4, 4, 6, 6, 6]}
      py={[4, 4, 4, 6, 6, 6]}
      minWidth={{ lg: '200px', xl: '200px', '2xl': '250px' }}
      alignSelf='flex-start'
      top={{ md: 28 }}
      position='sticky'
      display={['none', 'none', 'none', 'inherit', 'inherit', 'inherit']}
    >
      <Menu>
        <MenuButton
          as={Button}
          size='xs'
          rightIcon={<ChevronDownIcon />}
          fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
          textAlign='start'
          fontWeight='medium'
        >
          SORT
        </MenuButton>
        <MenuList>
          <MenuItem
            fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
            onClick={() => handleSortChange(SortParams.newest)}
            bg={sort?.includes(SortParams.newest) ? 'teal.300' : 'inherit'}
            _focus={{
              bg: sort?.includes(SortParams.newest) ? 'teal.300' : 'inherit',
            }}
            _hover={{
              bg: sort?.includes(SortParams.newest) ? 'teal.300' : 'inherit',
            }}
          >
            Newest &nbsp;
          </MenuItem>
          <MenuItem
            fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
            onClick={() => handleSortChange(SortParams.ascPrice)}
            bg={
              sort?.includes(SortParams.ascPrice) &&
              !sort?.includes(SortParams.dscPrice)
                ? 'teal.300'
                : 'inherit'
            }
            _hover={{
              bg:
                sort?.includes(SortParams.ascPrice) &&
                !sort?.includes(SortParams.dscPrice)
                  ? 'teal.300'
                  : 'inherit',
            }}
          >
            Price &nbsp; <MdTrendingUp strokeWidth='1' />
          </MenuItem>
          <MenuItem
            fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
            onClick={() => handleSortChange(SortParams.dscPrice)}
            bg={sort?.includes(SortParams.dscPrice) ? 'teal.300' : 'inherit'}
            _hover={{
              bg: sort?.includes(SortParams.dscPrice) ? 'teal.300' : 'inherit',
            }}
          >
            Price &nbsp; <MdTrendingDown strokeWidth='1' />
          </MenuItem>
          <MenuItem
            fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
            onClick={() => handleSortChange(SortParams.ascRatingsAverage)}
            bg={
              sort?.includes(SortParams.ascRatingsAverage)
                ? 'teal.300'
                : 'inherit'
            }
            _hover={{
              bg: sort?.includes(SortParams.ascRatingsAverage)
                ? 'teal.300'
                : 'inherit',
            }}
          >
            Rating &nbsp; <MdTrendingUp strokeWidth='1' />
          </MenuItem>
        </MenuList>
      </Menu>
      <Divider orientation='horizontal' height='20px' />
      <VStack align='start' spacing={2} pt={1}>
        <Text
          fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
          fontWeight='medium'
        >
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
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb zIndex={0.1} />
        </Slider>
        <Text
          fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
        >{`${ratingsValue} - 5`}</Text>
      </VStack>
      <Divider orientation='horizontal' height='20px' />
      <CheckboxGroup colorScheme='green'>
        <Text
          fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
          fontWeight='medium'
        >
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
            <Text fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}>
              Difficult
            </Text>
          </Checkbox>

          <Checkbox
            isChecked={difficulty ? difficulty.includes('medium') : false}
            size='sm'
            name='medium'
            onChange={(e) => handleDifficulty(e)}
          >
            <Text fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}>Meduim</Text>
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
      {/* 
      <Button
        borderRadius={0}
        type='submit'
        variant='solid'
        colorScheme='teal'
        width='full'
        // onClickC={}
      >
        <FcFilledFilter /> &nbsp; Apply
      </Button> */}
      {/* <Divider orientation='horizontal' height='20px' /> */}
      <Text fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']} fontWeight='medium'>
        Filters
      </Text>
      <Flex maxWidth='160px' flexWrap='wrap' pt={1}>
        {sort?.split(',').map((sortValue, index) => {
          const tagData = queryParamsKeyIconMap.filter(
            ({ paramsKey }) => sortValue === paramsKey
          );
          const tagText = tagData[0].text;
          const TagIcon = tagData[0].IconComponent;
          return (
            <Tag mr={0.5} size='sm' key={index}>
              {tagText} &nbsp; {TagIcon}
            </Tag>
          );
        })}
      </Flex>
      <Divider orientation='horizontal' height='20px' />
      <Button
        borderRadius={0}
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
