export const emailValidator = (value) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

export const nameValidator = (value) => {
  return /[A-Za-zА-Яа-яЁё\s-]+/.test(value);
};

export const minLength = (value, count) => {
  return value.length >= count;
};

export const maxLength = (value, count) => {
  return value.length <= count;
};

export const required = (value) => {
  return value.length > 0;
};

export const hasError = (errors) => {
  let result = false;
  for (const [key, value] of Object.entries(errors)) {
    result = value !== "";

    if (result) {
      break;
    }
  }

  return result;
};

export const validateValue = (name, value, validators) => {
  let valueIsValid = true;
  let errMessage = "";

  if (name in validators) {
    for (const item of validators[name]) {
      valueIsValid = item.validator(value);

      if (!valueIsValid) {
        errMessage = item.errMessage;
        break;
      }
    }
  }

  return { valueIsValid, errMessage };
};

export const emailValidators = [
  {
    validator: required,
    errMessage: "Эл. почта не заполнена",
  },
  {
    validator: emailValidator,
    errMessage: "Вы ввели неправильный адрес эл. почты",
  },
];

export const passwordValidators = [
  {
    validator: required,
    errMessage: "Пароль не заполнен",
  },
  {
    validator: (value) => minLength(value, 6),
    errMessage: "Длина пароля должна быть от 6 до 10 символов",
  },
  {
    validator: (value) => maxLength(value, 10),
    errMessage: "Длина пароля должна быть от 6 до 10 символов",
  },
];

export const nameValidators = [
  {
    validator: required,
    errMessage: "Имя не заполнено",
  },
  {
    validator: nameValidator,
    errMessage: "Имя может содержать только буквы",
  },
  {
    validator: (value) => minLength(value, 2),
    errMessage: "Длина имени должна быть от 2 до 30 символов",
  },
  {
    validator: (value) => maxLength(value, 30),
    errMessage: "Длина имени должна быть от 2 до 30 символов",
  },
];
