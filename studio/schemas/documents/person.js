import { BiUser } from 'react-icons/bi';

export default {
  name: 'person',
  title: 'Person',
  icon: BiUser,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
        crop: true
      },
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};
