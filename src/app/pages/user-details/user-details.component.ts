import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalListComponent } from 'src/app/components/goal-list/goal-list.component';
import { UserService } from 'src/app/services/user.service';
import { Goal, User } from '1000-goals-types';
import { Game } from '1000-goals-types/src/Game.interface';
import { calculatePoints } from 'src/app/utils/calculatePoints';
import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, GoalListComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  selectedList: 'goals' | 'proposed' = 'goals';
  list: Goal[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.list = setList('goals', this.id, this.userService.getUserData());
  }
  @Input() id: string | null = null; //its a urlparam

  get points() {
    if (this.userService.getUserData() && this.id) {
      const points = calculatePoints(this.userService.getUserData(), this.id);
      return points;
    }
    return 0;
  }

  get username() {
    return (
      this.userService
        .getUserData()
        ?.game?.players?.find((u) => u.id === this.id)?.name || 'no username'
    );
  }

  get tempPassword() {
    if (this.userService.isAdmin()) {
      return (
        this.userService
          .getUserData()
          ?.game?.players?.find((p) => p.id === this.id)?.tempPassword || ''
      );
    } else return '● ● ● ● ● ● ● ● ● ● ●';
  }

  clickList(listType: 'proposed' | 'goals') {
    if (listType === this.selectedList) return;
    this.selectedList = listType;
    this.list = setList(
      this.selectedList,
      this.id,
      this.userService.getUserData()
    );
  }
}

function setList(
  listType: 'proposed' | 'goals',
  userId: string | null = '',
  userData: LoginResponseBody | undefined | null
) {
  if (!userData) return [];
  const list: Goal[] = (userData?.game?.players
    ?.find((u) => u.id === userId)
    ?.proposed?.filter(Boolean)
    .map((id) => userData?.game?.proposedGoals?.find((g) => g.id === id))
    .filter(Boolean) || []) as Goal[];

  return list;
}
