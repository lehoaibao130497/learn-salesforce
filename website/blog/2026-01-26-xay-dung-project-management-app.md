---
slug: xay-dung-project-management-app
title: "Xây dựng Ứng dụng Quản lý Dự án: Mẹo và Thủ thuật"
authors: [hoclai]
tags: [tuan-1, admin, project-app, flow, thuc-hanh]
---

Trong bài viết này, tôi sẽ chia sẻ kinh nghiệm thực tế khi xây dựng **Project Management App** - dự án chính của Tuần 1. Đây không chỉ là một bài tập, mà là cơ hội để hiểu sâu về cách Salesforce hoạt động.

## 🎯 Tổng quan về Project Management App

Mục tiêu của app là quản lý dự án với các tính năng:

- ✅ Quản lý Projects và Tasks
- ✅ Theo dõi Milestones
- ✅ Tự động hóa thông báo với Flow
- ✅ Báo cáo và Dashboard
- ✅ Security phù hợp

## 📊 Thiết kế Data Model

### Objects được tạo

1. **Project__c** (Custom Object)
   - Name: Tên dự án
   - Description__c: Mô tả
   - Start_Date__c: Ngày bắt đầu
   - End_Date__c: Ngày kết thúc
   - Status__c: Trạng thái (Picklist)
   - Budget__c: Ngân sách

2. **Task__c** (Custom Object)
   - Name: Tên task
   - Description__c: Mô tả chi tiết
   - Status__c: Trạng thái
   - Priority__c: Độ ưu tiên
   - Due_Date__c: Ngày hết hạn
   - Project__c: Lookup đến Project

3. **Milestone__c** (Custom Object)
   - Name: Tên milestone
   - Target_Date__c: Ngày mục tiêu
   - Status__c: Trạng thái
   - Project__c: Lookup đến Project

### Relationships

```
Project__c (Master)
  ├── Task__c (Detail - Master-Detail)
  └── Milestone__c (Detail - Master-Detail)
```

**Lưu ý quan trọng**: Tôi chọn Master-Detail thay vì Lookup vì:
- Task và Milestone không thể tồn tại mà không có Project
- Cần roll-up summary fields trên Project
- Cần cascade delete khi Project bị xóa

## 🔐 Cấu hình Security

### 1. Custom Profile cho Project Managers

Tạo Profile "Project Manager" với quyền:
- **CRUD** trên Project, Task, Milestone
- **Read Only** trên Account, Contact
- **No Access** trên Opportunity, Campaign

### 2. Permission Sets cho các vai trò khác

- **Team Members**: Chỉ có Read trên Projects, Create/Read/Update trên Tasks
- **Stakeholders**: Chỉ có Read trên Projects và Milestones

### 3. Sharing Rules

- **Project Owner Team**: Tự động chia sẻ Projects cho团队成员
- **Executive Team**: Read access cho quản lý cấp cao

```yaml
Sharing Strategy:
1. Role Hierarchy: Mặc định từ Owner lên
2. Sharing Rules: Mở rộng cho team cross-functional
3. Manual Sharing: Khi cần trường hợp đặc biệt
```

## ⚡ Flow Automations

Tôi đã tạo 7 Flows khác nhau. Đây là những cái quan trọng nhất:

### 1. New Project Notification Flow

**Type**: Record-Triggered Flow (After Create)

**Purpose**: Gửi email cho team khi Project mới được tạo

**Logic**:
```
1. Trigger khi Project__c được tạo
2. Lấy danh sách Team Members từ Project__c.Team__c
3. Gửi email cho từng thành viên
4. Lưu lịch sử gửi vào Custom Object: Notification_Log__c
```

**Code equivalent** (để tham khảo):
```java
// Apex equivalent (để hiểu Flow)
trigger ProjectTrigger on Project__c (after insert) {
    List<Messaging.SingleEmailMessage> emails = new List<>();
    
    for(Project__c proj : Trigger.new) {
        // Tạo và gửi email
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        // ... logic gửi email
        emails.add(mail);
    }
    
    if(!emails.isEmpty()) {
        Messaging.sendEmail(emails);
    }
}
```

