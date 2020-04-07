import { Component, OnInit } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public posts$: Observable<PostI[]>;
  constructor(private postSvc: PostService) { }

  ngOnInit() {
    // this.postSvc.getAllPosts().subscribe(res => console.log('POSTS', res)
    // );
    this.posts$ = this.postSvc.getAllPosts();
  }

}
