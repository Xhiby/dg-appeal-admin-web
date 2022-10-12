import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    /** @type {'领导' | '倍增办' | '处理部门'} */
    role: '',
    /** @type {{ name: string, id: string }[]} */
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
    /** @type string */
    currentLeader: ''
  }),
  getters: {
    defaultLeader: (state) => state.leaders[0].id
  },
  action: {
    setLeaders(leaders) {
      this.leaders = leaders
    },
    setCurrentLeader(leader) {
      this.currentLeader = leader
    }
  }
})
