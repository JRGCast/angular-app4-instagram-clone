import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { child, Database, getDatabase, push, ref as refDb, set, update } from "firebase/database";
import { getDownloadURL, getStorage, ref as refStorage, uploadBytes, uploadBytesResumable } from "firebase/storage";

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
      const imageRef = refStorage(this.fbStorage, `images/${ postImage.lastModified }${ postImage.name }`);

      const uploadTask = uploadBytesResumable(imageRef, postImage)
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done', `Uploaded ${ snapshot.bytesTransferred } from ${ snapshot.totalBytes }`);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );
      // 'file' comes from the Blob or File API
      // uploadBytes(imageRef, postImage).then((snapshot) => {
      //   console.log('Uploaded a blob or file!', snapshot);
      // });
      console.log(postImage)
    }
  }
}