import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { interval, Subject, takeUntil } from 'rxjs';
import { UserAuthentication } from 'src/services/auth.service';
import { DAOService } from 'src/services/dao.service';
import { ProgressService } from 'src/services/progress.service';

@Component({
  selector: 'app-new-publications',
  templateUrl: './new-publications.component.html',
  styleUrls: ['./new-publications.component.scss']
})
export class NewPublicationsComponent implements OnInit {

  currUserEmail!: string | null
  currPostImage: any
  currPostProgressPercentage!: string
  currPostProgressState!: string
  publicationForm: FormGroup = new FormGroup({
    newPublicationTitle: new FormControl(null, [Validators.required]),
    newPublicationFileUpload: new FormControl(null, [Validators.required])
  })
  constructor(
    private daoService: DAOService,
    private authService: UserAuthentication,
    public progressService: ProgressService
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
    if (currFile && currFile.length > 0) {
      this.currPostImage = currFile[0];
    }
  }

  public publish(): void {
    let obsInterval = interval(100);
    const publicationTitle = this.publicationForm.value['newPublicationTitle'];

    this.daoService.puslishPostNSave(this.currUserEmail, publicationTitle, this.currPostImage)
    console.log('Publicado e salvo no FireBase:\n', { email: this.currUserEmail, title: publicationTitle, postImage: this.currPostImage })

    let endSubscribe: Subject<boolean> = new Subject<boolean>();
    endSubscribe.next(true)

    obsInterval.pipe(
      takeUntil(endSubscribe))
      .subscribe(() => {
        this.currPostProgressPercentage = this.progressService.percentageDone;
        this.currPostProgressState = this.progressService.status

        if (this.currPostProgressState === 'completed') endSubscribe.next(false)
      })
  }
}
