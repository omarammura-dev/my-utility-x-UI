// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.slice(0, limit).lastIndexOf(' ');
    }
    return `${value.slice(0, limit)}${ellipsis}`;
  }

}