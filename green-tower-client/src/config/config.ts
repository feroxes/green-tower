export const Config = {
  // FIXME move to env
// + recursive load aws s3 cp ./images/ s3://green-tower-plants/ --recursive --cache-control "public, max-age=31536000, immutable"
// + add caching
  s3PlantsBucketBaseUri: 'https://green-tower-plants.s3.eu-north-1.amazonaws.com',
  s3AssetsBucketBaseUri: 'https://green-tower-assets.s3.eu-north-1.amazonaws.com',
  colors: {
    deepGreen: '#0e620b',
    lightGreen: '#60b252',
    brown: '#39383d',
    green: '#5ca52f',
    light: '#fff9ef',
    sand: '#fff7da',
    orange: '#f6825f',
  },
  commonBorderRadius: 3,
};
