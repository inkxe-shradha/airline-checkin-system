import { Component, Input, OnInit } from '@angular/core';
import menuList, { MenuItem } from 'src/app/config/menus.config';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() currentUser!: User | null;
  public menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = menuList.filter(ele => {
      if (this.currentUser?.isAdmin && ele.isAdminAccess) {
        return ele;
      } else if (!this.currentUser?.isAdmin && ele.isUserAccess) {
        return ele;
      } else {
        return null;
      }
    });
  }

}
