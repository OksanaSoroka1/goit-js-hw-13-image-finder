import { notice, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


const BASE_URL = 'https://pixabay.com/api/';
const API_key = '23969951-9657d20fcde1193b572e11c69';

export default class PhotoApiServis{
  constructor(){
    this.page = 1,
    this.searchQuery = ''
  }

 async toFetchPhotos(){
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_key}`
    if(this.searchQuery.length > 0){
        const responce = await fetch(url);
        const photos = await responce.json();
        this.incrementPage();
        return photos        
    }
    else{
      const myNotice = notice(
          {text: 'Please enter the word'}
      )
  } 
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage(){
    this.page += 1;
  }
  resetPage(){
  this.page = 1;
  }
}

