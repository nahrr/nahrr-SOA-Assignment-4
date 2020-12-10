// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
//document.getElementById('searchBar').onkeypress = function (e) {
//    if (e.keyCode == 13) {
//        document.getElementById('searchBar').click();
//    }
//}
//44387

function searchValue() {

        var searchWord = document.getElementById('searchBar').value;
        sendValue(searchWord);
}   

function sendValue() {

   // var search = searchObj;
    var search = document.getElementById('searchBar').value;

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





