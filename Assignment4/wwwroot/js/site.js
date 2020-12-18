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


// Skickar värdet från searchBar till controller
function sendValue() {

        var search = document.getElementById('searchBar').value;

        if (document.getElementById('searchBar').value.length == 0) {
            alert("Sökfältet är tomt");
            return;
        } 

        var showTable = document.getElementById('superTable');
        showTable.style.display = "block"; 
       
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

    //function getSchedule() {


    //    // API-anrop till "simulerat Canvas". Tar kurskod och aktuell modul och returnerar lista med studenter på aktuell modul.
    //    $.ajax({
    //        url: "http://localhost:51526/api/GetStudentsOnCourse/" + course + "/" + module
    //    }).then(function (data) {

    //        $('#myTable').empty();
    //        var array = data.split(";");
    //        var correctArray = []

    //        for (var i = 0; i < array.length; i++) {
    //            var object = array[i].split("|");
    //            var name = object[0];
    //            var grade = object[1];
    //            var studentId = object[2];
    //            var student = { "name": name, "grade": grade, "studentId": studentId }
    //            correctArray.push(student)
    //            console.log(correctArray)
    //        }


    //function buildSchedule(data) {
    //    var table = document.getElementById('myTable')

    //    for (var i = 0; i < data.length; i++) {
    //        var row = `<tr>      
    //                            <td> <input type="checkbox" id="selectStud${i}"> </td>
    //                            <td><span id="studentId${i}">${data[i].studentId}</span></td>
				//			    <td><span id="name${i}">${data[i].name}</span></td>
				//			    <td><span id="grade${i}">${data[i].grade}</span></td>
    //                            <td> <input type="date" id="examineDate${i}" min="2020-11-16" max="2040-12-31" required></td>
    //                            <td>
    //                                <select id="gradeLadok${i}">
    //                                    <option value="U">U</option>
    //                                    <option value="G#">G#</option>
    //                                    <option value="G">G</option>
    //                                    <option value="VG">VG</option>
    //                                </select>
    //                            </td>
				//	        </tr>`;

    //        table.innerHTML += row;
    //    }
    //}


}





