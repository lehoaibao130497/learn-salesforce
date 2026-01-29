# Website Guide - Salesforce Learning Journey

## 🌐 Website Overview

Tài liệu học tập của bạn đã được chuyển thành website đẹp và dễ truy cập sử dụng **Docusaurus** - một static site generator tuyệt vời của Facebook.

### Website Features ✨

- 📱 **Responsive Design** - Hoạt tốt trên mobile, tablet, và desktop
- 🌙 **Dark/Light Mode** - Tự động chuyển đổi theme
- 🔍 **Full-text Search** - Tìm kiếm nhanh toàn bộ tài liệu
- 📚 **Organized Navigation** - Sidebar navigation theo tuần
- ⚡ **Fast Loading** - Static site, cực nhanh
- 🎨 **Beautiful Styling** - Default theme từ Docusaurus

## 🚀 Bắt đầu nhanh

### 1. Cài đặt Dependencies

Website đã được tạo với TypeScript và cần cài đặt dependencies:

```bash
cd website
npm install
```

### 2. Chạy Website Locally

```bash
npm start
```

Website sẽ chạy tại: **http://localhost:3000**

### 3. Build cho Production

```bash
npm run build
```

Website sẽ được build vào `build/` folder.

## 📁 Cấu trúc Website

```
website/
├── docusaurus.config.ts          # Cấu hình chính
├── sidebars.ts                  # Navigation sidebar
├── docs/                        # Tài liệu chính
│   ├── intro.md                # Từ README.md
│   ├── getting-started.md       # Từ GETTING_STARTED.md
│   ├── quick-reference.md       # Từ QUICK_REFERENCE.md
│   ├── resources.md            # Từ RESOURCES.md
│   ├── project-structure.md     # Từ PROJECT_STRUCTURE.md
│   ├── DAILY_SCHEDULE_TEMPLATE.md
│   │
│   ├── week1/                 # Tuần 1
│   │   ├── README.md
│   │   ├── notes/
│   │   ├── project-management-app/
│   │   └── flow-examples/
│   ├── week2/                 # Tuần 2
│   │   ├── README.md
│   │   ├── notes/
│   │   ├── triggers/
│   │   ├── classes/
│   │   └── soql-examples/
│   ├── week3/                 # Tuần 3
│   │   ├── README.md
│   │   ├── notes/
│   │   ├── dashboard-component/
│   │   └── integration-examples/
│   └── week4/                 # Tuần 4
│       ├── README.md
│       ├── notes/
│       ├── practice-questions/
│       ├── ai-prompts/
│       └── exam-notes/
│
├── src/                         # Custom components
│   ├── components/
│   ├── css/
│   └── pages/                 # Homepage
│       └── index.tsx
└── static/                      # Static files
```

## 📝 Cập nhật Content

### Thêm hoặc sửa tài liệu

1. **Sửa file Markdown trong `docs/` folder**
2. **Website sẽ tự động reload** (nếu đang chạy `npm start`)
3. **Không cần rebuild** trong development mode

### Ví dụ: Thêm notes mới

```bash
# Tạo file mới
touch website/docs/week1/notes/2026-01-29-apex-basics.md

# Edit file
code website/docs/week1/notes/2026-01-29-apex-basics.md
```

### Ví dụ: Cập nhật sidebar

Edit `website/sidebars.ts` để thêm hoặc sắp xếp lại navigation:

```typescript
items: [
  'intro',
  'getting-started',
  'quick-reference',
  // Thêm files mới vào đây
]
```

## 🎨 Tùy chỉnh Website

### Đổi Theme

Edit `website/docusaurus.config.ts`:

```typescript
themeConfig: {
  // Default: classic theme
  // Có thể đổi sang:
  // - 'minerva' - Clean, minimalist
  // - 'bootstrap' - Bootstrap-like
  // - 'docusaurus-theme-classic' - Classic theme (default)
}
```

### Tùy chỉnh Colors

Edit `website/src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #00A1E0;  /* Salesforce blue */
  --ifm-color-primary-dark: #0076a3;
}
```

### Thêm Google Fonts

Edit `website/docusaurus.config.ts`:

```typescript
themeConfig: {
  metadata: [
    {name: 'theme-color', content: '#00A1E0'},
  ],
  scripts: [
    {
      src: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
      async: true,
    },
  ],
}
```

