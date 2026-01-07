import { randomBytes } from "crypto";

export const generateUID = (prefix: string, length = 8): string => {
    const CHARS: string = "0123456789";
    const bytes = randomBytes(length);
    let random: string = "";

    for (let i = 0; i < length; i++) {
        random += CHARS[bytes[i] % CHARS.length];
    }

    return `${prefix}-${random}`;
}

export const Time = {
    second: (n: number) => n * 1000,
    minute: (n: number) => n * 60 * 1000,
    hour: (n: number) => n * 60 * 60 * 1000,
    day: (n: number) => n * 24 * 60 * 60 * 1000,
    week: (n: number) => n * 7 * 24 * 60 * 60 * 1000,
};