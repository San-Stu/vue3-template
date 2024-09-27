import { reactive } from 'vue'

export const store = reactive<any>({
  actinfo: {
    activity_rule: '',
    share_title: '',
    share_subtitle: '',
    share_image: '',
    share_url: '',
    rule_imgs: ''
  }
})

export const mutations = {
  setActinfo (data: any) {
    store.actinfo = {
      ...store.actinfo,
      ...data.info
    }
  }
}
