import PhotoApiServis from './apiService';
import photoListTemplate from '../templates/photoList.hbs';
import { notice, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';

const searchForm = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more-button')

searchForm.addEventListener('submit', onLoadBtnClick);

const newPhotoApiServis = new PhotoApiServis();

function onLoadBtnClick(event){   
event.preventDefault();

newPhotoApiServis.query = event.currentTarget.elements.query.value;
newPhotoApiServis.resetPage();
 clearList();
 loadMoreBtnIsHidden();
 renderCards()
    .then(photos => {
        if(photos.hits.length === 0){
         const myNotice = notice({text: "Not found. Enter the word"})
          return
        }      
         loadMoreBtnIsVisible()       
    })
    .catch(error => console.log(error)) 
}

function onLoadMoreBtnClick(event){  
    renderCards()
    .then(smoothScroll)
    .catch(error => console.log(error))     
}

//function render cards
function renderCards(){
   return newPhotoApiServis.toFetchPhotos()
    .then(photos => {
        galleryList.insertAdjacentHTML('beforeend', photoListTemplate(photos));
        renderimageModal();
       return photos;
    })   
}

function smoothScroll(){
    loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
}

function clearList(){
    galleryList.innerHTML = '';
}
function loadMoreBtnIsVisible(){
    loadMoreBtn.classList.add('is-visible');
    loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)
}
function loadMoreBtnIsHidden(){
    loadMoreBtn.classList.remove('is-visible');
    loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick)
}


//lightboxImage modal
function renderimageModal(){
    const photoCard = document.querySelectorAll('.photo-card');
    console.log("🚀 ~ file: renderImages.js ~ line 69 ~ photoCard", photoCard)
    photoCard.forEach(photoCard => photoCard.addEventListener('click', onImageClick))
    
}
function onImageClick(event){
    if(event.target.nodeName !== 'IMG'){return}
    const bigImgUrl = event.target.dataset.source;
    const bigImgAlt = event.target.alt
    const modalImage = basicLightbox.create(`
    <img src="${bigImgUrl}" alt="${bigImgAlt}">
    `)
    modalImage.show()
    
    }