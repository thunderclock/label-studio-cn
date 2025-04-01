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
    version: 'Label Studio 版本',
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
    welcome: '欢迎使用 Label Studio',
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
        description: '邀请成员加入你的 Label Studio 实例。你邀请的成员将拥有所有项目的完整访问权限。',
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
    dangerZone: {
      title: '危险区域',
      description: '请谨慎执行这些操作。在此页面执行的操作无法撤销。请确保你的数据已备份。',
      deleteAnnotations: '删除 {{count}} 个标注',
      deleteTasks: '删除 {{count}} 个任务',
      deletePredictions: '删除 {{count}} 个预测',
      resetCache: {
        label: '重置缓存',
        help: '重置缓存可能有助于解决以下情况：当你无法修改标注配置（由于现有标签的验证错误），但你确信这些标签不存在时。你可以使用此操作重置缓存并重试。'
      },
      dropTabs: {
        label: '删除所有标签页',
        help: '如果数据管理器无法加载，删除所有数据管理器标签页可能会有所帮助。'
      },
      deleteProject: {
        label: '删除项目',
        help: '删除项目将从数据库中移除所有任务、标注和项目数据。',
        confirmation: '你即将删除所有内容。此操作无法撤销。'
      }
    },
    labeling: {
      title: '标注界面',
      description: '配置项目的标注界面。你可以添加和配置标注工具，设置标注规则等。',
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
        details: '说明字段支持 HTML 标记，允许使用图片和 iframe（PDF）。',
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
  }
}; 