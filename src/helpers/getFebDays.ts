export const getFebDays = () => {
    const now = new Date(Date.now())
    return now.getFullYear()%4 === 0 ? 29 : 28
} 