import imageUrlBuilder from '@sanity/image-url';

import { sanity } from '$lib/sanity';

const builder = imageUrlBuilder(sanity);
const urlFor = source => builder.image(source);

type SanityImage = {
  // FIXME: Maybe GROQ codegen will help this?
  //        https://github.com/ricokahler/sanity-codegen/issues/5
  asset: Record<string, any>,
  crop?: Sanity.ImageCrop,
  hotspot?: Sanity.ImageHotspot
};

// Code taken from here: https://www.apostrof.co/blog/svelte-sanity-responsive-lazy-loaded-jank-free-images/
export const generateImage = ({ asset, crop, hotspot }: SanityImage) => {

  let aspectRatio = !crop ?
    asset.metadata.dimensions.aspectRatio :
    getCropFactor(crop) * asset.metadata.dimensions.aspectRatio;

  // LQIP
  const placeholder = asset.metadata.lqip;

  // src
  const src = urlFor(asset).url();

  // Change these widths as you need
  const widthsPreset = [640, 768, 1024, 1366, 1600, 1920, 2560];

  const srcset = widthsPreset
    // Make srcset url for each of the above widths
    .map(w => urlFor(asset).width(w).url() + ' ' + w + 'w')
    .join(',');

  // Return the object shape required by Image.svelte (minus a couple)
  const test: ImageProps ={
    aspectRatio,
    placeholder,
    src,
    srcset,
    alt: 'test'
  };
  // FIXME: MAKE this TS and actually useful
  return test;
};

const getCropFactor = ({ top, bottom, left, right }) => {
  const xFactor = 1 - (left + right);
  const yFactor = 1 - (top + bottom);

  return xFactor / yFactor;
};
