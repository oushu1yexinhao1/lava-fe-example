interface GlobalProps {
  container: any,
  onGlobalStateChange: (state?: any, prev?: any) => void,
  setGlobalState: (state?: any) => void
}

interface GlobalModuleState {
  globalProps: GlobalProps,
  data: Record<string, any>
}
export default {
  namespaced: true,
  state: () => {
    return {
      // props对象
      globalProps: {},
      // 全局数据
      data: {}
    }
  },
  mutations: {
    getGlobalState(state: GlobalModuleState, data: Record<string, any>) {
      state.data = { ...data }
    },
    setGlobalState(state: GlobalModuleState, data: Record<string, any>) {
      if (state.globalProps) state.globalProps.setGlobalState(data)
    },
    initGlobalProps(state: GlobalModuleState, props: GlobalProps) {
      state.globalProps = props
    }
  }
}