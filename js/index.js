'use strict';

const displaySearchResults = data => {
  const articles = data.currentTarget.response.articles;

  let result;

  if (articles.length) {
    result = document.createElement('ul');
    result.className = 'results-list';
    articles.forEach(a => {
      result.appendChild(createResultItem(a));
    });
  }

  if (!result) result = createInlineTextTag('p', 'No results.', 'results-none');
  

  document.getElementById('results-container').appendChild(result);
};

const createResultItem = a => {
  const {urlToImage, author, title, description, url} = a;
  const li = document.createElement('li');
  li.className = 'news-item';
  li.appendChild(createDescription(author, title, description, url));
  li.appendChild(createThumbnail(urlToImage));

  return li;
};

const createDescription = (author, title, description, url) => {
  const a = document.createElement('a');
  a.className = 'results-link';
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.appendChild(createInlineTextTag('h2', title, 'article-title'));
  a.appendChild(createInlineTextTag('p', author, 'article-author'));
  a.appendChild(createInlineTextTag('p', description, 'article-description'));

  return a;
};

const createThumbnail = imageSrc => {
  const a = document.createElement('a');
  a.className = 'thumbnail-anchor';
  a.setAttribute('href', '#');

  const img = createThumbnailImage(imageSrc);
  a.appendChild(img);
  const modal = new Modal(img, a, 'modal-container');
  a.onclick = modal.openModal;

  return a;
};

const createThumbnailImage = imageSrc => {
  const img = document.createElement('img');
  img.setAttribute('alt', 'article thumbnail');
  img.setAttribute('src', imageSrc);
  img.className = 'thumbnail-img';

  return img;
};

const createInlineTextTag = (tagName, text, className) => {
  const el = document.createElement(tagName);
  el.style.display = 'inline';
  el.className = className;
  el.innerText = text;

  return el;
};

const onFormSubmit = (event) => {
  event.preventDefault();

  const searchTerm = event.target[0].value;
  event.target[0].value = '';

  document.getElementById('results-container').innerText = '';

  getSearchResults(searchTerm);
};

const xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.addEventListener('load', displaySearchResults);

const getSearchResults = (searchTerm) => {
  xhr.open('GET', `https://newsapi.org/v2/everything?q=${encodeURI(searchTerm)}&language=en&page=1&apiKey=95213d0606ed48ea8138c8e58d12a37e`);
  xhr.send();
};

document.getElementById('search-form').addEventListener('submit', onFormSubmit);
