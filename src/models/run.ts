export class Run {
  constructor(
    public id: number = null,
    public name: string = null,
    public status: string = null,
    public message: string = null,
    public progress: number = null,
    public params: Object = null,
    public logs: string = null,
    public started_at: Date = null,
    public completed_at: Date = null
  ){}

  static from_object(pojo:any, run:Run=new Run()) {
    run.id = pojo.id;
    run.name = pojo.name;
    run.status = pojo.status;
    run.message = pojo.message;
    run.progress = pojo.progress;
    run.params = pojo.params;
    run.logs = pojo.logs;
    run.started_at = pojo.started_at ? new Date(pojo.started_at) : null;
    run.completed_at = pojo.completed_at ? new Date(pojo.completed_at) : null;
    return run;
  }

}