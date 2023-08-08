// // hero-detail.component.integration.spec.ts
// // this is an example of how to integration.test of a testing-routed-compontts.ts
// import { Component } from '@angular/core';
// import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';

// import { Hero } from '../hero';
// import { HeroService } from '../hero.service';
// import { HEROES } from '../mock-heroes';
// import { HeroDetailComponent } from './hero-detail.component';

// // 1  CREATE THE ROUTED COMPONENT
// @Component({
//   template: '<router-outlet></router-outlet>',
// })
// class TestRootComponent {}

// describe('HeroDetailComponent (integrated)', () => {
//   function advance() {
//     tick();
//     rootFixture.detectChanges();
//   }

//   //CALL THIS FUNCTION TO GET THE EXPECTED TITLE IN THE ROUTED COMPONENT
//   function getTitle() {
//     const element = rootFixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;

//     return element.textContent.trim();
//   }

//   //CALL THIS FUNCTION TO NAVIGATE
//   function navigateByHeroId(id: number) {
//     rootFixture.ngZone.run(() => router.navigate(['detail', id])); // [1] [2]
//   }

//   beforeEach(async () => {
//     const fakeService = {
//       getHero(id: number) {
//         const hero = [...fakeHeroes].find((h) => h.id === id);

//         return of(hero);
//       },
//     } as Partial<HeroService>;

//     /* 
//     HeroDetailComponent is the component I want to route to. 
//     create the routes => detail/:id should rendere the HeroDetailComponent
//     */
//     TestBed.configureTestingModule({
//       declarations: [TestRootComponent, HeroDetailComponent],
//       imports: [
//         RouterTestingModule.withRoutes([
//           { path: 'detail/:id', component: HeroDetailComponent }, // [2]
//         ]),
//         FormsModule,
//       ],
//       providers: [{ provide: HeroService, useValue: fakeService }],
//     });

//     await TestBed.compileComponents();

//     rootFixture = TestBed.createComponent(TestRootComponent);
//     router = TestBed.inject(Router); //get the router 
//   });

//   const fakeHeroes: ReadonlyArray<Hero> = [...HEROES];
//   let router: Router;
//   let rootFixture: ComponentFixture<TestRootComponent>;

//   it("displays the hero's name in upper-case letters", fakeAsync(() => {
//     const [expectedHero] = fakeHeroes;

//     navigateByHeroId(expectedHero.id);
//     advance();

//     expect(getTitle()).toContain(expectedHero.name.toUpperCase());
//   }));
// });