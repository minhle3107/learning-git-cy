function getCategory(e, id) {
    let elements = document.querySelectorAll(".active");
    [].forEach.call(elements, function (el) {
        el.classList.remove('active')
    })
    e.target.className = "item active"

    const mainContent = document.getElementById('main-container')

    switch (id) {

        case 0:
            const contentIntroduction = `
 <div class="_content">


        <div class="_info">
            <h1 class="_title">Lợi ích của cà phê</h1>
            <p class="_description">Trong cafe có rất nhiều caffeine là một chất có rất nhiều tác dụng tốt với cơ thể,
                đồng thời các loại
                khoáng chất và hợp chất có lợi cũng đem lại cho người uống cafe thường xuyên nhiều lợi ích.</p>
            <p class="_description">Nói về tác động có lợi của cafe, người ta có thể kể ra hàng loạt hạng mục như: chống
                buồn ngủ, giúp tinh
                thần sảng khoái, thoải mái hơn, ngăn ngừa ung thư, lão hóa, kéo dài tuổi thọ, làm đẹp, giảm cân,… Và rất
                nhiều lợi ích khác</p>
        </div>

        <div class="_image">
            <img src="./assets/images/image%2030.svg" alt="" class="_detail">
        </div>


    </div>
`
            mainContent.innerHTML = contentIntroduction;


            break

        case 1:
            const products = `
            <div class="">

        <div>

            <h1 class="" style="text-align: center">List of product</h1>
        </div>

        <div class="_products" style="display: flex; gap: 40px; justify-content: center; margin-top: 30px">
            <div class="_item_product" style="background-color: beige">
                <p style="text-align: center">Coffee Trứng</p>
                <img src="./assets/images/sack-with-coffee-beans-table.jpg" alt="" width="300px">
                <div style="display: flex; gap: 10px; justify-content: center">
                    <p>Cà phê trứng muối</p>
                    <p>30000vnd</p>
                </div>
            </div>
            <div class="_item_product" style="background-color: beige">
                <p style="text-align: center">Coffee Trứng</p>
                <img src="./assets/images/sack-with-coffee-beans-table.jpg" alt="" width="300px">
                <div style="display: flex; gap: 10px; justify-content: center">
                    <p>Cà phê trứng muối</p>
                    <p>30000vnd</p>
                </div>
            </div>
            <div class="_item_product" style="background-color: beige">
                <p style="text-align: center">Coffee Trứng</p>
                <img src="./assets/images/sack-with-coffee-beans-table.jpg" alt="" width="300px">
                <div style="display: flex; gap: 10px; justify-content: center">
                    <p>Cà phê trứng muối</p>
                    <p>30000vnd</p>
                </div>
            </div>
            <div class="_item_product" style="background-color: beige">
                <p style="text-align: center">Coffee Trứng</p>
                <img src="./assets/images/sack-with-coffee-beans-table.jpg" alt="" width="300px">
                <div style="display: flex; gap: 10px; justify-content: center">
                    <p>Cà phê trứng muối</p>
                    <p>30000vnd</p>
                </div>
            </div>
        </div>

        <div class="_products" style="display: flex; gap: 40px; justify-content: center; margin-top: 30px">
            <div class="_item_product" style="background-color: beige">
                <p style="text-align: center">Coffee Trứng</p>
                <img src="./assets/images/sack-with-coffee-beans-table.jpg" alt="" width="300px">
                <div style="display: flex; gap: 10px; justify-content: center">
                    <p>Cà phê trứng muối</p>
                    <p>30000vnd</p>
                </div>
            </div>
            <div class="_item_product" style="background-color: beige">
                <p style="text-align: center">Coffee Trứng</p>
                <img src="./assets/images/sack-with-coffee-beans-table.jpg" alt="" width="300px">
                <div style="display: flex; gap: 10px; justify-content: center">
                    <p>Cà phê trứng muối</p>
                    <p>30000vnd</p>
                </div>
            </div>
            <div class="_item_product" style="background-color: beige">
                <p style="text-align: center">Coffee Trứng</p>
                <img src="./assets/images/sack-with-coffee-beans-table.jpg" alt="" width="300px">
                <div style="display: flex; gap: 10px; justify-content: center">
                    <p>Cà phê trứng muối</p>
                    <p>30000vnd</p>
                </div>
            </div>
            <div class="_item_product" style="background-color: beige">
                <p style="text-align: center">Coffee Trứng</p>
                <img src="./assets/images/sack-with-coffee-beans-table.jpg" alt="" width="300px">
                <div style="display: flex; gap: 10px; justify-content: center">
                    <p>Cà phê trứng muối</p>
                    <p>30000vnd</p>
                </div>
            </div>
        </div>


    </div>
            `

            mainContent.innerHTML = products;

            break;

        case 2:
            break;

        case 3:

            const content_out_web = `<div>
    <h1 style="text-align: center; color: #553C1C">Brand Idenity</h1>
    <h3 style="color: #553C1C">Brand core vaule</h3>

    <div style="display: flex; justify-content: space-between; gap: 20px">
        <div style="display: flex; justify-content: center;">
            <div style="align-content: center; width: 300px;">
                <div style="display: flex; justify-content: center;">
                    <img src="./assets/images/icon/green_double_circle_check_mark.jpg" alt="" height="150" width="150">
                </div>
                <div style="width: 100%; text-align: center; margin-top: 20px">
                    <span style="font-size: 20px; font-weight: bold">Cam kết chất lượng: </span>
                    <span>Mang đến cho khách hàng những ly cà phê tươi ngon nhất, được rang xay tại chỗ từ những hạt cà phê chất lượng cao, xuất xứ từ những vùng trồng cà phê nổi tiếng.</span>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: center;">
            <div style="align-content: center; width: 300px;">
                <div style="display: flex; justify-content: center;">
                    <img src="./assets/images/icon/Heart_shape_social_media_notification_icon_in_speech_bubbles_vector_illustration.jpg"
                         alt="" height="150" width="150">
                </div>
                <div style="width: 100%; text-align: center;  margin-top: 20px">
                    <span style="font-size: 20px; font-weight: bold">Kết nối đam mê: </span>
                    <span>Tạo ra một cộng đông yêu cà phê, nơi mọi người có thể chia sẻ kinh nghiệm, kiến thức và niềm đam mê với cà phê.</span>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: center;">
            <div style="align-content: center; width: 300px;">
                <div style="display: flex; justify-content: center;">
                    <img src="./assets/images/icon/30cf8297-25a3-48a2-b049-6a36d3f103d6.jpg" alt="" height="150"
                         width="150">
                </div>
                <div style="width: 100%; text-align: center;  margin-top: 20px">
                    <span style="font-size: 20px; font-weight: bold">Thân thiện với môi trường: </span>
                    <span>Áp dụng các phương pháp sản xuất và bao bì thân thiện với môi trường, giảm tác động tiêu cực đến thiên nhiên.</span>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: center;">
            <div style="align-content: center; width: 300px;">
                <div style="display: flex; justify-content: center;">
                    <img src="./assets/images/icon/5884.jpg" alt="" height="150" width="150">
                </div>
                <div style="width: 100%; text-align: center;  margin-top: 20px">
                    <span style="font-size: 20px; font-weight: bold">Sự sáng tạo: </span>
                    <span>Luôn đổi mới và cải thiện sản phẩm, dịch vụ để mang đến những trải nghiệm mới lạ và hấp dẫn cho khách hàng.</span>
                </div>
            </div>
        </div>
    </div>
</div>`

            mainContent.innerHTML = content_out_web;

            break;

        default:

    }
}