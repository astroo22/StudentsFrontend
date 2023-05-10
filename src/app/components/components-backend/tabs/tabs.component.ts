import { Component, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  template: `
    <div class="tab-header">
      <div
        class="tab-label"
        *ngFor="let tab of tabs"
        [class.active]="tab.active"
        (click)="selectTab(tab)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tab-content">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {
  @Input() label: string;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit() {
    const activeTab = this.tabs.find(tab => tab.active);
    if (!activeTab && this.tabs.length > 0) {
      this.tabs.first.active = true;
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach(t => (t.active = false));
    tab.active = true;
  }
}