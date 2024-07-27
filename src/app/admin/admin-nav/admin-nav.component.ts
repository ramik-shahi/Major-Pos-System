import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/services/auth-service.service';



@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
   pageTitle: string = 'Dashboard';
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private auth:AuthServiceService) { }
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
    });
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    updatePageTitle(): void {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.pageTitle = route.snapshot.data['title']; // Assuming you set 'title' in the route's data
    }
    isAdmin(){

      return this.auth.getRole()==='admin'

    }
    
    logout() {
      
      console.log('Logging out...');
      sessionStorage.clear();
      // Redirect to the login page or home
      this.router.navigate(['/login']);
    }
    
}

