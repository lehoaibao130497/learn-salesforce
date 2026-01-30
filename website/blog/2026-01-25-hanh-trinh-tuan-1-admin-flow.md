---
slug: hanh-trinh-tuan-1-admin-flow
title: "Hành trình Tuần 1: Làm chủ Quản trị Salesforce"
authors: [hoclai]
tags: [tuan-1, admin, flow, quan-tri, bat-dau]
---

Hôm nay tôi bắt đầu hành trình 4 tuần để vượt qua kỳ thi chứng chỉ **Salesforce Platform Developer I**. Tuần đầu tiên tập trung vào **Quản trị Salesforce** và **Flow Automation**. Đây là những kiến thức nền tảng cực kỳ quan trọng.

## 🎯 Mục tiêu Tuần 1

Tuần đầu tiên mang lại những nền tảng vững chắc về:

- **Salesforce Administration**: Hiểu về Objects, Fields, Relationships
- **Security**: Sharing rules, Profile, Permission Sets
- **Flow Automation**: Xây dựng các quy trình tự động hóa mà không cần code

## 📚 Những gì tôi học được

### 1. Custom Objects & Fields

Tôi đã học cách tạo Custom Objects và hiểu các loại fields khác nhau:

- **Text Fields**: Dùng cho thông tin văn bản ngắn
- **Number Fields**: Dùng cho số liệu cần tính toán
- **Picklist Fields**: Cung cấp các lựa chọn có sẵn
- **Formula Fields**: Tự động tính toán giá trị dựa trên các fields khác
- **Lookup & Master-Detail Relationships**: Thiết lập quan hệ giữa objects

**Lời khuyên**: Luôn suy nghĩ về mô hình dữ liệu trước khi bắt đầu tạo. Tạo một diagram giúp bạn hình dung rõ hơn về các quan hệ.

### 2. Security Model

Salesforce có một mô hình bảo mật khá phức tạp nhưng mạnh mẽ:

- **Profiles**: Xác định những gì người dùng có thể làm (Object-level security)
- **Permission Sets**: Cung cấp quyền truy cập bổ sung mà không cần thay đổi Profile
- **Role Hierarchy**: Xác định quyền truy cập dữ liệu (Record-level security)
- **Sharing Rules**: Mở rộng quyền truy cập cho các nhóm người dùng cụ thể

**Bài học quan trọng**: Sử dụng Permission Sets thay vì tạo quá nhiều Profiles. Nó giúp quản lý dễ dàng hơn.

### 3. Flow Builder

Flow là công cụ mạnh mẽ nhất để tự động hóa mà không cần code. Tôi đã học:

- **Screen Flows**: Tạo các quy trình có giao diện người dùng
- **Record-Triggered Flows**: Tự động chạy khi record được tạo, cập nhật hoặc xóa
- **Scheduled Flows**: Chạy tự động theo lịch trình
- **Auto-Launched Flows**: Chạy ngầm mà không cần giao diện người dùng

**Ví dụ thực tế**: Tôi đã tạo một Flow tự động gửi email thông báo khi một task được hoàn thành.

## 💡 Những thách thức và cách vượt qua

### Thách thức 1: Hiểu Security Model
Lúc đầu, tôi rất bối rối với sự khác biệt giữa Profile và Permission Sets.

**Giải pháp**: Tôi đã tạo một bảng so sánh và thử nghiệm từng loại trong Developer Org. Thực hành thực tế giúp tôi hiểu nhanh hơn nhiều.

### Thách thức 2: Debug Flow
Khi Flow không hoạt động như mong đợi, tôi không biết cách tìm lỗi.

**Giải pháp**: Sử dụng **Flow Debugger** trong Setup. Nó cho phép chạy Flow từng bước và xem giá trị của từng biến.

### Thách thức 3: Quản lý thời gian
Với nhiều Trailhead modules và các bài tập, tôi cảm thấy quá tải.

**Giải pháp**: 
- Chia nhỏ tasks thành các mục hàng ngày
- Dành 4 giờ buổi sáng cho Trailhead
- 5 giờ buổi chiều cho thực hành
- 2 giờ buổi tối để review và chuẩn bị cho ngày mai

## 🎉 Kết quả Tuần 1

Cuối tuần 1, tôi đã hoàn thành:

- ✅ **12 Trailhead badges** về Admin & Flow
- ✅ **Project Management App** hoàn chỉnh với:
  - Custom Objects: Project, Task, Milestone
  - Automation với Flow
  - Security settings đúng chuẩn
- ✅ **7 Flow automations** khác nhau
- ✅ **Hiểu rõ** mô hình bảo mật Salesforce

## 💭 Những bài học quan trọng

1. **Thực hành là chìa khóa**: Đừng chỉ đọc tài liệu, hãy làm theo ngay lập tức.
2. **Đừng sợ sai**: Developer Edition là để thử nghiệm. Tạo, xóa, tạo lại - đó là cách tốt nhất để học.
3. **Ghi chú mọi thứ**: Tôi đã tạo một repository riêng để lưu lại những gì mình học.
4. **Hỏi khi gặp khó**: Salesforce Stack Exchange là nơi tuyệt vời để tìm câu trả lời.

## 🚀 Chuẩn bị cho Tuần 2

Tuần 2 sẽ tập trung vào **Apex** và **SOQL** - lập trình backend. Tôi rất hào hứng vì đây là phần thú vị nhất!

**Kế hoạch Tuần 2**:
- Tìm hiểu Apex syntax và structure
- Viết Apex Triggers
- Thực hành SOQL queries
- Tạo Test Classes

## 📝 Lời khuyên cho người mới bắt đầu

Nếu bạn mới bắt đầu hành trình học Salesforce, đây là lời khuyên của tôi:

1. **Đừng vội vã**: Hãy dành thời gian hiểu rõ những kiến thức cơ bản.
2. **Tạo Developer Org ngay**: Thực hành trên chính org của bạn.
3. **Làm theo Trailhead**: Nó cung cấp lộ trình học tập tuyệt vời.
4. **Tham gia cộng đồng**: Salesforce Developer Community rất hỗ trợ.
5. **Kiên nhẫn**: Kiến thức sẽ tích lũy theo thời gian, đừng nản lòng.

---

**Tiếp theo**: [Xây dựng Ứng dụng Quản lý Dự án: Mẹo và Thủ thuật](#) (coming soon)

Bạn có câu hỏi gì về Tuần 1? Hãy để lại bình luận bên dưới nhé! 💬

**Tags**: #Salesforce #PlatformDeveloperI #Admin #Flow #LearningJourney