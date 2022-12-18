import { TaskObject } from './types';
declare class Task {
    indexUid: TaskObject['indexUid'];
    status: TaskObject['status'];
    type: TaskObject['type'];
    uid: TaskObject['uid'];
    canceledBy: TaskObject['canceledBy'];
    details: TaskObject['details'];
    error: TaskObject['error'];
    duration: TaskObject['duration'];
    startedAt: Date;
    enqueuedAt: Date;
    finishedAt: Date;
    constructor(task: TaskObject);
}
export { Task };
