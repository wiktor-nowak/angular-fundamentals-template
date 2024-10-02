import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: number | null): string {
        if (typeof value === 'number') {
            return Math.floor(value/60).toString().padStart(2, '0') + ":" + (value%60).toString().padStart(2, '0')
        } else return "00:00"
    }
}
