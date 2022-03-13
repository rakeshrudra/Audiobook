export interface dateFormate{
    readable: string,
    gregorian: {
        date: string,
        day: string,
        weekday: {
            en: string
        },
        month: {
            en: string
        },
        year: string,
        designation: {
            abbreviated: string,
        }
    },
    hijri: {
        date: string,
        day: string,
        month: {
            en: string,
        },
        year: string,
        designation: {
            abbreviated: string
        }
    }
}
