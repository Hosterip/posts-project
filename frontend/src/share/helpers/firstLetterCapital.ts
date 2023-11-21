
export const firstLetterCapital = (str: string): string => {
    const firstPart: string = str.charAt(0).toUpperCase()
    const lastPart: string = str.slice(1)

    return firstPart + lastPart
};

