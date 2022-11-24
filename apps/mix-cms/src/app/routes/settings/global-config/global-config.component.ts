import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mix-global-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-config.component.html',
  styleUrls: ['./global-config.component.scss']
})
export class GlobalConfigComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
