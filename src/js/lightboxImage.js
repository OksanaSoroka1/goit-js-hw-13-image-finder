import * as basicLightbox from 'basiclightbox';

//lightboxImage modal
export default function renderimageModal(element){
    const photoCard = document.querySelectorAll(element);
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
    