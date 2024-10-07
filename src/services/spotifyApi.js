const getAccessToken = async () => {
    const clientID = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    // Check if we have a cached token
    let cachedToken = localStorage.getItem('spotifyToken');
    let tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    //Converting back to number//
    tokenExpirationTime = tokenExpirationTime
      ? parseInt(tokenExpirationTime, 10)
      : null;
    //Conditional to check if token is still valid//
    if (cachedToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
      console.log(
        `This token will expire at ${new Date(
          tokenExpirationTime
        ).toLocaleTimeString([], {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}.`
      );
      return cachedToken;
    }
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${clientID}:${clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    const accessToken = data.access_token;
    // Store the new token and its expiration time in local storage//
    localStorage.setItem('spotifyToken', accessToken);
    tokenExpirationTime = Date.now() + data.expires_in * 1000;
    localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
    return accessToken;
  };
  //Function to fetch Artist by name//
  export const fetchArtist = async (artistName) => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          artistName
        )}&type=artist`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch artist');
      }
      const data = await response.json();
      if (data.artists.items.length === 0) {
        throw new Error('Artist not found');
      }
      return data.artists.items;
    } catch (error) {
      console.error('Error fetching artist:', error);
      return []; // Return an empty array or handle the error accordingly
    }
  };
  // Function to fetch related artists by artist ID
  export const fetchRelatedArtists = async (artistId) => {
    const accessToken = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data.artists;
  };

  // Function to search for an album by artist name and album name
export const searchAlbum = async (artistName, albumName) => {
    try {
        const accessToken = await getAccessToken();
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=album:${encodeURIComponent(albumName)}%20artist:${encodeURIComponent(artistName)}&type=album`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to search for album');
        }

        const data = await response.json();

        // Check if any albums were found
        if (data.albums.items.length === 0) {
            console.log('No albums found');
            return null;
        }

        // Assuming you want the first album found
        const album = data.albums.items[0];

        const albumDetailsResponse = await fetch(
            `https://api.spotify.com/v1/albums/${album.id}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!albumDetailsResponse.ok) {
            throw new Error('Failed to fetch album details');
        }

        const albumDetails = await albumDetailsResponse.json();


        return {
            albumId: album.id,
            albumName: album.name,
            artistName: album.artists[0].name, // Get the first artist name
            image: album.images[0]?.url, // Get the first image (if exists)
            audioSample: albumDetails.tracks.items[0]?.preview_url 
        };
    } catch (error) {
        console.error('Error searching for album:', error);
        return null; // Return null or handle the error accordingly
    }
};
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  