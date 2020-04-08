import { FileI } from './../../../shared/models/file.interface';
import { UserI } from './../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  public image: FileI;
  public currentImage = 'https://picsum.photos/200';
  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.authSvc.userData$.subscribe(u => {
      this.initValuesForm(u);
    });
  }

  private initValuesForm(user: UserI) {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }

    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
    });
  }

  onSaveUser(u: UserI) {
    this.authSvc.preSaveUserProfile(u, this.image);
  }

  handleImage(image: FileI) {
    this.image = image;
  }



}
