import React from 'react';
import {Image} from 'antd';

import logo from '../assets/logo.svg';

const Logo = (param: Object) => {
  return (
    <Image alt="logo" src={logo}/>
  );
};

export default Logo;