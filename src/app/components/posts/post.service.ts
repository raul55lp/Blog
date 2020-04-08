import { FileI } from './../../shared/models/file.interface';
import { PostI } from './../../shared/models/post.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postCollection: AngularFirestoreCollection<PostI>;
  private filePath: any;
  private downloadURL: Observable<string>;
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.postCollection = afs.collection<PostI>('posts');
  }

  public getAllPosts(): Observable<PostI[]> {
    return this.postCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as PostI;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public getPostById(id: PostI): Observable<PostI> {
    return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
  }
  public deletePostById(post: PostI) {
    return this.postCollection.doc(post.id).delete();
  }
  public editPostById(post: PostI, newImage?: FileI) {

    if (newImage) {
      this.uploadIMage(post, newImage);
    } else {
      return this.postCollection.doc(post.id).update(post);
    }
  }
  private savePost(post: PostI) {
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadURL,
      fileRef: this.filePath,
      tagsPost: post.tagsPost
    };
    if (post.id) {
      return this.postCollection.doc(post.id).update(postObj);
    } else {
      return this.postCollection.add(postObj);
    }
  }
  public preAddPost(post: PostI, image: FileI): void {
    this.uploadIMage(post, image);
  }
  private uploadIMage(post: PostI, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.downloadURL = url;
          this.savePost(post);
        });
      })
    ).subscribe();
  }
}
