This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Run Story book

run with command:

```bash
npm run storybook
```

# 📌 MP-WORK

Đây là ứng dụng phát triển

---

## 🗂️ Mục Lục

- [Giới thiệu](#-giới-thiệu)
- [Chức năng](#-chức-năng)
- [Cài đặt](#%EF%B8%8F-cài-đặt)
- [Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [Hướng dẫn deploy npm](#-hướng-dẫn-deploy-npm)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Công nghệ sử dụng](#%EF%B8%8F-công-nghệ-sử-dụng)
- [Đóng góp](#-đóng-góp)
- [License](#-license)

---

## 🔍 Giới Thiệu

-
- ***

## ✅ Chức Năng

- ✅ Tính năng 1
- ✅ Tính năng 2
- ✅ Tính năng 3
- ⏳ Tính năng sắp triển khai...

---

## ⚙️ Cài Đặt

```bash
# Clone repo
git clone https://github.com/LeGiau11/mp-work.git

# Di chuyển vào thư mục
cd mp-design

# Cài đặt các phụ thuộc
npm install

# build
npm run build
```

---

## 📋 Hướng Dẫn Sử Dụng

Tải bằng thư viện

```bash

npm install mp-design-ui

```

---

## 📋 Hướng Dẫn Deploy

```bash



```

---

## 📁 Cấu Trúc Thư Mục

```bash
mp-work/
│
├── public/             # File tĩnh
│   └── images/         # Chứa hình, ảnh
├── src/                # Mã nguồn chính
│   ├── common/
│   │    ├── const.ts
│   │    ├── index.ts
│   │    └── interface.ts
│   ├── components/
│   │    ├── Avatar/
│   │    │      ├── Avatar.module.scss
│   │    │      ├── index.tsx
│   │    │      └── interface.ts
│   │    ├── Breadcrumb/
│   │    │      ├── Breadcrumb.module.scss
│   │    │      ├── index.tsx
│   │    │      └── interface.ts
│   ├── Breadcrumb/
│   ├── Button/
│   ├── Card/
│   ├── Checkbox/
│   ├── Chip/
│   ├── common/         # Dùng chung cho những Component
│   ├── ContextMenu/
│   ├── ContextMenuConfigure/
│   ├── Dropdown/
│   ├── Input/
│   ├── InputPassword/
│   ├── List/
│   ├── Loader/
│   ├── Loading/
│   ├── MultipleSelect/
│   ├── Option/
│   ├── ProgressBar/
│   ├── Radio/
│   ├── SearchSelect/
│   ├── Select/
│   ├── Stepper/
│   ├── Steps/
│   ├── styles/         # CSS cho các Component
│   ├── Tabs/
│   ├── Toggle/
│   ├── Tooltip/
│   ├── Typography/
│   ├── global.d.ts     # Cấu hình CSS
│   └── index.ts        # Export tất cả component
│
├── .eslintignore
├── .gitignore
├── .prettierignore
├── .prettierrc         # Cấu hình prettier
├── eslint.config.js    # Cấu hình eslint
├── package-lock.json   # Cấu hình npm caching library
├── package.json        # Cấu hình npm
├── README.md
├── tsconfig.app.json   # Cấu hình typescript app
├── tsconfig.build.json # Cấu hình typescript build
├── tsconfig.json       # Cấu hình typescript
├── tsconfig.node.json  # Cấu hình typescript node
└── vite.config.ts      # Cấu hình vite

```

---

## 📁 Lưu đồ layer

UI -> API -> Validator -> Service -> DAO -> Database

---

## 🛠️ Công Nghệ Sử Dụng

- 💻 Ngôn ngữ: JavaScript.

- 📦 Thư viện chính: NextJs.

- 🗄️ Cơ sở dữ liệu: MongoDB.

- ⚙️ Công cụ: Git, VSCode...

---

## 🤝 Đóng Góp

1. Fork dự án

2. Tạo nhánh (git checkout -b new-feature)

3. Commit thay đổi (git commit -m 'Add new feature')

4. Push lên branch (git push origin new-feature)

5. Tạo Pull Request

---

## 📄 License

Dự án này được cấp phép theo giấy phép MIT. Xem thêm chi tiết trong file LICENSE.
