const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = array => {
    if (array.length === 0) {
        return 0; // Devuelve 0 si el arreglo está vacío
    }
    let sum = 0;
    array.forEach(num => { sum += num; });
    return sum / array.length;
};

module.exports = {
    reverse,
    average
}


