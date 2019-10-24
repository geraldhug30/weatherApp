$textInput = document.getElementById('textInput');
$renderResult = document.getElementById('resultHere');

document.addEventListener('submit', e => {
  e.preventDefault();
  // important to put value in $textInput
  console.log($textInput.value);
  fetch(`/weather?address=${$textInput.value}`)
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data) {
      // Create and append the li's to the ul
      console.log(data);
      $renderResult.innerHTML = data.forecast;
    });
});
