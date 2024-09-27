import { Toast } from 'vant'

const useStartRun = () => {
  const isApp = new nativeService().isJoyRunwebview()

  const handleRun = () => {
    if (!isApp) {
      Toast('请在悦跑圈APP内访问！')
      jsRunApi.mainJS({
        id: 'openWeb',
        url: encodeURIComponent(window.location.href)
      })
      return
    }
    window.location.href = 'joyrun://www.thejoyrun.com/startrun?coupon=1'
  }

  return handleRun
}

export default useStartRun
