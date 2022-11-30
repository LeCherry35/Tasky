export const timestampToString = (timestamp: number) => {
    const sec = Math.floor(timestamp/1000)
    if(sec > 24 * 60 * 60) {
        const days = Math.floor(sec/(24 * 60 * 60))
        return days + (days === 1 ? ' day' : ' days')
    } else {
        const hrs = Math.trunc(sec/( 60 * 60))
        const mins = Math.trunc((sec - hrs * 3600)/ 60)
        const secs = sec - hrs* 3600 - mins * 60
        
        return hrs + ' : ' + mins + ' : ' + secs
    }
} 