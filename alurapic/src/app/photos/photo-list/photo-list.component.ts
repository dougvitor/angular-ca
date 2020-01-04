import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';


@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  
  photosList: Photo[] = [];
  filter: string = "";
  hasMore: boolean = true;
  currentPage: number = 1;
  username: string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
    ){}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
      this.photosList = this.activatedRoute.snapshot.data['photosResolver'];
    });

  }

  load(){
    this.photoService
      .listFromUserPaginated(this.username, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photosList = this.photosList.concat(photos);

        if(!photos.length){
          this.hasMore = false;
        }
      });
  }
}
