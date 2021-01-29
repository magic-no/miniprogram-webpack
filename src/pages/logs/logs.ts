import { definePage, useRef, onLoad } from 'miniprogram-composition-api'
import { formatTime } from '../../utils/util'
import './logs.less'

definePage({
  setup() {
    const logs = useRef(['123'])

    onLoad(() => {
      logs.set(
        (wx.getStorageSync('logs') || []).map(log => {
          return formatTime(new Date(log))
        })
      )
    })
    return {
      logs,
    }
  },
})

// Page({
//   data: { logs: [] },
//   onLoad() {
//     this.setData({
// logs: (wx.getStorageSync('logs') || []).map((log) => {
//   return util.formatTime(new Date(log))
// }),
//     })
//   },
// })
