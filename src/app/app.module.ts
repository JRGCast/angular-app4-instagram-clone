import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessComponent } from './access/access.component';
import { BannerComponent } from './access/banner/banner.component';

import { RegisterComponent } from './access/register/register.component';
import { LoginComponent } from './access/login/login.component';
import { UserAuthentication } from 'src/services/auth.service';
import { HomeComponent } from './home/home.component';
import { PublicationsComponent } from './home/publications/publications.component';
import { RouterGuard } from 'src/services/approuter-guard.service';
import { NewPublicationsComponent } from './new-publications/new-publications.component';
import { DAOService } from 'src/services/dao.service';
import { ProgressService } from 'src/services/progress.service';

@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    BannerComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    PublicationsComponent,
    NewPublicationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [UserAuthentication, RouterGuard, DAOService, ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
