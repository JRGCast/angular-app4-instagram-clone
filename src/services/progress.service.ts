import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  public status!: string
  public percentageDone!: string

  constructor() { }
}
