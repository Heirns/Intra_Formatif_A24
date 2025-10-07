import { inject } from "@angular/core";
import { CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";
import { UserService } from "../user.service";


export const dogGuard: CanActivateFn = (route, state) => {
  // On inject le service pour regarder si l'utilisateur est connecté
  if (!inject(UserService).currentUser?.prefercat)
    // S'il n'est pas connecté on le redirige vers la page de login
    return createUrlTreeFromSnapshot(route, ["/dog"]);
  // S'il est connecté, tout est beau on continue!
  else return true;
};