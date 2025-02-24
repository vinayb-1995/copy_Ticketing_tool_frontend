import React from 'react';
import { Avatar } from '@chakra-ui/react';

const CustomAvatar = React.forwardRef(({ username, bgcolor }, ref) => (
  <div ref={ref}>
    <Avatar
      name={username}
      bg={bgcolor}
      color="white"
      className='me-4 avatar'
    />
  </div>
));

export default CustomAvatar;
