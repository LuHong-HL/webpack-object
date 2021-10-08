  /**
 * 防抖
 * 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
 * @param {Function} fn 处理函数
 * @param {Number} [delay = 200] 延迟时间
 */
   function debounce(fn, delay = 200) {
    let timer = null
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }

  /**
 * 节流
 * 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
 * @param {Function} fn 处理函数
 * @param {Number} [delay = 200] 延迟时间
 */
  function throttle(fn, delay = 200) {
    let isCanRun = true
    return function (...args) {
      if (!isCanRun) return
      isCanRun = false
      setTimeout(() => {
        fn.apply(this, args)
        isCanRun = true
      }, delay)
    }
  }

  export {
    debounce,
    throttle
  }
