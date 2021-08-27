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
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
