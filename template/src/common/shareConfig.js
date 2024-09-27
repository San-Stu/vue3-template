<% if (options.isUseScriptSetup === 'yes') { %>
import { onMounted, getCurrentInstance } from 'vue'
import { store } from '@/common/store'

export default function () {
  onMounted(() => {
    const shareData = {
      title: store.actinfo.share_title,
      desc: store.actinfo.share_subtitle,
      link: `https://${document.domain}/activity/<%= options.name %>/`,
      imgUrl: store.actinfo.share_image
    }
    const instance = getCurrentInstance()
    const proxy = instance.proxy
    proxy.share(shareData)
    if (proxy.nativeService.isJoyRunwebview()) {
      proxy.nativeService.setCloseButtonStatus(true)
    }
  })
}
<% } else { %>
export default {
  mounted() {
    const shareData = {
      title: '',
      desc: '',
      link: 'https://' + document.domain + '/activity/<%= options.name %>/',
      imgUrl: ''
    }
    this.share(shareData)
    if (this.nativeService.isJoyRunwebview()) {
      this.nativeService.setCloseButtonStatus(true)
    }
  }
}
<% } %>