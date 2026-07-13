const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

const en = {
  'Обо мне':'About me','01 / Обо мне':'01 / About me','Разрабатываю':'I build','цифровые продукты':'digital products',
  'Лендинг · Дизайн · Разработка':'Landing · Design · Development','Мобильный лендинг · UI/UX':'Mobile landing · UI/UX','Лендинг · UI/UX · Разработка':'Landing · UI/UX · Development',
  'Лендинг премиального ремонта квартир и домов':'Premium apartment and house renovation landing page','Мобильный лендинг загородных домов':'Country house mobile landing page','Лендинг премиального автосервиса Blackline':'Premium auto service landing page',
  'Меня зовут Дмитрий. Я IT-разработчик с опытом около трёх лет. Проектирую и собираю сайты, интерфейсы и автоматизацию — от первой идеи до рабочего результата.':'My name is Dmitry. I am an IT developer with around three years of experience. I design and build websites, interfaces and automation — from the first idea to a working result.',
  'года в разработке':'years in development','задач и прототипов':'tasks and prototypes','внимание к задаче':'focused attention',
  'Работы':'Work','Услуги':'Services','Процесс':'Process','Обсудить проект':'Start a project',
  'Независимая digital-студия':'Independent digital studio','Превращаю идеи в быстрые сайты,':'I turn ideas into fast websites,',
  'которые работают на':'that work toward','бизнес-результат.':'business results.','Заказать проект':'Start a project','Смотреть работы':'View work',
  '02 / Избранное':'02 / Selected work','Работы, которыми':'Work I am','я горжусь':'proud of',
  'Каждый проект — своя задача, характер и аккуратно собранная логика.':'Every project has its own goal, character and carefully crafted logic.',
  'Все':'All','Сайты':'Websites','Интерфейсы':'Interfaces','Лендинг · Дизайн · Разработка':'Landing · Design · Development',
  'Продукт · UI/UX':'Product · UI/UX','Концепт · Web App':'Concept · Web App',
  'Ваши скриншоты легко поставить вместо этих демо-примеров.':'Your own screenshots can easily replace these demo projects.',
  '03 / Возможности':'03 / Capabilities','Что могу':'What I can','создать':'create',
  'От первого экрана до готового продукта — быстро, прозрачно и без агентской бюрократии.':'From the first screen to a finished product — fast, transparent and without agency overhead.',
  'Лендинг':'Landing page','Сайт под ключ':'Full website',
  'Сильная подача продукта, адаптив и анимации для запуска рекламы.':'Strong product presentation, responsive layout and motion built for campaigns.',
  'Структура, дизайн и разработка многостраничного сайта.':'Structure, design and development of a multi-page website.',
  'Интерфейсы сервисов, личных кабинетов и мобильных приложений.':'Interfaces for services, dashboards and mobile applications.',
  'AI + автоматизация':'AI + automation','AI / автоматизация':'AI / automation',
  'Умные формы, боты и интеграции, которые экономят время.':'Smart forms, bots and integrations that save time.',
  '04 / Как работаю':'04 / How I work','Понятный путь':'A clear path','от «хочу» до':'from idea to','«готово»':'launch',
  'Знакомство':'Discovery','Обсуждаем задачу, аудиторию, сроки и референсы.':'We discuss the goal, audience, timeline and references.',
  'Концепт':'Concept','Собираю структуру и визуальное направление проекта.':'I build the structure and visual direction of the project.',
  'Создание':'Creation','Делаю дизайн, код, адаптивы и нужные интеграции.':'I create the design, code, responsive layouts and integrations.',
  'Запуск':'Launch','Тестируем, публикуем и остаёмся на связи после релиза.':'We test, publish and stay in touch after the release.',
  '05 / Новый проект':'05 / New project','Есть задача?':'Have a project?','Давайте обсудим.':'Let’s discuss it.',
  'Ответьте на несколько вопросов — я сформирую заявку и свяжусь с вами для уточнения деталей.':'Answer a few questions — I will prepare your request and get in touch to discuss the details.',
  'Сейчас беру новые проекты':'Available for new projects','Как вас зовут?':'What is your name?','Как с вами связаться?':'How can I reach you?',
  'Что нужно сделать?':'What do you need?','Пара слов о задаче':'Tell me about the project','Отправить в Telegram':'Send via Telegram',
  'Откроется чат с @DIGITALSTUDIOIT и готовым текстом заявки.':'A chat with @DIGITALSTUDIOIT will open with your request ready to send.',
  'Сайты с характером.':'Websites with character.','Собрано человеком + AI.':'Crafted by human + AI.',
  'Открываю Telegram':'Opening Telegram','Текст заявки уже подготовлен.':'Your request is ready to send.'
};

