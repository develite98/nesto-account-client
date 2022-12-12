import { Component } from '@angular/core';

@Component({
  selector: 'mix-momo-icon',
  template: `
    <svg
      width="32"
      height="30"
      viewBox="0 0 32 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <rect
        x="0.628906"
        width="30.872"
        height="29.2376"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlink:href="#image0_176_24967"
            transform="scale(0.00588235 0.00621118)"
          />
        </pattern>
        <image
          id="image0_176_24967"
          width="170"
          height="161"
          xlink:href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  `
})
export class MOMOIconComponent {}
