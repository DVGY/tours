import React, { FC } from 'react';
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
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { FcClearFilters, FcFilledFilter } from 'react-icons/fc';

const FilterTrips: FC = () => {
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
