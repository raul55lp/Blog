import { Observable } from 'rxjs';
import { PostService } from 'src/app/components/posts/post.service';
import { Component, OnInit } from '@angular/core';
import { PostI } from 'src/app/shared/models/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public posts$: Observable<PostI[]>;

  constructor(private postSvc: PostService) { }

  ngOnInit() {
    this.posts$ = this.postSvc.getAllPosts();
  }

}
