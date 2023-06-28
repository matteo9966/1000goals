import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';

export function calculatePoints(
  loginData: LoginResponseBody|null,
  userId: string
): number {
    if(!loginData) return 0
  const game = loginData.game;
  const user = loginData?.game?.players?.find((usr) => usr.id === userId);
  if (!user || !game) return 0;

  const userPoints = user.goals.reduce((acc, goalId) => {
    const goal = game.goals.find((goal) => goal.id === goalId);
    if (!goal) return 0;
    return goal.points + acc;
  }, 0);

  return userPoints;
}
