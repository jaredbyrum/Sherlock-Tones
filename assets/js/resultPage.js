//app id and secret
(async () => {
  const client_id = '7087dddc2d0d4a6b98f48401d9c33bae';
  const client_secret = '5518bba19e0d4c79af09c0e53a2b8a43';
  const mainPage = './index.html'

  //generate acces token for API
  let access_token;
  async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    access_token = data.access_token;
    return access_token
  }
  const token = await getAccessToken()
  console.log(token)

  //search variables
  

  async function searchGenre() {
      let search = localStorage.getItem('genre')
      let fetchString = `https://api.spotify.com/v1/search?type=artist&q=genre:"${search}"&limit=50`
      const response = await fetch(fetchString,{
        headers: {
          'Authorization': 'Bearer ' + token 
        }
      });
      const data = await response.json();
      items = data.artists.items
      console.log(items)
      return items
  }   

  async function displayInfo(){
    let artistList = await searchGenre();

    let artistInfo = {
        name: artistList[4].name,
        genre: artistList[4].genres,
        followers: artistList[4].followers.total,
        link: artistList[4].external_urls.spotify,
        photo: artistList[4].images[0].url
    }
    let genreStr = "";
    for (let index = 0; index < artistInfo.genre.length; index++){
         genreStr += artistInfo.genre[index] + ', '
      }
    for (let i = 1; i <= 5; i++){
      $('#artist' + i).text(artistInfo.name)
      // for loop this VVV
      $('#genre' + i).text('Genres: ' + genreStr)
      $('#followers' + i).text('Followers: ' + artistInfo.followers)
      $('#link' + i).text(artistInfo.link)
      $('#picture' + i).attr('style', 'background-image: url(' + artistInfo.photo + ')') 
    }
  }

  window.onload = searchGenre();
  window.onload = displayInfo();

  $('#nav-btn').on('click', function(event){
    event.preventDefault()
    localStorage.setItem('genre', $('#nav-search').val())
    searchGenre();
    displayInfo();
  })
 
  $('#goBackBtn').on('click', function(event){
      event.preventDefault();
      document.location.assign(mainPage);
  })
})();