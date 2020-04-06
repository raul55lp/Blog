import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public posts: {
    id: string;
    titlePost: string;
    contentPost: string;
    imagePost: string;
  }[] = [
      {
        id: '1',
        titlePost: 'Post One',
        contentPost: `Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Illo, natus, delectus eos aliquid culpa praesentium sit atque aliquam recusandae minima 
      doloribus dolores ab. Harum eius at fugiat deserunt voluptatem sit.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      },
      {
        id: '2',
        titlePost: 'Post Two',
        contentPost: `Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Illo, natus, delectus eos aliquid culpa praesentium sit atque aliquam recusandae minima 
      doloribus dolores ab. Harum eius at fugiat deserunt voluptatem sit.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      },
      {
        id: '3',
        titlePost: 'Post Three',
        contentPost: `Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Illo, natus, delectus eos aliquid culpa praesentium sit atque aliquam recusandae minima 
      doloribus dolores ab. Harum eius at fugiat deserunt voluptatem sit.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      },
      {
        id: '4',
        titlePost: 'Post Four',
        contentPost: `Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Illo, natus, delectus eos aliquid culpa praesentium sit atque aliquam recusandae minima 
      doloribus dolores ab. Harum eius at fugiat deserunt voluptatem sit.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      },
    ];
  constructor() { }

  ngOnInit() {
  }

}
