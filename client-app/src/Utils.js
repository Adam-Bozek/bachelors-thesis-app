import bcrypt from 'bcryptjs';

// This bool function checks if the name was inputed
// On sucess function will return TRUE
export function checkName(name) {
    if (name === "") {
        return false;
    }
    return true;
}

// This bool function checks if the name was inputed
// On sucess function will return TRUE
export function checkSurname(surname) {
    if (surname === "") {
        return false;
    }
    return true;
}

// This bool function checks if the email was inputed corectly using regex
// On sucess function will return TRUE
export function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9](.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

// This bool function checks if the password was inputed
// On sucess function will return TRUE
export function checkPassword(password) {
    return password !== "";
}

// This bool function checks if the passwords input are not empty and if they are equal
// On sucess function will return TRUE
export function checkPasswords(password, passwordRepeat) {
    return password !== "" && passwordRepeat !== "" && password === passwordRepeat;
}


// This bool function checks if the email is allready registered
// On sucess function will return TRUE
export async function checkIfUserExists(email , apiAddress) {
    try {
        const response = await fetch(`${apiAddress}checkUser?email=${email}`);
        const result = await response.json();
        return !result.exists;
    } catch (error) {
        console.error("Error checking user existence:", error);
        return false;
    }
    //return true;
}

// This function hashes passwords
// Return is hashed string
const saltRounds = 10;
export function hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          reject(err);
        } else {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        }
      });
    });
  }