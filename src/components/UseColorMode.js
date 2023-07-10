import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';

const ImageSwitcher = ({lightImageSrc, darkImageSrc}) => {
  const themeIs  = useColorMode().colorMode;
  var isDarkTheme = true
  if (themeIs === "light"){
    isDarkTheme = false;
  }
  return (<img src={isDarkTheme ? darkImageSrc : lightImageSrc} alt={isDarkTheme ? "darkImageSrc" : "lightImageSrc"} />)
};


export default ImageSwitcher;