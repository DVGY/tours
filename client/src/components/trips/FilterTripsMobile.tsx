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
  Box,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  CloseButton,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { FcClearFilters } from 'react-icons/fc';

import { PAGE_RESULTS_LIMIT } from '../../pages/trips/TripsShow';
import {
  addOrRemoveSortParams,
  addDifficultyParams,
  removeDifficultyParams,
} from '../../utils/helperFunctions';
import { IFilterTripsProps, SortParams } from './FilterTrips';
import { Dispatcher } from '../../types/commonTypes';

interface IFilterMobileProps extends IFilterTripsProps {
  toggleDrawerState: boolean;
  stateSetterToggleDrawer: Dispatcher<boolean>;
}

const FilterTripsMobile: FC<IFilterMobileProps> = ({
  queryParams,
  stateSetterQueryParams,
  toggleDrawerState,
  stateSetterToggleDrawer,
}) => {
  const { sort, difficulty, ratingsAverage } = queryParams;
  const btnRef = React.useRef(null);
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

  const handleToggleDrawer = () => {
    // onClose();
    stateSetterToggleDrawer(!toggleDrawerState);
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
    <Box
      minWidth='100%'
      maxHeight='100px'
      alignSelf='flex-start'
      position='fixed'
      bottom={0}
      left={0}
      zIndex='popover'
      display={['inherit', 'inherit', 'inherit', 'none', 'none', 'none']}
    >
      <Button
        borderRadius={0}
        ref={btnRef}
        colorScheme='teal'
        height='70px'
        onClick={handleToggleDrawer}
        variant='solid'
        width='full'
      >
        <Text fontSize='md' letterSpacing={0.7}>
          FILTERS
        </Text>
      </Button>
      <Box
        position='fixed'
        zIndex='popover'
        top='0'
        right='0'
        bottom='0'
        width={['100%', '70%']}
        display={toggleDrawerState ? 'inherit' : 'none'}
        backgroundColor='white'
      >
        <Flex
          bg='white'
          flexDirection='column'
          px={4}
          py={4}
          minWidth='100%'
          alignSelf='flex-start'
        >
          <CloseButton alignSelf='flex-end' onClick={handleToggleDrawer} />
          <Divider orientation='horizontal' height='20px' />

          <Menu>
            <MenuButton
              as={Button}
              size='xs'
              rightIcon={<ChevronDownIcon />}
              fontSize='lg'
              textAlign='start'
              fontWeight='medium'
            >
              SORT
            </MenuButton>
            <MenuList>
              <MenuItem
                fontSize='lg'
                onClick={() => handleSortChange(SortParams.newest)}
                bg={sort?.includes(SortParams.newest) ? 'teal.300' : 'inherit'}
                _focus={{
                  bg: sort?.includes(SortParams.newest)
                    ? 'teal.300'
                    : 'inherit',
                }}
                _hover={{
                  bg: sort?.includes(SortParams.newest)
                    ? 'teal.300'
                    : 'inherit',
                }}
              >
                Newest &nbsp;
              </MenuItem>
              <MenuItem
                fontSize='lg'
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
                fontSize='lg'
                onClick={() => handleSortChange(SortParams.dscPrice)}
                bg={
                  sort?.includes(SortParams.dscPrice) ? 'teal.300' : 'inherit'
                }
                _hover={{
                  bg: sort?.includes(SortParams.dscPrice)
                    ? 'teal.300'
                    : 'inherit',
                }}
              >
                Price &nbsp; <MdTrendingDown strokeWidth='1' />
              </MenuItem>
              <MenuItem
                fontSize='lg'
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
            <Text fontSize='lg' fontWeight='medium'>
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
            <Text fontSize='lg'>{`${ratingsValue} - 5`}</Text>
          </VStack>
          <Divider orientation='horizontal' height='20px' />
          <CheckboxGroup colorScheme='green' defaultValue={[]}>
            <Text fontSize='lg' fontWeight='medium'>
              TRIP DIFFICULTY
            </Text>
            <VStack align='start' spacing={2} pt={1}>
              <Checkbox
                isChecked={
                  difficulty ? difficulty.includes('difficult') : false
                }
                size='lg'
                fontWeight='normal'
                name='difficult'
                onChange={(e) => handleDifficulty(e)}
              >
                <Text fontSize='lg'>Difficult</Text>
              </Checkbox>
              <Checkbox
                isChecked={difficulty ? difficulty.includes('medium') : false}
                size='lg'
                name='medium'
                onChange={(e) => handleDifficulty(e)}
              >
                <Text fontSize='lg'>Meduim</Text>
              </Checkbox>
              <Checkbox
                isChecked={difficulty ? difficulty.includes('easy') : false}
                size='lg'
                name='easy'
                onChange={(e) => handleDifficulty(e)}
              >
                <Text fontSize='lg'>Easy</Text>
              </Checkbox>
            </VStack>
          </CheckboxGroup>
          <Divider orientation='horizontal' height='20px' />

          {/* <Button
            borderRadius={0}
            type='submit'
            variant='solid'
            colorScheme='teal'
            width='full'
          >
            <FcFilledFilter /> &nbsp; Apply
          </Button>

          <Divider orientation='horizontal' height='20px' /> */}

          <Text fontSize='lg' fontWeight='medium'>
            FILTERS
          </Text>
          <Flex maxWidth='250px' flexWrap='wrap' pt={1}>
            {sort?.split(',').map((sortValue, index) => {
              const tagData = queryParamsKeyIconMap.filter(
                ({ paramsKey }) => sortValue === paramsKey
              );
              const tagText = tagData[0].text;
              const TagIcon = tagData[0].IconComponent;
              return (
                <Tag mr={0.5} size='md' key={index}>
                  {tagText} &nbsp; {TagIcon}
                </Tag>
              );
            })}
          </Flex>

          <Divider orientation='horizontal' height='20px' />
          <Button
            borderRadius={0}
            type='submit'
            variant='solid'
            colorScheme='teal'
            width='full'
            onClick={handleClearAllFilterParams}
          >
            <FcClearFilters /> &nbsp; Clear
          </Button>

          <Divider orientation='horizontal' height='20px' />

          <Button
            alignSelf='flex-end'
            variant='outline'
            mt='4'
            onClick={handleToggleDrawer}
          >
            Cancel
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default FilterTripsMobile;
