import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './my-cars.page.html',
  styleUrls: ['./my-cars.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyCarsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
