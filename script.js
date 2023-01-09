let inputs = document.querySelectorAll("input");

let errors = {
  name_lastname: [],
  username: [],
  email: [],
  password: [],
  confirmPassword: [],
};

inputs.forEach((e) => {
  e.addEventListener("change", (input) => {
    let inputTarget = input.target;
    let inputValue = inputTarget.value;
    let inputName = inputTarget.getAttribute("name");

    if (inputValue.length > 4) {
      errors[inputName] = [];
      switch (inputName) {
        case "name_lastname":
          let validation = inputValue.trim("");
          validation = validation.split(" ");

          if (validation.length < 2) {
            errors[inputName].push("First and last name required");
          }
          break;
        case "email":
          if (!validateEmail(inputValue)) {
            errors[inputName].push("Еmail is not valid");
          }
          break;
        case "confirmPassword":
          let password = document.querySelector('input[name="password"]').value;
          if (inputValue !== password) {
            errors[inputName].push("Passwords do not match");
          }
          break;
      }
    } else {
      errors[inputName] = ["The field cannot have less than 5 characters"];
    }
    console.log(inputTarget);
    populateErrors();
  });
});

function populateErrors() {
  for (elem of document.querySelectorAll("ul")) {
    elem.remove();
  }
  for (key of Object.keys(errors)) {
    let inputName = document.querySelector(`input[name = "${key}"]`);

    let parentEl = inputName.parentElement;

    let ulElement = document.createElement("ul");
    parentEl.appendChild(ulElement);

    errors[key].forEach((error) => {
      let liElement = document.createElement("li");
      liElement.innerText = error;
      ulElement.appendChild(liElement);
    });
  }
}
const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
