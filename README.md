# ISMS 主導稽核員 · 互動課程筆記（ISMS LA · CNS 27001:2023 ≡ ISO/IEC 27001:2022）

> CNS 27001:2023 等同採用 ISO/IEC 27001:2022；本筆記內文一律以 **ISO/IEC 27001:2022** 的條款編號與附錄 A 為準。

ISMS 主導稽核員（ISMS Lead Auditor）課程的**互動筆記** —— 能學、能查、能拿去稽核。把資訊安全管理系統（ISMS）的全貌做成會講解自己的互動圖：純靜態、深淺色高級質感、點任一節點看白話說明＋對應 ISO 27001 條款＋稽核三件組，三張架構圖互相扣。

🔗 線上：https://madangel1215.github.io/ismsla-notes/

對應課程三大架構，外加 27001 本體：

| 視圖 | 內容 | 標準 |
|---|---|---|
| **圖一 · PDCA 運轉** | 領導[5]軸心 + 規劃[6]/支援運作[7·8]/績效[9]/改善[10] + 計畫·執行·檢核·行動 + 利害關係人 5 類要求來源 | ISO/IEC 27001:2022 條款 4–10 |
| **圖二 · 風險流程** | 風險評鑑（識別→分析→評估）→ 風險處理（含 SoA）→ 剩餘風險，溝通諮詢/監督審查貫穿 | ISO 31000 / ISO/IEC 27005 / IEC 31010 |
| **圖三 · AI 生命週期** | 7 階段（起始→…→汰除）+ 持續確證/重新評估 + 5 條橫向關注帶 + 上游母框架(15288＋12207) | ISO/IEC 5338 / 22989 |
| **AIMS · AI 管理系統** | 與 27001 同 PDCA 殼 + AI 專屬側欄（政策治理/風險/衝擊評鑑/生命週期/控制） | ISO/IEC 42001（Annex SL） |
| **附錄 A · 控制** | 93 控制依 4 主題（組織37／人員8／實體14／技術34）| ISO/IEC 27001:2022 Annex A |
| **文件 · 標準** | ISMS 文件化資訊清單（必備文件/紀錄 + 對應條款）＋ ISO 27000 標準家族（30 標準，含血緣樹） | 7.5 documented information · ISO 27000 family |

互動：點節點看白話說明 · 跨圖互跳（互相扣）· 搜尋 · 疊控制措施 · 深連結（`#view=…&sel=…`）· 文件清單／標準卡片點了跳對應條款或圖。

## 功能總覽 · Features

- **六大視圖**：上方五張圖（PDCA / 風險 / AI 生命週期 / AIMS 42001 / 附錄A）＋「文件·標準」清單＋「關係總覽」知識圖（fcose 力導向，只顯示有關係的節點、大小＝連線數、可篩選）。
- **App-shell 導覽殼**：左側可收合圖示 rail（☰，分組 圖解／清單／探索）、瘦頂列、右上 **⚙ 設定**（深淺色／學習↔稽核者視角／疊控制措施／導覽／列印／匯出）、右側面板區塊可收合（accordion）、窄螢幕變抽屜（RWD）。
- **⌘K 命令面板**：一鍵跳任一條款／控制／標準／視圖／動作。
- **名詞 hover 詞彙卡**：面板內文的專有名詞（風險擁有者／SoA／剩餘風險／當責／Annex SL…）滑過顯示定義。
- **學習者 ↔ 稽核者(LA) 視角**：稽核者視角每個條款/控制顯示 **稽核三件組**（稽核問句／應備證據／常見不符合）。
- **稽核工作底稿**：每個控制/條款可標狀態（未查／符合／觀察／不符合）＋筆記，存本機（localStorage），可匯出 **CSV**。
- **列印 / PDF 稽核清單**：全條款＋93 控制的稽核三件組（☐ 勾稽）＋必備文件＋已標記狀態，乾淨 A4 版面（⚙ 或 ⌘K）。
- **對應與血緣**：每個節點標 ISO 27001 條款；風險/AI 節點面板顯示「相關標準（量尺）」；標準家族顯示 `parent` 血緣樹＋可驗證旗標；clause-4.4 說明 Annex SL 共用結構與整合稽核。
- **OSCAL 匯出**：附錄 A 93 控制匯出為 NIST OSCAL 機讀格式（含 800-53 對映）。
- **PWA**：可安裝到桌面/手機、離線可用（service worker 快取 app shell）。
- **深淺色** · **View Transitions** 切視圖平滑過場（尊重 `prefers-reduced-motion`）· **深連結**可分享特定視角。

## 鍵盤快捷鍵 · Keyboard

