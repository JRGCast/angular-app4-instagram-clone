import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserAuthentication } from 'src/services/auth.service';
import { DAOService } from 'src/services/dao.service';

@Component({
  selector: 'app-new-publications',
  templateUrl: './new-publications.component.html',
  styleUrls: ['./new-publications.component.scss']
})
export class NewPublicationsComponent implements OnInit {

  currUserEmail!: string | null
  currPostImage: any
  publicationForm: FormGroup = new FormGroup({
    newPublicationTitle: new FormControl(null, [Validators.required]),
    newPublicationFileUpload: new FormControl(null, [Validators.required])
  })
  constructor(
    private daoService: DAOService,
    private authService: UserAuthentication,
  ) { }

  ngOnInit(): void {
    onAuthStateChanged(getAuth(), ((userData): void => {
      if (userData === null) {
        console.log('User signed out')
      } else {
        this.currUserEmail = userData.email
      }
    }))
  }

  public prepareUpload(event: Event): void {
    const currFile = (event.target as HTMLInputElement).files
    if(currFile && currFile.length > 0) {
      this.currPostImage = currFile[0];
    }
  }

  public publish(): void {
    const publicationTitle = this.publicationForm.value['newPublicationTitle'];
    this.daoService.puslishPostNSave(this.currUserEmail, publicationTitle, this.currPostImage)
    console.log('Publicado e salvo no FireBase:\n', { email: this.currUserEmail, title: publicationTitle, postImage: this.currPostImage })
  }
}
