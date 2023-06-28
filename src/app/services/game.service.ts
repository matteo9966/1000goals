import { Inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Requests, Responses } from '1000-goals-types';
import { ROUTES } from '1000-goals-types/lib';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../app.config';
import { ToastrService } from './toastr.service';
import { EMPTY, concatMap, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  createGameURL = '';
  insertUserURL = '';

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private toastrService: ToastrService,
    @Inject(API_BASE) private apiBase: string
  ) {
    this.createGameURL = apiBase + ROUTES.games.base + ROUTES.games.insertGame;
    this.insertUserURL = apiBase + ROUTES.games.base + ROUTES.games.insertUser;
  }
  createGame(gameBody: Requests.InsertGameRequest['game']) {
    const username = this.userService.getUserData()?.user?.name;
    if (!username) {
      this.toastrService.setToastrType('error');
      this.toastrService.setToastrMessage('User is not logged in');
      this.toastrService.setSowToastr(true);
      return EMPTY;
    }

    const requestBody: Requests.InsertGameRequest = {
      game: {
        description: gameBody.description,
        name: gameBody.name,
      },
      username: username,
    };

    return this.http
      .post<Responses.InsertGameResponse>(this.createGameURL, requestBody)
      .pipe();
  }

  addUserToGame(username: string) {
    const adminId = this.userService.getUserData()?.user?.name;
    const gameId = this.userService.getUserData()?.game?.id;
    if (!adminId || !gameId){
      this.toastrService.setToastrType('error');
      this.toastrService.setToastrMessage('Error while inserting the user');
      this.toastrService.setSowToastr(true);
      return EMPTY};

    const userRequest: Requests.InsertUserRequest = {
      username,
      adminId,
      gameId,
    };

    return this.http.patch<Responses.InsertUserResponse>(this.insertUserURL, userRequest);
  }
}
