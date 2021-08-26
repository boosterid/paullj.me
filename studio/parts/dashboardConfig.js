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
            apiId: 'b9b6bc30-fe5b-4e0e-bce3-b16f99d7943a',
            buildHookId: '6126bb066f59b23f49d9f3e7',
          },
        ],
      }
    }
  ]
}
