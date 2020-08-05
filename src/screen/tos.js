import React from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView} from 'react-native';

const TOS = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>I. THỎA THUẬN SỬ DỤNG</Text>
        <Text style={styles.content}>
          Trước khi sử dụng trang web hoặc bất kì ứng dụng nào của công ty cổ
          phần tập đoàn công nghệ Seralead Việt Nam. Bạn cần đọc kỹ và cẩn thận
          nội dung thỏa thuận về việc sử dụng các dịch vụ của chúng tôi. Khi bạn
          truy cập và sử dụng trang Web s-job.vn hoặc ứng dụng S.Job Bản đồ tìm
          việc làm thuộc quyền sở hữu của công ty được điều chỉnh bằng Thỏa
          thuận sử dụng và Chính sách bảo mật này xem như bạn đã chấp nhận thỏa
          thuận sử dụng.
        </Text>
        <Text style={styles.subLabel}>1. Giải thích từ ngữ</Text>
        <Text style={styles.content}>
          “ Chúng tôi”; “Công ty” được sử dụng trong điều khoản và chính sách
          bảo mật này được hiểu là Công ty cổ phần tập đoàn công nghệ Seralead
          Việt Nam, có tư cách pháp nhân và được pháp luật Việt Nam bảo hộ.
        </Text>
        <Text style={styles.subLabel}>2. Điều khoản chung</Text>
        <Text style={styles.content}>
          Thỏa thuận sử dụng và Chính sách bảo mật dưới đây được áp dụng cho
          việc sử dụng trang web s-job.vn và ứng dụng di động S.Job Bản đồ tìm
          việc làm thuộc toàn quyền sở hữu của công ty cổ phần tập đoàn công
          nghệ Seralead Việt Nam. Chúng tôi được phép sửa đổi các điều khoản sử
          dụng tại bất cứ thời điểm nào bằng cách cập nhật nội dung này. Bạn bị
          ràng buộc bởi các nội dung này và do đó cần truy cập định kỳ website
          hoặc ứng dựng của công ty trên điện thoại di động để xem xét Thỏa
          thuận sử dụng và chính sách bảo mật tại thời điểm hiện tại. Bạn có
          quyền từ chối chấp nhận các điều khoản đã thay đổi này nếu thấy không
          phù hợp với nhu cầu sử dụng cá nhân. Việc từ chối này sẽ chấm dứt tất
          cả các quyền truy cập của bạn tới trang web s-job.vn và ứng dụng S.Job
          Bản đồ tìm việc làm trên điện thoại di động của chúng tôi. Việc bạn
          tiếp tục truy cập website s-job.vn hoặc ứng dụng S.Job Bản đồ tìm việc
          làm trên điện thoại di động được hiểu là bạn đã đồng ý và chấp nhận
          Thỏa thuận sử dụng và Chính sách bảo mật đã thay đổi của chúng tôi.
        </Text>
        <Text style={styles.subLabel}>3. Vấn đề bản quyền</Text>
        <Text style={styles.content}>
          Tất cả các tài nguyên (như nội dung văn bản, biểu tượng, hình ảnh,…)
          trên website S-job.vn và ứng dụng S.Job Bản đồ tìm việc làm trên điện
          thoại di động đều là tài sản của Công ty hoặc bên thứ ba là nhà phân
          phối, đối tác của Công ty đều có bản quyền và được bảo vệ bởi Luật bản
          quyền của Việt Nam và Quốc tế. Việc sử dụng nội dung trang web hoặc
          các ứng dụng di động của công ty nếu không được phép có thể xâm phạm
          bản quyền, thương hiệu và những luật định khác. Chúng tôi không chịu
          trách nhiệm về các nội dung của các website hay ứng dụng có liên kết
          tới website hoặc ứng dụng di động của công ty khi chúng tôi không sở
          hữu các tài nguyên này.
        </Text>
        <Text style={styles.subLabel}>4. Vấn đề nội dung </Text>
        <Text style={styles.content}>
          Trang web s-job.vn và ứng dụng S.Job Bản đồ tìm việc làm của chúng tôi
          chỉ nhằm mục đích tạo kết nối giữa Ứng viên tìm việc và Nhà tuyển
          dụng. Chúng tôi không liên quan đến quá trình giao dịch thực sự giữa
          nhà tuyển dụng và ứng viên. Kết quả là chúng tôi không thể kiểm soát
          được chất lượng, độ an toàn hay hợp pháp của công việc hay đơn xin
          việc được đăng tải, tính xác thực hay chính xác của danh sách, khả
          năng cung cấp công việc cho ứng viên của nhà tuyển dụng hay khả năng
          của ứng viên khi xin việc. Chúng tôi không được xem là một nhà tuyển
          dụng đối với việc bạn sử dụng trang web s-job.vn hoặc ứng dụng S.Job
          Bản đồ tìm việc làm trên điện thoại di động. Chúng tôi sẽ không chịu
          trách nhiệm với bất cứ quyết định nào trong công việc, cho dù với lý
          do nào, do bất cứ tổ chức nào đăng tải công việc trên trang web
          s-job.vn và ứng dụng S.Job Bản đồ tìm việc làm. Chúng tôi nghiêm cấm
          việc sử dụng Website s-job.vn và ứng dụng S.Job Bản đồ tìm việc làm
          vào bất kì mục đích nào khác ngoài mục đích chúng tôi đã nêu trong
          điều khoản này. Các cá nhân, tổ chức sử dụng ngoài mục địch của quy
          định này được xem như là hành vi vi phạm pháp luật, sẽ bị xử lý theo
          đúng quy định của pháp luật. Bạn với tư cách là người sử dụng trang
          web s-job.vn hoặc ứng dụng S.Job Bản đồ tìm việc làm của chúng tôi cần
          chịu trách nhiệm về các nội dung bạn đăng tải.Tất cả các thông tin
          đăng tải gian dối, xuyên tạc, sai sự thật gây ảnh hưởng đến uy tín
          hoặc thiệt hại về lợi ích cho các bên thì Bạn sẽ phải hoàn toàn chịu
          trách nhiệm. Bạn đồng ý rằng các thông tin bạn sử dụng trên trang web
          s-job.vn hoặc ứng dụng S.Job Bản đồ tìm việc làm của chúng tôi chỉ
          dành cho mục đích sử dụng cá nhân, không thể bán, phân phối lại, hoặc
          sử dụng cho bất kỳ mục đích thương mại. Khi bạn sử dụng và đăng tải
          nội dung lên trang web s-job.vn và ứng dụng S.Job Bản đồ tìm việc làm.
          Chúng tôi được hiểu là bạn đã đồng ý và cho phép chúng tôi toàn quyền
          sử dụng các nội dung này. Chúng tôi có quyền loại bỏ các nội dung,
          thông tin trái với các quy định sử dụng trong điều khoản này.
        </Text>
        <Text style={styles.subLabel}>5. Chức năng tư vấn luật</Text>
        <Text style={styles.content}>
          Chúng tôi xây dựng chức năng tư vấn luật chỉ đơn giản là công cụ để hỗ
          trợ giải đáp các thắc mắc mà khách hàng đối tác của chúng tôi quan
          tâm. Chức năng hoàn toàn miến phí, chúng tôi không thu bất kì khoản
          phí nào của khách hàng từ hoạt động tư vấn này. Chính vì vậy hoạt động
          hỗ trợ pháp lý này không được xem như là công ty hành nghề luật. Các
          nội dung mà chúng tôi tư vấn chỉ mang tích chất tham khảo, không phải
          là một hướng dẫn hay đề nghị khách hàng thực hiện. Việc khách hàng sử
          dụng các thông tin tư vấn này ngoài mục đích tham khảo nếu có hậu quả
          phát sinh chúng tôi không chịu trách nhiệm về các hậu quả đó. Tùy theo
          hoạt động kinh doanh của công ty trong tương lai, chúng tôi có thể hợp
          tác với các bên thứ ba ( như Luật sư, chuyên viên pháp chế, văn phòng
          Luật sư, các công ty Luật) để phát triển và mở rộng tính năng nhằm hỗ
          trợ tốt nhất cho khách hàng của chúng tôi. Các tính năng được mở rộng
          này có thể sẽ thu phí từ người dùng, các quy định cụ thể chúng tôi sẽ
          cập nhật vào Điều khoản ở các lần cập nhật tiếp theo.
        </Text>
        <Text style={styles.subLabel}>6. Vấn đề phát sinh</Text>
        <Text style={styles.content}>
          Chúng tôi không chứng nhận về việc sử dụng website hay ứng dụng của
          chúng tôi là không bao giờ xảy ra bất kì vấn đề gì. Việc hoạt động
          trên môi trường internet luôn tồn tại các mối đe dọa về an ninh mạng,
          nhiễm virut, lỗi đường truyền …v.v. dẫn đến việc không hoạt động của
          website hay ứng dụng và làm gián đoạn quá trình sử dụng của bạn; có
          thể dẫn đến các hậu quả không mong muốn. Với các hậu quả phát sinh từ
          các nguyên nhân khách quan này, chúng tôi sẽ không phải chịu trách
          nhiệm cho các thiệt hại đó. Chúng tôi mong bạn sẽ chia sẻ và thông cảm
          cho chúng tôi về các khó khăn chung này. Chúng tôi sẽ cố gắng không
          ngừng nâng cao dịch vụ của chúng tôi với mong muốn đem lại trải nghiệm
          tốt nhất cho bạn. Chúng tôi cũng không phải chịu trách nhiệm về bất kì
          hậu quả phát sinh nào từ lỗi của người sử dụng ,thiết bị của người sử
          dụng (như máy tính , diện thoại …v.v).
        </Text>
        <Text style={styles.subLabel}>7. Chấm dứt sử dụng</Text>
        <Text style={styles.content}>
          Chúng tôi có quyền chấm dứt ngay lập tức việc sử dụng của bạn trên các
          trang web hay ứng dụng di động của chúng tôi ngay khi chúng tôi nhận
          thấy các dấu hiệu vi phạm của bạn xâm phạm và làm thiệt hại đến các
          lợi ích hợp pháp của chúng tôi hoặc các bên thứ ba là đối tác, khách
          hàng của chúng tôi. Chúng tôi sẽ không phải chịu bất kì trách nhiệm
          pháp lý nào về các thiệt hại nếu có của bạn từ việc chấm dứt sử dụng
          này.
        </Text>
        <Text style={styles.label}>II. CHÍNH SÁCH BẢO MẬT</Text>
        <Text style={styles.subLabel}>1. Tuyên bố chung</Text>
        <Text style={styles.content}>
          Chúng tôi cam kết tôn trọng thông tin cá nhân của người sử dụng. Đảm
          bảo thực hiện đúng quy định của pháp luật về quyền riêng tư của các
          nhân và tổ chức sử dụng dịch vụ của chúng tôi. Chúng tôi nghiêm cấm và
          lên án tất cả các hành vi cố tình xâm phạm dữ liệu, thông tin người
          dùng là khách hàng, đối tác của chúng tôi khi không được phép vào bất
          kì mục đích gì.
        </Text>
        <Text style={styles.subLabel}>2. Hoạt động thu thập thông tin </Text>
        <Text style={styles.content}>
          Chúng tôi thu thập thông tin của bạn khi bạn cung cấp trực tiếp cho
          chúng tôi thông qua website, ứng dụng di động, các phương tiện liên
          lạc khác hoặc từ các hoạt động tương tác của bạn khi sử dụng website,
          ứng dụng di động của chúng tôi. Các thông tin có thể là tên, email, số
          điện thoại, địa chỉ, ảnh hồ sơ, vị trí hiện tại, ghi chú công việc,
          các nội dung đánh giá, nhận xét, phản hồi, thời gian truy cập, tần
          suất truy cập, địa chỉ IP.
        </Text>
        <Text style={styles.subLabel}>
          3. Chúng tôi có thể sử dụng các thông tin thu thập về bạn để:
        </Text>
        <Text style={styles.content}>
          - Nâng cao các trải nghiệm của bạn khi sử dụng dịch vụ của chúng tôi -
          Hỗ trợ các vấn đề phát sinh trong quá trình bạn sử dụng dịch vụ - Khai
          báo thông tin cần thiết khi có yêu cầu từ các cơ quan pháp luật - Chia
          sẻ các thông tin này tới các bên thứ ba hợp tác với chúng tôi( như các
          bên tư vấn, các nhà quảng cáo, đối tác tiếp thị) chỉ nhằm mục đích hỗ
          trợ chúng tôi phân phối sản phẩm và dịch vụ đến bạn; việc này giúp
          nâng cao trải nghiệm sử dụng và cung cấp các dịch vụ tốt nhất cho bạn.
          - Chúng tôi thu thu thập tên, email, số điện thoại, địa chỉ, vị trí,
          ảnh hồ sơ của ứng viên để giúp ứng viên tiếp cận được với nhà tuyển
          dụng dễ dàng hơn và nâng cao cơ hội tìm kiếm việc làm của ứng viên -
          Chúng tôi thu thập tên công ty, địa chỉ email và số điện thoại, vị trí
          của Nhà tuyển dụng để cho phép Ứng viên nộp đơn ứng tuyển.
        </Text>
        <Text style={styles.subLabel}>4. Lưu trữ bảo mật dữ liệu</Text>
        <Text style={styles.content}>
          - Mỗi người dùng sẽ được cấp tài khoản riêng ( user, password) do
          người dùng tự cài đặt và quản lý ( người dùng có thể thay đổi password
          thường xuyên nhằm nâng cao tính bảo mật) - Hệ thống bảo mật 2 lớp sử
          dụng mã SMS OTP để xác thực thông tin - Toàn bộ dữ liệu người dùng sẽ
          được lưu trữ tại trung tâm máy chủ riêng ( địa chỉ IP riêng, server
          riêng) của công ty - Hệ thống máy chủ của công ty được cấp chứng nhận
          bảo mật quốc tế (SSL) - Người dùng có thể thay đổi việc tiếp nhận các
          thông tin bằng cách vào phần cái đặt, mục cài đặt thông báo; ở đây
          chúng tôi sẽ xây dựng tính năng hủy nhận thông báo, điều này sẽ giúp
          người dùng kiểm soát được các thông tin mong muốn.
        </Text>
        <Text style={styles.subLabel}>5. Thay đổi chính sách bảo mật </Text>
        <Text style={styles.content}>
          Nếu chúng tôi quyết định thay đổi chính sách bảo mật của chúng tôi,
          chúng tôi sẽ đăng những thay đổi trên trang này.
        </Text>
        <Text style={styles.label}>III. LIÊN HỆ VỚI CHÚNG TÔI</Text>
        <Text style={styles.content}>
          Nếu có bất kỳ câu hỏi liên quan đến Thỏa thuận sử dụng hay chính sách
          bảo mật này, bạn có thể liên hệ với chúng tôi theo thông tin dưới đây:
          Tên công ty: Công ty cổ phần tập đoàn công nghệ Seralead Việt Nam Địa
          chỉ: Số nhà 43 - Đường QL2 - Thôn Thái Phù - Xã Mai Đình - Huyện Sóc
          Sơn - Tp Hà Nội Hotline: 0888.402.203 Email: cskh@s-job.vn;
          hotrophaply@s-job.vn; seralead@s-job.vn
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginVertical: 10, marginHorizontal: 10},
  label: {fontSize: 25, marginBottom: 20},
  subLabel: {fontSize: 20, marginVertical: 10},
  content: {fontSize: 16},
});

export default TOS;
