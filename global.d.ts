// 扩展全局 Window 接口
interface Window {
  ethereum?: {
    isMetaMask?: boolean
    request: (...args: any[]) => Promise<any>
    // 根据需要添加更多 ethereum 对象的属性和方法
  }
}
