// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let courses = [];
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value);
});
