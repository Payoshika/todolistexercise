$(document).on("click",".toggle-switch", function(event){
  $(this).children().toggleClass("completed")
})

$(document).on("click",".add-button", function(event){
  event.preventDefault();
  var newTaskName = $(".new-task").val();
  postTask(newTaskName)
})

var getTask = function(){
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=166",
    dataType: "json",
    success: function(response, textStatus){
      console.log(response.tasks);
    },
    error: function(request, textStatus, errorMessage){
      console.log(errorMessage);
    }
  });
}

var postTask = function(taskName){
  $.ajax({
    type: "POST",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=166",
    contentType: 'application/json',
    dataType: "json",
    data: JSON.stringify({
    task: {
      content: `${taskName}`
      }
    }),
    success: function(response, textStatus){
      var newTaskContent = $(`<li class="list-group-item w-100 position-relative">${response.task.content}
          <span class="toggle-switch position-absolute"><i class="far fa-check-circle rounded-circle"></i></span>
          <button class="delete-switch btn btn-primary position-absolute"><i class="fas fa-trash-alt"></i></button>
        </li>`);
      newTaskContent.appendTo(".list-group:nth-child(1)")
    },
    error: function(request, textStatus, errorMessage){
      console.log(errorMessage);
    }
  });
}
// Put => when posting, set the data-id attribute to $("html") and retrieve it here.
var updateTask = function(){
  $.ajax({
    type: "PUT",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=166",
    contentType: 'application/json',
    dataType: "json",
    data: JSON.stringify({
    task: {
      content: `${taskName}`
      }
    }),
    success: function(response, textStatus){
    },
    error: function(request, textStatus, errorMessage){
      console.log(errorMessage);
    }
  });
}
