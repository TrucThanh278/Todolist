import { debug, log } from '../constants'

export interface ExtraInfoType {
  debug: boolean
  log: (value: any) => void
}

export default function connect<T>(Component: React.FunctionComponent<T & ExtraInfoType>) {
  return (props: Omit<T, keyof ExtraInfoType>) => {
    const _props = props as T
    return <Component {..._props} debug={debug} log={log} />
  }
}
