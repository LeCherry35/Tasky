export const compareStringTime = (start: string, end: string) => {
    const s = start.split(':')
    const e = end.split(':')
    const startMinutes = parseInt(s[0]) * 60 + parseInt(s[1])
    const endMinutes = parseInt(e[0]) * 60 + parseInt(e[1])
    return startMinutes < endMinutes
}