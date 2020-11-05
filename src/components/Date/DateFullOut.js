export default function(date) {

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

}