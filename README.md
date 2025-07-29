# 👁️‍🗨️ PIIP Arsenal

**Silent Tools for Loud Impact**

موقع عسكري سايبربانك لعرض وتنظيم الأدوات الرقمية المتقدمة للمختبرين الرقميين والمطورين.

## 🎨 المميزات

### التصميم
- **تصميم عسكري سايبربانك**: ألوان داكنة مع تأثيرات نيون
- **واجهة تفاعلية**: تأثيرات بصرية متقدمة وتجربة مستخدم سلسة
- **تأثير التحميل**: محاكاة شاشة Terminal مع رسائل متسلسلة
- **تصميم متجاوب**: يعمل على جميع الأجهزة والشاشات

### الوظائف
- **عرض الأدوات**: 30 أداة مختلفة في فئات متعددة
- **البحث المتقدم**: بحث فوري في الأسماء والأوصاف والفئات
- **الفلترة الذكية**: تصفية الأدوات حسب الفئة
- **تفاصيل شاملة**: صفحات تفصيلية لكل أداة
- **التحميل المباشر**: روابط تحميل للأدوات
- **النسخ السريع**: نسخ أكواد الاستخدام بنقرة واحدة

## 🛠️ التقنيات المستخدمة

- **HTML5**: هيكل الموقع
- **CSS3**: التصميم والتأثيرات البصرية
- **JavaScript ES6+**: التفاعل والوظائف
- **Fonts**: JetBrains Mono للخطوط البرمجية
- **Icons**: رموز Unicode للواجهة

## 📁 هيكل المشروع

```
wep_beta_V.1.0/
├── index.html              # الصفحة الرئيسية
├── tools.html              # صفحة جميع الأدوات
├── css/
│   └── style.css          # ملف التصميم الرئيسي
├── js/
│   ├── tools-data.js      # بيانات الأدوات
│   ├── main.js            # JavaScript الرئيسي
│   ├── tools-page.js      # JavaScript صفحة الأدوات
│   └── tool-details.js    # JavaScript تفاصيل الأداة
├── tools/
│   └── shadow-scanner.html # مثال لصفحة تفاصيل أداة
└── README.md              # هذا الملف
```

## 🚀 التشغيل

1. **تحميل المشروع**:
   ```bash
   git clone https://github.com/your-repo/piip-arsenal.git
   cd piip-arsenal
   ```

2. **فتح الموقع**:
   - افتح ملف `index.html` في المتصفح
   - أو استخدم خادم محلي:
   ```bash
   python -m http.server 8000
   # ثم افتح http://localhost:8000
   ```

## 🎯 فئات الأدوات

### Recon (5 أدوات)
- **ShadowScanner**: فحص الشبكات بالوضع الصامت
- **DNSGhost**: اكتشاف خوادم DNS الخفية
- **PortHunter**: مسح شامل للمنافذ
- **SubdomainCrawler**: اكتشاف النطاقات الفرعية
- **VulnScanner**: ماسح الثغرات المتقدم

### Exploitation (5 أدوات)
- **DarkInject**: استغلال ثغرات SQL وXSS
- **ShellGenerator**: مولد شلز متقدم
- **PayloadCraft**: إنشاء حمولات مخصصة
- **RCEExploit**: أدوات استغلال تنفيذ الأوامر
- **PrivilegeEscalator**: تقنيات تصعيد الصلاحيات

### OSINT (5 أدوات)
- **LinkSniper**: كشف الروابط المريبة
- **SocialHunter**: جمع المعلومات من وسائل التواصل
- **EmailTracker**: تتبع البريد الإلكتروني
- **PhoneIntel**: جمع معلومات الهواتف
- **DomainIntel**: تحليل النطاقات

### Stealth (5 أدوات)
- **GhostMAC**: تغيير MAC Address تلقائيًا
- **EVAShell**: تنفيذ أوامر PowerShell دون اكتشاف
- **StealthBrowser**: متصفح متخفي
- **NetworkCloak**: إخفاء النشاط الشبكي
- **ProcessHider**: إخفاء العمليات

### Reverse (5 أدوات)
- **APKHunter**: تحليل ملفات APK
- **BinaryAnalyzer**: تحليل الملفات الثنائية
- **MalwareDissector**: تحليل البرمجيات الخبيثة
- **CodeDeobfuscator**: إزالة التعتيم من الأكواد
- **PacketAnalyzer**: تحليل حزم البيانات

### Misc (5 أدوات)
- **CryptoBrute**: كسر التشفير
- **HashCracker**: كسر الهاشات
- **SteganographyTool**: إخفاء المعلومات
- **ForensicAnalyzer**: تحليل الأدلة الرقمية
- **NetworkSniffer**: مراقبة حركة الشبكة

## 🎨 نظام الألوان

```css
/* الألوان الأساسية */
--bg-primary: #0a0a0a;        /* خلفية داكنة */
--bg-secondary: #1f1f1f;      /* خلفية ثانوية */
--text-primary: #f0f0f0;      /* نص رئيسي */
--text-secondary: #b0b0b0;    /* نص ثانوي */

/* ألوان التأثيرات */
--accent-neon: #00ffff;       /* أزرق نيون */
--accent-green: #00ff88;      /* أخضر نيون */
--accent-red: #ff0040;        /* أحمر نيون */
--accent-orange: #ff6600;     /* برتقالي نيون */
```

## 🔧 التخصيص

### إضافة أداة جديدة
1. أضف بيانات الأداة في `js/tools-data.js`
2. أنشئ صفحة تفاصيل في `tools/tool-name.html`
3. أضف أيقونات أو صور في مجلد `assets/`

### تغيير التصميم
- عدّل الألوان في `css/style.css`
- غيّر الخطوط في `index.html`
- أضف تأثيرات جديدة في JavaScript

## 📱 التوافق

- ✅ **Desktop**: Chrome, Firefox, Safari, Edge
- ✅ **Mobile**: iOS Safari, Chrome Mobile
- ✅ **Tablet**: جميع الأجهزة اللوحية
- ✅ **Responsive**: تصميم متجاوب بالكامل

## 🚀 النشر على GitHub Pages

1. **إنشاء Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

2. **تفعيل GitHub Pages**:
   - اذهب إلى Settings > Pages
   - اختر Source: Deploy from a branch
   - اختر Branch: main
   - اضغط Save

3. **الوصول للموقع**:
   - سيكون متاح على: `https://username.github.io/repo-name`

## 🤝 المساهمة

نرحب بالمساهمات! يمكنك:

1. **Fork** المشروع
2. إنشاء **Feature Branch**: `git checkout -b feature/AmazingFeature`
3. **Commit** التغييرات: `git commit -m 'Add AmazingFeature'`
4. **Push** إلى Branch: `git push origin feature/AmazingFeature`
5. فتح **Pull Request**

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- **GitHub**: [@your-username](https://github.com/your-username)
- **Email**: your-email@example.com
- **Website**: [https://your-website.com](https://your-website.com)

## 🙏 الشكر

- **JetBrains**: لخطوط JetBrains Mono
- **GitHub**: لاستضافة المشروع
- **Community**: لجميع المساهمين والداعمين

---

**PIIP Arsenal** - Silent Tools for Loud Impact 🚀 