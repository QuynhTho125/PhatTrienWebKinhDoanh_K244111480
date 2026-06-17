/**
 * Hàm kích hoạt khi bấm nút: Đọc file XML bằng XMLHttpRequest và đổ dữ liệu Artist, Title lên bảng
 */
function load_cd_collection() {
    // Đường dẫn tương đối trỏ tới file dữ liệu XML của bạn
    var dataset_path = "datasets/cd_catalog.xml";
    
    // Khởi tạo đối tượng XMLHttpRequest chuẩn của trình duyệt
    var xhr = new XMLHttpRequest();
    
    // Cấu hình yêu cầu lấy file dữ liệu bằng phương thức GET
    xhr.open("GET", dataset_path, true);
    
    // Thực hiện lệnh gửi yêu cầu đi
    xhr.send();
    
    // Theo dõi và xử lý dữ liệu khi trạng thái phản hồi thay đổi
    xhr.onreadystatechange = function() {
        // Kiểm tra nếu tải file hoàn tất (4) và thành công (200)
        if (xhr.readyState == 4 && xhr.status == 200) {
            
            // Chuyển đổi dữ liệu thô nhận được thành đối tượng XML DOM cây thư mục
            var xmlDoc = xhr.responseXML;
            if (!xmlDoc) {
                alert("File XML có lỗi cú pháp hoặc không tìm thấy!");
                return;
            }

            // Gom tất cả các khối thẻ <CD> lại thành một danh sách mảng
            var tag_cds = xmlDoc.getElementsByTagName("CD");
            
            // Tìm đến thẻ thẻ <tbody> trên giao diện để chuẩn bị chèn dữ liệu
            var bodycd = document.getElementById("bodycd");
            
            // Xóa sạch dữ liệu cũ trong bảng trước khi nạp mới (đề phòng người dùng bấm nút nhiều lần)
            bodycd.innerHTML = "";
            
            // Duyệt vòng lặp qua từng phần tử CD đọc được
            for (let i = 0; i < tag_cds.length; i++) {
                // Trích xuất chuỗi chữ nội dung bên trong thẻ <ARTIST> và <TITLE> bằng .textContent
                var artist = tag_cds[i].getElementsByTagName("ARTIST")[0].textContent;
                var title = tag_cds[i].getElementsByTagName("TITLE")[0].textContent;
                
                // Tạo một thẻ hàng ngang <tr> mới  cho bảng
                var tr = document.createElement("tr");
                
                // Tạo ô dọc chứa dữ liệu tên Ca sĩ (Artist)
                var td_artist = document.createElement("td");
                td_artist.textContent = artist;
                
                // Tạo ô dọc chứa dữ liệu tựa đề bài hát (Title)
                var td_title = document.createElement("td");
                td_title.textContent = title;
                
                // Gắn lần lượt 2 ô dọc này vào hàng ngang tr theo đúng thứ tự cột trong ảnh
                tr.appendChild(td_artist);
                tr.appendChild(td_title);
                
                // Đẩy hàng ngang hoàn chỉnh này vào hiển thị trên bảng
                bodycd.appendChild(tr);
            }
        }
    };
}