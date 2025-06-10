export default {
  common: {
    loading: '加载中...',
    error: '出错了',
    success: '成功',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    back: '返回',
    version: '标注平台 版本',
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
    getStarted: '让我们开始吧'
  },
  projects: {
    title: '项目',
    createProject: '创建项目',
    projectList: '项目列表',
    noProjects: '暂无项目',
    recentProjects: '最近项目',
    viewAll: '查看全部',
    createFirstProject: '创建你的第一个项目',
    setupInstructions: '导入数据并设置标注界面以开始标注',
    progress: '{{finished}}/{{total}} 个任务 ({{percentage}}%)',
    emptyState: {
      title: 'Heidi 没有看到任何项目！',
      description: '创建一个项目并开始标注你的数据。',
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
      title: '成员',
      addPeople: '添加成员',
      apiTokens: {
        title: 'API Token 设置',
        settings: 'API Token 设置',
        saved: 'API Token 设置已保存'
      },
      invitation: {
        title: '邀请成员',
        description: '邀请成员加入你的标注平台实例。你邀请的成员将拥有所有项目的完整访问权限。',
        copyLink: '复制邀请链接',
        selectLink: '选择邀请链接'
      }
    }
  },
  settings: {
    title: '设置',
    account: '账户设置',
    profile: '个人信息',
    general: {
      title: '通用设置',
      projectName: '项目名称',
      description: '描述',
      workspace: {
        title: '工作空间',
        placeholder: '选择一个选项',
        description: '通过将项目组织到工作空间中来简化项目管理。'
      },
      color: '颜色',
      taskSampling: {
        title: '任务采样',
        sequential: {
          label: '顺序采样',
          description: '任务按任务ID排序'
        },
        uniform: {
          label: '随机采样',
          description: '任务随机均匀选择'
        },
        uncertainty: {
          label: '不确定性采样',
          description: '根据模型不确定性分数选择任务（主动学习模式）。'
        }
      }
    },
    labeling: {
      title: '标注界面',
      description: '配置标注界面的显示和行为',
      config: {
        title: '标注配置',
        description: '配置标注界面的标签和工具',
        save: '保存配置',
        validate: '验证配置',
        reset: '重置配置'
      }
    },
    annotation: {
      title: '标注',
      instructions: {
        title: '标注说明',
        description: '为标注者提供详细的标注指南',
        details: '这些说明将在标注过程中显示给标注者',
        showBeforeLabeling: '在开始标注前显示说明'
      },
      prelabeling: {
        title: '预标注',
        usePredictions: {
          label: '使用模型预测',
          description: '使用机器学习模型的预测结果进行预标注'
        }
      }
    },
    ml: {
      title: '机器学习',
      description: '配置机器学习模型和预测',
      empty: {
        title: '连接您的第一个模型',
        description: '连接机器学习模型以生成预测。这些预测可以并排比较，用于高效的预标注，并帮助主动学习，引导用户进行最有影响力的标注任务。',
        addButton: '连接模型'
      },
      connectedModel: {
        description: '已检测到连接的模型！如果您希望从此模型获取预测，请按照以下步骤操作：',
        step1: '导航到数据管理器',
        step2: '选择所需的任务',
        step3: '从操作菜单中选择获取预测'
      },
      prelabeling: {
        description: '如果您想使用模型预测进行预标注，请在',
        link: '标注设置'
      },
      configuration: '配置',
      training: {
        label: '在提交标注时开始模型训练',
        description: '此选项将向 /train 发送包含标注信息的请求。您可以使用此功能启用主动学习循环。您也可以通过模型卡片中的模型菜单手动开始训练。'
        }
    },
    storage: {
      title: '云存储',
      description: '使用云存储或数据库存储作为标注任务的来源或已完成标注的目标',
      source: {
        title: '源云存储',
        button: '添加源存储'
      },
      target: {
        title: '目标云存储',
        button: '添加目标存储'
      }
    },
    dangerZone: {
      title: '危险区域',
      description: '这些操作不可逆，请谨慎操作',
      delete: '删除项目',
      reset: '重置项目',
      deleteHelp: '删除项目将永久删除所有数据，包括标注、任务和设置。此操作无法撤销。',
      resetHelp: '重置项目将清除所有标注数据，但保留项目设置和任务。此操作无法撤销。'
    }
  },
  actions: {
    createProject: '创建项目',
    invitePeople: '邀请成员'
  },
  resources: {
    title: '资源',
    description: '学习、探索和获取帮助'
  },
  dialog: {
    selectedMessage: '已选择消息',
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
      title: '工作空间',
      placeholder: '选择一个选项',
      description: '通过将项目组织到工作空间中来简化项目管理。',
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
      description: '导入数据到项目中'
    },
    unsavedChanges: {
      title: '你有未保存的更改',
      body: '是否在离开前保存更改？',
      save: '保存并离开',
      discard: '放弃并离开',
      cancel: '取消'
    }
  },
  breadcrumbs: {
    home: '首页',
    projects: '项目',
    data: '数据',
    settings: '设置',
    organization: '组织',
    people: '人员',
    model: '模型',
    export: '导出',
    import: '导入',
    labeling: '标注',
    review: '审核',
    history: '历史',
    members: '成员',
    integrations: '集成',
    webhooks: 'Webhooks',
    api: 'API',
    storage: '存储',
    ml: '机器学习',
    predictions: '预测',
    versions: '版本',
    tasks: '任务',
    annotations: '标注',
    comments: '评论',
    activity: '活动',
    metrics: '指标',
    quality: '质量',
    performance: '性能',
    profile: '个人资料',
    account: '账户',
    security: '安全',
    notifications: '通知',
    billing: '账单',
    help: '帮助',
    documentation: '文档',
    support: '支持',
    feedback: '反馈',
    about: '关于',
  },
};
