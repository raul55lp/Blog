import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {
  appName = 'ngBlog';
  constructor(public authSvc: AuthService) { }

  ngOnInit() {
  }

  onLogout() {
    this.authSvc.logout();
  }

}
