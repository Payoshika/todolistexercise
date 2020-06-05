$(document).ready(function() {
  getTask();
  var checkStatus = $(".form-check-input").first().prop("checked")
  console.log(checkStatus);
})

var radioSelect = function(){

}

$(document).on("change", ".form-check-inline input", function(event){
  var taskList = $(".task-list").children()
  if($(this).siblings().text() === "pending"){
    // complete => delete
    $.each(taskList, function(index, value){
      if (value.dataset.status === "true"){
        $(this).hide()
      }
      else{
        $(this).show()
      }
    })
  }
  else if ($(this).siblings().text() === "completed"){
    // active  => delete
    $.each(taskList, function(index, value){
      if (value.dataset.status === "false"){
        $(this).hide()
      }
      else{
        $(this).show()
      }
    })
  }
  else {
    // show all the lists
    $.each(taskList, function(index, value){
      $(this).show()
      })
  }
})

$(document).on("click",".toggle-switch", function(event){
  $(this).children().toggleClass("completed")
})

$(document).on("click",".add-button", function(event){
  event.preventDefault();
  var newTaskName = $(".new-task").val();
  postTask(newTaskName)
})

$(document).on("click",".toggle-switch", function(event){
  var id = $(this).parent().data("id");
  var status = event.target.parentElement.parentElement.dataset.status;
  var bStatus = function toBoolean (status) {
    return status.toLowerCase() === 'true';
  }
  var taskName = $(this).parent().text()
  if(bStatus(status) === false){
    completeTask(id, taskName)
    event.target.parentElement.parentElement.dataset.status = "true"
  }
  else {
    inCompleteTask(id, taskName);
    event.target.parentElement.parentElement.dataset.status = "false"
  }
  // $(this).parent().data("status", status);
})

$(document).on("click",".delete-switch", function(event){
  event.preventDefault();
  var id = $(this).parent().data("id");
  deleteTask(id);
  $(this).parent().remove()
})

var getTask = function(){
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=166",
    dataType: "json",
    success: function(response, textStatus){
      console.log(response.tasks);
      $.each(response.tasks, function(index, value){
        var newTaskContent = $(`<li class="list-group-item w-100 position-relative" data-id="${value.id}" data-status=
        "${value.completed}">${value.content}
            <span class="toggle-switch position-absolute"><i class="far fa-check-circle rounded-circle"></i></span>
            <button class="delete-switch btn btn-primary position-absolute"><i class="fas fa-trash-alt"></i></button>
          </li>`);
          if (`${value.completed}` === "true"){
            console.log(newTaskContent);
            newTaskContent.children().first().children().addClass("completed")
          }
        newTaskContent.appendTo(".task-list")
      })
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
      var newTaskContent = $(`<li class="list-group-item w-100 position-relative" data-id="${response.task.id}" data-status="${response.task.completed}">${response.task.content}
          <span class="toggle-switch position-absolute"><i class="far fa-check-circle rounded-circle"></i></span>
          <button class="delete-switch btn btn-primary position-absolute"><i class="fas fa-trash-alt"></i></button>
        </li>`);
      newTaskContent.appendTo(".task-list")
    },
    error: function(request, textStatus, errorMessage){
      console.log(errorMessage);
    }
  });
}
// Put => when posting, set the data-id attribute to $("html") and retrieve it here.
var completeTask = function(id, taskName){
  $.ajax({
    type: "PUT",
    url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_complete?api_key=166`,
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

var inCompleteTask = function(id, taskName){
  $.ajax({
    type: "PUT",
    url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_active?api_key=166`,
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

var deleteTask = function(id){
  $.ajax({
    type: "DELETE",
    url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=166`,
    contentType: 'application/json',
    dataType: "json",
    success: function(response, textStatus){
    },
    error: function(request, textStatus, errorMessage){
      console.log(errorMessage);
    }
  });
}
