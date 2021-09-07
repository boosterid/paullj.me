import { GrTag } from 'react-icons/gr';

export default {
  name: 'category',
  icon: GrTag,
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.max(25)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
