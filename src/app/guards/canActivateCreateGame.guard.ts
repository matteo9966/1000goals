import { CanActivateFn } from "@angular/router";
import { UserService } from "../services/user.service";
import {inject} from '@angular/core';
/**
 * @description this guard checks if the user is an admin, checks if the user has already created a game
 */
export const canActivateCreateGameGuard:CanActivateFn = (route,state)=>{
    const userService = inject(UserService);

    const userData = userService.getUserData();
    
    const isAdmin = userData?.user.role==='admin'
    const hasGame = !!userData?.game?.id;
     
    if(isAdmin && !hasGame){
        return true
    }

    return false
}

