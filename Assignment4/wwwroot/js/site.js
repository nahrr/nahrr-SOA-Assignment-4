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
            var table = `<table class="table table-bordered table-striped table-sm" id="superTable${i}">
            
                <div class="mt-5"> 
                    <thead class="thead-dark">
                        <tr class="cursor-pointer" onclick="visibilityForListAndHeaders(${i})" id="superHeader${i}">
                            <th colspan="100%"> <i class="fa fa-window-maximize"></i> ${courseList[i].courseinfo.kurskod}, ${courseList[i].courseinfo.namn}, ${courseList[i].courseinfo.kommentar}</th> 
                        </tr>
                        <tr id="tableHeader${i}"> 
                            <th scope="col"></th>
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
                            <td><button type="button" id="buttonId${j}" onClick="displayModal(this.id)" class="btn btn-dark btn-sm" data-toggle="modal" data-target="#exampleModalCenter">Redigera</button></td>
                            <td><span class="text-nowrap" id="dateId${j}">${courseList[i].reservations[j].startdate}</span></td>
                            <td><span class="text-nowrap" id="startTimeId${j} endTimeId${j}">${courseList[i].reservations[j].starttime} - ${courseList[i].reservations[j].endtime}</span></td>    
                            <td><span class="text-nowrap" id="localId${j}">${courseList[i].reservations[j].columns[1]}</span></td>
                            <td><span class="text-nowrap" id="teacherId${j}">${courseList[i].reservations[j].columns[2]}</span></td>
                            <td><span class="text-nowrap" id="activityId${j}">${courseList[i].reservations[j].columns[3]}</span></td>
                            <td><span class="text-nowrap  id="courseNameId${j}">${courseNameArray[0] + " <br> " + secondCourseName}</span></td>
                            <td><span class="text-nowrap" id="infoId${j}">${courseList[i].reservations[j].columns[7]}</span></td> 
                            <td><span class="text-nowrap" id="additionalInfoId${j}">${courseList[i].reservations[j].columns[8]}</span></td> 
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
//Utkast på metod för en popup när man trycker på redigera
function displayModal(clickedId) {
    //Ta ut unika Id:et
    var getId = clickedId.split('d').pop();
   //Splitta start- och sluttid
    inputTime = document.getElementById("startTimeId" + getId + " " + "endTimeId" + getId).innerText;
    var timeArray = inputTime.split("-");
    var startTime = timeArray[0].trim();
    var endTime = timeArray[1].trim();

    var inputDateTime = document.getElementById("dateId" + getId).innerText;
   
    var modal = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Redigera schema i Canvas</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body" id=modalBody>

                                    <div class="form-group">
                                        <label for="titel">Titel</label>
                                        <input type="text" class="form-control" id="inputCourseNameId" placeholder="Titel" name="titel">
                                    </div>

                                    <div class="form-group">
                                        <label for="date">Datum</label>
                                        <input type="date" class="form-control" id="inputDateTimeId" placeholder="Datum" name="date">
                                     </div>

                                     <div class="form-group">
                                        <label for="startTime">Starttid</label>
                                        <input type="time" class="form-control" id="inputStartTimeId" placeholder="Starttid" name="startTime">
                                     </div>

                                    <div class="form-group">
                                        <label for="endTime">Sluttid</label>
                                        <input type="time" class="form-control" id="inputEndTimeId" placeholder="Sluttid" name="endTime">
                                    </div>

                                    <div class="form-group">
                                        <label for="comment">Kommentar</label>
                                        <input type="text" class="form-control" id="inputCommentId" placeholder="Kommentar" name="comment">
                                    </div>
                            </div>

                          <div class="modal-footer">
                            <button type="reset" class="btn btn-secondary"  data-dismiss="modal">Stäng</button>
                            <button type="button" class="btn btn-primary">Spara till Canvas</button>
                          </div>
                        </div>
                      </div>
                    </div>`;

    modalContainer.innerHTML += modal;
    document.getElementById("inputStartTimeId").defaultValue = startTime;
    document.getElementById("inputEndTimeId").defaultValue = endTime;
    document.getElementById("inputDateTimeId").defaultValue = inputDateTime;
 }
  









