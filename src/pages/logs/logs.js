// logs.js
const util = require('../../utils/util.js')

const { definePage, useRef, onLoad } = require('miniprogram-composition-api')
definePage({
  setup() {
    const logs = useRef(['123'])

    onLoad(() => {
      logs.set(
        (wx.getStorageSync('logs') || []).map((log) => {
          return util.formatTime(new Date(log))
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
