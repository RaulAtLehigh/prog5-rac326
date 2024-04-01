$(document).ready(() => {
    console.log("jQuery is ready!");

let songArray = []; //array to hold Song objects I'm creating from json passed from the server
let indexAt = 0; 

/**
 * function that views songs in the songArray
 * 
 * @param {num} start for start array
 * @param {num} end for end index
 */
function viewSongs(start, end){
    console.log(start + " " + end);
    if(start < 0 || start > songArray.length || songArray.length == 0){//checking if we went out of bounds
        alert("Error: No songs left to view");

    }
    else{
        indexAt = getMin(end, songArray.length);
        for(let i = start; i < indexAt; i++){
            
            if(songArray[i].numone){
                $("#songlist").append(`<tr id="numone"><td>${songArray[i].id}</td><td>${songArray[i].title}</td><td>${songArray[i].artist}</td></tr>`);
            }else{
                $("#songlist").append(`<tr><td>${songArray[i].id}</td><td>${songArray[i].title}</td><td>${songArray[i].artist}</td></tr>`);
            }
        }
        $("#tracker").html(`Songs ${(parseInt(start) + 1)} to ${(indexAt)} out of ${songArray.length}`);
    }
}
function getMin(first, second){
    if(first<second)
        return first;
    return second;
}

$("#search").click(()=>{
        //event.preventDefault();
        console.log("clicked");
    $.ajax(
        "/getSongs/"+ $("#artist").val() + "/"+ $("#keyword").val(),//route
        {
            type: "GET",
            dataType: "json",
            success: function (songs){
                console.log(songs);
                songArray = songs;
                $("#songlist").empty();
                viewSongs(0, $("#songsperpage").val());
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error: " + jqXHR.responseText);
                alert("Error: " + textStatus);
                alert("Error: " + errorThrown);
              },
            }
            )
        });
        
   
        $( ()=>{//init state
    //should route '/artistList' and populate the dropdown boxes
    $.ajax(
        "/artistList",//returns a json array [{"artist": "artistName"},]
        {
            type: "GET",
            dataType: "json",
            success: (artists) => {
                populateArtists(artists);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error: " + jqXHR.responseText);
                alert("Error: " + textStatus);
                alert("Error: " + errorThrown);
              },
            }
            );
});



function populateArtists(data){
    data.forEach(obj =>{
        const artistName = obj.artist;
        //console.log(artistName);
        $('#artist').append(`<option id="${artistName}">${artistName}</option>`);
    })
}
$("#prev").click(()=>{
    $("#songlist").empty();
    viewSongs((parseInt(indexAt) - (parseInt($("#songsperpage").val()) *2)), (parseInt(indexAt) - parseInt($("#songsperpage").val())));
    });
$("#next").click(()=>{
    $("#songlist").empty();
    
    viewSongs(indexAt, (parseInt(indexAt) + parseInt($("#songsperpage").val())));
    });
});