import React, { useState } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import Logo from '../../assets/Logo1.png';
import Logo2 from '../../assets/V2.png';
import Logo3 from '../../assets/element2.png';
import Logo4 from '../../assets/grp.png';
import Logo5 from '../../assets/grp2.png';
import Logo6 from '../../assets/Vector.png';
// import Logo7 from '../../assets/vector2.png';

const LeftHead = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const options = [
    { icon: Logo3, label: 'All Communities' },
    { icon: Logo4, label: 'My Profile' },
    { icon: Logo5, label: 'About Us' },
    { icon: Logo6, label: 'Help Center' }
  ];
  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };
  return (
    <Box
      height={'100vh'}
      width={'17.5vw'}
      display={'flex'}
      flexDirection={'column'}
      backgroundColor={'#000000'}
      pl={2}>
      <Box display={'flex'} width={'100%'} gap={3} pt={5} alignItems={'center'}>
        <Image src={Logo} height={'40px'} width={'40px'} />
        <Text color="white" fontWeight={'600'} fontSize={'32px'} lineHeight={'normal'}>
          Parivaar
        </Text>
      </Box>
      <Box pt={'8px'} width={'100%'} display={'flex'}>
        <Text fontWeight={'500'} fontSize={'12px'} width={'100%'} style={{ whiteSpace: 'nowrap' }}>
          India First Local Community App
        </Text>
      </Box>
      <Box
        pt={'5px'}
        display={'flex'}
        flexDirection={'column'}
        stroke={'#EAEAEA'}
        alignItems={'flex-start'}
        ml={'-2px'}>
        <Image src={Logo2} width={'97%'} />
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        mt={5}
        gap={5}>
        {options.map((option, index) => (
          <Box
            key={index}
            pt={'20px'}
            display={'flex'}
            width={'90%'}
            alignItems={'center'}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            gap={2}
            onClick={() => handleOptionClick(index)}
            backgroundColor={selectedOption === index ? '#0777FF' : '#000000'}
            border={selectedOption === index && '1px solid #0777FF'}
            padding={3}
            borderRadius={'6px'}>
            <Image height="10px" width="10px" src={option.icon} />
            <Text fontSize={'17px'} fontWeight={'500'} lineHeight={'normal'} whiteSpace={'nowrap'}>
              {option.label}
            </Text>
          </Box>
        ))}
        <Box mt={380}>
          <Box
            pt={'5px'}
            display={'flex'}
            flexDirection={'column'}
            stroke={'#EAEAEA'}
            alignItems={'flex-start'}
            ml={'-2px'}>
            <Image src={Logo2} width={'97%'} />
          </Box>
        </Box>
        <Box display={'flex'} width={'90%'} justifyContent={'center'}>
          <Box
            pt={'20px'}
            display={'flex'}
            width={'90%'}
            alignItems={'center'}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            gap={2}>
            <Image height="10px" width="10px" src={Logo6} />
            <Text fontSize={'17px'} height={'22px'} fontWeight={'500'} lineHeight={'normal'}>
              Logo Out
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftHead;
