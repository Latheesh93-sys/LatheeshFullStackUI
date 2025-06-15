import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoDate'
})
export class IsoDatePipe implements PipeTransform {

  transform(dateStr: string): string {
    if (!dateStr) return '';
    const [dd, mm, yyyy] = dateStr.split('-');
    return `${yyyy}-${mm}-${dd}`;
  }

}
