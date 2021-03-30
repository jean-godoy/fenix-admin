export default function (date) {

    if (date === null) {
        return " - ";
    }

    // var d = new Date(),
    //     month = '' + (d.getMonth() + 1),
    //     day = '' + d.getDate(),
    //     year = d.getFullYear();

    // let dateNow = [year, month, day].join('-');

    const now = new Date(); // Data de hoje
    const past = new Date(date); // Outra data no passado
    const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

    // Mostra a diferença em dias
    console.log(`Entre ${now} até agora já se passaram ${days} dias`);

    return days - 2;

}