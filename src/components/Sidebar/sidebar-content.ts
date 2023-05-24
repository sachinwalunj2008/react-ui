const sidebarContent = [
  {
    page: 'Introduction',
    link: '/',
    icon: 'home',
    pageTitle: 'Design System',
  },
  {
    page: 'Colors',
    link: '/colors',
    icon: 'droplet',
    pageTitle: 'Colors',
  },
  {
    page: 'Typography',
    link: '/typography',
    icon: 'tumblr',
    pageTitle: 'Typography',
  },
  {
    page: 'Text',
    link: '/text',
    icon: 'openedBook',
    pageTitle: 'Text',
  },
  {
    page: 'Grid & Space',
    link: '/grid',
    icon: 'monitor',
    pageTitle: 'Grid & Space',
  },
  {
    page: 'Tables',
    link: '/tables',
    icon: 'list',
    pageTitle: 'Tables',
  },
  {
    page: 'Forms',
    link: '/forms',
    icon: 'note',
    pageTitle: 'Forms',
  },
  {
    page: 'Buttons',
    link: '/buttons',
    icon: 'cursor',
    pageTitle: 'Buttons',
    nestedRoutes: [
      {
        link: '/buttons/nested-route',
        pageTitle: 'Buttons Nested Route',
      },
    ],
  },
  {
    page: 'Icons',
    link: '/icons',
    icon: 'info',
    pageTitle: 'Icons',
  },
  {
    page: 'Components A-K',
    link: '/components-a-k',
    icon: 'barChart',
    pageTitle: 'Components',
  },
  {
    page: 'Components L-Z',
    link: '/components-l-z',
    icon: 'barChart',
    pageTitle: 'Components',
  },
  {
    page: 'Alerts',
    link: '/alerts',
    icon: 'bell',
    pageTitle: 'Alerts',
  },
  {
    page: 'Layouts',
    link: '/layouts',
    icon: 'gridIcon',
    pageTitle: 'Layouts',
  },
]

export default sidebarContent
