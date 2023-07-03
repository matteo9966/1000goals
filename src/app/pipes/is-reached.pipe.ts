import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isReached',
  standalone: true,
  pure:true
})
export class IsReachedPipe implements PipeTransform {

  transform(goalId:string|undefined,userGoals:string[]=[]): boolean {
    if(!goalId) return false
    return userGoals.includes(goalId) 
  }

}
