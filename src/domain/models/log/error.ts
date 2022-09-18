export type LogErrorModel = {
  id: string
  date: Date
  stack: string
  params: Record<any, any>
  controller: string
}
