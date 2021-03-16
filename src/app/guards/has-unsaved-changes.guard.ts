import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { HasUnsavedChanges } from '../interfaces/has-unsaved-changes';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HasUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private userService: UserService){

  }
  
  canDeactivate(component: HasUnsavedChanges,
                currentRoute: ActivatedRouteSnapshot, 
                currentState: RouterStateSnapshot, 
                nextState?: RouterStateSnapshot): boolean {
    
    if (component.hasUnsavedChanges()) {
      if(nextState.url === '/auth/login'){
        return true;
      }
      return confirm('¿Quieres volver a cargar el sitio web? Es posible que los cambios no se guarden');
    }
    return true;
  }
  
}
