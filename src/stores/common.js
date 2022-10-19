import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    /** @type {'领导' | '倍增办' | '处理部门'} */
    role: '领导',
    leaders: [
      {
        id: '1',
        name: '张领导'
      },
      {
        id: '2',
        name: '李领导'
      }
    ],
    currentLeader: '',
    // 缓存的拆分任务列表
    tempSplitTask: {}
  }),
  getters: {
    defaultLeader: (state) => state.leaders[0].id
  },
  actions: {
    setLeaders(leaders) {
      this.leaders = leaders
    },
    setCurrentLeader(leader) {
      this.currentLeader = leader
    },
    addTempTask(id, task) {
      this.tempSplitTask[`t-${id}`] = task
    }
  }
})
