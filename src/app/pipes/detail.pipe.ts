import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'detail'
})
export class DetailPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(value: any, data: any): any {
    console.log(value);
    console.log(data);
    let result = '';
    switch (data.pipe) {
      case '':
        result = value;
        break;
      case 'date':
        result = this.datePipe.transform(value, 'medium');
        break;
      case 'image':
        result = value;
        break;
      default:
        result = value;
    }
    return result;
  }

}
