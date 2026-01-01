export default function useDateFormater(timeInput: string){
    const newDate = new Date(timeInput)
    const date = newDate.toLocaleDateString('en-IN', {day: '2-digit'})
    const month = newDate.toLocaleDateString('en-IN', {month: '2-digit'})
    const year = newDate.toLocaleDateString('en-IN', {year: '2-digit'})
    const time = newDate.toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})
    return (
        {date, month, year, time}
    )
}