import { BsImage } from 'react-icons/bs';

export default {
  name: 'figure',
  type: 'object',
  title: 'Figure',
  icon: BsImage,
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
        metadata: ['lqip'],
      },
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured'
    }
  ],
};
