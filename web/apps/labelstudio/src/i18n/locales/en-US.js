export default {
  common: {
    loading: '加载中...',
    error: '错误',
    success: '成功',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    back: '返回',
    version: '标注平台版本',
    settings: '设置',
    create: '创建',
    add: '添加',
    learnMore: '了解更多',
    saved: '已保存！',
    proceed: '继续',
    actionConfirmation: '操作确认',
    ok: '确定'
  },
  home: {
    title: '首页',
    welcome: '欢迎使用标注平台',
    getStarted: '开始使用'
  },
  projects: {
    title: '项目',
    createProject: '创建项目',
    projectList: '项目列表',
    noProjects: '暂无项目',
    recentProjects: '最近项目',
    viewAll: '查看全部',
    createFirstProject: '创建您的第一个项目',
    setupInstructions: '导入数据并设置标注界面以开始标注',
    progress: '{{finished}}/{{total}} 任务 ({{percentage}}%)',
    emptyState: {
      title: '暂无项目！',
      description: '创建一个项目并开始标注您的数据。',
      createButton: '创建项目'
    },
    card: {
      newProject: '新项目',
      settings: '设置',
      label: '标注',
      total: '{{finished}} / {{total}}',
      completed: '已完成',
      rejected: '已跳过',
      predictions: '预测',
      createdBy: '创建者',
      createdAt: '创建于 {{date}}'
    },
    pagination: {
      label: '项目'
    }
  },
  organization: {
    title: '组织',
    settings: '设置',
    members: '成员',
    people: {
      title: '人员',
      addPeople: '添加人员',
      apiTokens: {
        title: 'API 令牌设置',
        settings: 'API 令牌设置',
        saved: 'API 令牌设置已保存'
      },
      invitation: {
        title: '邀请成员',
        description: '邀请成员加入您的标注平台实例。被邀请的成员将拥有所有项目的完全访问权限。',
        copyLink: '复制邀请链接',
        selectLink: '选择邀请链接'
      }
    }
  },
  settings: {
    title: '设置',
    account: '账户设置',
    profile: '个人资料',
    general: {
      title: '常规设置',
      projectName: '项目名称',
      description: '描述',
      workspace: {
        title: '工作区',
        placeholder: '选择一个选项',
        description: '通过将项目组织到工作区来简化项目管理。'
      },
      color: '颜色',
      taskSampling: {
        title: '任务采样',
        sequential: {
          label: '顺序',
          description: '任务按任务 ID 排序'
        },
        uniform: {
          label: '均匀',
          description: '任务随机选择，均匀分布'
        },
        uncertainty: {
          label: '不确定性',
          description: '任务基于模型不确定性分数选择（主动学习模式）。'
        }
      }
    },
    dangerZone: {
      title: '危险区域',
      description: '请谨慎执行这些操作。此页面上的操作无法撤销。请确保您的数据已备份。',
      deleteAnnotations: '删除 {{count}} 个标注',
      deleteTasks: '删除 {{count}} 个任务',
      deletePredictions: '删除 {{count}} 个预测',
      resetCache: {
        label: '重置缓存',
        help: '如果您由于现有标签的验证错误而无法修改标注配置，但您确信这些标签不存在，重置缓存可能会有所帮助。您可以使用此操作重置缓存并重试。'
      },
      dropTabs: {
        label: '删除所有标签页',
        help: '如果数据管理器无法加载，删除所有数据管理器标签页可能会有所帮助。'
      },
      deleteProject: {
        label: '删除项目',
        help: '删除项目将从数据库中删除所有任务、标注和项目数据。',
        confirmation: '您即将删除所有内容。此操作无法撤销。'
      }
    },
    labeling: {
      title: '标注界面',
      description: '为您的项目配置标注界面。您可以添加和配置标注工具，设置标注规则等。',
      config: {
        title: '配置',
        description: '使用 XML 配置标注界面。',
        save: '保存配置',
        validate: '验证配置',
        reset: '重置配置'
      }
    },
    annotation: {
      title: '标注设置',
      instructions: {
        title: '标注说明',
        description: '编写说明以帮助用户完成标注任务。',
        details: '说明字段支持 HTML 标记，并允许使用图片、iframe（pdf）等。',
        showBeforeLabeling: '标注前显示'
      },
      prelabeling: {
        title: '预标注',
        usePredictions: {
          label: '使用预测进行预标注',
          description: '启用并选择要用于预标注的预测集。'
        }
      }
    }
  },
  actions: {
    createProject: '创建项目',
    invitePeople: '邀请人员'
  },
  resources: {
    title: '资源',
    description: '学习、探索和获取帮助'
  },
  dialog: {
    selectedMessage: '已选择的消息',
    destructiveAction: '危险操作',
    confirmAction: '确认操作',
    inputTitle: '输入标题',
    input: '输入内容',
    cancel: '取消',
    confirm: '确认',
    ok: '确定'
  },
  createProject: {
    title: '创建项目',
    projectName: '项目名称',
    description: '描述',
    workspace: {
      title: '工作区',
      placeholder: '选择一个选项',
      description: '通过将项目组织到工作区来简化项目管理。',
      learnMore: '了解更多'
    },
    steps: {
      name: '项目名称',
      import: '数据导入',
      config: '标注设置'
    },
    buttons: {
      delete: '删除',
      save: '保存',
      cancel: '取消',
      import: '导入',
      saving: '保存中...',
      importing: '导入中...'
    },
    import: {
      title: '导入数据',
      description: '将数据导入到项目中'
    },
    unsavedChanges: {
      title: '未保存的更改',
      description: '您有未保存的更改。是否要保存？',
      save: '保存',
      discard: '放弃'
    }
  }
};
