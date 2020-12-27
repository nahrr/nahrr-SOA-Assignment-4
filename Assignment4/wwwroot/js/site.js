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

    $('#errorMessage').empty();
    $('#tableContainer').empty();

    if (document.getElementById('searchBar').value.length == 0) {
        var container = document.getElementById('errorMessage');

        var error = `<div class="alert alert-danger" role="alert">Sökfältet är tomt</div>`;
        container.innerHTML += error;
        return;
    }

    $.ajax({
        type: "GET",
        url: "http://localhost:50261/api/search/" + search + "/" + startDate + "/" + endDate, // calla backend på annat sätt?
        data: { searchObj: search, start: startDate, end: endDate },
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            displaySchedule(response);
        },
        failure: function (response) {
            alert("failure " + search);
        },
        error: function (response) {
            var container = document.getElementById('errorMessage');

            var error = `<div class="alert alert-danger" role="alert">Inget resultat hittades för <i>${search}</i>. Kontrollera att din sökning är korrekt.</div>`;
            container.innerHTML += error;
        }
    });
}

function displaySchedule(courseList) {
   
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var scheduleContainer = document.getElementById('tableContainer');

    $('#tableContainer').empty();

    for (var i = 0; i < courseList.length; i++) {
        
        if (courseList[i].reservations.length > 0) {
            var table = `<table class="table table-bordered table-striped table-sm" id="superTable${i}" >
            
                <div class="mt-5"> 
                    <thead class="thead-dark">
                        <tr class="cursor-pointer" onclick="visibilityForListAndHeaders(${i})" id="superHeader${i}">
                            <th colspan="100%"> <i class="fa fa-window-maximize"></i> ${courseList[i].courseinfo.kurskod}, ${courseList[i].courseinfo.namn}, ${courseList[i].courseinfo.kommentar}</th> 
                        </tr>
                        <tr id="tableHeader${i}"> 
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
                </div>
 
            <tbody id="scheduleTable${i}">`;

            for (var j = 0; j < courseList[i].reservations.length; j++) {

                // Tar kurskolumen och splittar den
                var courseNameArray = courseList[i].reservations[j].columns[5].split(",");
                // Dynamisk lösning för att visa upp till två kursnamn
                var secondCourseName = "";
                if (courseNameArray.length > 1) {
                    secondCourseName = courseNameArray[1];
                }

                table += `<tr>
                            <td><span class="text-nowrap" id="localId${i}">${courseList[i].reservations[j].startdate}</span></td>
                            <td><span class="text-nowrap" id="startTimeId${i} endTimeId${i}">${courseList[i].reservations[j].starttime} - ${courseList[i].reservations[j].endtime}</span></td>    
                            <td><span class="text-nowrap" id="localId${i}">${courseList[i].reservations[j].columns[1]}</span></td>
                            <td><span class="text-nowrap" id="teacherId${i}">${courseList[i].reservations[j].columns[2]}</span></td>
                            <td><span class="text-nowrap" id="activityId${i}">${courseList[i].reservations[j].columns[3]}</span></td>
                            <td><span class="text-nowrap  id="courseNameId${i}">${courseNameArray[0] + " <br> " + secondCourseName}</span></td>
                            <td><span class="text-nowrap" id="infoId${i}">${courseList[i].reservations[j].columns[7]}</span></td> 
                            <td><span class="text-nowrap" id="additionalInfoId${i}">${courseList[i].reservations[j].columns[8]}</span></td> 
                        </tr>`;
            }

            table += `</tbody></table>`;

            scheduleContainer.innerHTML += table;
        }
        else {
            var errorMsgContainer = document.getElementById('errorMessage');

            var error = `<div class="alert alert-danger" role="alert">
                            Inga inbokningar för ${courseList[i].courseinfo.kurskod}, ${courseList[i].courseinfo.namn}, ${courseList[i].courseinfo.kommentar} mellan ${startDate} och ${endDate}.
                        </div>`;

            errorMsgContainer.innerHTML += error;
        }

        //Döljer tableHeader och tbody, testade att göra med variable
        var tableHeaderId = "#tableHeader" + i;
        $(tableHeaderId).hide();

        var tBodyIdy= "#scheduleTable" + i;
        $(tBodyIdy).hide();
  
    }
}

function visibilityForListAndHeaders(i) {

    if ($("#scheduleTable" + i).is(":visible")) {
        $("#scheduleTable" + i).hide();
        $("#tableHeader" + i).hide();
    }
    else if
        ($("#scheduleTable" + i).is(":hidden")) {
        $("#scheduleTable" + i).show();
        $("#tableHeader" + i).show();
    }

}








