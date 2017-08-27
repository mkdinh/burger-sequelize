/* ON LOAD, UPDATE CONTENT */
// -------------------------------------------------------

var burger_id = window.location.pathname.split('/')[2];
console.log(burger_id)
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
        devoured.append("<span class='stat-label'>Status:</span>"
        + "<input name='devoured' checked='checked' type='radio' value=1 id='burger-devoured'/>"
        + "<label for='burger-devoured'>Eaten</label>"
        + " <input name='devoured' type='radio' value=0 id='burger-notDevoured' />"
        + "<label for='burger-notDevoured'>Not Eaten</label>")
    }else{
        devoured.append("<span class='stat-label'>Status:</span>"
        + "<input name='devoured' type='radio' value=1 id='burger-devoured'/>"
        + "<label for='burger-devoured'>Eaten</label>"
        + " <input name='devoured' checked='checked' type='radio' value=0 id='burger-notDevoured' />"
        + "<label for='burger-notDevoured'>Not Eaten</label>")
    }
    dateCreate.append("<p><span class='stat-label'>Date Created: </span>"+burger.createdAt+"</p>")
    dateUpdate.append("<p><span class='stat-label'>Last Updated: </span>"+burger.updatedAt+"</p>")

    $("#burger-pic").attr('src',burger.picUrl);
    $("#burger-name").append("<input type='text' id='edit-burger-name' value='"+burger.burger_name+"' autofocus>");

    // Append to Browser
    $('#burger-stat-wrapper').append(id,devoured,dateUpdate,dateCreate)

    // update bottom link
    $("#edit-burger-cancel").attr('href','/show/'+burger.id)
}


/* Update BURGER */
// -------------------------------------------------------

$('#edit-burger-update').on('click', function(ev){
    ev.preventDefault();
    var update = {
        burger_name: $('#edit-burger-name').val().trim(),
        devoured: $('input[name=devoured]:checked').val()
    }

    console.log(update)
    $.ajax({
            type:'POST',
            dataType: 'json',
            data: update,
            url: '/api/'+burger_id+'?_method=PUT',
            success: (res) => {
                    Materialize.toast('Successfully updated burger!', 2000,'',function(){});
                    setTimeout(function(){
                        Materialize.toast('Redirect to show page!', 2000,'',function(){ window.location = "/show/"+burger_id})
                    },1000);
            }
    })
})
