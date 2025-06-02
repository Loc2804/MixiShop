# 🛍️ MixiShop – Ứng dụng thương mại điện tử

**MixiShop** là một nền tảng bán hàng online hiện đại, giúp người dùng dễ dàng duyệt sản phẩm, đặt hàng và quản lý đơn hàng một cách tiện lợi.

---

## 🚀 Tính năng chính

- 🛍️ Xem và tìm kiếm sản phẩm theo danh mục  
- 🛒 Thêm vào giỏ hàng, đặt đơn hàng  
- 👤 Đăng ký, đăng nhập, phân quyền người dùng  
- 🧾 Quản lý đơn hàng và trạng thái giao hàng  
- 📦 Quản trị sản phẩm, danh mục, tồn kho  
- 🛠️ Trang quản trị riêng dành cho admin  

---

## 🛠️ Công nghệ sử dụng

### Backend:
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=flat&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white)

### Frontend:
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)
![Ant Design](https://img.shields.io/badge/AntDesign-0170FE?style=flat&logo=ant-design&logoColor=white)

---

## 📦 Hướng dẫn cài đặt & chạy ứng dụng

### 1. Clone project

```bash
git clone https://github.com/Loc2804/MixiShop.git
cd MixiShop
```

### 2. Cài đặt backend

```bash
cd backend_nodejs
npm install

#Cài đặt cơ sở dữ liệu
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all  # nếu có seed dữ liệu

# Khởi chạy server
npm start
```

### 3. Cài đặt frontend

```bash
cd ../frontend_reactjs
npm install
npm start
```
