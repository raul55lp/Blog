import { PostService } from 'src/app/components/posts/post.service';
import { PostI } from './../../../shared/models/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit {

  constructor(private postSvc: PostService) { }
  private image: any;
  public newPostForm = new FormGroup({
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }

  addNewPost(form: PostI) {
    this.postSvc.preAddPost(form, this.image);
  }
  handleImage(e: any): void {
    this.image = e.target.files[0];
  }

}
