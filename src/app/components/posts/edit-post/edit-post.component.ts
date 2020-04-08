import { PostService } from './../post.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostI } from './../../../shared/models/post.interface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit {
  private image: any;
  private imageOriginal: any;

  @Input() post: PostI;

  constructor(private postSvc: PostService) { }

  public editPostForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.image = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    this.initValuesForm();
  }
  editPost(post: PostI) {
    if (this.image === this.imageOriginal) {
      this.post.imagePost = this.imageOriginal;
      this.postSvc.editPostById(post);
    } else {
      this.postSvc.editPostById(post,this.image);
    }
  }
  handleImage(e): void {
    this.image = e.target.files[0];
  }
  private initValuesForm(): void {
    this.editPostForm.patchValue({
      id: this.post.id,
      titlePost: this.post.titlePost,
      contentPost: this.post.contentPost,
      tagsPost: this.post.tagsPost
    });
  }

}
