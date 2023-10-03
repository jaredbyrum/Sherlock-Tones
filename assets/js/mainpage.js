//our app id and secret
const client_id = '7087dddc2d0d4a6b98f48401d9c33bae';
const client_secret = '5518bba19e0d4c79af09c0e53a2b8a43';

//function to generate access_token store in this variable vvv
//use access_token in following API requests to authorize the fetch
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
getAccessToken()

var genre = ''//value entered 
var offset = '0';

async function searchArtist(query) {
  const access_token = await getAccessToken()
  const response = await fetch(`https://api.spotify.com/v1/search?type=artist&q=genre%3Arock`, {
    headers: {
      'Authorization': 'Bearer ' + access_token 
    }
  });
  const data = await response.json();
  console.log(data.artists)
  console.log(data.artists.next)
  const next = await fetch(data.artists.next, {
    headers: {
      'Authorization': 'Bearer ' + access_token 
    }
  });
  const data2 = await next.json();
  console.log(data2)
  return data.artists.items;
}
searchArtist(); 
//https://binaryjazz.us/wp-json/genrenator/v1/genre/ (RANDOM Genre Generator)

//search?type=artist&q=genre%3Agenre
