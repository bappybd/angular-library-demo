import {Component, Inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent, FuseProgressBarModule, FuseProgressBarService } from '@bitsui/bitsui-base';
import { FuseSidebarModule } from "../../../bitsui-base/src/lib/components/sidebar/sidebar.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FuseProgressBarModule, FuseSidebarModule, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'playground';

  constructor(public fuseProgressBarService: FuseProgressBarService){}

  buttonClick($event: any) {
    console.log('buttonClick')
  }

  ngOnInit(): void {
    this.fuseProgressBarService.setMode('indeterminate');
    setTimeout(() => this.fuseProgressBarService.show(), 1000);
  }
}
