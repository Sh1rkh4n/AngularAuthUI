import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users : any = [];
  public role : string = "";
  public fullName : string = ""; 

  constructor(private api : ApiService, private auth : AuthService, private userStore : UserStoreService) { }

  ngOnInit(): void {
    this.api.getUsers()
      .subscribe(res=>{   //response
      this.users = res;
    })

    this.userStore.getFullNameFromStore()
      .subscribe(val=>{   //value
        const fullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = val || fullNameFromToken
      })

    this.userStore.getRolesFromStore()
      .subscribe(val=>{   //value
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken
      })
  }

  logOut(){
    this.auth.signOut();
  }


}
