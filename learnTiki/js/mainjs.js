function load_category_fromxml(dataset_path, bodycategory) {
    // Using standard XMLHttpRequest for cross-browser compatibility
    var xhr = new XMLHttpRequest(); 
    
    // FIX: Pass the actual variable dataset_path instead of the literal string "dataset_path"
    xhr.open("GET", dataset_path, true); 
    xhr.send();
    
    xhr.onreadystatechange = function() {
        // Step 1: Wait until the request operation is complete (readyState 4)
        if (xhr.readyState == 4) {
            
            // Step 2: Check if the HTTP status is successful
            if (xhr.status == 200) {
                // Handling when loading data successfully
                var xmlDoc = xhr.responseXML;
                var tag_categories = xmlDoc.getElementsByTagName("category");
        
                for (let i = 0; i < tag_categories.length; i++) {
                    var value_tag_image = tag_categories[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;
                    var value_tag_name = tag_categories[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
               
                    var tr = document.createElement("tr");
                    
                    var td_image = document.createElement("td");
                    var img = document.createElement("img");
                    img.src = value_tag_image;
                    img.style.width = "100px";
                    img.style.height = "100px";
                    td_image.appendChild(img);
                    
                    var td_name = document.createElement("td");
                    td_name.innerHTML = value_tag_name;
                    
                    tr.appendChild(td_image);
                    tr.appendChild(td_name);
                  
                    bodycategory.appendChild(tr);
                } // End of for loop
                
            } else {
                // FIX: Handling when data can't be loaded (e.g., status 404, 500)
                alert("Error loading XML data. Status code: " + xhr.status);
            }
        }
    }; // End of onreadystatechange
}