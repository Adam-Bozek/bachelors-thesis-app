import bcrypt from 'bcryptjs';

const apiKey = "8be5864ea8195c870a50d065bcaf5f2e831f188c0ca05091e692b5b96c90fff5";

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


// This bool function checks if the User credentials are not empty and if they are equal
// On sucess function will return TRUE
export async function verifyUserLogin(email, password, apiAddress) {
  try {
    const response = await fetch(apiAddress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      // Authentication successful
      console.log('Authentication successful');
      return true;
    } else {
      // Authentication failed
      console.log('Authentication failed');
      return false;
    }
  } catch (error) {
    console.error('Error during authentication: ' + error);
    return false;
  }
};

// This bool function checks if the email is allready regis
// On sucess function will return TRUE
export async function verifyUserExistance(email, apiAddress) {
  try {
    const response = await fetch(apiAddress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (response.ok) {
      // No user found with provided email address
      return true;
    } else {
      // User found with provided email address
      return false;
    }
  } catch (error) {
    console.error('Error during authentication: ' + error);
    return false;
  }
};

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