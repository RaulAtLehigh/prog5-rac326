function populateArtists(data){
    data.forEach(obj =>{
        const artistName = obj.artist;
        console.log(artistName);
        $('#artist').append(`<option id="${artistName}">${artistName}</option>`);
    })
}

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