### 2. Task Due Date Reminder Flow

**Type**: Scheduled Flow (Runs daily at 8:00 AM)

**Purpose**: Nhắc nhở Tasks sắp hết hạn

**Logic**:
```
1. Query Tasks với:
   - Status != 'Completed'
   - Due_Date = Tomorrow
2. Gửi email reminder cho Assignee
3. Cập nhật Reminder_Sent__c = TRUE
```

**Cấu hình Schedule**:
- Start: 2026-01-26
- Frequency: Daily
- Preferred Start Time: 08:00:00
- Timezone: Asia/Saigon

### 3. Milestone Progress Flow

**Type**: Record-Triggered Flow (After Update)

**Purpose**: Cập nhật Progress__c trên Project khi Milestone hoàn thành

**Logic**:
```
1. Trigger khi Milestone__c.Status__c = 'Completed'
2. Query tất cả Milestones liên quan
3. Tính % Milestones đã hoàn thành
4. Update Project__c.Progress__c
```

## 📊 Reports & Dashboards

### Reports tạo ra

1. **Projects by Status Report**
   - Group by: Status
   - Record count
   
2. **Tasks Due This Week**
   - Filter: Due_Date between Today and Next 7 Days
   - Columns: Name, Project, Priority, Due_Date

3. **Milestone Progress Report**
   - Group by: Project, Status
   - Calculate: % Completed

### Dashboard: Project Overview

```
┌─────────────────────────────────────┐
│  Total Projects: 15                  │
│  Active: 12  Completed: 2  Delayed: 1 │
├─────────────────────────────────────┤
│  Tasks by Status (Pie Chart)        │
│  ├─ Not Started: 45%                │
│  ├─ In Progress: 35%                │
│  └─ Completed: 20%                  │
├─────────────────────────────────────┤
│  Milestone Progress (Bar Chart)     │
│  ├─ Project A: 75%                  │
│  ├─ Project B: 50%                  │
│  └─ Project C: 25%                  │
├─────────────────────────────────────┤
│  Recent Activities (Table)          │
│  - Project D created                │
│  - Task E completed                 │
│  - Milestone F delayed              │
└─────────────────────────────────────┘
```

## 💡 Tips & Tricks Learned

### 1. Formula Fields là bạn

Tôi đã tạo các Formula Fields hữu ích:

```salesforce
// Days Remaining on Project
IF(
  AND(
    NOT(ISBLANK(Start_Date__c)),
    NOT(ISBLANK(End_Date__c)),
    End_Date__c > TODAY()
  ),
  End_Date__c - TODAY(),
  0
)

// Project Health
CASE(
  Status__c,
  'On Track', '🟢 On Track',
  'At Risk', '🟡 At Risk',
  'Delayed', '🔴 Delayed',
  'Not Started', '⚪ Not Started',
  '⚪ Unknown'
)
```

### 2. Validation Rules là cần thiết

Tạo Validation Rules để ngăn chặn dữ liệu sai:

```salesforce
// End Date must be after Start Date
AND(
  NOT(ISBLANK(Start_Date__c)),
  NOT(ISBLANK(End_Date__c)),
  End_Date__c < Start_Date__c
)

// Task Due Date must be within Project timeline
AND(
  NOT(ISBLANK(Project__r.Start_Date__c)),
  NOT(ISBLANK(Project__r.End_Date__c)),
  OR(
    Due_Date__c < Project__r.Start_Date__c,
    Due_Date__c > Project__r.End_Date__c
  )
)
```

### 3. Debug Flow hiệu quả

Khi Flow lỗi, tôi dùng cách này:

1. **Enable Debug Mode** trong Flow Builder
2. **Add Debug Elements** để log giá trị
3. **Run Test** với sample data
4. **Review Debug Logs** trong Setup > Debug Logs

