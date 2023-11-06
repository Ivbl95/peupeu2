import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from 'src/app/services/drawer.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  constructor(private readonly drawerService: DrawerService) {}
  public ngOnInit(): void {
    this.drawerService.setDrawer(this.drawer);
  }
}
