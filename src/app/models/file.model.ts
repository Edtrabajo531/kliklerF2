export class FileItem {
  public file:File;
  public name:string;
  public url:string;
  public uploading:boolean;
  public progress:number;
  public completed: boolean;
  public error: string;
  public success: boolean;



  constructor(file:File){
    this.file = file;
    this.name = file.name;
    this.uploading = false;
    this.progress = 0;
    this.completed = false;
    this.error = "";
    this.success = false;

  }


}
