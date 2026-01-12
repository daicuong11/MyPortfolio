# Hướng dẫn Deploy Portfolio lên GitHub Pages (Miễn phí)

## 📋 Mục lục
1. [Chuẩn bị](#chuẩn-bị)
2. [Push code lên GitHub](#push-code-lên-github)
3. [Cấu hình GitHub Pages](#cấu-hình-github-pages)
4. [Kiểm tra Deployment](#kiểm-tra-deployment)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Chuẩn bị

### Yêu cầu:
- Đã tạo repository trên GitHub
- Đã cài đặt Git trên máy
- Đã có tài khoản GitHub

### Kiểm tra Git:
```bash
git --version
```

---

## 📤 Push code lên GitHub

### Bước 1: Kiểm tra trạng thái Git
```bash
git status
```

### Bước 2: Thêm tất cả các file vào staging
```bash
git add .
```

### Bước 3: Commit các thay đổi
```bash
git commit -m "Initial commit: Portfolio website"
```

### Bước 4: Thêm remote repository (nếu chưa có)
```bash
# Thay YOUR_USERNAME và YOUR_REPO_NAME bằng thông tin của bạn
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Lưu ý:** Nếu đã có remote, kiểm tra bằng:
```bash
git remote -v
```

Nếu cần thay đổi URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Bước 5: Push code lên GitHub
```bash
# Nếu branch của bạn là master
git push -u origin master

# Hoặc nếu branch là main
git push -u origin main
```

**Lưu ý:** Lần đầu push có thể cần đăng nhập GitHub. Nếu gặp lỗi authentication, hãy:
- Sử dụng Personal Access Token thay vì password
- Hoặc cấu hình SSH key

---

## ⚙️ Cấu hình GitHub Pages

### Bước 1: Bật GitHub Pages trong repository

1. Vào repository trên GitHub
2. Click vào tab **Settings** (Cài đặt)
3. Scroll xuống phần **Pages** ở sidebar bên trái
4. Trong phần **Source**, chọn:
   - **Source**: `GitHub Actions`
5. Click **Save**

### Bước 2: Kiểm tra cấu hình Next.js

File `next.config.ts` đã được cấu hình sẵn:
- `output: "export"` - Cho phép static export
- `images: { unoptimized: true }` - Cần thiết cho static export

**Nếu repository của bạn KHÔNG phải là `username.github.io`**, cần uncomment và cập nhật `basePath`:

```typescript
basePath: "/YOUR_REPO_NAME", // Thay YOUR_REPO_NAME bằng tên repo của bạn
trailingSlash: true,
```

### Bước 3: GitHub Actions sẽ tự động deploy

Sau khi push code, GitHub Actions sẽ:
1. Tự động chạy workflow khi có push lên branch `main` hoặc `master`
2. Build project Next.js
3. Deploy lên GitHub Pages

Bạn có thể xem tiến trình tại tab **Actions** trong repository.

---

## ✅ Kiểm tra Deployment

### Sau khi workflow chạy xong:

1. Vào tab **Actions** trong repository
2. Click vào workflow run mới nhất
3. Đợi job "Deploy to GitHub Pages" hoàn thành (có dấu ✓ màu xanh)
4. Vào **Settings > Pages** để xem URL của website

### URL website sẽ là:
- Nếu repo là `username.github.io`: `https://username.github.io`
- Nếu repo khác: `https://username.github.io/REPO_NAME`

**Lưu ý:** Có thể mất vài phút để website được cập nhật sau khi deploy.

---

## 🔄 Cập nhật website

Mỗi khi bạn push code mới lên GitHub:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push origin master  # hoặc main
```

GitHub Actions sẽ tự động build và deploy lại website.

---

## 🛠️ Troubleshooting

### Lỗi: "Workflow không chạy"
- Kiểm tra branch name (phải là `main` hoặc `master`)
- Kiểm tra file `.github/workflows/deploy.yml` có tồn tại
- Đảm bảo GitHub Actions được bật trong repository settings

### Lỗi: "Build failed"
- Kiểm tra log trong tab **Actions**
- Đảm bảo `package.json` có script `build`
- Kiểm tra không có lỗi TypeScript hoặc ESLint

### Lỗi: "404 Not Found" sau khi deploy
- Kiểm tra `basePath` trong `next.config.ts` (nếu repo không phải `username.github.io`)
- Đảm bảo file `public/.nojekyll` tồn tại (đã có sẵn)
- Đợi vài phút để GitHub cập nhật

### Lỗi: "Authentication failed" khi push
- Sử dụng Personal Access Token thay vì password
- Hoặc cấu hình SSH key:
  ```bash
  # Tạo SSH key (nếu chưa có)
  ssh-keygen -t ed25519 -C "your_email@example.com"
  
  # Copy public key và thêm vào GitHub Settings > SSH and GPG keys
  cat ~/.ssh/id_ed25519.pub
  ```

### Website không hiển thị đúng
- Xóa cache trình duyệt (Ctrl + Shift + Delete)
- Kiểm tra console browser để xem lỗi
- Kiểm tra Network tab để xem file nào không load được

---

## 📝 Lưu ý quan trọng

1. **Branch name**: Đảm bảo branch chính là `main` hoặc `master` (workflow đã hỗ trợ cả hai)

2. **Base Path**: Nếu repo không phải `username.github.io`, nhớ cập nhật `basePath` trong `next.config.ts`

3. **Build time**: Mỗi lần push sẽ mất khoảng 2-5 phút để build và deploy

4. **Free tier**: GitHub Pages miễn phí cho public repositories

5. **Custom domain**: Có thể thêm custom domain trong Settings > Pages

---

## 🎉 Hoàn thành!

Sau khi hoàn thành các bước trên, website của bạn sẽ được deploy miễn phí trên GitHub Pages và tự động cập nhật mỗi khi bạn push code mới!

**Cần hỗ trợ?** Kiểm tra:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
