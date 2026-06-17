var global_employees = [];

function init_employee_filter(dataset_path) {
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", dataset_path, true); 
    
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            
            var xmlDoc = xhr.responseXML;
            if (!xmlDoc) return; 

            global_employees = xmlDoc.getElementsByTagName("employee");

            var select_element = document.getElementById("title-select");
            
            var unique_titles = [];

            for (let i = 0; i < global_employees.length; i++) {
                var title = global_employees[i].getAttribute("title");
                
                if (title && !unique_titles.includes(title)) {
                    unique_titles.push(title); 
                }
            }

            unique_titles.forEach(function(title) {
                var option = document.createElement("option");
                
                option.value = title;       
                option.textContent = title; 
                
                select_element.appendChild(option);
            });

            select_element.addEventListener("change", function() {
                var selected_title = this.value; 
                filter_and_display(selected_title); 
            });
        }
    };
}



function filter_and_display(selected_title) {
    var bodyemployee = document.getElementById("bodyemployee");
    
    bodyemployee.innerHTML = "";

    if (!selected_title) return;

    for (let i = 0; i < global_employees.length; i++) {
        var title = global_employees[i].getAttribute("title");

        if (title === selected_title) {
            
            var id = global_employees[i].getAttribute("id");
            var name = global_employees[i].getElementsByTagName("name")[0].textContent;
            var phone = global_employees[i].getElementsByTagName("phone")[0].textContent;

            var tr = document.createElement("tr"); 
            var td_id = document.createElement("td");     
            td_id.textContent = id;                                   
            var td_name = document.createElement("td");   
            td_name.textContent = name;                               
            var td_phone = document.createElement("td");  
            td_phone.textContent = phone;                 

            tr.appendChild(td_id);
            tr.appendChild(td_name);
            tr.appendChild(td_phone);
            bodyemployee.appendChild(tr);
        }
    }
}