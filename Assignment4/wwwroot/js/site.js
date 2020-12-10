// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
//document.getElementById('searchBar').onkeypress = function (e) {
//    if (e.keyCode == 13) {
//        document.getElementById('searchBar').click();
//    }
//}


function searchValue() {

        var searchWord = document.getElementById('searchBar').value;
       

      //  var jsonSearch = JSON.stringify(search);
      //  var url = "/controller/searchcontroller"
        sendValue(searchWord);
}   

function sendValue(searchObj) {

  
    var search = searchObj;
    //alert(search)
    //$.ajax({
    //    traditional: true,
    //    type: "POST",
    //    url: "http://localhost:44387/api/Search/" + search,
    //    data: {searchObj: search},
    // //   contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (response) {
    //        if (response != null) {
    //            alert("GG EZ");
    //        } else {
    //            alert("Something went wrong");
    //        }
    //    },
    //    failure: function (response) {
    //        alert("failure " + search);
    //    },
    //    error: function (response) {
    //        alert("error " + search);
    //    }
    //});  

    $.ajax({
        url: "http://localhost:44387/api/Search/" + search, // Url of backend (can be python, php, etc..)
        type: "POST", // data type (can be get, post, put, delete)
        data: search, // data in json format
        async: false, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
        success: function (response, textStatus, jqXHR) {
            console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}





