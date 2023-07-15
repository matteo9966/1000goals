import { Goal, ProposedGoal } from '1000-goals-types';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upvotedPipe',
  standalone: true
})
export class UpvotedPipe implements PipeTransform {

  transform(goal:Goal,proposedGoals?:ProposedGoal[],username?:string) {
    if(!proposedGoals) return false
    if(!username) return false
    const proposed = proposedGoals.find(g=>g.id===goal.id);
    if(!proposed) return false
    const alreadyVoted = proposed.votedBy.includes(username);
    return alreadyVoted

  }

}
