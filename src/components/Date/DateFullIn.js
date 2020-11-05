// export default function(date) {
//     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
// }

export default function(date) {
    let day = date.getDate().toString();
    day = day.length === 1 ? `0${day}` : day;

    let month = (date.getMonth() + 1).toString();
    month = month.length === 1 ? `0${month}` : month;

    let year = date.getFullYear();

    return `${year}-${month}-${day}`;
}