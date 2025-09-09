import { lighten } from "polished";

export const getLighterColor = (color: string, lightenScale: number = 0.25) => {
    const lighterColor = lighten(lightenScale, color);
    return lighterColor
}

export const isHTML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);

export const cleanGeminiOutput = (raw: string) =>
    raw.replace(/```html/g, "").replace(/`/g, "");

export const isValidHex = (color?: string): boolean => {
    return color ? /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(color) : false;
}
