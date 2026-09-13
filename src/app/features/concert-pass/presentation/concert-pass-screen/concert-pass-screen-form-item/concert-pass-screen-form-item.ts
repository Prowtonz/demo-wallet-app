import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  imports: [ MatIconModule ],
  selector: 'concert-pass-screen-form-item',
  styleUrl: './concert-pass-screen-form-item.css',
  templateUrl: './concert-pass-screen-form-item.html'
})
export class ConcertPassScreenFormItem {

  readonly icon = input.required<string>()

  readonly label = input.required<string>()

}