import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalListComponent } from 'src/app/components/goal-list/goal-list.component';
import { UserService } from 'src/app/services/user.service';
import { Goal, User } from '1000-goals-types';
import { Game } from '1000-goals-types/src/Game.interface';
import { calculatePoints } from 'src/app/utils/calculatePoints';
import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { PAGES_BASE } from 'src/app/app.config';
import { ROUTES } from 'src/app/routes/routes';
import { Observable, fromEvent, of, timer } from 'rxjs';
import { switchMap, mergeWith, timeout, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, GoalListComponent, ButtonComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  selectedList: 'goals' | 'proposed' = 'goals';
  list: Goal[] = [];
  showLinkCopiedMessage = false;
  timeoutIDLinkCopy: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private userService: UserService,
    @Inject(PAGES_BASE) private pagesBase: string
  ) {}
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

  clickCopyLoginLink() {
    this.showLinkCopiedMessage = true;
    const params = new URLSearchParams({
      username: this.username,
      password: this.tempPassword,
    });
    const loginURL = `${this.pagesBase}/${ROUTES.home.base}/${ROUTES.home.login}?${params}`;
    navigator.clipboard.writeText(loginURL);
    this.timeoutIDLinkCopy && clearTimeout(this.timeoutIDLinkCopy);
    this.timeoutIDLinkCopy = setTimeout(() => {
      this.showLinkCopiedMessage = false;
    }, 2000);
  }

  get isAdmin() {
    return this.userService.isAdmin();
  }




}

function setList(
  listType: 'proposed' | 'goals',
  userId: string | null = '',
  userData: LoginResponseBody | undefined | null
) {
  if (!userData) return [];



  const player = userData?.game?.players?.find((u) => u.id === userId);

  let playerList: string[] = [];
  let mappedList: Goal[] = [];
  let goals: Goal[] = [];
  if (listType === 'proposed') {
    // playerList = player?.proposed || []; //!REMOVE
    const userProposedGoals = userData.game?.proposedGoals.filter(goal=>goal.proposedBy===player?.name)!
    goals = userProposedGoals.map(g=>g.goal);
    return goals

  } else {
    playerList = player?.goals || [];
    goals = userData.game?.goals || [];
  }

  mappedList = playerList
    .map((id) => goals.find((goal) => goal.id === id))
    .filter((goal) => !!goal) as Goal[];
  return mappedList;
}
