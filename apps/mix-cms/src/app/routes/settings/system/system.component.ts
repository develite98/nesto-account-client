import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mix-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
