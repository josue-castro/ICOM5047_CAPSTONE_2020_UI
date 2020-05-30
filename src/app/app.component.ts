import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  layout = 1;
  constructor() {}
  ngOnInit(): void {
    const setLayout = setInterval(() => {
      this.layout++;
      if (this.layout == 4) {
        clearInterval(setLayout);
      }
    }, 30 * 1000);
  }
}
