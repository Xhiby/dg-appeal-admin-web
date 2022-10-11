import 'element-plus/theme-chalk/display.css'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
// 为了解决 unplugin-vue-components 自动插入的样式优先级覆盖其他组件自带样式
import 'element-plus/es/components/icon/style/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// // 做全局引入，挂载到this上 这两个组件内部已经实现了globalProperties
import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  install: (app) => {
    app.use(ElMessageBox)
    app.use(ElMessage)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
