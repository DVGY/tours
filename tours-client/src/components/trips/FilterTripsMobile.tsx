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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { FcClearFilters, FcFilledFilter } from 'react-icons/fc';

const FilterTripsMobile: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <Box
      minWidth='100%'
      maxHeight='100px'
      alignSelf='flex-start'
      position='fixed'
      bottom={0}
      left={0}
      zIndex={2}
      pb={1}
      display={['inherit', 'inherit', 'inherit', 'none', 'none', 'none']}
    >
      <Button
        borderRadius={0}
        ref={btnRef}
        colorScheme='teal'
        height='100px'
        onClick={onOpen}
        variant='solid'
        width='full'
      >
        <Text fontSize='md' letterSpacing={0.7}>
          FILTERS
        </Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader> </DrawerHeader>
          <Divider pt={2}></Divider>

          <DrawerBody>
            <Flex
              bg='white'
              flexDirection='column'
              // px={4}
              // py={4}
              // minWidth='100%'
              // maxHeight='100px'
              // alignSelf='flex-start'
              // position='fixed'
              // bottom={0}
              // zIndex={2}
              display={[
                'inherit',
                'inherit',
                'inherit',
                'none',
                'none',
                'none',
              ]}
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
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default FilterTripsMobile;
