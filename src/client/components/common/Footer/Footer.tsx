import React from 'react';
import FooterPage from './FooterPage';
import pkg from '../../../../../package.json';

const Footer = () => {
    return <FooterPage version={pkg.version} license={pkg.license} />;
};

export default Footer;
