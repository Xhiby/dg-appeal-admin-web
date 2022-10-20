import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    /** @type {'领导' | '倍增办' | '处理部门'} */
    role: '领导',
    leaders: [],
    currentLeader: '',
    // 缓存的拆分任务列表
    tempSplitTask: {}
  }),
  getters: {
    defaultLeader: (state) => {
      if (state.leaders.length > 0) {
        state.currentLeader = state.leaders[0].labelCode
        return state.leaders[0].labelCode
      } else {
        return ''
      }
    }
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
