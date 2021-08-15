const urlBase = 'https://rickandmortyapi.com/api/';

const api = {
    urlCharacter: urlBase + 'character/',
    urlCharacterPagination: urlBase + 'character/?page=',
    urlCharacterSearch: urlBase + 'character/?name=',
    urlEpisode: urlBase + 'episode/',
    urlEpisodePagination: urlBase + 'episode/?page='
}
  
export { api };