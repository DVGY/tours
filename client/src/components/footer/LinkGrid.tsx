import {
  Box,
  Link,
  SimpleGrid,
  SimpleGridProps,
  Stack,
} from '@chakra-ui/react';
import * as React from 'react';
import { FooterHeading } from './FooterHeading';

export const LinkGrid: React.FC<SimpleGridProps> = (props) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW='130px'>
      <FooterHeading mb='4'>Product</FooterHeading>
      <Stack>
        <Link>Trip Planner</Link>
        <Link>Hotels</Link>
        <Link>Flights</Link>
      </Stack>
    </Box>
    <Box minW='130px'>
      <FooterHeading mb='4'>Legal</FooterHeading>
      <Stack>
        <Link>Privacy</Link>
        <Link>Terms</Link>
        <Link>License</Link>
      </Stack>
    </Box>
    <Box minW='130px'>
      <FooterHeading mb='4'>Support</FooterHeading>
      <Stack>
        <Link>Our Covid 19 Response</Link>
        <Link>Help Centre</Link>
        <Link>Cancelletion Options</Link>
      </Stack>
    </Box>
  </SimpleGrid>
);
