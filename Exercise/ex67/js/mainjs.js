/**
 * Parse XML và hiển thị cả 4 cột lên bảng, đồng thời gán sự kiện Click
 */
function load_students(students_xml_text, bodystudent) {
    var parser = new DOMParser(); 
    var xmlDoc = parser.parseFromString(students_xml_text, "text/xml"); 
    
    var tag_students = xmlDoc.getElementsByTagName("student");
    
    for (let i = 0; i < tag_students.length; i++) {
        // Trích xuất dữ liệu từ XML
        var id = tag_students[i].getElementsByTagName("id")[0].textContent;
        var name = tag_students[i].getElementsByTagName("name")[0].textContent;
        var birthday = tag_students[i].getElementsByTagName("birthday")[0].textContent;
        var gender = tag_students[i].getElementsByTagName("gender")[0].textContent;
        
        // Tạo hàng mới (tr)
        var tr = document.createElement("tr");
        
        // Tạo và gán data cho cả 4 ô dữ liệu (td)
        var td_id = document.createElement("td");
        td_id.textContent = id;
        
        var td_name = document.createElement("td");
        td_name.textContent = name;
        
        var td_birthday = document.createElement("td");
        td_birthday.textContent = birthday;
        
        var td_gender = document.createElement("td");
        td_gender.textContent = gender;
        
        // Gắn cả 4 ô vào hàng tr
        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_birthday);
        tr.appendChild(td_gender); 
        
        // Sự kiện click gán trực tiếp cho hàng để đẩy data lên Form
        tr.addEventListener("click", function() {
            document.getElementById("info-id").value = id;
            document.getElementById("info-name").value = name;
            document.getElementById("info-birthday").value = birthday;
            document.getElementById("info-gender").value = gender;
        });
        
        bodystudent.appendChild(tr);
    }
}