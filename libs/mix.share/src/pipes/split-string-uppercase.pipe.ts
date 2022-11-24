import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'splitStringByUppercase', standalone: true })
export class SplitStringByUppercasePipe implements PipeTransform {
  public transform(value: string | null): string | null {
    if (value == null || value === '' || value === 'N/A' || value !== value)
      return value;

    return value.split(/(?=[A-Z])/).join(' ');
  }
}
