import { Goal, ProposedGoal } from '1000-goals-types';
import { IsMyProposedPipe } from './is-my-proposed.pipe';

describe('IsMyProposedPipe', () => {
  function setup() {
    const pipe = new IsMyProposedPipe();
    return pipe.transform;
  }

  it('returns false if proposed goal or no username', () => {
    const transform = setup();
    const result = transform({} as Goal, undefined, undefined);
    expect(result).toBeFalse();
  });

  it('returns false if the goal is not my proposed goal', () => {
    const transform = setup();
    const goal: Goal = {
      categories: [],
      description: 'goal desc',
      id: 'goal-id',
      name: 'goal-nMW',
      points: 20,
    };
    const proposedBy = 'not-me';
    const username = 'username';
    const proposedGoals: ProposedGoal[] = [
      { goal, id: goal.id, proposedBy, votedBy: [] },
    ];

    const result = transform(goal, proposedGoals, username);
    expect(result).toBeFalse();
  });

  it('returns true if the goal is proposed by user', () => {
    const transform = setup();
    const goal: Goal = {
      categories: [],
      description: 'goal desc',
      id: 'goal-id',
      name: 'goal-nMW',
      points: 20,
    };
    const username = 'username';
    const proposedGoals: ProposedGoal[] = [
      { goal, id: goal.id, proposedBy: username, votedBy: [] },
    ];
    const result = transform(goal, proposedGoals, username);
    expect(result).toBeTrue();
  });
});
