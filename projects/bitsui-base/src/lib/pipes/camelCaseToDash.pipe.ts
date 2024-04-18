import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'camelCaseToDash'})
export class CamelCaseToDashPipe implements PipeTransform
{
    /**
     * Transform
     *
     * @param {string} value
     * @returns {string}
     */
    transform(value: string): string
    {
        return value ? String(value).replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`) : '';
    }
}
