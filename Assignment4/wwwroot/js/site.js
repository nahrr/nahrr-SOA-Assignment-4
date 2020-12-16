// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Skickar värdet från searchBar till controller
function sendValue() {

    var search = document.getElementById('searchBar').value;
    if (document.getElementById('searchBar').value.length == 0) {
        alert("Sökfältet är tomt");
        return;
    } 
        console.log("test");
        $.ajax({
            //traditional: true,
            type: "POST",
            url: "http://localhost:50261/api/search/" + search,
            data: { searchObj: search },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    alert("GG EZ");
                } else {
                    alert("Something went wrong");
                }
            },
            failure: function (response) {
                alert("failure " + search);
            },
            error: function (response) {
                alert("error " + search);
            }
        });
}





