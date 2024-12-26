import { randomInt } from 'crypto';

const letters: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

const numbers: number[] = Array.from({ length: 10 }, (_, index) => index);

export function generateTID(): string {
    const currentDate: string = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const currentTime: string = new Date().toLocaleTimeString('en-GB', { hour12: false });

    const date: string = currentDate.replace(/-/g, '');
    const time: string = currentTime.replace(/:/g, '');

    let result: string = '';
    result += date;
    result += randomChoice(numbers);
    result += randomChoice(numbers);
    result += randomChoice(letters);
    result += randomChoice(numbers);
    result += randomChoice(numbers);
    result += randomChoice(letters);
    result += randomChoice(numbers);
    result += randomChoice(numbers);
    result += randomChoice(numbers);
    result += time;
    result += randomChoice(letters);
    result += randomChoice(letters);
    result += randomChoice(numbers);
    result += randomChoice(letters);
    result += randomChoice(numbers);
    result += randomChoice(letters);
    result += randomChoice(numbers);
    result += randomChoice(letters);

    return result;
}

export function randomChoice<T>(array: T[]): T {
    const randomIndex: number = randomInt(0, array.length);
    return array[randomIndex];
}

export function generateId(length: number = 12): string {
    const chars: string = letters.join('') + numbers.join('');
    let id: string = '';
    for (let i = 0; i < length; i++) {
        id += chars.charAt(randomInt(0, chars.length));
    }
    return id;
}
