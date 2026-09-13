import { Directive, model, output } from '@angular/core';
import { FormValueControl, transformedValue } from '@angular/forms/signals';
import { FullName } from '../../domain/model/full_name';


@Directive({
  selector: 'input[parseFullName]',
  host: {
    '[value]': 'uiValue()',
    '(input)': 'uiValue.set($any($event.target).value)',
    '(blur)': 'touch.emit()'
  }
})
export class ParseFullNameDirective implements FormValueControl<FullName | null> {

  readonly touch = output()

  readonly value = model.required<FullName | null>()

  protected readonly uiValue = transformedValue(this.value, {
    format: fullName => fullName ? fullName.toString() : '',
    parse: raw => {
      try {
        return { value: FullName.fromString(raw) }
      } catch(e) {
        return {
          value: null,
          error: {
            kind: 'parse',
            message: String(e)
          }
        }
      }
    }
  })

}