import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "keys" })
export class KeysPipe implements PipeTransform {
    /**
     * Transform
     *
     * @param value
     * @param {string[]} args
     * @returns {any}
     */
    transform(value: any): any {
        const keys: any[] = [];

        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                keys.push({
                    key: key,
                    value: value[key],
                });
            }
        }

        return keys;
    }
}
