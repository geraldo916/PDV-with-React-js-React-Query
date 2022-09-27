 
 export const getNameMouth = (month) =>{

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        'Maio',
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ]
    return months[month]
}

 export default function getFormatedDate(date){
    const lastUnformated = new Date(date)
    const month = lastUnformated.getMonth() < 10 ? `0${lastUnformated.getMonth()}`: lastUnformated.getMonth()
    const day = lastUnformated.getDate() < 10 ? `0${lastUnformated.getDate()}`: lastUnformated.getDate()

    return{
        year:lastUnformated.getFullYear(),
        month:month,
        day:day
    }
}