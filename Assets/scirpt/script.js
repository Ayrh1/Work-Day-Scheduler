
$(function () {

  //sets current day 
  let currentDay = dayjs().format('dddd MMMM D' ); 
  $("#currentDay").text(currentDay + 'th');
  $("#storedLocal").hide();

  //add event listener to all buttons 
  $('.btn').click(function () {
    $('#storedLocal:hidden').show("fast");
    clickBtnEvent(this);
  });
  

});

// pulls hour ID and entered text. Gets stored into array 
function clickBtnEvent(element) {

  let parentElementID = $(element).parent().attr('id'); 
  let parentChild = $(element).parent().children().eq(1).val(); 
  
  let sheduler = {
    time: parentElementID,
    todo: parentChild,
  };

  console.log('Parent:', parentElementID, parentChild); //check point pass
  console.log('Array: ' + sheduler.time + sheduler.todo); //check point pass

  storedTask(sheduler);
}

// Div ID and entered text gets stores into local storage 
function storedTask(sheduler) {
  
  console.log('Array Local Staorage: ' + sheduler.time + sheduler.todo); //check point pass
  
  let extractSchedule = localStorage.getItem('schedule');
  let schedule = extractSchedule ? JSON.parse(extractSchedule) : []; 

  schedule.push(sheduler);
  
  let currentSchedule = JSON.stringify(schedule);

  localStorage.setItem('schedule', currentSchedule);

}

//Pulls stored tasks from local storage and displays to browser 
function displaySavedTasks() {

  let retiriveLocalTask = JSON.parse(window.localStorage.getItem('schedule')) || [];

  console.log('local Srorage Retreval: ' + retiriveLocalTask); //check point pass

   // run through Array using jQuery's $.each
   $.each(retiriveLocalTask, function(i, task) {
    let elementId = task.time; // Get element ID
    let elementTodo = task.todo; // Get the stored todo

    console.log('Jquery Loop ', i , ': ', elementId, elementTodo); //check point pass

    //Attribute Contains Prefix Selector [name|=”value”] - JQUERY
    $("div[id |='" + elementId + "']").children('textarea').text(elementTodo);


  });

}

//uses dayjs to store current hour into variable and retives all <div> ids and stores them to array 
function currentTime() {

  //creates array 
  let divIDs = [];
   //Attribute Contains Prefix Selector [name|=”value”] - JQUERY
  $('div[id]').each(function() {
  divIDs.push(this.id);
  });
  console.log(divIDs); //check point pass

  //saves current hours ex: hour13 format
  setTimeout(function() {
    let currentHour = parseInt(dayjs().format('H')); 
    console.log('Current Hour' + currentHour); //check point pass

    $.each(divIDs, function(i, divID) {
      let divHour = parseInt(divID.replace('hour', ''), 10); // Extract the hour part and parse to number
      if (divHour < currentHour) {
        $('#' + divID).removeClass('future').addClass('past');
      } else if (divHour === currentHour) {
        $('#' + divID).removeClass('future').addClass('present');
      } //else {
        //$('#' + divID).addClass('future');
     // }
     console.log('div vd hour' + currentHour + divID); //check point pass
    });

  }, 60);
 
}

currentTime();
displaySavedTasks();



   // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.



  /*



8/24/23

// Highlight which elements in the DOM are the children of the parent element
// Uncomment the following two lines to see the which elements are the children to the #top
$('#top').children().css('color', 'yellow');
console.log($('#top').children());

// Uncomment the following line to see the which element is the first direct child of the <main>
 $('#top').children().eq(0).addClass('boxy');

// Uncomment the following line to add a list item to the list
$('#top').children().eq(4).append($('<li>Classmates</li>'));

// Uncomment the following line to style the list items
$('#top').children('ul').children().addClass('bg-primary text-dark mb-3 p-3').css('border-radius', '.4rem');



  -------------------------------------------------------------------------



  8/22/23

  -- ways to get parent id --- 

  $(this).parent().attr('id');
  $(this).parent().parent().attr('id');
  $(this).closest('ul').attr('id');



  -------------------------------------------------------------------------


  8/21/23

  day.js code for use

  dayjs().hour() // gets current hour
  newDate = dayjs().hour(12) // returns new dayjs object



  -------------------------------------------------------------------------


  8/21/23

  jquery code for use 

  .addClass(); - Adds the specified class(es) to each element in the set of matched elements.
  .removeClass(); - Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
  <a href="#" onclick="$(this).css('display', 'none')">Hide me!</a>   - might be useful 



  -------------------------------------------------------------------------


  8/21/23
  original starter code for the js document with all the todo and hints

  $(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  });



  -------------------------------------------------------------------------




  8/21/23
  this is the sample code in the html page, sample contained all the classes needed for changing the color of the divs 

  HTML DIVS

  <!-- Use class for "past", "present", and "future" to apply styles to the
        time-block divs accordingly. The javascript will need to do this by
        adding/removing these classes on each div by comparing the hour in the
        id to the current hour. The html provided below is meant to be an example
        demonstrating how the css provided can be leveraged to create the
        desired layout and colors. The html below should be removed or updated
        in the finished product. Remember to delete this comment once the
        code is implemented.
        -->
     
      <!-- Example of a past time block. The "past" class adds a gray background color. -->
      <div id="hour-9" class="row time-block past">
        <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>

      <!-- Example of a a present time block. The "present" class adds a red background color. -->
      <div id="hour-10" class="row time-block present">
        <div class="col-2 col-md-1 hour text-center py-3">10AM</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>

      <!-- Example of a future time block. The "future" class adds a green background color. -->
      <div id="hour-11" class="row time-block future">
        <div class="col-2 col-md-1 hour text-center py-3">11AM</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
      
*/

