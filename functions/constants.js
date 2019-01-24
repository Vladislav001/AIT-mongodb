module.exports = Object.freeze({
    PROTOCOL: 'http://', // протокол 
    TIME_LIFE_TOKEN: 259200, // время жизни токена (72 часа)
    SECRET_STRING: "OJ5cIMkraDqoGfVv6dyYu7wDF", // секретная строка (для токена) - !!! нужно из переменной окружения
    MIN_LENGTH_CAREGIVER_PASSWORD: 5, // минимальная длина пароля caregiver
    MAX_LENGTH_CAREGIVER_PASSWORD: 30, // максимальная длина пароля caregiver
});
