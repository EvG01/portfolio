$(document).ready(function() {

	$(".mmform").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
            $('#m1').modal('toggle');
			$('#t').modal('toggle');
			$(".mmform").trigger("reset");
		});
		return false;
	});
	
});

$(document).ready(function() {

	$(".topform").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#t').modal('toggle');
			$(".topform").trigger("reset");
		});
		return false;
	});
	
});