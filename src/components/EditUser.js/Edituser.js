import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Input, FormLabel, FormControl, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import formImg from '../../assets/user.jpg';
import { LeftPanel } from '../ChakraDash/LeftHead';
import axios from 'axios';
import Logo3 from '../../assets/element2.png';
import Logo4 from '../../assets/grp.png';
import Logo5 from '../../assets/grp2.png';
import Logo6 from '../../assets/Vector.png';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Edituser = () => {
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const cid = location.state;
  console.log('community id is ', cid);
  const [formValues, setFormValues] = useState({
    firstName: null,
    lastName: null,
    dob: null,
    phoneNumber: null,
    bloodGroup: null,
    businessName: null,
    businessDescription: null,
    businessAddress: null,
    businessPhoneNumber: null,
    website: null
  });
  const EditRequest = () => {
    console.log('form value is', formValues);
  };

  const { phoneNumber } = useParams();
  console.log('phone Muber is ', phoneNumber);
  useEffect(() => {
    const userDetais = async () => {
      console.log('cid is', cid);
      console.log('phone Number is', phoneNumber);
      const response = await axios.post(`https://api.parivaarapp.in/community/members/${cid}`, {
        query: phoneNumber,
        filter: {},
        skip: 0,
        limit: 100
      });
      const userData = response.data.members.rows[0];
      console.log('user data is', userData);
      setFormValues({
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        dob: userData?.dob || 'null',
        phoneNumber: userData?.phone,
        bloodGroup: userData?.bloodGroup,
        businessName: userData?.business?.name || 'null',
        businessDescription: 'null',
        businessAddress: 'null',
        businessPhoneNumber: 'null',
        website: 'null'
      });
    };
    userDetais();
  }, []);

  const handleClick = () => {
    fileRef.current && fileRef.current.click();
  };
  const fileRef = React.useRef(null);

  const [previewImage, setPreviewImage] = useState(null);
  const handleImageChange = (e) => {
    setFormValues(null);
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setPreviewImage(selectedImage);
    }
  };

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
  };
  const [selectedOption, setSelectedOption] = useState(0);
  const options = [
    { icon: Logo3, label: 'AllCommunities' },
    { icon: Logo4, label: 'MyProfile' },
    { icon: Logo5, label: 'AboutUs' },
    { icon: Logo6, label: 'HelpCenter' }
  ];
  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };
  return (
    <>
      <LeftPanel
        options={options}
        handleOptionClick={handleOptionClick}
        selectedOption={selectedOption}
      />
      <Box
        position={'absolute'}
        width={'84.45%'}
        display={'flex'}
        justifyContent={'center'}
        height={'100vh'}
        flexDirection={'column'}
        alignItems={'center'}
        right={0}
        backgroundColor={'#FBFBFB'}>
        <Box
          backgroundColor={'black'}
          width={'84.5%'}
          height={'4.5vh'}
          position={'fixed'}
          top={0}
          zIndex={50}
        />

        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingInline: '2rem',
            width: '100%',
            marginTop: '4rem'
          }}>
          <Box>
            <Text style={{ fontSize: '1.25rem', fontWeight: '600', fontFamily: 'Clash Display' }}>
              Tapasvi Arora
            </Text>
          </Box>

          {isEdit ? (
            <>
              <Box style={{ display: 'flex', gap: '1rem' }}>
                <Button
                  style={{
                    borderRadius: '1.125rem',
                    border: '1px solid #0777FF',
                    fontFamily: 'Clash Display',
                    fontSize: '0.75rem',
                    padding: '0.5rem',
                    paddingInline: '1rem',
                    color: '#0777FF',
                    backgroundColor: 'white',
                    fontWeight: '600',
                    letterSpacing: '0.0075rem'
                  }}
                  onClick={() => {
                    setIsEdit(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  style={{
                    borderRadius: '1.125rem',
                    border: '1px solid #0777FF',
                    backgroundColor: '#0777FF',
                    fontFamily: 'Clash Display',
                    fontSize: '0.75rem',
                    color: '#FFF',
                    fontWeight: '600',
                    letterSpacing: '0.0075rem'
                  }}
                  onClick={EditRequest}>
                  Save Changes
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box style={{ display: 'flex', gap: '1rem' }}>
                <Button
                  style={{
                    borderRadius: '1.125rem',
                    border: '1px solid #0777FF',
                    fontFamily: 'Clash Display',
                    fontSize: '0.75rem',
                    padding: '0.375rem',
                    color: '#0777FF',
                    backgroundColor: 'white',
                    fontWeight: '600',
                    letterSpacing: '0.0075rem'
                  }}
                  onClick={() => {
                    setIsEdit(true);
                  }}>
                  Edit Information
                </Button>
                <Button
                  style={{
                    borderRadius: '1.125rem',
                    border: '1px solid #FF1A1A',
                    backgroundColor: 'white',
                    fontFamily: 'Clash Display',
                    fontSize: '0.75rem',
                    color: '#FF1A1A',
                    fontWeight: '600',
                    letterSpacing: '0.0075rem'
                  }}>
                  Remove Admin Acess
                </Button>
              </Box>
            </>
          )}
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={3}
          backgroundColor={'white'}
          marginBottom={'5rem'}
          marginTop={'1rem'}
          width={'95%'}
          height={'100%'}
          overflowY="auto"
          pt={0}
          border={'1px solid #EAEAEA'}
          borderRadius={'0.625rem'}
          padding={'1rem'}>
          <Box>
            <Text color={'black'} fontWeight={'600'} fontSize={'20px'} fontFamily={'Clash Display'}>
              Personal Information
            </Text>
          </Box>
          <Box width={'300px'} position={'relative'} onClick={handleClick}>
            <FormLabel textAlign={'left'} fontSize={'18px'}>
              Logo
            </FormLabel>
            <Image
              borderRadius="full"
              textAlign={'left'}
              boxSize={200}
              src={previewImage ? previewImage : formImg}
            />
            <Input
              type="file"
              accept="image/*"
              display={'none'}
              ref={fileRef}
              onChange={handleImageChange}
            />
            <Box
              position={'absolute'}
              right={'140px'}
              backgroundColor={'#0777FF'}
              opacity={'0.9'}
              color={'white'}
              width={'25px'}
              height={'25px'}
              borderRadius={'full'}
              top={'170px'}>
              <AddIcon position={'absolute'} right={1} top={1} />
            </Box>
          </Box>
          <Box display={'flex'} gap={'40rem'} alignItems={'flex-start'}>
            <Box
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              flexDirection={'column'}>
              <FormControl>
                <FormLabel fontSize={'18px'} color={'black'}>
                  First Name
                </FormLabel>
                <Input
                  fontSize={'1rem'}
                  fontFamily={'Clash Display'}
                  fontWeight={'500'}
                  borderRadius={'0.375rem'}
                  backgroundColor={isEdit ? '#F2F2F2' : '#FFF'}
                  p={isEdit ? '0.875rem 5rem 0.875rem 1.25rem' : '0'}
                  readOnly={isEdit ? null : true}
                  value={formValues.firstName}
                  onChange={isEdit ? (e) => handleInputChange('firstName', e.target.value) : null}
                  border={'none'}
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <FormLabel fontSize={'18px'} color={'black'}>
                  Last Name
                </FormLabel>
                <Input
                  fontSize={'1rem'}
                  fontFamily={'Clash Display'}
                  fontWeight={'500'}
                  p={isEdit ? '0.875rem 5rem 0.875rem 1.25rem' : '0'}
                  readOnly={isEdit ? null : true}
                  borderRadius={'0.375rem'}
                  backgroundColor={isEdit ? '#F2F2F2' : '#FFFFFF'}
                  value={formValues.lastName}
                  onChange={isEdit ? (e) => handleInputChange('lastName', e.target.value) : null}
                  border={'none'}
                />
              </FormControl>
            </Box>
          </Box>

          <Box display={'flex'} gap={'40rem'} alignItems={'flex-start'}>
            <Box>
              <FormControl>
                <FormLabel fontSize={'18px'} color={'black'}>
                  Date of Birth
                </FormLabel>
                <Input
                  fontSize={'1rem'}
                  fontFamily={'Clash Display'}
                  fontWeight={'500'}
                  p={isEdit ? '0.875rem 5rem 0.875rem 1.25rem' : '0'}
                  readOnly={isEdit ? null : true}
                  borderRadius={'0.375rem'}
                  backgroundColor={isEdit ? '#F2F2F2' : '#FFFFFF'}
                  value={formValues.dob}
                  onChange={isEdit ? (e) => handleInputChange('dob', e.target.value) : null}
                  border={'none'}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontSize={'18px'} color={'black'}>
                  Phone Number
                </FormLabel>
                <Input
                  fontSize={'1rem'}
                  fontFamily={'Clash Display'}
                  fontWeight={'500'}
                  p={isEdit ? '0.875rem 5rem 0.875rem 1.25rem' : '0'}
                  readOnly={isEdit ? null : true}
                  borderRadius={'0.375rem'}
                  backgroundColor={isEdit ? '#F2F2F2' : '#FFFFFF'}
                  value={formValues.phoneNumber}
                  onChange={isEdit ? (e) => handleInputChange('phoneNumber', e.target.value) : null}
                  border={'none'}
                />
              </FormControl>
            </Box>
          </Box>

          <Box display={'flex'} gap={'40rem'} alignItems={'flex-start'}>
            <Box>
              <FormControl>
                <FormLabel fontSize={'18px'} color={'black'}>
                  Blood Group
                </FormLabel>
                <Input
                  fontSize={'1rem'}
                  fontFamily={'Clash Display'}
                  fontWeight={'500'}
                  p={isEdit ? '0.875rem 5rem 0.875rem 1.25rem' : '0'}
                  readOnly={isEdit ? null : true}
                  borderRadius={'0.375rem'}
                  backgroundColor={isEdit ? '#F2F2F2' : '#FFFFFF'}
                  value={formValues.bloodGroup || 'null'}
                  onChange={isEdit ? (e) => handleInputChange('bloodGroup', e.target.value) : null}
                  border={'none'}
                />
              </FormControl>
            </Box>
          </Box>
          <Box
            width={'99.5%'}
            pl={0}
            m={0}
            height="1px"
            margin={'auto'}
            backgroundColor={'#EAEAEA'}>
            {' '}
          </Box>

          <Box pt={5}>
            <Text color={'black'} fontWeight={'600'} fontSize={'1rem'} fontFamily={'Clash Display'}>
              Business Information
            </Text>
          </Box>
          <Box display={'flex'} gap={'40rem'} alignItems={'flex-start'}>
            <Box>
              <FormControl>
                <FormLabel fontSize={'18px'} color={'black'}>
                  Name
                </FormLabel>
                <Input
                  fontSize={'1rem'}
                  fontFamily={'Clash Display'}
                  fontWeight={'500'}
                  p={isEdit ? '0.875rem 5rem 0.875rem 1.25rem' : '0'}
                  readOnly={isEdit ? null : true}
                  borderRadius={'0.375rem'}
                  backgroundColor={isEdit ? '#F2F2F2' : '#FFFFFF'}
                  value={formValues.businessName}
                  onChange={
                    isEdit ? (e) => handleInputChange('businessName', e.target.value) : null
                  }
                  border={'none'}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontSize={'18px'} color={'black'}>
                  Description
                </FormLabel>
                <Input
                  fontSize={'1rem'}
                  fontFamily={'Clash Display'}
                  fontWeight={'500'}
                  p={isEdit ? '0.875rem 5rem 0.875rem 1.25rem' : '0'}
                  readOnly={isEdit ? null : true}
                  borderRadius={'0.375rem'}
                  backgroundColor={isEdit ? '#F2F2F2' : '#FFFFFF'}
                  value={formValues.businessDescription}
                  onChange={(e) =>
                    isEdit ? handleInputChange('businessDescription', e.target.value) : null
                  }
                  border={'none'}
                />
              </FormControl>
            </Box>
          </Box>
          <Box display={'flex'} gap={'40rem'} alignItems={'flex-start'}>
            <Box>
              <FormControl>
                <FormLabel fontSize={'18px'} color={'black'}>
                  Address
                </FormLabel>
                <Input
                  fontSize={'1rem'}
                  fontFamily={'Clash Display'}
                  fontWeight={'500'}
                  p={isEdit ? '0.875rem 5rem 0.875rem 1.25rem' : '0'}
                  readOnly={isEdit ? null : true}
                  borderRadius={'0.375rem'}
                  backgroundColor={isEdit ? '#F2F2F2' : '#FFFFFF'}
                  value={formValues.businessAddress}
                  onChange={(e) =>
                    isEdit ? handleInputChange('businessAddress', e.target.value) : null
                  }
                  border={'none'}
                />
              </FormControl>
            </Box>
            <Box>
              <FormLabel color={'black'}>Phone Number</FormLabel>
              <Input
                textAlign={'start'}
                fontSize={'1rem'}
                fontFamily={'Clash Display'}
                fontWeight={'500'}
                p={isEdit ? '0.875rem 5rem 0.875rem 1.25rem' : '0'}
                readOnly={isEdit ? null : true}
                borderRadius={'0.375rem'}
                onChange={
                  isEdit ? (e) => handleInputChange('businessPhoneNumber', e.target.value) : null
                }
                backgroundColor={isEdit ? '#F2F2F2' : '#FFFFFF'}
                border={'none'}
                value={formValues.businessPhoneNumber}
              />
            </Box>
          </Box>
          <Box display={'flex'} gap={'40rem'} alignItems={'flex-start'}>
            <Box>
              <FormLabel color={'black'}>Web Site</FormLabel>
              <Input
                textAlign={'start'}
                p={isEdit ? '0.875rem 5rem 0.875rem 1.25rem' : '0'}
                readOnly={isEdit ? null : true}
                borderRadius={'0.375rem'}
                backgroundColor={isEdit ? '#F2F2F2' : '#FFFFFF'}
                fontSize={'1rem'}
                fontFamily={'Clash Display'}
                fontWeight={'500'}
                border={'none'}
                value={formValues.website}
                onChange={isEdit ? (e) => handleInputChange('website', e.target.value) : null}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Edituser;
