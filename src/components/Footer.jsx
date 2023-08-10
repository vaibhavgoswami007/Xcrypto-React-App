import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const footer = () => {
  return (
    <Box
      bgColor={'blackAlpha.900'}
      color={'whiteAlpha.700'}
      minH={'30'}
      px={'16'}
      py={[16, 8]}
    >
      <Stack
        direction={['column', 'row']}
        height={'full'}
        alignItems={'center'}
      >
        <VStack w={'full'} alignItems={['center', 'flex-start']}>
          <Text fontWeight={'bold'}>About Us</Text>
          <Text
            fontSize={'sm'}
            letterSpacing={'widest'}
            textAlign={['center', 'left']}
          >
            We are the best crypto trading app in India, we provide our guidance
            at a very cheap price.
          </Text>
        </VStack>
        <VStack>
          <Avatar boxSize={'20'} mt={['4', '0']} />
          <Text>Vaibhav</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default footer;
