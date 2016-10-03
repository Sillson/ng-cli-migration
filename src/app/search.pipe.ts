import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], searchArg: any): any {
    let search:string = searchArg ? (searchArg+'').toLowerCase() : null; // cast to string
    let result = value;

    if(search){
      result = [];
      for(let row of value) {
        for (let property in row){
          let propertyValue: string = row[property];

          // If the value is a string and that string contains the search term...
          if(propertyValue.toLowerCase && propertyValue.toLowerCase().indexOf(search) >= 0){
            result.push(row);
            break;
          }
        }
      }
    }
    return result;
  }

}
