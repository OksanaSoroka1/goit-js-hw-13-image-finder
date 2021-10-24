import PhotoApiServis from './apiService';
import photoListTemplate from '../templates/photoList.hbs';
import { notice, error,  defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import lightboxModal from './lightboxImage';


const searchForm = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-button');
const showLessBtn = document.querySelector('.button-showLess');

searchForm.addEventListener('submit', onLoadBtnClick);

const newPhotoApiServis = new PhotoApiServis();

//on load button click
async function onLoadBtnClick(event){   
event.preventDefault();

newPhotoApiServis.query = event.currentTarget.elements.query.value;
newPhotoApiServis.resetPage();
 clearList();
 loadMoreBtnIsHidden();
 try {
   const photosArrey = await renderCards()
    if(photosArrey.hits.length === 0){
        const myNotice = notice({text: "Not found. Enter the word"})
         return
     }      
    loadMoreBtnIsVisible()          
 } catch (err) {
    if(photosArrey.hits.length === 0){return}
    console.log(err);
   const myError = error({text: `Error! ${err}`})
 }
}

// fetch and render on loadMoreBtn click
async function onLoadMoreBtnClick(event){  
  try {
    const photosArrey = await renderCards();
    smoothScroll(photosArrey.hits[0].id)
    
  } catch (err) {
    console.log(err);
    const myError = error({text: `Error! ${err}`})
  }  
}

//function fetch and render cards
async function renderCards(){
   const photos = await newPhotoApiServis.toFetchPhotos()    
    await galleryList.insertAdjacentHTML('beforeend', photoListTemplate(photos));
    lightboxModal('.photo-card');
    showLessBtnIsVisible()
    return photos;      
}

//smooth scroll
function smoothScroll(elem){
    const element = document.getElementById(`${elem}`);
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
}

//clear list
function clearList(){
    galleryList.innerHTML = '';
}

//load more button
function loadMoreBtnIsVisible(){
    loadMoreBtn.classList.add('is-visible');
    loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)
}
function loadMoreBtnIsHidden(){
    loadMoreBtn.classList.remove('is-visible');
    loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick)
}

//showLess button
function showLessBtnIsVisible(){
    setInterval(() => {
        if (window.pageYOffset > 400) {
            showLessBtn.classList.add('is-visible');
            showLessBtn.addEventListener('click', onShowLessBtnClick)
        }
        else{
            showLessBtn.classList.remove('is-visible');
            showLessBtn.removeEventListener('click', onShowLessBtnClick);
        }
    }, 1000
    )
    
}
function onShowLessBtnClick(event){
    smoothScroll('search-form');   
}
