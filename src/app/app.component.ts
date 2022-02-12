import { Component, OnInit } from '@angular/core';
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics'
import {getDatabase} from 'firebase/database'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-app4-instagramClone';

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyDkF84RQ8SuWybExpP3T3Po-8GRK7pf5Kc",
      authDomain: "angular-instagr-clone.firebaseapp.com",
      projectId: "angular-instagr-clone",
      storageBucket: "angular-instagr-clone.appspot.com",
      messagingSenderId: "348181551107",
      appId: "1:348181551107:web:fbb797ab229e05ed0c1636",
      measurementId: "G-2H6P7SBMCN"
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const analytcs = getAnalytics(app);
    console.log('app', database)
  }
}
