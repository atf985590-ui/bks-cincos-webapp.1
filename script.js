// script.js
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل بعد 3 ثواني
    setTimeout(() => {
        document.querySelector('.splash-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.splash-screen').style.display = 'none';
        }, 500);
    }, 3000);

    // تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.querySelector('.login-container');
    const mainContainer = document.querySelector('.main-container');
    const welcomeModal = document.querySelector('.welcome-modal');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loginContainer.classList.remove('active');
            mainContainer.style.display = 'flex';
            
            // عرض رسالة الترحيب بعد تسجيل الدخول
            setTimeout(() => {
                welcomeModal.style.display = 'flex';
            }, 500);
        });
    }
    
    // إغلاق رسالة الترحيب
    const okBtn = document.querySelector('.ok-btn');
    if (okBtn) {
        okBtn.addEventListener('click', function() {
            welcomeModal.style.display = 'none';
        });
    }
    
    // إدارة التنقل بين الأقسام
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            
            // إزالة النشاط من جميع العناصر
            navItems.forEach(navItem => navItem.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // إضافة النشاط للعنصر الحالي
            this.classList.add('active');
            
            // عرض القسم المحدد
            document.getElementById(target).classList.add('active');
        });
    });
    
    // نوافذ الإيداع والسحب
    const depositBtn = document.querySelector('.deposit-btn');
    const withdrawBtn = document.querySelector('.withdraw-btn');
    const depositModal = document.querySelector('.deposit-modal');
    const withdrawModal = document.querySelector('.withdraw-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    
    if (depositBtn) {
        depositBtn.addEventListener('click', function() {
            depositModal.style.display = 'flex';
        });
    }
    
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', function() {
            withdrawModal.style.display = 'flex';
        });
    }
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            depositModal.style.display = 'none';
            withdrawModal.style.display = 'none';
        });
    });
    
    // إغلاق النوافذ عند النقر خارجها
    window.addEventListener('click', function(e) {
        if (e.target === depositModal) {
            depositModal.style.display = 'none';
        }
        if (e.target === withdrawModal) {
            withdrawModal.style.display = 'none';
        }
        if (e.target === welcomeModal) {
            welcomeModal.style.display = 'none';
        }
    });
    
    // نسخ عناوين المحافظ
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            navigator.clipboard.writeText(address).then(() => {
                const originalText = this.textContent;
                this.textContent = 'تم النسخ!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
    
    // تغيير مبالغ السحب العشوائية
    function updateRandomAmounts() {
        const amounts = document.querySelectorAll('.amount');
        amounts.forEach(amount => {
            const randomAmount = Math.floor(Math.random() * 100) + 10;
            amount.textContent = randomAmount;
        });
    }
    
    setInterval(updateRandomAmounts, 5000);
    
    // تحريك البنر الدعائي
    const promoSlides = document.querySelectorAll('.promo-slide');
    let currentSlide = 0;
    
    function rotatePromoSlides() {
        promoSlides.forEach(slide => slide.classList.remove('active'));
        promoSlides[currentSlide].classList.add('active');
        currentSlide = (currentSlide + 1) % promoSlides.length;
    }
    
    setInterval(rotatePromoSlides, 4000);
    
    // إنشاء محتوى الأقسام ديناميكيًا
    createHomeContent();
    createVipContent();
    createInviteContent();
    createTasksContent();
    createProfileContent();
    
    function createHomeContent() {
        const homeSection = document.createElement('div');
        homeSection.id = 'home';
        homeSection.className = 'content-section active';
        homeSection.innerHTML = `
            <div class="section-header">
                <h2>الرئيسية</h2>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fas fa-wallet"></i>
                    <h3>رصيدك</h3>
                    <p>0.00 $</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-coins"></i>
                    <h3>أرباح اليوم</h3>
                    <p>0.00 $</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <h3>أعضاء فريقك</h3>
                    <p>0</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-gift"></i>
                    <h3>مكافآت waiting</h3>
                    <p>0.00 $</p>
                </div>
            </div>
            <div class="quick-actions">
                <h3>إجراءات سريعة</h3>
                <div class="actions-grid">
                    <div class="action-btn">
                        <i class="fas fa-tasks"></i>
                        <span>المهام اليومية</span>
                    </div>
                    <div class="action-btn">
                        <i class="fas fa-crown"></i>
                        <span>ترقية VIP</span>
                    </div>
                    <div class="action-btn">
                        <i class="fas fa-share-alt"></i>
                        <span>دعوة أصدقاء</span>
                    </div>
                    <div class="action-btn">
                        <i class="fas fa-question-circle"></i>
                        <span>الدعم الفني</span>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('.main-content').appendChild(homeSection);
    }
    
    function createVipContent() {
        const vipSection = document.createElement('div');
        vipSection.id = 'vip';
        vipSection.className = 'content-section';
        vipSection.innerHTML = `
            <div class="section-header">
                <h2>خطط VIP</h2>
                <p>اختر الخطة المناسبة لتبدأ رحلة أرباحك</p>
            </div>
            <div class="vip-plans">
                <!-- سيتم إضافة خطط VIP هنا -->
            </div>
        `;
        document.querySelector('.main-content').appendChild(vipSection);
        
        // إضافة خطط VIP
        const vipPlansContainer = vipSection.querySelector('.vip-plans');
        const vipPlans = [
            { level: 1, price: 5, dailyProfit: '22%', friendProfit: '20%', taskBonus: '21%' },
            { level: 2, price: 5.74, dailyProfit: '22%', friendProfit: '20%', taskBonus: '21%' },
            { level: 3, price: 6.59, dailyProfit: '22%', friendProfit: '20%', taskBonus: '21%' },
            { level: 4, price: 7.57, dailyProfit: '22%', friendProfit: '20%', taskBonus: '21%' },
            { level: 5, price: 8.71, dailyProfit: '22%', friendProfit: '20%', taskBonus: '21%' }
        ];
        
        vipPlans.forEach(plan => {
            const planElement = document.createElement('div');
            planElement.className = 'vip-plan';
            planElement.innerHTML = `
                <div class="plan-header">
                    <h3>VIP ${plan.level}</h3>
                </div>
                <div class="plan-details">
                    <p>سعر الخطة: $${plan.price}</p>
                    <p>الربح اليومي: ${plan.dailyProfit}</p>
                    <p>ربح دعوة صديق: ${plan.friendProfit}</p>
                    <p>مكافأة إكمال المهام: ${plan.taskBonus}</p>
                </div>
                <button class="subscribe-btn">اشتراك الآن</button>
            `;
            vipPlansContainer.appendChild(planElement);
        });
    }
    
    function createInviteContent() {
        const inviteSection = document.createElement('div');
        inviteSection.id = 'invite';
        inviteSection.className = 'content-section';
        inviteSection.innerHTML = `
            <div class="section-header">
                <h2>دعوة الأصدقاء</h2>
                <p>ادعُ أصدقاءك واحصل على عمولة تصل إلى 26%</p>
            </div>
            <div class="invite-stats">
                <div class="stat">
                    <h3>عدد المدعوين</h3>
                    <p>0</p>
                </div>
                <div class="stat">
                    <h3>أرباح الإحالات</h3>
                    <p>0.00 $</p>
                </div>
            </div>
            <div class="referral-code">
                <h3>كود الإحالة الخاص بك</h3>
                <div class="code-box">
                    <p>BKS-${Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                    <button class="copy-btn">نسخ</button>
                </div>
            </div>
            <div class="invite-instructions">
                <h3>كيفية الدعوة:</h3>
                <p>1. شارك كود الإحالة مع أصدقائك</p>
                <p>2. عند تسجيلهم باستخدام الكود، يصبحون جزءًا من فريقك</p>
                <p>3. احصل على نسبة من أرباحهم</p>
            </div>
        `;
        document.querySelector('.main-content').appendChild(inviteSection);
    }
    
    function createTasksContent() {
        const tasksSection = document.createElement('div');
        tasksSection.id = 'tasks';
        tasksSection.className = 'content-section';
        tasksSection.innerHTML = `
            <div class="section-header">
                <h2>المهام اليومية</h2>
                <p>أكمل المهام واربح المزيد</p>
            </div>
            <div class="tasks-container">
                <div class="task-card locked">
                    <i class="fas fa-calendar-check"></i>
                    <h3>التسجيل اليومي</h3>
                    <p>سجل دخولك يوميًا لتحصل على مكافأة</p>
                    <span class="lock-icon"><i class="fas fa-lock"></i></span>
                </div>
                <div class="task-card locked">
                    <i class="fas fa-ad"></i>
                    <h3>مشاهدة الإعلانات</h3>
                    <p>شاهد الإعلانات واربح المال</p>
                    <span class="lock-icon"><i class="fas fa-lock"></i></span>
                </div>
                <div class="task-card">
                    <i class="fas fa-gamepad"></i>
                    <h3>ألعاب تفاعلية</h3>
                    <p>العب واربح المكافآت</p>
                    <button class="play-btn">لعب</button>
                </div>
            </div>
        `;
        document.querySelector('.main-content').appendChild(tasksSection);
    }
    
    function createProfileContent() {
        const profileSection = document.createElement('div');
        profileSection.id = 'profile';
        profileSection.className = 'content-section';
        profileSection.innerHTML = `
            <div class="section-header">
                <h2>حسابي</h2>
            </div>
            <div class="profile-info">
                <div class="info-item">
                    <span>اسم المستخدم:</span>
                    <span>مستخدم جديد</span>
                </div>
                <div class="info-item">
                    <span>البريد الإلكتروني:</span>
                    <span>example@email.com</span>
                </div>
                <div class="info-item">
                    <span>رقم ID:</span>
                    <span>BKS-${Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div class="info-item">
                    <span>تاريخ التسجيل:</span>
                    <span>${new Date().toLocaleDateString('ar-EG')}</span>
                </div>
            </div>
            <div class="profile-actions">
                <button class="action-btn"><i class="fas fa-history"></i> سجلات السحب</button>
                <button class="action-btn"><i class="fas fa-coins"></i> سجلات الإيداع</button>
                <button class="action-btn"><i class="fas fa-cog"></i> الإعدادات</button>
                <button class="action-btn"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</button>
            </div>
        `;
        document.querySelector('.main-content').appendChild(profileSection);
    }
    
    // إضافة بعض الأنماط الديناميكية
    const style = document.createElement('style');
    style.textContent = `
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 15px 0;
        }
        
        .stat-card {
            background: var(--card-bg);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            box-shadow: var(--shadow);
        }
        
        .stat-card i {
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        
        .stat-card h3 {
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        
        .stat-card p {
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--primary-color);
        }
        
        .quick-actions {
            margin-top: 25px;
        }
        
        .quick-actions h3 {
            margin-bottom: 15px;
        }
        
        .actions-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .action-btn {
            background: var(--card-bg);
            padding: 20px 15px;
            border-radius: 10px;
            text-align: center;
            box-shadow: var(--shadow);
            cursor: pointer;
            transition: transform 0.3s;
        }
        
        .action-btn:hover {
            transform: translateY(-5px);
        }
        
        .action-btn i {
            font-size: 1.5rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            display: block;
        }
        
        .vip-plans {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 15px 0;
        }
        
        .vip-plan {
            background: var(--card-bg);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: var(--shadow);
        }
        
        .plan-header {
            background: var(--gradient);
            color: white;
            padding: 15px;
            text-align: center;
        }
        
        .plan-details {
            padding: 15px;
        }
        
        .plan-details p {
            margin-bottom: 8px;
            font-size: 0.9rem;
        }
        
        .subscribe-btn {
            width: 100%;
            padding: 12px;
            background: var(--accent-color);
            color: white;
            border: none;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .subscribe-btn:hover {
            background: #ff5252;
        }
        
        .invite-stats {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
        }
        
        .invite-stats .stat {
            text-align: center;
        }
        
        .invite-stats .stat h3 {
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        
        .invite-stats .stat p {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
        }
        
        .referral-code {
            background: var(--card-bg);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: var(--shadow);
        }
        
        .code-box {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        
        .code-box p {
            flex: 1;
            background: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            text-align: center;
        }
        
        .invite-instructions {
            background: #f0f8ff;
            padding: 15px;
            border-radius: 10px;
        }
        
        .invite-instructions h3 {
            margin-bottom: 10px;
            color: var(--primary-color);
        }
        
        .tasks-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
            margin: 15px 0;
        }
        
        .task-card {
            background: var(--card-bg);
            padding: 20px;
            border-radius: 10px;
            box-shadow: var(--shadow);
            position: relative;
            text-align: center;
        }
        
        .task-card.locked {
            opacity: 0.7;
        }
        
        .task-card i {
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 15px;
            display: block;
        }
        
        .task-card h3 {
            margin-bottom: 10px;
        }
        
        .lock-icon {
            position: absolute;
            top: 15px;
            left: 15px;
            color: var(--accent-color);
        }
        
        .play-btn {
            background: var(--gradient);
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 20px;
            margin-top: 15px;
            cursor: pointer;
        }
        
        .profile-info {
            background: var(--card-bg);
            padding: 15px;
            border-radius: 10px;
            margin: 15px 0;
            box-shadow: var(--shadow);
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        
        .info-item:last-child {
            border-bottom: none;
        }
        
        .profile-actions {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
        }
        
        .profile-actions .action-btn {
            background: var(--card-bg);
            padding: 15px;
            border: none;
            border-radius: 8px;
            text-align: right;
            box-shadow: var(--shadow);
            cursor: pointer;
            display: flex;
            align-items: center;
        }
        
        .profile-actions .action-btn i {
            margin-left: 10px;
            color: var(--primary-color);
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .section-header h2 {
            color: var(--primary-color);
            margin-bottom: 5px;
        }
        
        .section-header p {
            color: #777;
        }
    `;
    document.head.appendChild(style);
});