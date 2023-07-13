import { Goal, ProposedGoal } from '1000-goals-types';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upvoteRatio',
  standalone: true,
})
export class UpvoteRatioPipe implements PipeTransform {
  transform(
    goal: Goal,
    proposedGoals?: ProposedGoal[],
    players?: number
  ): string {
    if (!proposedGoals || !players) return '0/0';
    const proposedGoal = proposedGoals.find((g) => g.id === goal.id);
    if (!proposedGoal) return '0/0';
    const votedBy = proposedGoal.votedBy.length;
    return `${votedBy}/${players}`;
  }
}
