import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pfp',
  templateUrl: './pfp.component.html',
  styleUrl: './pfp.component.css'
})
export class PfpComponent {
  @Input() imageUrl: string = '';
}
