import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array:Array<any>, ...args) {
    if(array) {
      const orderByArray:Array<OrderByElement> = this.getOrderByArray(args);

      array.sort((a: any, b: any) => {
        return this.compare(a, b, orderByArray)
      });

      return array;
    }
  }

  compare(a: any, b: any, orderByArray:Array<OrderByElement>, index:number=0){
    const name = orderByArray[index].name;
    const asc = orderByArray[index].asc;
    const nullHigh = orderByArray[index].nullHigh;

    const aVal = a[name];
    const bVal = b[name];
    const aNull = (aVal === null || aVal === undefined);
    const bNull = (bVal === null || bVal === undefined);

    // Check nullHigh Rules first
    if(nullHigh && ( aNull || bNull )){
      if(aNull && bNull && index < orderByArray.length-1)
        return this.compare(a, b, orderByArray, index+1);
      else if(aNull && bNull) return 0;
      else if(aNull) return 1*asc;
      else return -1*asc;
    }

    if(aVal < bVal) {
      return -1*asc;
    } else if (aVal > bVal) {
      return 1*asc;
    } else if (index < orderByArray.length-1) {
      return this.compare(a, b, orderByArray, index+1)
    } else {
      return 0
    }
  }

  getOrderByArray(args: Array<string>){
    const orderByArray:Array<OrderByElement> = [];
    // get the first element
    args.forEach((arg:string) => {

      let name = arg;
      let asc = 1;
      let nullHigh = false;

      // Check the whole possible prefix length

      let prefixLength = 0;
      for(let i = 0; i < 2; i++){
        const char = name.charAt(i);
        if(char === "!") {
          asc = -1;
          prefixLength++;
        } else if (char === '^'){
          nullHigh = true;
          prefixLength++;
        }
        else break;
      }
      name = name.substring(prefixLength);
      orderByArray.push({name, asc, nullHigh})
    });

    return orderByArray;
  }
}

interface OrderByElement{
  name: string, asc: number, nullHigh: boolean
}