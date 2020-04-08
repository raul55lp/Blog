import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PostService } from 'src/app/components/posts/post.service';
import { PostI } from '../../models/post.interface';
import Swal from 'sweetalert2';
import { ModalComponent } from './../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private postSvc: PostService, public dialog: MatDialog) { }

  ngOnInit() {
    this.postSvc.getAllPosts().subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onEditPost(post: PostI) {
    this.openDialog(post);
  }
  onDeletePost(post: PostI) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to rever this action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33333',
      confirmButtonText: 'Yes, delete'
    }).then(res => {
      if (res.value) {
        this.postSvc.deletePostById(post).then(() => {
          Swal.fire('Deleted', 'You post has been deleted succesfully', 'success');
        }).catch((err) => {
          console.log(err);
          Swal.fire('Error', err, 'error');
        });
      }
    });
  }

  onNewPost() {
    this.openDialog();
  }

  openDialog(post?: PostI): void {
    const config = { data: { message: post ? 'Edit Post' : 'New Post', content: post } };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => { });
  }

}
