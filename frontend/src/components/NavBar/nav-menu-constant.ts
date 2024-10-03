interface MenuItem {
  title: string;
  to: string;
  description: string;
}

type MenuSectionWithItems = {
  title: string;
  items: MenuItem[];
};

type MenuSectionWithLink = {
  title: string;
  to: string;
};


interface NanMenuConstantType {
  service: MenuSectionWithItems;
  ecomm: MenuSectionWithItems;
  assessment: MenuSectionWithItems;
  media: MenuSectionWithItems;
  users: MenuSectionWithItems;
  questions: MenuSectionWithLink;
  events: MenuSectionWithLink;
  language: MenuSectionWithLink;
}

const NanMenuConstants: NanMenuConstantType = {
  service: {
    title: 'Services',
    items: [
      {
        title: 'Service Type',
        to: '/services/service-type',
        description: 'View, Add or Edit Service Types'
      },
      {
        title: 'Categories',
        to: '/categories',
        description: 'View, Add or Edit Categories Types'
      },
      {
        title: 'Service Providers',
        to: '/service-providers',
        description: 'Add and Search Service Providers'
      },
      {
        title: 'Service Requests',
        to: '/service-requests',
        description: 'List and respond to Service Requests'
      }
    ]
  },
  ecomm: {
    title: 'E-commerce',
    items: [
      {
        title: 'Dashboard',
        to: '/ecomm-dashboard',
        description: 'Dashboard for E-commerce'
      },
      {
        title: 'Coupons',
        to: '/coupons',
        description: 'View, Add or Edit Categories Types'
      },
      {
        title: 'Transactions',
        to: '/transactions',
        description: 'Check transactions status'
      },
      {
        title: 'Purchase Code',
        to: '/purchase-code',
        description: 'List and status of purchase codes'
      },
      {
        title: 'Plans',
        to: '/plans',
        description: 'View, Add or Edit Plans'
      },
      {
        title: 'Invoices',
        to: '/invoices',
        description: 'Generate and view invoices'
      }
    ]
  },
  assessment: {
    title: 'Assessment',
    items: [
      {
        title: 'Notification Master',
        to: '/notofication-master',
        description: 'Add filter and Edit Notification'
      },
      {
        title: 'Assessment Questions',
        to: '/assessment-questions',
        description: 'View, Add or Edit Assessment Questions'
      },
      {
        title: 'User Assessment List',
        to: '/user-assessment-list',
        description: 'View, Add or Edit User Assessment List'
      },
      {
        title: 'User PoolData List',
        to: '/user-pool-data-list',
        description: 'View, Add or Edit User PoolData List'
      },
      {
        title: 'Assessment Categories',
        to: '/assessment-categories',
        description: 'View, Add or Edit Assessment Categories'
      },
      {
        title: 'Assessment Sub-Categories',
        to: '/assessment-sub-categories',
        description: 'View, Add or Edit Assessment Sub-Categories'
      }
      
    ]
  },
  media: {
    title: 'Media', 
    items: [
      {
        title: 'Media List',
        to: '/media-list',
        description: 'View, Add or Edit Media List'
      },
      {
        title: 'Media Types',
        to: '/media-types',
        description: 'View, Add or Edit Media Types'
      }
    ]
  },
  users: {
    title: 'Users',
    items: [
      {
        title: 'Add Account',
        to: '/add-account',
        description: 'Add Parent and Child Account'
      },
      {
        title: 'Add Multiple Accounts',
        to: '/add-multiple-accounts',
        description: 'Add Multiple Accounts'
      },
      {
        title: 'User List',
        to: '/user-list',
        description: 'List of all users details'
      },
      {
        title: 'Service Providers',
        to: '/service-providers',
        description: 'List all service providers'
      }
    ]
  },
  questions: {
    title: 'Questions',
    to: '/questions',
  },
  events: {
    title: 'Events',
    to: '/events',
  },
  language: {
    title: 'Language',
    to: '/language',
  }
  

}

export default NanMenuConstants;