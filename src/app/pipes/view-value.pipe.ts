import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewValue',
})
/**
 * The view value pipe is used to dynamically change the value of
 * a placeholder after selecting a value from a selection group.
 * @param value value of the option selected
 * @param viewValue value that visible to the user
 */
export class ViewValuePipe implements PipeTransform {
  transform(
    value: string,
    options: { value: string; viewValue: string }[]
  ): String {
    if (!options || options.length == 0) return '';
    const option = options.find((option) => option.value == value);
    if (option) {
      return option.viewValue;
    } else {
      return '';
    }
  }
}
