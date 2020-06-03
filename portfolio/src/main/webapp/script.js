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

/**
 * using async to fetch /data sections
 * improves readability and simpleness
 */
async function getDataAsyncAwait() {
  const response = await fetch('/data');
  const comments = await response.text();
  document.getElementById('data-container').innerText = comments;
}