| 鍵 | 動作 |
|---|---|
| `⌘K` / `Ctrl K` | 命令面板（跳任一視圖／條款／控制／標準／動作） |
| `1` – `7` | 切換七個視圖（PDCA／風險／AI／AIMS／附錄A／文件·標準／關係總覽） |
| `g` | 切換 學習者 ↔ 稽核者(LA) 視角 |
| `t` | 切換 深／淺色 |
| `\` | 收合／展開左側選單 |
| `/` | 聚焦搜尋 |
| `?` | 顯示快捷鍵表 |
| `Esc` | 關閉面板／選單／命令面板 |

## 架構

- 純 vanilla HTML/CSS/JS，零前端建置，部署即靜態檔。
- 資料分四層、變動來源分離（防「改 A 壞 B」）：
  - **① 骨架（來源）** `data/_zones/*.json` —— 各區的節點（含白話說明、稽核三件組、CIA/NIST 對映）。
  - **② 對應層** `scripts/assemble.mjs` —— 以常數維護 ISO 27001 對映、風險關鍵概念、三張圖的 edges，注入骨架。
  - **③ 補充活水** `data/supplements.json` —— 老師補充隨時加，**不被重建覆蓋**、永久保留。
  - **④ 版面** `index.html` —— 讀 `data/data.json` 渲染各視圖（app-shell：左側 rail、⚙ 設定、面板 accordion、⌘K、PWA）。
- `data/data.json` 是**產物**（已 commit，讓靜態站台免建置即可跑），由 `pnpm build` 從 ①＋② 產生。守門員測試斷言 `data.json === assemble(_zones)`，手改衍生檔或改了 zone 沒重建都會被擋。
- 另有兩份**參考資料**（非節點圖、直接手維護＋schema 驗證）：`data/documents.json`（ISMS 文件化資訊清單，對映條款節點）、`data/standards.json`（ISO 27000 標準家族 30 個，含 `parent` 血緣／`nodes` 量尺掛載／`certifiable` 可驗證旗標；含整合管理系統 9001/14001/45001/42001）。供「文件·標準」視圖（血緣樹＋可點開標準面板）、節點面板「需要的文件化資訊／相關標準（量尺）」、圖三「上游母框架 15288＋12207→5338」血緣條使用。
- 另有 `data/documents.json`（文件化資訊清單）。靜態資產：`favicon.svg`、`icon-192/512.png`、`og-image.png`、`manifest.webmanifest`、`sw.js`（PWA）。
- 說明一律白話自撰，**不複製標準正文**（版權）；編號與標題為事實引用。

## 開發

```bash
pnpm install
pnpm build       # 由 data/_zones/*.json + scripts/assemble.mjs 重生 data/data.json
pnpm test        # vitest 守門員：93 控制、四主題數量、參照完整性、三大架構覆蓋、zones↔data.json 無漂移（防「改 A 壞 B」）
pnpm dev         # 本地預覽（或：python3 -m http.server）
```

**編輯內容流程**：改 `data/_zones/*.json`（或 `scripts/assemble.mjs` 的對應層）→ `pnpm build` → `pnpm test` 綠燈 → commit `data/_zones` 與 `data/data.json`。不要直接手改 `data/data.json`（會被漂移測試擋下）。

CI（GitHub Actions，`.github/workflows/ci.yml`）每次 push 自動跑 `pnpm test`（含漂移檢查）。

## 編輯 / 補充內容（老師補充）

- **補充活檔**：`data/supplements.json`（陣列 `items`，每筆 `{nodeId, ref, title, note}`）。掛在哪個節點就填它的 id。此檔**不會被內容重生覆蓋**、已納入 git → 永久保留、可回溯。app 載入時合併、面板顯示「補充」區。
- **自助表單編輯（Decap CMS）**：本機跑 `npx decap-server`，另開站台（`pnpm dev` 或 `python3 -m http.server`），打開 `/admin/` 即可用表單新增/編輯補充，存檔直接寫入 `data/supplements.json`，再 `git commit && push` 即上線。
  - 若要「從任何裝置編輯」，需架一個 GitHub OAuth proxy（Cloudflare Worker，免費）後，`/admin/` 才能在線上登入。
- 守門員會檢查每筆補充的 `nodeId` 是否存在、欄位是否齊（防打錯）。

## 授權

雙授權（程式與內容性質不同，分開授權）：

- **程式碼**（HTML/CSS/JS、`scripts/`、`test/`、`schema/`）→ **MIT**（見 [`LICENSE`](./LICENSE)）。
- **課程筆記內容**（`data/*.json` 的原創白話說明、稽核三件組、關鍵概念、文件/標準描述等）→ **CC BY-NC 4.0**（姓名標示—非商業性，見 [`CONTENT-LICENSE.md`](./CONTENT-LICENSE.md)）。

ISO/IEC、CNS、IEC 標準**正文版權屬各標準組織所有，本專案未重製其正文**；僅引用事實性的編號/標題並以原創白話轉述。NIST SP 800-53 為美國政府公共領域。

三張架構圖之教學編排啟發自講師 **Philip Ku** 的 ISMS 主導稽核員課程，本專案為學員自行重繪與白話轉譯、非官方教材。
