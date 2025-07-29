# 👁️‍🗨️ PIIP Arsenal V2.0

**Silent Tools for Loud Impact** - النسخة المحسنة

موقع عسكري سايبربانك متطور لعرض وتنظيم الأدوات الرقمية المتقدمة للمختبرين الرقميين والمطورين.

## 🚀 المميزات الجديدة في V2.0

### ⚡ تحسينات الأداء
- **تحميل سريع**: تحسين سرعة التحميل مع preload للموارد المهمة
- **PWA دعم كامل**: تطبيق ويب تقدمي يعمل دون اتصال
- **Service Worker**: تخزين مؤقت ذكي للعمل دون اتصال
- **تحميل تدريجي**: عرض الأدوات بشكل تدريجي لتحسين الأداء

### 🎯 تحسينات تجربة المستخدم
- **بحث متقدم**: debouncing للبحث مع نتائج فورية
- **فلترة ذكية**: تصفية متقدمة مع حفظ الحالة في URL
- **تنقل بالكيبورد**: دعم كامل للتنقل بالكيبورد
- **إمكانية الوصول**: تحسينات شاملة للوصول (Accessibility)
- **تأثيرات بصرية**: حركات محسنة مع دعم prefers-reduced-motion

### 📱 تحسينات الموبايل
- **تصميم متجاوب محسن**: تجربة أفضل على جميع الأجهزة
- **لمس محسن**: أزرار أكبر للشاشات اللمسية
- **تأثيرات هابتيك**: اهتزاز عند التفاعل (عند دعم الجهاز)

### 🔧 ميزات تقنية جديدة
- **نظام متغيرات CSS**: تنظيم أفضل للألوان والمسافات
- **نظام Z-index**: إدارة أفضل للطبقات
- **تحسينات SEO**: meta tags محسنة
- **طباعة محسنة**: تصميم خاص للطباعة

## 🎨 المميزات الأساسية

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

- **HTML5**: هيكل الموقع مع تحسينات SEO
- **CSS3**: التصميم والتأثيرات البصرية مع متغيرات CSS
- **JavaScript ES6+**: التفاعل والوظائف مع تحسينات الأداء
- **PWA**: Service Worker و Manifest
- **Fonts**: JetBrains Mono للخطوط البرمجية
- **Icons**: رموز Unicode للواجهة

## 📁 هيكل المشروع

```
wep_beta_V.2.0/
├── index.html              # الصفحة الرئيسية
├── tools.html              # صفحة جميع الأدوات
├── github.html             # صفحة GitHub الشخصية
├── privacy.html            # صفحة سياسة الاستخدام
├── contact.html            # صفحة الاتصال
├── manifest.json           # ملف PWA
├── sw.js                   # Service Worker
├── css/
│   └── style.css          # ملف التصميم الرئيسي
├── js/
│   ├── tools-data.js      # بيانات الأدوات
│   ├── main.js            # JavaScript الرئيسي
│   ├── tools-page.js      # JavaScript صفحة الأدوات
│   ├── tool-details.js    # JavaScript تفاصيل الأداة
│   ├── github-page.js     # JavaScript صفحة GitHub
│   ├── privacy-page.js    # JavaScript صفحة الخصوصية
│   └── contact-page.js    # JavaScript صفحة الاتصال
├── tools/
│   └── tool-details.html  # صفحة تفاصيل الأداة
└── README.md              # هذا الملف
```

## 🚀 التشغيل

1. **تحميل المشروع**:
   ```bash
   git clone https://github.com/your-repo/piip-arsenal.git
   cd piip-arsenal
   ```

2. **فتح الموقع**:
   ```bash
   # افتح ملف index.html في المتصفح
   https://mr-piip-pro.github.io/wep_beta_V.2.0/index.html
   
   # أو استخدم خادم محلي:
   python -m http.server 8000
   # ثم افتح http://localhost:8000
   ```

## 🎯 فئات الأدوات

### Recon (5 أدوات)
- **Nmap**: فحص الشبكات والمنافذ
- **Wireshark**: تحليل حزم الشبكة
- **Dirsearch**: البحث عن المجلدات المخفية
- **Amass**: مسح البنية التحتية
- **Nikto**: فحص ثغرات الويب

### Exploitation (5 أدوات)
- **Metasploit Framework**: منصة استغلال الثغرات
- **sqlmap**: استغلال ثغرات SQL Injection
- **Hydra**: تخمين كلمات المرور
- **John the Ripper**: كسر كلمات المرور
- **Hashcat**: كسر الهاشات بـ GPU

### OSINT (5 أدوات)
- **Recon-ng**: منصة جمع المعلومات
- **TheHarvester**: جمع الإيميلات والدومينات
- **Sherlock**: البحث عن أسماء المستخدمين
- **GHunt**: استخراج معلومات Gmail
- **Photon**: زاحف ويب ذكي

### Stealth (5 أدوات)
- **Pupy**: RAT متطور
- **Netcat**: أداة الشبكة الشاملة
- **Empire**: منصة اختراق Windows
- **BeEF**: استغلال المتصفحات
- **Aircrack-ng**: كسر شبكات Wi-Fi

### Misc (5 أدوات)
- **OWASP ZAP**: فحص تطبيقات الويب
- **Burp Suite**: وكيل اعتراض متقدم
- **SET**: أدوات الهندسة الاجتماعية
- **Maltego**: تحليل العلاقات
- **XSStrike**: اختبار ثغرات XSS

## 🎨 نظام الألوان المحسن

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
--accent-purple: #8000ff;     /* بنفسجي نيون */

/* نظام المسافات */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-xxl: 3rem;
```

## 🔧 التخصيص

### إضافة أداة جديدة
1. أضف بيانات الأداة في `js/tools-data.js`
2. أنشئ صفحة تفاصيل في `tools/tool-name.html`
3. أضف أيقونات أو صور في مجلد `assets/`

### تغيير التصميم
- عدّل الألوان في `css/style.css` باستخدام متغيرات CSS
- غيّر الخطوط في `index.html`
- أضف تأثيرات جديدة في JavaScript

### تحسينات الأداء
- استخدم `preload` للموارد المهمة
- اضبط `Service Worker` للتخزين المؤقت
- حسّن الصور باستخدام WebP

## 📱 التوافق

- ✅ **Desktop**: Chrome, Firefox, Safari, Edge
- ✅ **Mobile**: iOS Safari, Chrome Mobile
- ✅ **Tablet**: جميع الأجهزة اللوحية
- ✅ **Responsive**: تصميم متجاوب بالكامل
- ✅ **PWA**: دعم كامل للتطبيق التقدمي
- ✅ **Offline**: العمل دون اتصال

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

## 🔍 تحسينات SEO

- Meta tags محسنة
- Structured data
- Sitemap تلقائي
- Open Graph tags
- Twitter Cards

## ♿ تحسينات إمكانية الوصول

- دعم كامل للكيبورد
- ARIA labels
- Focus indicators
- Screen reader support
- High contrast mode
- Reduced motion support

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

**PIIP Arsenal V2.0** - Silent Tools for Loud Impact 🚀

*تم تطوير هذا المشروع بأحدث تقنيات الويب مع التركيز على الأداء وإمكانية الوصول.* 