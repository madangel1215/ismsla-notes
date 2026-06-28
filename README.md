# ISMS 主導稽核員 · 互動課程筆記（ISMS LA · CNS 27001:2023 ≡ ISO/IEC 27001:2022）

> CNS 27001:2023 等同採用 ISO/IEC 27001:2022；本筆記內文一律以 **ISO/IEC 27001:2022** 的條款編號與附錄 A 為準。

ISMS 主導稽核員（ISMS Lead Auditor）課程的**互動筆記** —— 能學、能查、能拿去稽核。把資訊安全管理系統（ISMS）的全貌做成會講解自己的互動圖：純靜態、深淺色高級質感、點任一節點看白話說明＋對應 ISO 27001 條款＋稽核三件組，三張架構圖互相扣。

🔗 線上：https://madangel1215.github.io/ismsla-notes/

對應課程三大架構，外加 27001 本體：

| 視圖 | 內容 | 標準 |
|---|---|---|
| **圖一 · PDCA 運轉** | 領導[5]軸心 + 規劃[6]/支援運作[7·8]/績效[9]/改善[10] + 計畫·執行·檢核·行動 + 利害關係人 5 類要求來源 | ISO/IEC 27001:2022 條款 4–10 |
| **圖二 · 風險流程** | 風險評鑑（識別→分析→評估）→ 風險處理（含 SoA）→ 剩餘風險，溝通諮詢/監督審查貫穿 | ISO 31000 / ISO/IEC 27005 / IEC 31010 |
| **圖三 · AI 生命週期** | 7 階段（起始→…→汰除）+ 持續確證/重新評估 + 5 條橫向關注帶 | ISO/IEC 5338 / 22989 |
| **附錄 A · 控制** | 93 控制依 4 主題（組織37／人員8／實體14／技術34）| ISO/IEC 27001:2022 Annex A |
| **文件 · 標準** | ISMS 文件化資訊清單（必備文件/紀錄 + 對應條款）＋ ISO 27000 標準家族 | 7.5 documented information · ISO 27000 family |

互動：點節點看白話說明 · 跨圖互跳（互相扣）· 搜尋 · 疊控制措施 · 深連結（`#view=…&sel=…`）· 文件清單／標準卡片點了跳對應條款或圖。

## 架構

- 純 vanilla HTML/CSS/JS，零前端建置，部署即靜態檔。
- 資料分四層、變動來源分離（防「改 A 壞 B」）：
  - **① 骨架（來源）** `data/_zones/*.json` —— 各區的節點（含白話說明、稽核三件組、CIA/NIST 對映）。
  - **② 對應層** `scripts/assemble.mjs` —— 以常數維護 ISO 27001 對映、風險關鍵概念、三張圖的 edges，注入骨架。
  - **③ 補充活水** `data/supplements.json` —— 老師補充隨時加，**不被重建覆蓋**、永久保留。
  - **④ 版面** `index.html` —— 讀 `data/data.json` 渲染五視圖。
- `data/data.json` 是**產物**（已 commit，讓靜態站台免建置即可跑），由 `pnpm build` 從 ①＋② 產生。守門員測試斷言 `data.json === assemble(_zones)`，手改衍生檔或改了 zone 沒重建都會被擋。
- 另有兩份**參考資料**（非節點圖、直接手維護＋schema 驗證）：`data/documents.json`（ISMS 文件化資訊清單，對映條款節點）、`data/standards.json`（ISO 27000 標準家族 26 個，含 `parent` 血緣／`nodes` 量尺掛載／`certifiable` 可驗證旗標）。供「文件·標準」視圖（血緣樹＋可點開標準面板）、節點面板「需要的文件化資訊／相關標準（量尺）」、圖三「上游母框架 15288＋12207→5338」血緣條使用。
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

說明文字為原創白話轉譯；ISO/IEC、CNS、IEC 標準正文版權屬各標準組織所有，本專案未重製其正文。
