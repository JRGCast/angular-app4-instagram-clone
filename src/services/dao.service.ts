import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { child, Database, getDatabase, push, ref as refDb, set, update } from "firebase/database";
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";

export class DAOService {
  private fbDatabase: Database = getDatabase();
  private authMethod: Auth = getAuth();
  private fbStorage = getStorage();
  public userData!: any
  constructor() { }

  // public getCurrUserData() {
  //   onAuthStateChanged(this.authMethod, (userData: any) => {
  //     if (userData) {
  //       const userM = userData.email
  //       return userM
  //     } else {
  //       console.info('User is signed out')
  //     }
  //   })
  // }

  public puslishPostNSave(userEmail: string | null, postTitle: string, postImage: any): void {
    const newPostKey = push(child(refDb(this.fbDatabase), 'posts')).key;
    if (userEmail) {
      // update(refDb(this.fbDatabase, `publications/${ btoa(userEmail) }/posts/${newPostKey}`), { userEmail, postTitle, postImage });
      console.log(newPostKey)
    }
    else {
      console.log('USER EMAIL NOT PROVIDED')
      console.log({ userEmail, postTitle })
    }
    if (postImage) {
      const imageRef = refStorage(this.fbStorage, `images/${postImage.lastModified}${postImage.name}`);

      // 'file' comes from the Blob or File API
      uploadBytes(imageRef, postImage).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      console.log(postImage)
    }
  }
}