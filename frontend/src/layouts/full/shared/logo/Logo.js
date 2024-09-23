import { Link } from 'react-router-dom';

import LogoImage from '../../../../assets/images/logos/logo.jpg';

import { styled } from '@mui/material';

import "./Logo.css"

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <div className="logo-image">
      <img src={LogoImage} alt="logo-image" />
    </div>
  );
};

export default Logo;
