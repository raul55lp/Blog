import { PostI } from './../../../shared/models/post.interface';
import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  @Input() post: PostI;

  constructor(private postSvc: PostService) { }


  ngOnInit() {
  }

}
