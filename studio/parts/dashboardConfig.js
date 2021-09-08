export default {
  widgets: [
    {
      name: 'project-info',
    },
    {
      name: 'project-users',
    },
    {
      name: 'netlify',
      options: {
        title: 'Deploys',
        sites: [
          {
            title: 'Production',
            apiId: '1ae2ef23-2d0b-4a5a-8e7e-989003ea4ef8',
            buildHookId: '6127ac07612b88078905d178',
            url: 'https://paullj.me',
          },
        ],
      }
    }
  ]
}
