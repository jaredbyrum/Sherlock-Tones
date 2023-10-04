//app id and secret
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

//search offset
var offset = '0';
var search = localStorage.getItem('genre')
let fetchString = `https://api.spotify.com/v1/search?type=artist&q=genre:"${search}"&offset=${offset}`

async function searchGenre() {
    const access_token = await getAccessToken()
    const response = await fetch(fetchString,{
      headers: {
        'Authorization': 'Bearer ' + access_token 
      }
    });
    const data = await response.json();
    console.log(data.artists.items)
    return data.artists.items;
}
searchGenre()

$('#goBackBtn').on('click', function(event){
    event.preventDefault();
    document.location.assign(mainPage);
})
  