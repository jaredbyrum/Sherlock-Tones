const resultsPage = './resultPage.html'

var genre = $('#search-box').val();

// redirect buttons
$('#search-btn').on('click', function(event){
  event.preventDefault();
  document.location.assign(resultsPage);
  localStorage.setItem('genre', $('#search-box').val())
})

// https://binaryjazz.us/wp-json/genrenator/v1/genre/ (RANDOM Genre Generator)
//makes some weird genres for inspo maybe?

function generateGenre() {
  fetch('https://binaryjazz.us/wp-json/genrenator/v1/genre/')
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data)
      $('#genrenator').val(data)
    })
}

$('#genre-search-btn').on('click', generateGenre)

