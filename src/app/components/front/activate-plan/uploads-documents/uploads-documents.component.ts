import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileItem } from 'src/app/models/file.model';
import { AuthService } from '../../../../services/auth.service';
import { Lightbox } from 'ngx-lightbox';
import { UserplanService } from '../../../../services/front/userplan.service';

@Component({
  selector: 'app-uploads-documents',
  templateUrl: './uploads-documents.component.html',
  styleUrls: ['./uploads-documents.component.css']
})
export class UploadsDocumentsComponent implements OnInit {
  files:FileItem[] = [];
  loading = true;
  @Input() userplan: any;
  @Output()
  sendToF = new EventEmitter<string>();
  @Output()
  sendToFstep = new EventEmitter<any>();
  processing = false;
  cardUploads = false;
  progressInfos: any = [];
  errorServer:boolean = false;
  images:any = [];
  license:any;
  constructor(
    private userPlanS: UserplanService,
    private toastrS: ToastrService,
    private router: Router,
    private _lightbox: Lightbox,

  ) { }

  ngOnInit(): void {
    console.log(this.userplan.id);
    this.getImagesVerification();
  }

  sendRequestActivation(){
    this.sendToFather('showLoader');
    this.userPlanS.sendRequestActivation(this.userplan.id).subscribe( (data:any)=>{
      console.log(data);
      
      this.sendToFatherStep(7); 
      this.sendToFather('hideLoader');
    // revision
    },error=>{
      console.log(error);
    });
  }
  
  getImagesVerification(){

    this.userPlanS.get(this.userplan.id).subscribe( (data:any)=>{
      console.log(data);
      this.loading = false;
      this.userplan = data.userplan;
      this.license = data.license;
      this.sendToFather('hideLoader');
      this.images = [];
      for (let img of data.images) {
        let src = img.url_path;
        let caption = "";
        let thumb = img.url_path;
        let id = img.id;

        const info_image = {
          src: src,
          caption: caption,
          thumb: thumb,
          id: id,

        };
        this.images.push(info_image);
      }
    });
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.images, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  sendToFather(message: any) {
    this.sendToF.emit(message);
  }

  sendToFatherStep(value:number){
    this.sendToFstep.emit(value);
  }

  delete_img(id:number){
    this.sendToFather("showLoader");
    this.userPlanS.delete_img(id).subscribe(
      (event:any) => {
        this.getImagesVerification();
        this.sendToFather('hideLoader');
        this.toastrS.success(event);
      },
      err => {
        this.sendToFather('hideLoader');
      });
  }



  input_file_change(event: any) {
    console.log("hola");
  }

  // selectFiles(event: any) {
  //   this.files = event.target.files;
  //   this.uploadFiles();
  // }

  // onDropFiles(event:any){
  //   // this.uploadFiles();
  // }
  selectFiles(event: any) {
    let filesT = event.target.files;
    for(const prop in Object.getOwnPropertyNames(filesT)){
      const filesTemp = filesT[prop];
      const newFile = new FileItem(filesTemp);
      this.files.push(newFile);
    }
  }

  uploadFiles() {
    this.errorServer = false;
    this.sendToFather('showLoader');
    for (let i = 0; i < this.files.length; i++) {
      this.upload(i, this.files[i].file);
    }
  }

  upload(idx: number, file: any) {
    this.files[idx].error = "";
    let regex = new RegExp("(.*?)\.(jpeg|png|jpg|gif|svg|webp)$"); //add or remove required extensions here
    let regexTest = regex.test(file.name);
    // verficar q sea csv
    if (!regexTest) {
      this.files[idx].error = "No es una imagen";
      this.files[idx].completed =true;
      this.processingFiles();
      return;
    }

    this.userPlanS.upload_files(file,this.userplan.id).subscribe(
      event => {
        

        if (event.type === HttpEventType.UploadProgress) {
          let total = 0;
          if (event?.total) {
            total = event.total;
          }
          this.files[idx].progress = Math.round(100 * event.loaded / total);

        } else if (event instanceof HttpResponse) {

          if (event.body.result == 'error') {
          this.files[idx].progress = 0;
          this.files[idx].error = event.body.message;
          } else if (event.body.result == "error-csv") {
            this.files[idx].progress = 0;
            this.files[idx].error = event.body.message;
          } else if (event.body.result == "ok") {
            this.files[idx].success = true;
          }
          this.files[idx].completed = true;
          this.processingFiles();
        }
      },
      err => {
        console.log(err);
        this.files[idx].completed = true;
        this.files[idx].progress = 0;
        this.files[idx].error = "Error en la carga de este archivo.";
        this.processingFiles();
      });
  }

  processingFiles() {
    let length = this.files.length;
    let allCompleted = 0;
    var errorS = "no";

    if (length != 0) {
      this.files.forEach((prog:any, index:any) => {
        if (prog.completed == true) {
          allCompleted = allCompleted + 1;
        }
        if(prog.error.length != 0){
          errorS = "yes";
        }
      });
      if(errorS == "yes"){
        this.errorServer = true;
      }
      if(length ==  allCompleted){
        this.getImagesVerification();
        this.sendToFather('hideLoader');
      }

    } else {
      console.log("processingFiles else");

      this.sendToFather('hideLoader');
      // this.refreshList();
    }
  }

  // refreshList(){
  //   this.galleryS.images_gallery(this.gallery.id).subscribe( (data:any)=>{
  //     this.images = data;
  //   });
  // }
}

