import { MdSettings } from 'react-icons/md'

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  icon: MdSettings,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.max(200)
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: Rule => Rule.regex(emailRegex).error("Must be a valid email!")
    },
    {
      name: 'githubUrl',
      type: 'url',
      title: 'GitHub URL'
    },
    {
      name: 'linkedInUrl',
      type: 'url',
      title: 'LinkedIn URL'
    },
    {
      name: 'cvFile',
      type: 'file',
      title: 'Curriculum Vitae File',
      options: {
        storeOriginalFilename: false,
        accept: '.pdf'
      }
    },
  ]
}
