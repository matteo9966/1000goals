"use strict";(self.webpackChunk_1000goals_frontend=self.webpackChunk_1000goals_frontend||[]).push([[167],{9167:(D,m,n)=>{n.r(m),n.d(m,{userRoutes:()=>v});var o=n(8386),C=n(774),d=n(1902),e=n(3071);const v=[{path:"",loadComponent:()=>n.e(883).then(n.bind(n,5883)).then(t=>t.UserComponent),children:[{path:o.Z.user.dashboard,loadComponent:()=>n.e(201).then(n.bind(n,6201)).then(t=>t.DashboardComponent),canActivate:[(t=["/",o.Z.user.base,"/",o.Z.user.newgame].join(""),()=>{const l=(0,d.f3M)(e.K),h=(0,d.f3M)(C.F0),s=l.getUserData()?.user?.gameID,a="admin"===l.getUserData()?.user?.role;return console.log(s,a),!(a&&!s)||(console.log("i should get called!"),h.createUrlTree([t]))})]},{path:o.Z.user.goals,loadComponent:()=>Promise.all([n.e(836),n.e(750)]).then(n.bind(n,578)).then(t=>t.GoalsComponent)},{path:o.Z.user.proposed,loadComponent:()=>Promise.all([n.e(691),n.e(836),n.e(592),n.e(501)]).then(n.bind(n,4501)).then(t=>t.ProposedGoalsComponent)},{path:o.Z.user.leaderboard,loadComponent:()=>Promise.all([n.e(592),n.e(689)]).then(n.bind(n,6689)).then(t=>t.LeaderboardComponent)},{path:o.Z.user.managegame,loadComponent:()=>n.e(234).then(n.bind(n,6234)).then(t=>t.ManageGameComponent)},{path:o.Z.user.players,loadComponent:()=>Promise.all([n.e(691),n.e(592),n.e(979)]).then(n.bind(n,979)).then(t=>t.AdminMembersComponent)},{path:o.Z.user.details,loadComponent:()=>Promise.all([n.e(836),n.e(592),n.e(116)]).then(n.bind(n,5497)).then(t=>t.UserDetailsComponent)},{path:o.Z.user.newgame,loadComponent:()=>Promise.all([n.e(691),n.e(592),n.e(48)]).then(n.bind(n,2048)).then(t=>t.NewGameComponent),canActivate:[(t,l)=>{const s=(0,d.f3M)(e.K).getUserData();return!("admin"!==s?.user.role||s?.game?.id)}]},{path:"",pathMatch:"full",redirectTo:"dashboard"}]}];var t}}]);