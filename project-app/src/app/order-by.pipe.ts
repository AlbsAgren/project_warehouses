/*
 * Pipe for ordering elements in an array, adapted from my lab4 solution
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  /**
   * Method for performing the reordering
   * @param value the array of objects to be ordered
   * @param field the field to order by
   * @param reverse sort in reverse order if true
   */
  transform(value: any[], field: string, reverse: boolean = false): any[] {
    if(!value) {
      return value;
    }

    // sort objects by the selected field, case insensitive
    return value.sort((a: any, b: any): number => {
      let valA = a[field];
      let valB = b[field];

      // handle some undefined values in the subject data
      valA = typeof valA !== 'undefined' ? valA : null;
      valB = typeof valB !== 'undefined' ? valB : null;

      // any comparison with null values are considered equal
      if(valA === null || valB === null) {
        return 0;
      }

      // make comparison case-insensitive if values are not numbers
      if(isNaN(valA)) {
        valA = valA.toUpperCase();
        valB = valB.toUpperCase();
      }

      // only sort by warehouse number
      if(field === 'name') {
        valA = Number(valA.replace( /^\D+/g, ''));
        valB = Number(valB.replace( /^\D+/g, ''));
      }

      // sort in reverse order if reverse true
      if(!reverse) {
        if(valA < valB) {
          return -1;
        }
        if(valA > valB) {
          return 1;
        }
      } else {
        if(valA > valB) {
          return -1;
        }
        if(valA < valB) {
          return 1;
        }    
      }
      return 0; // if valA and valB are equal
    });
  }
}