const placeholderEn = {'Ваше имя':'Your name','Telegram / Email':'Telegram / Email','Что за проект и какой результат нужен?':'What is the project and what result do you need?'};
const textNodes = [];
const originalText = new Map();
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const tag = node.parentElement?.tagName;
    return node.textContent.trim() && !['SCRIPT','STYLE'].includes(tag) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  }
});
while (walker.nextNode()) {
  const node = walker.currentNode;
  textNodes.push(node);
  originalText.set(node, node.textContent.trim());
}
const originalPlaceholders = new Map([...document.querySelectorAll('[placeholder]')].map(element => [element, element.placeholder]));

function setLanguage(language) {
  document.documentElement.lang = language;
  textNodes.forEach(node => {
    const original = originalText.get(node);
    const leading = node.textContent.match(/^\s*/)?.[0] || '';
    const trailing = node.textContent.match(/\s*$/)?.[0] || '';
    node.textContent = `${leading}${language === 'en' ? (en[original] || original) : original}${trailing}`;
  });
  originalPlaceholders.forEach((original, element) => {
    element.placeholder = language === 'en' ? (placeholderEn[original] || original) : original;
  });
  document.querySelectorAll('.lang').forEach(button => button.classList.toggle('active', button.dataset.lang === language));
  nav.setAttribute('aria-label', language === 'en' ? 'Main navigation' : 'Основная навигация');
  menuButton.setAttribute('aria-label', language === 'en' ? 'Open menu' : 'Открыть меню');
  document.querySelector('.lang-switch').setAttribute('aria-label', language === 'en' ? 'Choose language' : 'Выбор языка');
  document.querySelector('.hero-art').alt = language === 'en' ? 'Abstract purple 3D form' : 'Абстрактная фиолетовая 3D-форма';
  document.title = language === 'en' ? 'Digital studio — design, code, motion' : 'Digital studio — дизайн, код, motion';
  localStorage.setItem('neutral-studio-language', language);
}

document.querySelectorAll('.lang').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
setLanguage(localStorage.getItem('neutral-studio-language') || 'ru');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.classList.toggle('open');
  nav.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.classList.remove('open');
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('.work-card').forEach(card => card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category));
  });
});

const form = document.querySelector('#orderForm');
const toast = document.querySelector('.toast');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const isEnglish = document.documentElement.lang === 'en';
  const serviceRu = data.get('service');
  const service = isEnglish ? (en[serviceRu] || serviceRu) : serviceRu;
  const text = isEnglish
    ? `New project request\n\nName: ${data.get('name')}\nContact: ${data.get('contact')}\nService: ${service}\nProject: ${data.get('message') || 'To be discussed'}`
    : `Новая заявка на проект\n\nИмя: ${data.get('name')}\nКонтакт: ${data.get('contact')}\nУслуга: ${service}\nЗадача: ${data.get('message') || 'Обсудим лично'}`;
  toast.classList.add('show');
  const telegramUrl = `https://t.me/DIGITALSTUDIOIT?text=${encodeURIComponent(text)}`;
  const telegramWindow = window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  if (!telegramWindow) window.location.href = telegramUrl;
  setTimeout(() => toast.classList.remove('show'), 2800);
});
