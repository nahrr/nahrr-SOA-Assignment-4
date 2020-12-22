// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Sätter månadens första och sista datum i datumfälten
document.onreadystatechange = function setDate() {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
            
        var firstDay = new Date(y, m, 1)
            .toLocaleString()
            .split("T")[0]
            .replace("00:00:00", "")
            .trim();
        
        var lastDay = new Date(y, m + 1, 0)
            .toLocaleString()
            .split("T")[0]
            .replace("00:00:00", "")
            .trim();
        
        document.getElementById('startDate').value = firstDay;
        document.getElementById('endDate').value = lastDay;
}


// Skickar värdet från searchBar och datum till controller och returnerar en lista på scheman
function getValues() {

        var search = document.getElementById('searchBar').value;
        var startDate = document.getElementById('startDate').value;
        var endDate = document.getElementById('endDate').value;

        if (document.getElementById('searchBar').value.length == 0) {
            alert("Sökfältet är tomt");
            return;
        } 

        //var showTable = document.getElementById('superTable');
        //showTable.style.display = "block"; 
       
        $.ajax({
            //traditional: true,
            type: "GET",
            url: "http://localhost:50261/api/search/" + search + "/" + startDate + "/" + endDate, // calla backend på annat sätt?
            data: { searchObj: search, start: startDate, end: endDate },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // response = Lista från SearchController
            success: function (response) {
                if (response != null) {
                    console.log(response);
                    displaySchedule(response);
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

function displaySchedule(response) {

    var container = document.getElementById('tableContainer');

    for (var i = 0; i < response.length; i++) {
        var table = `<table class="table table-striped table-bordered table-sm" id="superTable${i}" style="display:block;">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Datum</th>
                    <th scope="col">Tid</th>
                    <th scope="col">Lokal/plats</th>
                    <th scope="col">Lärare</th>
                    <th scope="col">Aktivitet</th>
                    <th scope="col">Kurs/Program</th>
                    <th scope="col">Information</th>
                    <th scope="col">Övrigt</th>
                </tr>
            </thead>
            <tbody id="scheduleTable${i}">`;
       
        for (var j = 0; j < response[i].reservations.length; j++) {
            table += `<tr>
                        <td><span id="localId${i}">${response[i].reservations[j].startdate}</span></td>
                        <td><span id="startTimeId${i} endTimeId${i}">${response[i].reservations[j].starttime} - ${response[i].reservations[j].endtime}</span></td>    
                        <td><span id="localId${i}">${response[i].reservations[j].columns[1]}</span></td>
                        <td><span id="teacherId${i}">${response[i].reservations[j].columns[2]}</span></td>
                        <td><span id="activityId${i}">${response[i].reservations[j].columns[3]}</span></td>
                        <td><span id="courseNameId${i}">${response[i].reservations[j].columns[5]}</span></td> 
                        <td><span id="infoId${i}">${response[i].reservations[j].columns[7]}</span></td> 
                        <td><span id="additionalInfoId${i}">${response[i].reservations[j].columns[8]}</span></td> 
                      </tr>`;
        }

        table += `</tbody>
            </table>`;

        container.innerHTML += table;
    }

}


}





