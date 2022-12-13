import { TaskObject } from './types'

class Task {
  indexUid: TaskObject['indexUid']
  status: TaskObject['status']
  type: TaskObject['type']
  uid: TaskObject['uid']
  canceledBy: TaskObject['canceledBy']
  details: TaskObject['details']
  error: TaskObject['error']
  duration: TaskObject['duration']
  startedAt: Date
  enqueuedAt: Date
  finishedAt: Date

  constructor(task: TaskObject) {
    this.indexUid = task.indexUid
    this.status = task.status
    this.type = task.type
    this.uid = task.uid
    this.details = task.details
    this.canceledBy = task.canceledBy
    this.error = task.error
    this.duration = task.duration

    this.startedAt = new Date(task.startedAt)
    this.enqueuedAt = new Date(task.enqueuedAt)
    this.finishedAt = new Date(task.finishedAt)
  }
}

export { Task }
