
import { Toast } from 'vant'

const useShare = () => {
  const _nativeService = new nativeService()
  const isApp = _nativeService.isJoyRunwebview()

  const handleShare = () => {
    if (!isApp) {
      Toast('请在悦跑圈APP内访问！')
      jsRunApi.mainJS({
        id: 'openWeb',
        url: encodeURIComponent(window.location.href)
      })
      return
    }
    _nativeService.showShareDialog()
  }

  return handleShare
}

export default useShare
