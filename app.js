const select = document.querySelectorAll("select");
const input = document.querySelectorAll("input");
let html = "";

const getCurrencyApi = async () => {
  const fetchApi = await fetch(
    "https://v6.exchangerate-api.com/v6/d94c13ceb54b8ea8fe70ccb2/latest/USD"
  );
  const jsonApi = await fetchApi.json();
  //   console.log(jsonApi.conversion_rates);
  const arrkey = Object.keys(jsonApi.conversion_rates);
  //   console.log(arrkey);
  const rates = jsonApi.conversion_rates;
  console.log(rates);
  arrkey.map((item) => {
    return (html += `<option value=${item}>${item}</option>`);
  });
  //   console.log(html);
  for (let i = 0; i < select.length; i++) {
    select[i].innerHTML = html;
  }
  console.log(rates[select[1].value]);
  input[0].addEventListener("keyup", () => {
    input[1].value =
      (input[0].value * rates[select[1].value]) / rates[select[0].value];
  });
  input[1].addEventListener("keyup", () => {
    input[0].value =
      (input[1].value * rates[select[0].value]) / rates[select[1].value];
  });
  select[0].addEventListener("change", () => {
    input[1].value =
      (input[0].value * rates[select[1].value]) / rates[select[0].value];
  });
  select[1].addEventListener("change", () => {
    input[0].value =
      (input[1].value * rates[select[0].value]) / rates[select[1].value];
  });
};

getCurrencyApi();
