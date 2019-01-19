var noteArr = [];
var id = 0;

function createNote(id, inputValue, inputDate,inputTime) {
    var note={
		id:id,
    inputValue:inputValue,
    inputDate:inputDate,
    inputTime:inputTime
    }
    return note;
}
function clearAll() {
  document.getElementById("myForm").reset();
}

// Create a new sticky note when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");// create a blank sticky note 
  li.className="animation";
  var pin = document.createElement("i");//create a red pin
  var p_text = document.createElement("p");//create a paragraph for a text
  var p_date = document.createElement("p");//create a paragraph for a date
  var p_time = document.createElement("p");//create a paragraph for a time
  var div_date = document.createElement("div");//create a div for time & date
  var div_text = document.createElement("div");//create a div for a text
  pin.setAttribute("class", "pin");//giving a class name to a pin
  div_date.setAttribute("id", "noteDiv");//giving an id to a date div
  div_text.setAttribute("id","textDiv");// giving an id to a text div
  var inputValue = document.getElementById("myInput").value;//creating a text var, taken from text input
  var inputDate = document.getElementById("dateInput").value;//creating a date var, taken from date input
  var inputTime = document.getElementById("timeInput").value;//creating a time var, taken from time input

  var text = document.createTextNode(inputValue);//coding a text into a node
  var date= document.createTextNode(inputDate);//coding a date into a node
  var time = document.createTextNode(inputTime);//coding a time into a node

  p_text.appendChild(text);//inserting text to a text paragraph
  p_date.appendChild(date);//inserting date to a date paragraph
  p_time.appendChild(time);//inserting time to time paragraph
  div_date.appendChild(p_date);//inserting date paragraph to a divdate
  div_date.appendChild(p_time);//inserting time paragraph to a divdate
  div_text.appendChild(p_text);//inserting text paragraph to a divtext

  if (inputValue === '') {//if there is nothing in the text iput
    alert("You're supposed to write your note before pressing add!");
}
  else if (inputDate === '') {//if there is nothing in the date input
    alert("You're supposed to write a due date before pressing add!");  
  } else {
    li.appendChild(pin);//insert the pin to the (li) note
    li.appendChild(div_text);//insert the text to the (li) note
    li.appendChild(div_date);//insert the date to the (li) note

//storing item in local storage   
    var span = document.createElement("SPAN");//creating a span for a close button
    var txt = document.createTextNode("\u00D7");//cross sign
    span.className = "close";//giving a name to a span
    span.appendChild(txt);//adding text to span
    id++;
    span.setAttribute("id", String(id));
    span.setAttribute("onclick", "removeNote(this)");
    li.appendChild(span); //adding span to li
	
	  var userObjectAsString = localStorage.getItem("note");
	if(JSON.parse(userObjectAsString) != null){
		noteArr = JSON.parse(userObjectAsString);
		console.log("a");
	}
	console.log(noteArr);
	noteArr.push(createNote(String(id),inputValue,inputDate,inputTime));
	localStorage.setItem("note", JSON.stringify(noteArr));
	
  document.getElementById("myUL").appendChild(li); //insert the note into myUL (notes container)

  }
}

function showElementsFromStorage() {
  var userObjectAsString = localStorage.getItem("note");
  if(JSON.parse(userObjectAsString) != null){
	noteArr = JSON.parse(userObjectAsString);
  }
  console.log(noteArr);
  
  if(noteArr != null) {
    for(var i = 0; i < noteArr.length; i++) {
 
	  var li = document.createElement("li");// create a sticky note
	  var pin = document.createElement("i");//create a red pin
	  var p_text = document.createElement("p");//create a paragraph for a text
	  var p_date = document.createElement("p");//create a paragraph for a date
	  var p_time = document.createElement("p");//create a paragraph for a time
	  var div_date = document.createElement("div");//create a div for a date
    var div_text=document.createElement("div");//create a div for a text
    
	  pin.setAttribute("class", "pin");//giving a class name to a pin
	  div_date.setAttribute("id", "noteDiv");//giving an id to a Date div
	  div_text.setAttribute("id","textDiv");// giving an id to a text div

	  var inputValue = noteArr[i].inputValue;//creating a var, taken from localStorage
	  var inputDate = noteArr[i].inputDate;//creating a var, taken from localStorage
	  var inputTime = noteArr[i].inputTime;//creating a var, taken from localStorage
	
	  var text = document.createTextNode(inputValue);//coding a text into a node
	  var date= document.createTextNode(inputDate);//coding a date into a node
	  var time = document.createTextNode(inputTime);//coding a time into a node
	
	  p_text.appendChild(text);//inserting text to a text paragraph
	  p_date.appendChild(date);//inserting date to a date paragraph
    p_time.appendChild(time);//inserting time to time paragraph
    
	  div_date.appendChild(p_date);//inserting date paragraph to a divdate
	  div_date.appendChild(p_time);//inserting time paragraph to a divdate
	  div_text.appendChild(p_text);//inserting text paragraph to a divtext

	  li.appendChild(pin);//insert the pin to the (li) note
    li.appendChild(div_text);//insert the text to the (li) note
    li.appendChild(div_date);//insert the date to the (li) note
    
    //creating a close span to remove notes
	  var span = document.createElement("SPAN"); //create a close span
    var txt = document.createTextNode("\u00D7");//creating a cross 
    span.className = "close"; //giving a class name to a span
    span.appendChild(txt);//inserting a close sign to a span
	  id = noteArr[i].id;//giving an id to each note=note number in array
	  console.log(id);
	  span.setAttribute("id", String(id));//adds id to a span
	  span.setAttribute("onclick", "removeNote(this)");//onclick is a name, removeNote is a value. sets a removeNote to the span
    li.appendChild(span);//adds a span to a li
    document.getElementById("myUL").appendChild(li); //insert the note into myUL (notes container)
    }
  }
}

//removing sticky notes
function removeNote(note){
	console.log(note);
	console.log(note.getAttribute("id"));
	note.parentElement.style.display = "none";
	for(var i = 0; i < noteArr.length; i++){
		if(noteArr[i].id == note.getAttribute("id")){
			noteArr.splice(i,1);//remove one item on position i
			break;
		}
	}
	console.log(noteArr);
  localStorage.setItem("note",JSON.stringify(noteArr));
 }


