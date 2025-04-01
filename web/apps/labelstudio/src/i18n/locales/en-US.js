export default {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    version: 'Label Studio Version',
    settings: 'Settings',
    create: 'Create',
    add: 'Add',
    learnMore: 'Learn More',
    saved: 'Saved!',
    proceed: 'Proceed',
    actionConfirmation: 'Action Confirmation',
    ok: 'OK'
  },
  home: {
    title: 'Home',
    welcome: 'Welcome to Label Studio',
    getStarted: 'Let\'s get started'
  },
  projects: {
    title: 'Projects',
    createProject: 'Create Project',
    projectList: 'Project List',
    noProjects: 'No projects yet',
    recentProjects: 'Recent Projects',
    viewAll: 'View All',
    createFirstProject: 'Create your first project',
    setupInstructions: 'Import data and set up the labeling interface to start labeling',
    progress: '{{finished}}/{{total}} tasks ({{percentage}}%)',
    emptyState: {
      title: 'Heidi doesn\'t see any projects!',
      description: 'Create a project and start labeling your data.',
      createButton: 'Create Project'
    },
    card: {
      newProject: 'New Project',
      settings: 'Settings',
      label: 'Label',
      total: '{{finished}} / {{total}}',
      completed: 'Completed',
      rejected: 'Skipped',
      predictions: 'Predictions',
      createdBy: 'Created by',
      createdAt: 'Created {{date}}'
    },
    pagination: {
      label: 'Projects'
    }
  },
  organization: {
    title: 'Organization',
    settings: 'Settings',
    members: 'Members',
    people: {
      title: 'People',
      addPeople: 'Add People',
      apiTokens: {
        title: 'API Token Settings',
        settings: 'API Token Settings',
        saved: 'API Token settings saved'
      },
      invitation: {
        title: 'Invite Members',
        description: 'Invite members to your Label Studio instance. Members you invite will have full access to all projects.',
        copyLink: 'Copy Invite Link',
        selectLink: 'Select Invite Link'
      }
    }
  },
  settings: {
    title: 'Settings',
    account: 'Account Settings',
    profile: 'Profile',
    general: {
      title: 'General Settings',
      projectName: 'Project Name',
      description: 'Description',
      workspace: {
        title: 'Workspace',
        placeholder: 'Select an option',
        description: 'Simplify project management by organizing projects into workspaces.'
      },
      color: 'Color',
      taskSampling: {
        title: 'Task Sampling',
        sequential: {
          label: 'Sequential',
          description: 'Tasks are ordered by task ID'
        },
        uniform: {
          label: 'Uniform',
          description: 'Tasks are selected randomly with uniform distribution'
        },
        uncertainty: {
          label: 'Uncertainty',
          description: 'Tasks are selected based on model uncertainty scores (active learning mode).'
        }
      }
    },
    dangerZone: {
      title: 'Danger Zone',
      description: 'Perform these actions at your own risk. Actions you take on this page can\'t be reverted. Make sure your data is backed up.',
      deleteAnnotations: 'Delete {{count}} Annotations',
      deleteTasks: 'Delete {{count}} Tasks',
      deletePredictions: 'Delete {{count}} Predictions',
      resetCache: {
        label: 'Reset Cache',
        help: 'Reset Cache may help in cases like if you are unable to modify the labeling configuration due to validation errors concerning existing labels, but you are confident that the labels don\'t exist. You can use this action to reset the cache and try again.'
      },
      dropTabs: {
        label: 'Drop All Tabs',
        help: 'If the Data Manager is not loading, dropping all Data Manager tabs can help.'
      },
      deleteProject: {
        label: 'Delete Project',
        help: 'Deleting a project removes all tasks, annotations, and project data from the database.',
        confirmation: 'You\'re about to delete all things. This action cannot be undone.'
      }
    },
    labeling: {
      title: 'Labeling Interface',
      description: 'Configure the labeling interface for your project. You can add and configure labeling tools, set up labeling rules, etc.',
      config: {
        title: 'Configuration',
        description: 'Use XML to configure the labeling interface.',
        save: 'Save Configuration',
        validate: 'Validate Configuration',
        reset: 'Reset Configuration'
      }
    },
    annotation: {
      title: 'Annotation Settings',
      instructions: {
        title: 'Labeling Instructions',
        description: 'Write instructions to help users complete labeling tasks.',
        details: 'The instruction field supports HTML markup and it allows use of images, iframes (pdf).',
        showBeforeLabeling: 'Show before labeling'
      },
      prelabeling: {
        title: 'Prelabeling',
        usePredictions: {
          label: 'Use predictions to prelabel tasks',
          description: 'Enable and select which set of predictions to use for prelabeling.'
        }
      }
    }
  },
  actions: {
    createProject: 'Create Project',
    invitePeople: 'Invite People'
  },
  resources: {
    title: 'Resources',
    description: 'Learn, explore, and get help'
  },
  dialog: {
    selectedMessage: 'Selected Message',
    destructiveAction: 'Destructive Action',
    confirmAction: 'Confirm Action',
    inputTitle: 'Input Title',
    input: 'Input Content',
    cancel: 'Cancel',
    confirm: 'Confirm',
    ok: 'OK'
  },
  createProject: {
    title: 'Create Project',
    projectName: 'Project Name',
    description: 'Description',
    workspace: {
      title: 'Workspace',
      placeholder: 'Select an option',
      description: 'Simplify project management by organizing projects into workspaces.',
      learnMore: 'Learn more'
    },
    steps: {
      name: 'Project Name',
      import: 'Data Import',
      config: 'Labeling Setup'
    },
    buttons: {
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      import: 'Import',
      saving: 'Saving...',
      importing: 'Importing...'
    },
    import: {
      title: 'Import Data',
      description: 'Import data into the project'
    },
    unsavedChanges: {
      title: 'You have unsaved changes',
      body: 'Would you like to save them before leaving?',
      save: 'Save and leave',
      discard: 'Discard and leave',
      cancel: 'Cancel'
    }
  }
}; 