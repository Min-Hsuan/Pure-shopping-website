
# Pure Shopping Website

一個功能完整的純前端電商練習專案，模擬真實線上購物流程。包含使用者註冊/登入（支援 Google 第三方登入）、商品瀏覽、購物車管理等核心功能。

**Live Demo**: [https://pure-shopping-website.vercel.app/](https://pure-shopping-website.vercel.app/)
![](https://live.staticflickr.com/65535/51544520641_218e19f949_b.jpg)

## 專案特色 (Key Features)

- 使用者認證系統
  - 註冊、登入、登出功能
  - 整合 Firebase Authentication 支援 Google 一鍵登入
- 商品瀏覽
  - 首頁與熱門商品展示
  - 商品列表頁，從 Firebase Realtime Database 動態載入商品資料
- 購物車管理
  - 新增/移除商品、調整數量
  - 即時計算小計與總金額
- 單頁應用路由（SPA Routing）
  - 包含首頁、商品列表、購物車、登入/註冊等頁面
- 響應式設計（Responsive Design）

## 使用技術 (Technologies Used)

| 類別           | 技術                          | 說明                                                                 |
|----------------|-------------------------------|----------------------------------------------------------------------|
| 前端框架       | React (Function Components + Hooks) | 使用現代 React 寫法，熟練掌握 useState、useEffect、useContext 等 Hooks |
| 狀態管理       | Redux + React-Redux           | 全域管理購物車與使用者登入狀態，避免 prop drilling                   |
| 路由管理       | React Router DOM v6           | 實現客戶端路由、動態導航與保護路由（需登入才能進入購物車）           |
| 建置工具       | Vite                          | 提供極快的開發體驗與生產建置                                         |
| 後端服務       | Firebase                      | - Authentication：使用者認證與 Google 登入<br>- Realtime Database：商品資料即時讀取 |
| 樣式處理       | 原生 CSS (模組化管理)         | 自訂響應式佈局與 UI 設計                                             |
| 程式碼品質     | ESLint                        | 維持一致的程式碼風格與品質                                           |
| 部署平台       | Vercel                        | 一鍵部署，提供穩定公開線上版本                                       |

## 我在這個專案中展現的能力 (Demonstrated Skills)

此專案為個人獨立開發，從需求規劃到上線部署全程一手包辦，充分展現以下前端工程師核心能力：

- **React 進階應用**：熟練使用 Hooks 管理元件狀態與副作用，設計可重用的組件。
- **全域狀態管理**：正確運用 Redux 處理跨層級的複雜狀態（如購物車與使用者資訊），理解 action、reducer、store 的設計原則。
- **路由與權限控制**：使用 React Router 實現多頁面導航，並實作保護路由（Protected Routes）。
- **第三方服務整合**：成功串接 Firebase Authentication 與 Realtime Database，處理非同步資料流、錯誤處理與即時更新。
- **現代開發流程**：從傳統 Create React App 遷移至 Vite，提升開發效率；熟悉 npm 套件管理與相依性更新。
- **問題解決能力**：獨立排查並解決圖片載入、Firebase 連線與狀態同步等常見問題。
- **程式碼品質與版本控制**：使用 ESLint 確保程式碼一致性，透過 Git 完整追蹤開發歷程。
- **部署與上線經驗**：將專案部署至 Vercel，提供公開可訪問的線上版本。

具備獨立開發一個具備真實後端支援、功能完整的前端電商應用的能力，能快速上手中大型 React 專案。

## 本地執行 (Local Development)

```bash
# 複製專案
git clone https://github.com/Min-Hsuan/Pure-shopping-website.git

# 進入專案目錄
cd Pure-shopping-website

# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev