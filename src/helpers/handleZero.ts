export const handleZero = (num:string) => {
        
    if (num.length === 1) return '0' + num
    if (num.length === 2) return num
    
    while (num[0] === '0' && num.length > 2) num = num.substring(1)  
    return num
}