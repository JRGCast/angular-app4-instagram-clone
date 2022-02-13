import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { UserAuthentication } from "./auth.service";

@Injectable()
export class RouterGuard implements CanActivate {
  constructor(
    private authService: UserAuthentication 
  ) { }
  canActivate(): boolean {
    return this.authService.isAuthenticated()
  };
}