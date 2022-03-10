import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file.model';

@Directive({
  selector: '[appDropFile]'
})
export class DropFileDirective {
  @Input() files:FileItem[] = [];
  @Input() cardUploads:boolean;

  @Output()
  drop: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
  // @HostListener('drop', ['$event'])
  // onDrop(event: any) {
  //   this.drop.emit(true);
  //   event.preventDefault();
  //   event.stopPropagation();
  // }
  @HostListener('window:dragenter', ['event'])
  onWindowDragEnter(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragover', ['event'])
  onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    // ...
  }

  @HostListener('dragleave', ['event'])
  public onDragLeave(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    // ...
  }

  @HostListener('drop', ['event'])
  public onDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    let filesT = event.dataTransfer.files;
    for(const prop in Object.getOwnPropertyNames(filesT)){
      const filesTemp = filesT[prop];
      const newFile = new FileItem(filesTemp);
      this.files.push(newFile);
    }
    console.log(this.files);

    this.cardUploads = true;
    // this.drop.emit();
    // this.drop.unsubscribe();

  }


  // getTransferencia(event: any) {
  //   return event?.dataTransfer ? event.dataTransfer.files : event.originalEvent.dataTransfer.files;
  // }


}
