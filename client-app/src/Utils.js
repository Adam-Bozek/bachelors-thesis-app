import { SHA256 } from 'crypto-js';

export function checkName(name) {
    if (name === "") {
        return false;
    }
    return true;
}

export function checkSurname(surname) {
    if (surname === "") {
        return false;
    }
    return true;
}

export function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9](.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

export function checkPassword(password) {
    return password !== "";
}

export function checkPasswords(password, passwordRepeat) {
    return password !== "" && passwordRepeat !== "" && password === passwordRepeat;
}

export function checkIfUserExists(email , databaseAddress) {
    // eslint-disable-next-line
    { /*try {
        const response = await fetch(`${databaseAddress}checkUser?email=${email}`);
        const result = await response.json();
        return !result.exists;
    } catch (error) {
        console.error("Error checking user existence:", error);
        return false;
    }*/ }
    return true;
}

export function hashPassword(password) {
    // Ensure 'SHA256' is defined or imported
    return SHA256(password).toString();
}