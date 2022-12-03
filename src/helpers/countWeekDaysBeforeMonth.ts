export const countWeekdaysBeforeMonth = (weekday: number, date: number) => {
    const w = weekday === 0 ? 6 : weekday - 1 
    const ds = w - (date % 7) + 1
    return ds >= 0 ? ds : ds + 7
}