import { Goal, ProposedGoal } from '1000-goals-types';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description this is a pipe that returns true if the goal (proposed goal is created by the user logged in)
 */
@Pipe({
  name: 'isMyProposed',
  standalone: true,
})
export class IsMyProposedPipe implements PipeTransform {
  transform(
    goal: Goal,
    proposedGoals?: ProposedGoal[],
    username?: string
  ): boolean {
    if(!proposedGoals || !username) return false
    const proposedGoal = proposedGoals?.find((g) => g.id === goal.id);
    const myproposed = proposedGoal?.proposedBy === username;
    return myproposed;
  }
}
