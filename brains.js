$(document).ready(function () {
  //DISPLAYS THE HTML
  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: "GET",
      url: "https://fewd-todolist-api.onrender.com/tasks?api_key=25",
      dataType: "json",
      success: function (response, textStatus) {
        $("#todo-list").empty();
        response.tasks.forEach(function (task) {
          $("#todo-list").append(`<li class="list-group-item">
          <input
            class="form-check-input rounded-circle mark-complete"
            id="${task.id}"
            type="checkbox"
            value=""
            data-id="${task.id}"
            ${task.completed ? "checked" : ""}
          />
          <label class="form-check-label" for="${
            task.id
          }">${task.content}</label>
          <button class=" btn border btn-sm delete" data-id="${
            task.id
          }">Remove</button>
        </li>`);
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };
  //SHOWS COMPLETED/CHECKED TASKS
  $(".show-checked").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      if ($(this).find(".form-check-input").prop("checked") !== true) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
  });

  //SHOWS ALL TASKS
  $(".show-all").on("click", function () {
    getAndDisplayAllTasks();
  });

  //SHOWS ACTIVE/UNCHECKED TASKS
  $(".show-unchecked").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      if ($(this).find(".form-check-input").prop("checked")) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
  });

  //CREATES THE NEW TASK
  var createTask = function () {
    $.ajax({
      type: "POST",
      url: "https://fewd-todolist-api.onrender.com/tasks?api_key=25",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        task: {
          content: $("#new-task-content").val(),
        },
      }),
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
        $("#new-task-content").val("");
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };
  //REMOVES A TASK
  var deleteTask = function (id) {
    $.ajax({
      type: "DELETE",
      url: "https://fewd-todolist-api.onrender.com/tasks/" + id + "?api_key=25",
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };
  //UNCHECKED BOX
  var markTaskActive = function (id) {
    $.ajax({
      type: "PUT",
      url:
        "https://fewd-todolist-api.onrender.com/tasks/" +
        id +
        "/mark_active?api_key=25",
      dataType: "json",
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };
  //CHECKED BOX
  var markTaskComplete = function (id) {
    $.ajax({
      type: "PUT",
      url:
        "https://fewd-todolist-api.onrender.com/tasks/" +
        id +
        "/mark_complete?api_key=25",
      dataType: "json",
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };
  //CLICKING THE CREATE BUTTON
  $("#create-task").on("submit", function (e) {
    e.preventDefault();
    createTask();
  });

  //CLICKING THE CHECK BOX
  $(document).on("change", ".mark-complete", function () {
    if (this.checked) {
      markTaskComplete($(this).data("id"));
    } else {
      markTaskActive($(this).data("id"));
    }
  });
  //CLICKING THE DELETE BUTTON
  $(document).on("click", ".delete", function () {
    deleteTask($(this).data("id"));
  });

  getAndDisplayAllTasks();
});
