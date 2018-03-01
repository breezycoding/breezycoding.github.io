(function () {
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();

var ui_controller = (function(){
	var dom_strings = {
		minimize_container: ".minimize_container",
		command_prompt: ".command_prompt",
		command_prompt_bar: ".command_prompt_bar",
		maximize_container: ".maximize_container",
		contents_container: ".contents_container",
		close_container: ".close_container",
		start_menu: ".start_menu",
		start_menu_container: ".start_menu_container",
		command_prompt_container: ".command_prompt_container",
		close_button: ".close_button",
		start_cmd: ".start_cmd",
		command_prompt_menu: ".command_prompt_menu",
		command_prompt_menu_ul: ".command_prompt_menu ul",
		form_input: ".form_input",
		command_prompt_content: ".command_prompt_content",
		previous_input_container: ".previous_input_container",
		linkedin: ".linkedin",
		github: ".github",
		gmail: ".gmail",
		body_left: ".body_left",
		body_right: ".body_right"
	}
	
	var has_class = function(element, className){
    	return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
	}
	
	var query_selector = function(num_elem, dom_elem){
		if(num_elem === 1){
			return document.querySelector(dom_elem);
		}else if(num_elem === 2){
			return Array.prototype.slice.call(document.querySelectorAll(dom_elem));
		}else
			alert("incorrect dom parameters");
	}
	
	var remove_elements = function(elements){
		if(elements.length > 1){
			elements.forEach(function(current, index, array) {
				array[index].parentElement.removeChild(array[index]);
			});
		}else{
			elements.parentElement.removeChild(elements);
		}
	} 
	
	var clear_fields = function(elements){
		if(elements.length > 1){
			elements.forEach(function(current, index, array){
				current.value = "";
				elements[0].focus();
			});
		}else{
			elements.value = "";
		}
	}
	
	var add_highlight = function(elements){
		setTimeout(function(){
			query_selector(1, dom_strings.start_menu_container).classList.add("close_open_start_menu");  
			for(var i in elements){
				elements[i].classList.add("highlight_red");
			}
		},2000);
	}
	
	var remove_highlights = function(elements, class_name){
		var final_elements = Array.prototype.slice.call(elements);
		for(var i in final_elements){
			if(has_class(final_elements[i], class_name)){
				final_elements[i].classList.remove(class_name);
			}
		}
	}
	
	var htm_replace_form =	"<div class='form_info_wrapper'>"	+
								"<p class='left cp_ip_text'>C:\\Admin\\IP></p>" +
								"<p class='left form_info_p'>%form_info%</p>" + 
								"<div class='clear'></div>" +
								"<p class='form_info_ans'>%message%</p>" + 
							"</div>";
	var htm_menu = "<li class='%menu_name_class% greener_head'>%num%. %menu_name%</li>";
	var htm_form_input = "<div id='form_input_%form_id%' class='form_wrapper'>" +
							"<p class='left cp_ip_text'>C:\\Admin\\IP></p>" +
							"<input type='text' class='left form_input' />" +
							"<div class='clear'></div>" +
						 "</div>";
	
	return{
		query_selector: query_selector,
		dom_strings: dom_strings,
		htm_menu: htm_menu,
		htm_form_input: htm_form_input,
		remove_elements: remove_elements,
		htm_replace_form: htm_replace_form,
		clear_fields: clear_fields,
		add_highlight: add_highlight,
		remove_highlights: remove_highlights
	}
})();

var command_prompt_controller = (function(ui, my_data){
	var dom = ui.dom_strings, menu_name = Object.keys(my_data), menu = ui.htm_menu, new_menu_template, form_input = ui.htm_form_input, new_form_input, replace_form = ui.htm_replace_form, arr_input_data = [];
	

	var get_menu = function(){
		for(var i = 0; i < menu_name.length; i++){
			new_menu_template = menu.replace("%menu_name_class%", my_data[menu_name[i]].title);
			new_menu_template = new_menu_template.replace("%num%", i + 1);
			new_menu_template = new_menu_template.replace("%menu_name%", my_data[menu_name[i]].title);
			ui.query_selector(1, dom.command_prompt_menu_ul).insertAdjacentHTML("beforeend", new_menu_template);
		}
	}
	
	var get_my_info = function(id, elem){
		var new_message, is_cls;
		if(id.toLowerCase() === "cls"){
			is_cls = true;
		}else if(isNaN(parseInt(id))){
			new_message = replace_form.replace("%form_info%", id);
			new_message = new_message.replace("%message%", '"'+id+'" ' + 'is not a valid selection. Please select your menu choice');
		}else if(id > 4 || id < 1){
			new_message = replace_form.replace("%form_info%", id);
			new_message = new_message.replace("%message%", "please select from valid range of numbers");
		}else if(/([1-4])([1-4])./.test(id) || /([1-4])./.test(id)){
			new_message = replace_form.replace("%form_info%", id);
			new_message = new_message.replace("%message%", '"'+id+'" ' + 'is not a valid set of characters. Please select your menu choice');
		}else{
			switch(parseInt(id)){
				case 1:
					new_message = replace_form.replace("%form_info%", id);
					new_message = new_message.replace("%message%", "<span class='sel_menu'>"+my_data[menu_name[id - 1]].content+"</span>");
					break;
				case 2:
					new_message = replace_form.replace("%form_info%", id);
					new_message = new_message.replace("%message%", "<span class='sel_menu'>"+my_data[menu_name[id - 1]].content+"</span>");
					break;
				case 3:
					new_message = replace_form.replace("%form_info%", id);
					new_message = new_message.replace("%message%", "<span class='sel_menu'>"+my_data[menu_name[id - 1]].content+"</span>");
					ui.add_highlight([ui.query_selector(1, dom.github)]);
					break;
				case 4:
					new_message = replace_form.replace("%form_info%", id);
					new_message = new_message.replace("%message%", "<span class='sel_menu'>"+my_data[menu_name[id - 1]].content+"</span>");
					ui.add_highlight([ui.query_selector(1, dom.linkedin), ui.query_selector(1, dom.gmail)]);
					break;
			}
		}
		
		if(is_cls){
		    ui.clear_fields(elem);
			if(ui.query_selector(2, ".previous_input_container p").length > 0){
				ui.remove_elements(document.querySelectorAll(".previous_input_container p"));
			}
		}else{
			ui.clear_fields(elem);
			ui.query_selector(1, dom.previous_input_container).insertAdjacentHTML("beforeend", new_message);
		}
	}
	
	var add_form_data = function(info){
		arr_input_data.push(info);
	}
	
	var create_form= function(id){
		new_form_input = form_input.replace("%form_id%", id);
		ui.query_selector(1, dom.command_prompt_content).insertAdjacentHTML("beforeend", new_form_input);
	}
	
	return{
		get_menu: get_menu,
		create_form: create_form,
		get_my_info: get_my_info,
		add_form_data: add_form_data,
		arr_input_data: arr_input_data
	}
	
})(ui_controller, my_data);

var events_controller = (function(ui, command_prompt){
	var dom = ui.dom_strings, counter_increment = 0, counter_decrement = command_prompt.arr_input_data, counter_decrement_in = counter_decrement.length - 1;
	
	var set_up_event_listeners = function(){
		var form_id = 1;
		ui.query_selector(1, dom.minimize_container).addEventListener("click", function(event){
			
			ui.query_selector(1, dom.command_prompt).classList.add("minimize_close");
			ui.query_selector(1, dom.command_prompt_bar).classList.add("display_bar");
			
			event.preventDefault();
		});
		
		ui.query_selector(1, dom.maximize_container).addEventListener("click", function(event){
			ui.query_selector(1, dom.command_prompt).classList.toggle("maximize_open");
			ui.query_selector(1, dom.contents_container).classList.toggle("contents_container_open");
			event.preventDefault();
		});
		
		
		ui.query_selector(1, dom.start_menu).addEventListener("click", function(event){
			ui.query_selector(1, dom.start_menu_container).classList.toggle("close_open_start_menu");
			event.preventDefault();
		});
		
		ui.query_selector(1, dom.close_button).addEventListener("click", function(event){
			ui.query_selector(1, dom.start_menu_container).classList.remove("close_open_start_menu");
			form_id = form_id + 1;
			
			event.preventDefault();
		});
		
		ui.query_selector(1, dom.start_cmd).addEventListener("click", function(event){
			var counter = 1, last_element;
			ui.query_selector(1, dom.command_prompt).classList.add("open_cmd");
			ui.query_selector(1, dom.start_menu_container).classList.remove("close_open_start_menu");
			ui.query_selector(1, dom.command_prompt_bar).classList.add("display_bar");
			ui.query_selector(1, dom.start_cmd).classList.add("start_cmd_remove");
			
			if(form_id > 1){
				var previous_form = form_id - 1;
				document.querySelector("#form_input_"+previous_form).remove();
			}
			command_prompt.create_form(form_id);
			ui.query_selector(1, dom.form_input).focus();
			form_id += 1;
			event.preventDefault();
		});
		
		ui.query_selector(1, dom.command_prompt_bar).addEventListener("click", function(event){
			ui.query_selector(1, dom.command_prompt).classList.toggle("minimize_close");
			ui.query_selector(1, dom.command_prompt).classList.remove("maximize_open");
			ui.query_selector(1, dom.contents_container).classList.remove("contents_container_open");
			event.preventDefault();
		});
		
		ui.query_selector(1, dom.close_container).addEventListener("click", function(event){
			ui.query_selector(1, dom.command_prompt).classList.remove("open_cmd");
			ui.query_selector(1, dom.command_prompt_bar).classList.remove("display_bar");
			ui.query_selector(1, dom.start_cmd).classList.remove("start_cmd_remove");
			ui.query_selector(1, dom.command_prompt).classList.remove("maximize_open");
			ui.query_selector(1, dom.contents_container).classList.remove("contents_container_open");
			
			if(document.querySelectorAll(".previous_input_container div").length > 0)
				ui.remove_elements(document.querySelectorAll(".previous_input_container div"));

			if(document.querySelector(".form_wrapper p").length > 0)
				ui.remove_elements(document.querySelector(".form_wrapper p"));
			
			event.preventDefault();
		});
		
		document.body.addEventListener("click", function(event){
			var start_menu = event.target === ui.query_selector(1, dom.start_menu), 
				start_menu_h3 = event.target === document.querySelector(".start_menu h3"),
				start_menu_h3_span = event.target === document.querySelector(".start_menu h3 span");
			if(ui.query_selector(1, dom.start_menu_container).classList.length > 1){
				if(start_menu === false && start_menu_h3 === false && start_menu_h3_span === false){
					ui.query_selector(1, dom.start_menu_container).classList.remove("close_open_start_menu");
				}
			}
		
			ui.remove_highlights(ui.query_selector(1, dom.body_left).children, "highlight_red");
			ui.remove_highlights(ui.query_selector(1, dom.body_right).children, "highlight_red");
			event.preventDefault();
		});
		
		document.addEventListener('keypress', function(event) {
			switch(event.keyCode || event.which){
				case 13:
					if(ui.query_selector(1, dom.form_input).value != ""){
						command_prompt.add_form_data(ui.query_selector(1, dom.form_input).value);
						command_prompt.get_my_info(ui.query_selector(1, dom.form_input).value, ui.query_selector(1, dom.form_input));
					}
					break;
			}
			
        });
		
		document.addEventListener('keydown', function(event) {
			if(command_prompt.arr_input_data.length > 0){
				switch(event.keyCode || event.which){
					case 38:
						if(counter_increment < command_prompt.arr_input_data.length){
							ui.query_selector(1, dom.form_input).value = command_prompt.arr_input_data[counter_increment];
							counter_increment++;
						}else{
							counter_increment = 0;
						}
						break;
					case 40:
						if(counter_decrement_in > -1){
							ui.query_selector(1, dom.form_input).value = command_prompt.arr_input_data[counter_decrement_in];
							counter_decrement_in--;
						}else{
							counter_decrement_in = command_prompt.arr_input_data.length - 1;
						}
						break;
				}
			}
		});
		
		
		
	}
	
	return{
		init:function(){
			set_up_event_listeners();
			command_prompt.get_menu();
		}
	}
})(ui_controller, command_prompt_controller);

events_controller.init();