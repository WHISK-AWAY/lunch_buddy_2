export default function getWebpUrl(imageUrl, filenameAppend = '-q1.webp') {
  if (typeof imageUrl !== 'string' && !imageUrl.length)
    throw new Error(
      'provided image url is not of the correct type (must be a filename string)'
    );

  // do not convert if we're using the default avatar image
  if (imageUrl.includes('defaultAvatar.svg')) return imageUrl;

  // not ready to process anything aside from premade webps yet - pass back anything else without altering
  // filenames are like M4.jpg, F25,jpg)
  if (imageUrl.match(/[FM]\d+\.jpg$/)) {
    const basename = imageUrl.split('.').at(0);
    return basename + filenameAppend;
  } else {
    return imageUrl;
  }
}
