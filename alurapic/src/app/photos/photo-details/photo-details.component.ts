import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

import { PhotoService } from "../photo/photo.service";
import { Photo } from "../photo/photo";
import { PhotoComment } from "../photo/photo-comment";
import { AlertService } from "../../shared/components/alert/alert.service";

@Component({
    templateUrl: './photo-details.component.html',
})
export class PhotoDetailsComponent implements OnInit{

    photo$: Observable<Photo>;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private alertService: AlertService){}
    
    ngOnInit(): void {
        const photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(photoId);
    }

    remove(photoId: number){
        this.photoService
            .removePhoto(photoId)
            .subscribe(
                ()=> {

                    this.alertService.success("Photo removed");
                    this.router.navigate([''])
                },
                err =>{
                    console.log(err);
                    this.alertService.warning('Could not delete the photo!');
                });
    }
}