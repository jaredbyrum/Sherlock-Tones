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
      let items = data.artists.items
      //show modal on error
      if (items.length == 0){
        
      } else {
      console.log(items)
      return items
      }
  }   

 async function searchArtist() {
  let search = localStorage.getItem('artist')
  let fetchString = `https://api.spotify.com/v1/artists/${search}/related-artists`
  const response = await fetch(fetchString,{
    headers: {
      'Authorization': 'Bearer ' + token 
    }
  });
    const data = await response.json();
    const artists = data.artists
    console.log(artists)
    return artists
 }

 // search based on genre
  async function displayGenreInfo(){
    let artistList = await searchGenre();
    for (let i = 0; i <= 5; i++){
      let artistInfo = {
              name: artistList[i].name,
              genre: artistList[i].genres,
              followers: artistList[i].followers.total,
              link: artistList[i].external_urls.spotify,
              photo: artistList[i].images[0].url,
              id: artistList[i].id
          }
          let genreStr = "";
          for (let index = 0; index < artistInfo.genre.length; index++){
              genreStr += artistInfo.genre[index] + ', '
            }
            $('#artist' + i).text(artistInfo.name)
            $('#genre' + i).text('Genres: ' + genreStr)
            $('#followers' + i).text('Followers: ' + artistInfo.followers)
            $('#link' + i).attr('href', artistInfo.link)
            $('#picture' + i).attr('style', 'background-image: url(' + artistInfo.photo + ')')
            $('#id' + i).attr('data', artistInfo.id)
    } 
  }

  //search for related artists
  async function displayArtistInfo(){
    let artistList = await searchArtist();
    for (let i = 0; i <= 5; i++){
      let artistInfo = {
              name: artistList[i].name,
              genre: artistList[i].genres,
              followers: artistList[i].followers.total,
              link: artistList[i].external_urls.spotify,
              photo: artistList[i].images[0].url,
              id: artistList[i].id
          }
          let genreStr = "";
          for (let index = 0; index < artistInfo.genre.length; index++){
              genreStr += artistInfo.genre[index] + ', '
            }
            $('#artist' + i).text(artistInfo.name)
            $('#genre' + i).text('Genres: ' + genreStr)
            $('#followers' + i).text('Followers: ' + artistInfo.followers)
            $('#link' + i).attr('href', artistInfo.link)
            $('#picture' + i).attr('style', 'background-image: url(' + artistInfo.photo + ')')
            $('#id' + i).attr('data', artistInfo.id)
    } 
  }

  window.onload = searchGenre();
  window.onload = displayGenreInfo();

  $('#nav-btn').on('click', function(event){
    event.preventDefault()
    localStorage.setItem('genre', $('#nav-search').val())
    displayGenreInfo();
  })
 
  $('.artist-button').on('click', function(event){
    event.preventDefault();
    localStorage.setItem('artist', $(event.target).attr('data'))
    displayArtistInfo();
  })

  $('#goBackBtn').on('click', function(event){
      event.preventDefault();
      document.location.assign(mainPage);
  })
})();