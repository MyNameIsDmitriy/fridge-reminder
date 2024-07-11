export default class ValidateForm {
  errMsg = [];

  // TODO: useless async ?
  async validateEmail(email) {
    const errorMassage = "Invalid email address";

    const isEmailValid = email
      .toLowerCase()
      .match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      );

    if (!isEmailValid) {
      this.errMsg.push(errorMassage);
      return errorMassage;
    }
  }

  async validatePassword(password) {
    const errorMessages = [];

    if (!password || password === null) {
      this.errMsg.push("Password is a required field");
      errorMessages.push("Password is a required field");
    }

    if (password.length < 8) {
      this.errMsg.push("The password must be at least 8 characters");
      errorMessages.push("The password must be at least 8 characters");
    }

    if (password.length > 32) {
      this.errMsg.push("Let's be honest, you don't need such a long password");
      errorMessages.push(
        "Let's be honest, you don't need such a long password"
      );
    }

    if (!password.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
      this.errMsg.push(
        "The password must contain at least one lowercase and uppercase character"
      );
      errorMessages.push(
        "The password must contain at least one lowercase and uppercase character"
      );
    }

    if (!password.match(/\d/)) {
      this.errMsg.push("The password must contain at least one digit");
      errorMessages.push("The password must contain at least one digit");
    }

    if (!password.match(/(?=.*?[#?!@$%^&*_-])/)) {
      this.errMsg.push(
        "The password must contain at least one special character"
      );
      errorMessages.push(
        "The password must contain at least one special character"
      );
    }

    return errorMessages.forEach((message) => {
      return message;
    });
  }

  async validatePasswordConfirm(password, passwordConfirm) {
    const errorMessage = "The passwords must match";
    if (password !== passwordConfirm) {
      this.errMsg.push(errorMessage);
      return errorMessage;
    }
  }
}
