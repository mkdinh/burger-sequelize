// DECLARE GLOBAL VARIABLES
// -------------------------------------------------------
var totalBurger = 0;
var autoplay;
var currentItem = 0

// INITALIZING CAROUSEL
// -------------------------------------------------------
function initializeCarousel(){
        $('.carousel').carousel();
        $('.carousel').carousel('set', currentItem);
        $('.carousel.carousel-slider').carousel({fullWidth: false});

        /* LISTEN FOR CURRENT CAROUSEL ITEM */
        // -------------------------------------------------------
        $('.carousel-item').on('click',function(ev){
                currentItem = $(this).attr('data-position');
        })

        autoplay = setInterval(function() {
                $('.carousel').carousel('next');
                currentItem++
        }, 3000); 

        $('.carousel-item').hover(
                function(ev){
                        clearInterval(autoplay);
                },
                function(ev){
                        autoplay = setInterval( function(){$('.carousel').carousel('next')}, 3000);
                }
        );

}


// CREATE NEW CAROUSEL ITEM
// -------------------------------------------------------
function createBurgerItem(data,i){
                // defining all DOM
                var carouselItem = $('<div>');
                var popup = $('<div>');
                var option = $('<ul>');
                var optionEat = $('<li>');
                var optionEdit = $('<li>');
                var optionDelete = $('<li>');

                // adding attributes and classes to each dom
                carouselItem.addClass('carousel-item');
                carouselItem.attr('id',data.id);
                carouselItem.attr('data-name',data.burger_name);
                carouselItem.attr('href','#'+i)
                carouselItem.attr('data-position',i)

                popup.addClass('popup')
                option.addClass('burger-option')

                // populating DOM with content

                popup.append("<img class='burger-avatar' src='"+data.picUrl+"'/>"
                        +"<span class='popuptext truncate' id='"+data.id+"-popUp'>"+data.burger_name+"</span>"
                )

                if(data.devoured){
                        optionEat.append("<form>"
                                +"<input type='image' class='burger-devoured tooltipped' data-devoured=0 data-id='"+data.id+"' data-position='right' data-delay='50' data-tooltip='Make Again' src='/img/replay.png'/>"
                                +"</form>"
                        )
                }else{
                        optionEat.append("<form>"
                        +"<input type='image'class='burger-devoured tooltipped' data-devoured=1 data-id='"+data.id+"' data-position='right' data-delay='50' data-tooltip='Eat' src='/img/cutlery.png'/>"
                        +"</form>"
                        )  
                }

                optionEdit.append("<form>"
                        +"<input type='image' class='burger-show tooltipped' data-id='"+data.id+"' data-position='right' data-delay='50' data-tooltip='More Info' src='/img/search.png'/>"
                        +"</form>"
                )
                
                optionDelete.append("<form>"
                +"<input type='image'  class='burger-delete tooltipped' data-id='"+data.id+"' data-position='right' data-delay='50' data-tooltip='Delete' src='/img/rubbish.png'/>"
                +"</form>"
                )

                // Arrange contents
                option.append(optionEat);
                option.append(optionEdit);
                option.append(optionDelete);
                popup.append(option)
                carouselItem.append(popup);
                
                // Append to browser
                $('#burger-display').append(carouselItem)
}

// ON LOAD INDEX
// -------------------------------------------------------
function updateBurgerCarousel(){
        $('#burger-display').empty();
        $('.material-tooltip').remove();

        $.get('./api/all', (res) =>{
                        for(i =0; i < res.length; i++){
                                createBurgerItem(res[i],i);
                        }

                        if($('#burger-display').hasClass('initialized')){
                                $('#burger-display').removeClass('initialized')
                                clearInterval(autoplay);
                        }

                        totalBurger = res.length;
                        initializeCarousel();
                
        })
}



/* ON LOAD, UPDATE CAROUSEL */
// -------------------------------------------------------
updateBurgerCarousel();

$(document).ready(() => {



/* LISTEN FOR INPUT TO VALIDATE LENGTH */
// -------------------------------------------------------
        $('#burger_name').on('input', function(ev){
                if($(this).val().length >= 5){
                        $('#burger-submit').css('opacity','1')
                        $('#burger-submit').css('animation-play-state','running')
                }
                if($(this).val().length <5){
                        $('#burger-submit').css('opacity','.5')
                        $('#burger-submit').css('animation-play-state','paused')
                }
        })

/* SUBMITTING NEW BURGER */
// -------------------------------------------------------
        $('#burger-submit').on('click',function(ev){
                ev.preventDefault();
                if($('#burger_name').val().length < 5){
                        Materialize.toast('Your burger name is too short!', 2000)
                        return
                }
                else if($('#burger_name').val().length > 30){
                        Materialize.toast('Your burger name is too long!', 2000)
                        return
                }else{
                        var burger_name = $("#burger_name").val().trim();
                        var randNum = Math.floor(Math.random() *30) + 1;
                        var picURL = '/img/avatar/avBurger'+randNum+'.png';
                        var newBurger = {
                                                burger_name: burger_name,
                                                picUrl: picURL,
                                                ingredients: ''
                                        } 
                        $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                data: newBurger,
                                url: '/api/new',
                                success: function(res){
                                        Materialize.toast('Successfully added!', 2000,'',function(){        
                                        updateBurgerCarousel();
                                        }) 

                                }
                        })
                }
        })

/* EAT BURGER */
// -------------------------------------------------------
        $('#burger-display').on('click', '.burger-devoured', function(ev){
                ev.preventDefault();
                var id = $(this).attr('data-id');
                var burger = {
                        devoured: $(this).attr('data-devoured')
                };

                $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        data: burger,
                        url: '/api/'+id+'?_method=PUT',
                        success: (res) => {
                                Materialize.toast('Successfully eaten burger', 2000,'',function(){})
                                updateBurgerCarousel();
                        }
                })
        })

/* EDIT BURGER */
// -------------------------------------------------------

        $('#burger-display').on('click','.burger-show',function(ev){
                ev.preventDefault();

                var id = $(this).attr('data-id');
                console.log(id)
                location.replace("/show/"+id)
        })

/* DELETE BURGER */
// -------------------------------------------------------

        $('#burger-display').on('click','.burger-delete', function(ev){
                ev.preventDefault();

                id= $(this).attr('data-id');
                $.ajax({
                        type:'POST',
                        dataType: 'json',
                        data: id,
                        url: '/api/'+id+'?_method=DELETE',
                        success: (res) => {
                                Materialize.toast('Successfully deleted burger', 2000,'',function(){});
                                updateBurgerCarousel()
                        }
                })
        })

/* CLOSE DOC READY */
// -------------------------------------------------------      
})