```yaml
Debug Steps:
1. Open Flow Builder
2. Click Debug menu
3. Enable Debug Mode
4. Add text template: "Task Name: {!Task.Name}"
5. Run Flow with sample record
6. Check Debug Logs for values
```

## 🐛 Những lỗi tôi gặp phải

### Lỗi 1: Roll-up Summary không hoạt động

**Vấn đề**: Tôi tạo Roll-up Summary trên Project nhưng không thấy giá trị.

**Nguyên nhân**: Quên set relationship là Master-Detail.

**Giải pháp**: Chuyển từ Lookup sang Master-Detail relationship.

### Lỗi 2: Flow quá nhiều records

**Vấn đề**: Task Due Date Reminder Flow gửi hàng trăm email trùng lặp.

**Nguyên nhân**: Không có check condition để tránh gửi lặp.

**Giải pháp**: Thêm field `Reminder_Sent__c` và check trước khi gửi.

### Lỗi 3: Validation quá nghiêm ngặt

**Vấn đề**: Không thể update Task sau khi tạo.

**Nguyên nhân**: Validation Rule quá broad.

**Giải pháp**: Thêm exception cho Admin users và System profile.

## 🎯 Best Practices áp dụng

### 1. Naming Convention

```
Custom Objects: PascalCase + __c
  - Project__c, Task__c, Milestone__c

Custom Fields: PascalCase + __c
  - Start_Date__c, Status__c, Priority__c

Formula Fields: Descriptive names
  - Days_Remaining__c, Project_Health__c

Flows: Descriptive + Type
  - NewProject_Notification
  - TaskDueDate_Reminder
  - Milestone_UpdateProgress
```

### 2. Documentation

Tạo README cho mỗi Flow:

```markdown
# New Project Notification Flow

## Purpose
Gửi email cho team khi Project mới được tạo

## Type
Record-Triggered Flow (After Create)

## Trigger Object
Project__c

## Business Logic
1. Get Team Members from Project__c.Team__c
2. Send email notification
3. Log notification in Notification_Log__c

## Last Updated
2026-01-26

## Last Modified By
[Your Name]
```

### 3. Testing Strategy

```yaml
Test Scenarios:
1. Create Project → Verify email sent
2. Update Task due date → Verify reminder sent
3. Complete Milestone → Verify progress updated
4. Delete Project → Verify cascade delete
5. Security test → Verify users only see their data
```

## 📈 Kết quả đạt được

Sau 1 tuần xây dựng:

- ✅ **3 Custom Objects** với đúng relationships
- ✅ **20+ Custom Fields** (various types)
- ✅ **7 Flow automations** hoạt động tốt
- ✅ **3 Reports** và **1 Dashboard**
- ✅ **Security model** đúng chuẩn
- ✅ **100% test coverage** cho tất cả scenarios

## 🚀 Những gì tôi học được

1. **Planning is everything**: Đừng bắt đầu code trước khi có thiết kế rõ ràng.
2. **Test early, test often**: Đừng chờ đến khi hoàn thành mới test.
3. **Document everything**: Bạn sẽ quên nếu không ghi lại.
4. **Start simple**: Tạo MVP trước, sau đó improve.
5. **Learn from mistakes**: Mỗi lỗi là một bài học.

## 💭 Lời khuyên cho bạn

Nếu bạn đang xây dựng app của riêng mình:

1. **Đừng bắt đầu với một app quá lớn**: Bắt đầu với MVP.
2. **Sử dụng Flow thay vì code khi có thể**: Nó dễ maintain hơn.
3. **Test security**: Đừng quên test với user profiles khác nhau.
4. **Backup your work**: Export metadata thường xuyên.
5. **Ask for feedback**: Nhận feedback sớm và thường xuyên.

---

**Bài viết tiếp theo**: [Tự động hóa với Flow: Những điều tôi ước mình biết sớm hơn](#) (coming soon)

Bạn có kinh nghiệm gì về xây dựng custom app? Chia sẻ bên dưới nhé! 💬

**Tags**: #Salesforce #PlatformDeveloperI #Admin #Flow #ProjectApp #BestPractices