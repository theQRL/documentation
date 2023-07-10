import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';

const ImageSwitcher = ({lightImageSrc, darkImageSrc}) => {
  const themeIs  = useColorMode().colorMode;
  var isDarkTheme = true
  if (themeIs === "light"){
    isDarkTheme = false;
  }
  console.log("ImageSwitcher" + ImageSwitcher)
  console.log("themeIs = " + themeIs)
  console.log("isDarkTheme = " + isDarkTheme)
  console.log(isDarkTheme ? darkImageSrc : lightImageSrc)
  console.log("lightImageSrc = " + lightImageSrc)
  console.log("darkImageSrc = " + darkImageSrc)
  return (<img src={isDarkTheme ? darkImageSrc : lightImageSrc} alt={isDarkTheme ? "darkImageSrc" : "lightImageSrc"} />)
   

   //if (isDarkTheme === "dark") {
     //return (<img src={darkImageSrc } alt="dark " />)
  //} else {
    
  //};
};


export default ImageSwitcher;