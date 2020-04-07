import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostI } from '../../shared/models/post.interface';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs: AngularFirestore) { }

  public getAllPosts(): Observable<PostI[]> {
    return this.afs.collection('posts').snapshotChanges().pipe(
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
}
