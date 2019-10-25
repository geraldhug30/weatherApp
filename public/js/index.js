$textInput = document.getElementById('textInput');
$renderResult1 = document.getElementById('resultHere-1');
$renderResult2 = document.getElementById('resultHere-2');
$renderResult3 = document.getElementById('resultHere-3');
$button = document.getElementById('btn');
$allInput = document.querySelectorAll('li');
document.addEventListener('submit', e => {
  e.preventDefault();
  // important to put value in $textInput
  $allInput[0].innerHTML = '<h3>Loading...</h3>';
  $button.disabled = true;
  fetch(`/weather?address=${$textInput.value}`)
    .then(resp => {
      try {
        return resp.json();
      } catch (err) {
        $loading.innerHTML = 'Error! please try again';
      }
    }) // Transform the data into json
    .then(function(data) {
      // Create and append the li's to the ul
      try {
        if (data.error) {
          $allInput.forEach(value => (value.innerHTML = ''));
          $button.disabled = false;
          $allInput[0].innerHTML = '<h3>Please try another search!</h3>';
          return;
        }

        $button.disabled = false;
        $allInput[0].innerHTML = '<h3>Weather Forecast</h3>';
        $renderResult1.innerHTML =
          'Location: <strong>' + data.location + '</strong>';
        $renderResult2.innerHTML =
          'Forecast: <strong>' + data.forecast + '</strong>';
        $renderResult3.innerHTML =
          'Search key: <strong>' + data.address + '</strong>';
      } catch (err) {
        console.log(err);
        $loading.innerHTML = 'Error!';
      }
    });
});
