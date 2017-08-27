

/* ON LOAD, UPDATE CONTENT */
// -------------------------------------------------------

var burger_id = window.location.pathname.split('/')[2];

$.ajax({
    method: "GET",
    url: "/api/"+ burger_id,
    success: function(res){
        console.log(res);
        updateInfo(res)
    }
})

function updateInfo(burger){
    // defining all DOM
    var id = $('<li>');
    var devoured = $('<li>');
    var dateCreate = $('<li>');
    var dateUpdate = $("<li>");

    // add attr to DOM
    id.addClass('burger-stat');
    devoured.addClass('burger-stat');
    dateCreate.addClass('burger-stat');
    dateUpdate.addClass('burger-stat');

    // Populating DOM with content
    id.append("<p><span class='stat-label'>ID: </span>"+burger.id+"</p>")
        
    if(burger.devoured){
        devoured.append("<p><span class='stat-label'>Status: </span>Eaten</p>")
    }else{
        devoured.append("<p><span class='stat-label'>Status: </span>Not Eaten</p>")
    }
    dateCreate.append("<p><span class='stat-label'>Date Created: </span>"+burger.createdAt+"</p>")
    dateUpdate.append("<p><span class='stat-label'>Last Updated: </span>"+burger.updatedAt+"</p>")

    $("#burger-pic").attr('src',burger.picUrl);
    $("#burger-name").append(burger.burger_name);

    // Append to Browser
    $('#burger-stat-wrapper').append(id,devoured,dateUpdate,dateCreate)

    // update bottom link
    $("#show-burger-edit").attr('href','/edit/'+burger.id);
    $("#show-burger-index").attr('href','/');
    $("#show-burger-api").attr('href','/api/'+burger.id);
}

/* DELETE BURGER */
// -------------------------------------------------------

$('#show-burger-delete').on('click', function(ev){
    ev.preventDefault();
    $.ajax({
            type:'POST',
            dataType: 'json',
            data: burger_id,
            url: '/api/'+burger_id+'?_method=DELETE',
            success: (res) => {
                    Materialize.toast('Successfully deleted burger!', 2000,'',function(){});
                    setTimeout(function(){
                        Materialize.toast('Redirect to index!', 2000,'',function(){ window.location = "/"})
                    },1000);
            }
    })
})
