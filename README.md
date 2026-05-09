# Qualitree Homepage

Qualitree 회사 홈페이지 (qualitree.co.kr) — 랜딩 페이지.

스택: Vite + React 18 + Tailwind CSS + Lucide Icons

---

## 로컬 실행 (3분)

```bash
# 1. 의존성 설치 (첫 1회만)
npm install

# 2. 개발 서버 시작
npm run dev
```

→ 브라우저에서 `http://localhost:5173` 접속.
같은 Wi-Fi에 있는 동료는 터미널에 찍히는 `Network: http://192.168.x.x:5173` URL로도 볼 수 있습니다.

---

## 프로덕션 빌드 확인

```bash
npm run build      # dist/ 폴더에 정적 파일 생성
npm run preview    # 빌드 결과를 로컬에서 미리보기
```

---

## 온라인 배포 — 동료 공유 (5~10분)

세 가지 옵션 모두 무료, 자동 SSL, 자동 빌드. 처음 배포는 5~10분, 이후 push 할 때마다 자동 재배포.

### 옵션 A. Vercel (가장 빠름, 추천)

1. GitHub에 이 폴더 push
   ```bash
   git init
   git add .
   git commit -m "Initial: Qualitree landing v0.1"
   git branch -M main
   # GitHub에서 빈 repo 만든 후
   git remote add origin https://github.com/YOUR_ID/qualitree-homepage.git
   git push -u origin main
   ```
2. https://vercel.com 접속 → GitHub로 로그인
3. **Add New → Project** → 방금 push한 repo 선택
4. **Framework Preset: Vite** 자동 감지됨 → **Deploy** 클릭
5. 약 1분 후 `qualitree-homepage-xxx.vercel.app` URL 발급 → 동료에게 공유

### 옵션 B. Cloudflare Pages (아키텍처 문서 권장)

1. 위와 동일하게 GitHub push
2. https://dash.cloudflare.com → **Workers & Pages → Create application → Pages → Connect to Git**
3. Repo 선택 → 빌드 설정:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. **Save and Deploy** → `qualitree-homepage.pages.dev` URL 발급

### 옵션 C. Netlify (드래그·드롭 가장 간편)

GitHub 없이도 가능:
1. `npm run build` 실행
2. https://app.netlify.com/drop 접속
3. 생성된 `dist/` 폴더를 브라우저에 드래그·드롭
4. 즉시 임시 URL 발급 (예: `random-name-12345.netlify.app`)

> **주의**: 드래그·드롭 방식은 임시이고, 변경 후 다시 드래그해야 갱신됩니다. 지속적으로 동료와 공유할 거면 옵션 A 또는 B 권장.

---

## 커스텀 도메인 연결 (qualitree.co.kr)

Vercel/Cloudflare/Netlify 모두 대시보드의 **Domains** 메뉴에서 도메인 추가 후 안내된 DNS 레코드를 도메인 등록업체(가비아/후이즈 등)에 입력하면 끝.

---

## 폴더 구조

```
qualitree-homepage/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          ← 메인 랜딩 페이지 (1900줄+)
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 다음 단계 (Phase 2)

- 플랫폼 로그인 + MFA (`#ENT-001`)
- 메인 대시보드 (`#ENT-002`)
- 온보딩 5단계 (`#ONB-001~005`) — 회사·제품·공정·다중 규제·자격

플랫폼은 `app.qualitree.co.kr` 별도 도메인·별도 보안 경계로 분리합니다 (Project Instructions §11.3 / Modular Architecture §6).