## 🚢 Deploy lên GitHub Pages (Miễn phí)

### Bước 1: Create GitHub Repository

1. Vào https://github.com/new
2. Tạo repository mới: `learn-salesforce`
3. Upload code của bạn

### Bước 2: Configure GitHub Pages

1. Vào repository trên GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` (hoặc `master`)
5. Folder: `/root` (hoặc `/docs`)
6. Click **Save**

### Bước 3: Update docusaurus.config.ts

Edit `website/docusaurus.config.ts`:

```typescript
// Thay thế bằng GitHub username của bạn
organizationName: 'your-github-username',

// Repository name của bạn
projectName: 'learn-salesforce',

// GitHub Pages URL của bạn
url: 'https://your-github-username.github.io',

// Base URL (thường là /repo-name/)
baseUrl: '/learn-salesforce/',
```

### Bước 4: Deploy

```bash
# Push code lên GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Deploy lên GitHub Pages
npm run deploy
```

Website sẽ có tại: **https://your-github-username.github.io/learn-salesforce/**

## 🚢 Deploy lên Vercel (Miễn phí & Nhanh hơn)

### Bước 1: Connect GitHub Repository

1. Vào https://vercel.com
2. Click "New Project"
3. Import GitHub repository của bạn

### Bước 2: Configure

1. **Framework Preset**: "Other"
2. **Root Directory**: `website`
3. **Build Command**: `npm run build`
4. **Output Directory**: `build`

### Bước 3: Deploy

Click **Deploy** - Vercel sẽ tự động deploy website của bạn!

## 🔧 Common Issues & Solutions

### Issue 1: Website không load sau thay đổi

**Solution:**
```bash
# Stop server (Ctrl+C)
# Delete cache
rm -rf website/.docusaurus
# Restart
npm start
```

### Issue 2: Syntax highlighting không hoạt động

**Solution:**
Check `website/docusaurus.config.ts`:

```typescript
prism: {
  theme: prismThemes.github,
  darkTheme: prismThemes.dracula,
  additionalLanguages: ['java', 'sql', 'javascript', 'typescript', 'bash', 'apex'],
}
```

### Issue 3: Deploy thất bại

**Solution:**
```bash
# Build locally trước để check lỗi
npm run build

# Fix build errors
# Sau đó deploy
npm run deploy
```

## 📊 Tracking Website Usage

### Add Analytics (Google Analytics)

Edit `website/docusaurus.config.ts`:

```typescript
themeConfig: {
  gtag: {
    trackingID: 'G-XXXXXXXXXX', // Google Analytics ID của bạn
    anonymizeIP: true,
  },
}
```

## 🎯 Tips cho Hiệu quả Tối đa

1. **Sử dụng Website như Reference**
   - Mở website song song song với coding
   - Tìm kiếm nhanh khi cần thông tin

2. **Update Notes vào Website**
   - Mỗi ngày, copy notes từ `DAILY_SCHEDULE_TEMPLATE.md`
   - Lưu vào `docs/weekX/notes/`
   - Website sẽ tự động update

3. **Tạo Bookmarks**
   - Homepage: https://your-username.github.io/learn-salesforce/
   - Quick Reference: https://your-username.github.io/learn-salesforce/docs/quick-reference
   - Week hiện tại: https://your-username.github.io/learn-salesforce/docs/weekX/README

4. **Sử dụng Search**
   - Press `/` để focus vào search bar
   - Type keyword (ví dụ: "Governor Limits", "Trigger")
   - Nhấn Enter để xem results

## 📱 Mobile Usage

Website đã tối ưu cho mobile:

- ✅ Navigation sidebar collapsible
- ✅ Touch-friendly buttons
- ✅ Responsive code blocks
- ✅ Optimized font sizes

## 🔄 Auto-Deploy với GitHub Actions

Để tự động deploy mỗi khi push code lên GitHub:

1. Create file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: cd website && npm ci
      - name: Build website
        run: cd website && npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/build
```

2. Push lên GitHub - deploy sẽ tự động chạy!

## 📞 Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Docusaurus GitHub](https://github.com/facebook/docusaurus)
- [Deployment Guide](https://docusaurus.io/docs/deployment)

---

**Website của bạn đã sẵn sàng để sử dụng!** 🎉

Mỗi khi bạn update tài liệu trong thư mục gốc, website sẽ tự động cập nhật khi bạn rebuild hoặc deploy.