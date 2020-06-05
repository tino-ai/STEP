// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAsaP19yKsepBs_t4AW-Hsk7wg3M58MLMY&callback=initMap';
script.defer = true;
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {
  // JS API is loaded and available
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

function openmodal() {
  document.querySelector('.modal').style.display = 'flex';
}


function closemodal() {
  document.querySelector('.modal').style.display = 'none';
}

function open_earth_modal() {
  document.querySelector('.earth_modal').style.display = 'flex';
}

function close_earth_modal() {
  document.querySelector('.earth_modal').style.display = 'none';
}

function open_venus_modal() {
  document.querySelector('.venus_modal').style.display = 'flex';
}

function close_venus_modal() {
  document.querySelector('.venus_modal').style.display = 'none';
}

function open_mars_modal() {
  document.querySelector('.mars_modal').style.display = 'flex';
}

function close_mars_modal() {
  document.querySelector('.mars_modal').style.display = 'none';
}

function open_mercury_modal() {
  document.querySelector('.mercury_modal').style.display = 'flex';
}

function close_mercury_modal() {
  document.querySelector('.mercury_modal').style.display = 'none';
}

function open_uranus_modal() {
  document.querySelector('.uranus_modal').style.display = 'flex';
}

function close_uranus_modal() {
  document.querySelector('.uranus_modal').style.display = 'none';
}

function open_neptune_modal() {
  document.querySelector('.neptune_modal').style.display = 'flex';
}

function close_neptune_modal() {
  document.querySelector('.neptune_modal').style.display = 'none';
}

function open_comments() {
  document.querySelector('.comments_modal').style.display = 'flex';
}

function close_comments() {
  document.querySelector('.comments_modal').style.display = 'none';
}

function open_translate() {
  document.querySelector('.translate_modal').style.display = 'flex';
}

function close_translate() {
  document.querySelector('.translate_modal').style.display = 'none';
}

/** Fetches tasks from the server and adds them to the DOM. */
function load_comments() {
  fetch('/data').then(response => response.json()).then((comments) => {
    const commentListElement = document.getElementById('comment-list');
    comments.forEach((comment) => {
      commentListElement.appendChild(create_CommentElement(comment));
    })
  });
}

/** Creates an element that represents a task, including its delete button. */
function create_CommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const titleElement = document.createElement('span');
  titleElement.innerText = comment.info;
  const nameElement = document.createElement('span');
  nameElement.innerText = comment.username;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    delete_comment(comment);

    // Remove the task from the DOM.
    commentElement.remove();
  });

  commentElement.appendChild(nameElement);
  commentElement.appendChild(titleElement);
  commentElement.appendChild(deleteButtonElement);
  return commentElement;
}

/** Tells the server to delete the task. */
function delete_comment(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-data', {method: 'POST', body: params});
}

/** Creates a map and adds it to the page. */
function create_map() {
  // The location of Uluru
  var detroit = {lat: 42.331, lng: -83.046};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: detroit});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: detroit, map: map});
}

function requestTranslation() {
    //grabs the language and text to translate
  const text = document.getElementById('text').value;
  const languageCode = document.getElementById('language').value;

  const resultContainer = document.getElementById('result');
  resultContainer.innerText = 'Loading...';

  const params = new URLSearchParams();
  params.append('text', text);
  params.append('languageCode', languageCode);

 //POST to the translation servlet
  fetch('/translate', {
      method: 'POST',
      body: params
      }).then(response => response.text())
      .then((translatedMessage) => {
        resultContainer.innerText = translatedMessage;
        });
}

function translate() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}