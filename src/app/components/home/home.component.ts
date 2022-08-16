import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  img = "";
  loading = true;

  users: any[] = [];
  fullUsers: any[] = [];
  selectedUser = {
    user: {} as any,
    activities: [] as any,
    job: '',
    level: {} as any,
  };

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getBackground();
    this.getUsers();
  }

  // Call localhost to get background image
  getBackground() {
    this.httpService.getBackgroundImage().subscribe((res: any) => {
      this.img = 'https://www.bing.com/'+res.images[0].url;
    });
  }

  // Autenticate and call first Users
  getUsers() {
    this.httpService.authGetUsers().subscribe((res: any) => {
      this.users = res;
      this.getUserPoints();
    })
  }

  // Call each user to get more info
  getUserPoints() {
    for(let i = 0; i < this.users.length; i++) {
      this.httpService.getFullUser(this.users[i].id).subscribe((res: any) => {
        this.fullUsers.push(res);
        if (i == this.users.length-1) {
          this.fullUsers.sort((a,b) => (a.balance.points < b.balance.points) ? 1 : ((b.balance.points < a.balance.points) ? -1 : 0));
          this.loading = false;
        }
      })
    }
  }

  // Call each user to get all details
  selectUser(user: any) {
    this.httpService.getUserDetails(user.id, user.programId, user.levelId).subscribe((res: any) => {
      this.selectedUser.user = user;
      this.selectedUser.activities = res[0];
      this.selectedUser.job = res[1].name;
      this.selectedUser.level = this.getLevel(res[2].name)
    });
  }

  // Define the level of user
  getLevel(level: String) {
    switch(level) {
      case 'Bronze':
        return {
          init: level,
          next: 'Silver',
          index: 0
        };

        break;
      case 'Silver':
        return {
          init: level,
          next: 'Gold',
          index: 1
        };
        break;
      case 'Gold':
        return {
          init: level,
          next: 'Platinum',
          index: 2
        };
        break;
      case 'Platinum':
        return {
          init: level,
          next: '',
          index: 3
        };
        break;
      default:
        return 0;
    }
  }

}
