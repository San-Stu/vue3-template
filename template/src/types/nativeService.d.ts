interface shareData {
  title: string,
  desc: string,
  link: string,
  imgUrl: string
}

declare class nativeService {
  setCookie: (name: string, value: string, days: number) => void;

  getCookie: (name: string) => any;

  deleteCookie: (name: string) => void;

  isJoyRunwebview: () => boolean;

  isWXwebview: () => boolean;

  // 调用系统的粘贴板
  setClipboard: (value: string) => void;

  setTitle: (value: string) => void;

  setShareButtonStatus: (status: boolean) => void;

  setCloseButtonStatus: (status: boolean) => void;

  menuShare: (shareData: shareData, callback: funciton) => void;

  showShareDialog: () => void;

  closeWebview: () => void;

  // 关闭侧滑返回
  enableSwipe: () => void;

  getVersion: () => string;

  addCalendar: (calendar: object) => void

  enableRefresh: () => void;

  enableRefresh: () => void;

  getLocation: (callback: function) => void;

  getLocalAudioList: (callback: function) => void;

  jdAuth: (params: object) => void;
}
