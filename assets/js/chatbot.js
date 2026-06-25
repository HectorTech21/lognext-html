(function () {
  if (document.getElementById("lognextChatbot")) return;

  const rootPrefix = location.pathname.includes("/servicios/") || location.pathname.includes("/enlaces-legales/")
    ? "../"
    : "";

  const copy = {
    es: {
      open: "Abrir chatbot de LogNext",
      close: "Cerrar chatbot",
      title: "LogNext Assistant",
      subtitle: "Te ayudo con información rápida sobre LogNext.",
      initial: "Hola, soy el asistente virtual de LogNext. Puedo orientarte sobre servicios, ciberseguridad, inteligencia artificial, empleo y contacto.",
      placeholder: "Escribe tu pregunta...",
      send: "Enviar",
      quick: ["Servicios", "Ciberseguridad", "Inteligencia Artificial", "Trabaja con nosotros", "Contacto"],
      fallback: `No tengo una respuesta exacta para eso todavía. Puedo ayudarte con servicios, ciberseguridad, inteligencia artificial, empleo, contacto, ubicación, aviso legal, cookies o canal de denuncias. Si necesitas ayuda concreta, te recomendamos escribir a <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
      empty: "Escribe una pregunta para que pueda ayudarte.",
      responses: {
        empresa: `LogNext es una consultora tecnológica especializada en acompañar a empresas en su transformación digital, ofreciendo soluciones en inteligencia artificial, ciberseguridad, AMS, IMS, outsourcing y servicios tecnológicos. Puedes conocer más sobre nosotros en la sección <a href="${rootPrefix}quienes-somos.html">Quiénes somos</a>.`,
        servicios: `LogNext ofrece servicios tecnológicos como Inteligencia Artificial, Application Management Services, Infrastructure Management Services, Ciberseguridad y Outsourcing de Talento. Puedes verlos en <a href="${rootPrefix}index.html#servicios">Nuestros servicios</a>.`,
        ciberseguridad: `En ciberseguridad, LogNext ayuda a proteger activos digitales, reducir riesgos y reforzar la prevención, detección y gestión de amenazas. Más información en <a href="${rootPrefix}servicios/ciberseguridad.html">Ciberseguridad</a>.`,
        ia: `En Inteligencia Artificial, LogNext trabaja soluciones orientadas a automatización, análisis y nuevos modelos de interacción. Puedes consultar el servicio en <a href="${rootPrefix}servicios/ia.html">Inteligencia Artificial</a>.`,
        empleo: `Puedes consultar las oportunidades disponibles y enviar tu candidatura desde la sección <a href="${rootPrefix}trabaja-con-nosotros.html">Trabaja con nosotros</a>. No tengo acceso en tiempo real a vacantes concretas, pero puedo llevarte a la página correspondiente.`,
        contacto: `Puedes contactar con LogNext en <a href="mailto:info@lognext.com">info@lognext.com</a> o llamar al <a href="tel:+34915472550">+34 915 472 550</a>. También puedes escribir a <a href="mailto:talent@lognext.com">talent@lognext.com</a> para temas de talento.`,
        precios: `No puedo facilitar precios o tarifas cerradas desde el chat, porque dependen del alcance, contexto y necesidades de cada proyecto. Para solicitar una propuesta o presupuesto, contacta con LogNext en <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
        ubicacion: `La sede de LogNext está en <a href="https://maps.google.com/?q=Avenida+de+Burgos+17+Madrid+Spain" target="_blank" rel="noopener noreferrer">Avenida de Burgos 17, 28036 Madrid, Spain</a>. También puedes contactar por teléfono en <a href="tel:+34915472550">+34 915 472 550</a>.`,
        legal: `Puedes consultar la información legal de LogNext en la página <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Aviso Legal</a>.`,
        cookies: `La información sobre uso, configuración y consentimiento de cookies está disponible en la <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Política de Cookies</a>.`,
        canal: `Para comunicar posibles incidencias o irregularidades, puedes consultar el <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Canal de Denuncias</a>.`,
        privacidad: `No veo una página independiente de privacidad en la web. La información sobre tratamiento de datos personales aparece dentro del <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Aviso Legal</a>. Para dudas específicas, escribe a <a href="mailto:privacy@lognext.com">privacy@lognext.com</a>.`,
        portal: `El <a href="https://w3.cezanneondemand.com/CezanneOnDemand/-/LOGNEXT/Account/LogIn?ReturnUrl=%7E%2F-%2FLOGNEXT" target="_blank" rel="noopener noreferrer">Portal del empleado</a> es un acceso específico para personal autorizado. No puedo facilitar credenciales ni instrucciones internas desde el chat.`
      }
    },
    en: {
      open: "Open LogNext chatbot",
      close: "Close chatbot",
      title: "LogNext Assistant",
      subtitle: "I can help with quick information about LogNext.",
      initial: "Hello, I am LogNext's virtual assistant. I can guide you on services, cybersecurity, artificial intelligence, careers and contact details.",
      placeholder: "Type your question...",
      send: "Send",
      quick: ["Services", "Cybersecurity", "Artificial Intelligence", "Work with us", "Contact"],
      fallback: `I do not have an exact answer for that yet. I can help with services, cybersecurity, artificial intelligence, careers, contact details, location, legal notice, cookies or the whistleblowing channel. For specific help, please write to <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
      empty: "Type a question so I can help you.",
      responses: {
        empresa: `LogNext is a technology consulting company specialized in supporting organizations through digital transformation, with solutions in artificial intelligence, cybersecurity, AMS, IMS, outsourcing and technology services. You can learn more in <a href="${rootPrefix}quienes-somos.html">About us</a>.`,
        servicios: `LogNext provides technology services such as Artificial Intelligence, Application Management Services, Infrastructure Management Services, Cybersecurity and Talent Outsourcing. You can see them at <a href="${rootPrefix}index.html#servicios">Our services</a>.`,
        ciberseguridad: `In cybersecurity, LogNext helps protect digital assets, reduce risks and strengthen prevention, detection and threat management. More information at <a href="${rootPrefix}servicios/ciberseguridad.html">Cybersecurity</a>.`,
        ia: `In Artificial Intelligence, LogNext works on solutions focused on automation, analysis and new interaction models. You can check the service at <a href="${rootPrefix}servicios/ia.html">Artificial Intelligence</a>.`,
        empleo: `You can check available opportunities and submit your application in <a href="${rootPrefix}trabaja-con-nosotros.html">Work with us</a>. I do not have real-time access to specific vacancies, but I can take you to the right page.`,
        contacto: `You can contact LogNext at <a href="mailto:info@lognext.com">info@lognext.com</a> or call <a href="tel:+34915472550">+34 915 472 550</a>. For talent-related topics, write to <a href="mailto:talent@lognext.com">talent@lognext.com</a>.`,
        precios: `I cannot provide fixed prices or rates from the chat because they depend on the scope, context and needs of each project. To request a proposal or quote, contact LogNext at <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
        ubicacion: `LogNext is located at <a href="https://maps.google.com/?q=Avenida+de+Burgos+17+Madrid+Spain" target="_blank" rel="noopener noreferrer">Avenida de Burgos 17, 28036 Madrid, Spain</a>. You can also call <a href="tel:+34915472550">+34 915 472 550</a>.`,
        legal: `You can review LogNext's legal information on the <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Legal Notice</a> page.`,
        cookies: `Information about cookie use, settings and consent is available in the <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Cookie Policy</a>.`,
        canal: `To report possible issues or irregularities, please visit the <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Whistleblowing Channel</a>.`,
        privacidad: `I do not see a separate privacy page on the website. Information about personal data processing appears within the <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Legal Notice</a>. For specific questions, write to <a href="mailto:privacy@lognext.com">privacy@lognext.com</a>.`,
        portal: `The <a href="https://w3.cezanneondemand.com/CezanneOnDemand/-/LOGNEXT/Account/LogIn?ReturnUrl=%7E%2F-%2FLOGNEXT" target="_blank" rel="noopener noreferrer">Employee Portal</a> is a specific access point for authorized staff. I cannot provide credentials or internal instructions from the chat.`
      }
    },
    fr: {
      open: "Ouvrir le chatbot LogNext",
      close: "Fermer le chatbot",
      title: "LogNext Assistant",
      subtitle: "Je peux vous aider avec des informations rapides sur LogNext.",
      initial: "Bonjour, je suis l'assistant virtuel de LogNext. Je peux vous orienter sur les services, la cybersécurité, l'intelligence artificielle, les carrières et les moyens de contact.",
      placeholder: "Écrivez votre question...",
      send: "Envoyer",
      quick: ["Services", "Cybersécurité", "Intelligence Artificielle", "Travailler avec nous", "Contact"],
      fallback: `Je n'ai pas encore de réponse exacte à ce sujet. Je peux vous aider avec les services, la cybersécurité, l'intelligence artificielle, les carrières, le contact, l'adresse, les mentions légales, les cookies ou le canal de signalement. Pour une aide précise, écrivez à <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
      empty: "Écrivez une question afin que je puisse vous aider.",
      responses: {
        empresa: `LogNext est une société de conseil technologique spécialisée dans l'accompagnement des entreprises dans leur transformation numérique, avec des solutions en intelligence artificielle, cybersécurité, AMS, IMS, outsourcing et services technologiques. Vous pouvez en savoir plus dans <a href="${rootPrefix}quienes-somos.html">Qui sommes-nous</a>.`,
        servicios: `LogNext propose des services technologiques comme l'Intelligence Artificielle, Application Management Services, Infrastructure Management Services, la Cybersécurité et l'Outsourcing de Talent. Vous pouvez les consulter dans <a href="${rootPrefix}index.html#servicios">Nos services</a>.`,
        ciberseguridad: `En cybersécurité, LogNext aide à protéger les actifs numériques, réduire les risques et renforcer la prévention, la détection et la gestion des menaces. Plus d'informations sur <a href="${rootPrefix}servicios/ciberseguridad.html">Cybersécurité</a>.`,
        ia: `En Intelligence Artificielle, LogNext travaille sur des solutions orientées vers l'automatisation, l'analyse et de nouveaux modèles d'interaction. Consultez le service <a href="${rootPrefix}servicios/ia.html">Intelligence Artificielle</a>.`,
        empleo: `Vous pouvez consulter les opportunités disponibles et envoyer votre candidature depuis la section <a href="${rootPrefix}trabaja-con-nosotros.html">Travailler avec nous</a>. Je n'ai pas accès en temps réel aux offres concrètes, mais je peux vous diriger vers la page correspondante.`,
        contacto: `Vous pouvez contacter LogNext à <a href="mailto:info@lognext.com">info@lognext.com</a> ou appeler le <a href="tel:+34915472550">+34 915 472 550</a>. Pour les sujets liés au talent, écrivez à <a href="mailto:talent@lognext.com">talent@lognext.com</a>.`,
        precios: `Je ne peux pas fournir de prix ou de tarifs fixes depuis le chat, car ils dépendent du périmètre, du contexte et des besoins de chaque projet. Pour demander une proposition ou un devis, contactez LogNext à <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
        ubicacion: `LogNext est situé à <a href="https://maps.google.com/?q=Avenida+de+Burgos+17+Madrid+Spain" target="_blank" rel="noopener noreferrer">Avenida de Burgos 17, 28036 Madrid, Spain</a>. Vous pouvez également appeler le <a href="tel:+34915472550">+34 915 472 550</a>.`,
        legal: `Vous pouvez consulter les informations légales de LogNext sur la page <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Mentions légales</a>.`,
        cookies: `Les informations sur l'utilisation, la configuration et le consentement des cookies sont disponibles dans la <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Politique de cookies</a>.`,
        canal: `Pour signaler une possible incidence ou irrégularité, consultez le <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Canal de signalement</a>.`,
        privacidad: `Je ne vois pas de page de confidentialité indépendante sur le site. Les informations sur le traitement des données personnelles figurent dans les <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Mentions légales</a>. Pour une question spécifique, écrivez à <a href="mailto:privacy@lognext.com">privacy@lognext.com</a>.`,
        portal: `Le <a href="https://w3.cezanneondemand.com/CezanneOnDemand/-/LOGNEXT/Account/LogIn?ReturnUrl=%7E%2F-%2FLOGNEXT" target="_blank" rel="noopener noreferrer">Portail employé</a> est un accès spécifique réservé au personnel autorisé. Je ne peux pas fournir d'identifiants ni d'instructions internes depuis le chat.`
      }
    }
  };

  const intents = [
    {
      key: "cookies",
      words: [
        "cookies",
        "politica de cookies",
        "configurar cookies",
        "rechazar cookies",
        "aceptar cookies",
        "cookie policy",
        "manage cookies",
        "reject cookies",
        "accept cookies",
        "politique de cookies",
        "gerer les cookies",
        "refuser cookies",
        "accepter cookies"
      ]
    },
    {
      key: "canal",
      words: [
        "canal de denuncias",
        "denuncia",
        "denuncias",
        "informar incidencia",
        "comunicacion irregularidad",
        "irregularidad",
        "whistleblowing channel",
        "report channel",
        "complaint channel",
        "report an issue",
        "irregularity",
        "canal de signalement",
        "signalement",
        "denonciation",
        "signaler une irregularite"
      ]
    },
    {
      key: "privacidad",
      words: [
        "privacidad",
        "proteccion de datos",
        "datos personales",
        "rgpd",
        "tratamiento de datos",
        "privacy",
        "personal data",
        "data protection",
        "gdpr",
        "confidentialite",
        "donnees personnelles",
        "protection des donnees"
      ]
    },
    {
      key: "portal",
      words: [
        "portal del empleado",
        "empleado",
        "trabajadores",
        "nexters",
        "acceso empleados",
        "acceso interno",
        "employee portal",
        "employees",
        "staff access",
        "internal access",
        "portail employe",
        "employes",
        "acces interne"
      ]
    },
    {
      key: "ubicacion",
      words: [
        "direccion",
        "ubicacion",
        "donde estais",
        "oficinas",
        "madrid",
        "sede",
        "como llegar",
        "address",
        "location",
        "where are you",
        "offices",
        "headquarters",
        "adresse",
        "localisation",
        "ou etes vous",
        "bureaux",
        "siege"
      ]
    },
    {
      key: "legal",
      words: [
        "aviso legal",
        "datos legales",
        "informacion legal",
        "legal",
        "legal notice",
        "legal information",
        "legal terms",
        "mentions legales",
        "informations legales"
      ]
    },
    {
      key: "empresa",
      words: [
        "que haceis",
        "que hace lognext",
        "a que os dedicais",
        "a que se dedica lognext",
        "que es lognext",
        "quien es lognext",
        "quienes sois",
        "sobre lognext",
        "en que esta especializada la empresa",
        "en que esta especializada lognext",
        "especialidad",
        "especializada",
        "especializacion",
        "soluciones tecnologicas",
        "consultora tecnologica",
        "empresa tecnologica",
        "transformacion digital",
        "what do you do",
        "digital transformation",
        "what does lognext do",
        "what is lognext",
        "who are you",
        "specialized",
        "about lognext",
        "technology consulting",
        "que faites vous",
        "qui est lognext",
        "qui etes vous",
        "que fait lognext",
        "a quoi sert lognext",
        "a propos",
        "specialisee",
        "conseil technologique",
        "transformation digitale"
      ]
    },
    {
      key: "ciberseguridad",
      words: [
        "ciberseguridad",
        "cybersecurity",
        "cyber",
        "seguridad",
        "securite",
        "cybersecurite",
        "ens",
        "auditoria",
        "proteccion",
        "vulnerabilidad",
        "vulnerabilidades",
        "riesgo",
        "riesgos",
        "menaza",
        "amenazas",
        "threat",
        "security"
      ]
    },
    {
      key: "ia",
      words: [
        "ia",
        "ai",
        "inteligencia artificial",
        "artificial intelligence",
        "intelligence artificielle",
        "automatizacion",
        "automation",
        "datos",
        "data",
        "modelos",
        "models",
        "rag",
        "chatbot"
      ]
    },
    {
      key: "empleo",
      words: [
        "trabaja",
        "trabajar",
        "trabajo",
        "empleo",
        "vacante",
        "vacantes",
        "puesto",
        "puestos",
        "oferta",
        "ofertas de trabajo",
        "cv",
        "curriculum",
        "candidatura",
        "practicas",
        "enviar cv",
        "talent",
        "career",
        "careers",
        "vacancies",
        "open positions",
        "job",
        "jobs",
        "work with us",
        "work with you",
        "resume",
        "internship",
        "application",
        "emploi",
        "carrieres",
        "travailler",
        "postes",
        "offres",
        "stage",
        "candidature"
      ]
    },
    {
      key: "precios",
      words: [
        "precio",
        "cuanto cuesta",
        "presupuesto",
        "tarifa",
        "price",
        "cost",
        "budget",
        "quote",
        "how much",
        "prix",
        "combien",
        "devis",
        "tarif"
      ]
    },
    {
      key: "servicios",
      words: [
        "servicio",
        "servicios",
        "que servicios ofreceis",
        "que ofrece lognext",
        "que ofreceis",
        "soluciones",
        "areas",
        "tecnologia",
        "que podeis hacer",
        "services",
        "solutions",
        "what services",
        "what do you offer",
        "what can you do",
        "quels services",
        "que proposez vous",
        "ams",
        "ims",
        "outsourcing",
        "application management",
        "infrastructure management"
      ]
    },
    {
      key: "contacto",
      words: [
        "contacto",
        "contact",
        "email",
        "correo",
        "courriel",
        "telefono",
        "telephone",
        "llamar",
        "hablar con vosotros",
        "comercial",
        "reunion",
        "rendez vous",
        "call",
        "phone",
        "meeting",
        "sales",
        "appel",
        "adresse",
        "direccion"
      ]
    }
  ];

  function getLang() {
    const lang = (localStorage.getItem("language") || document.documentElement.lang || "es").slice(0, 2).toLowerCase();
    return copy[lang] ? lang : "es";
  }

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[¿?¡!]/g, " ")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function matchesKeyword(normalizedText, keyword) {
    const normalizedKeyword = normalize(keyword);
    if (!normalizedKeyword) return false;

    if (!normalizedKeyword.includes(" ") && normalizedKeyword.length <= 3) {
      return new RegExp(`(^|\\s)${escapeRegExp(normalizedKeyword)}(\\s|$)`).test(normalizedText);
    }

    return normalizedText.includes(normalizedKeyword);
  }

  function findIntent(text) {
    const normalized = normalize(text);
    return intents.find((intent) => intent.words.some((word) => matchesKeyword(normalized, word)));
  }

  function createMessage(text, type) {
    const message = document.createElement("div");
    message.className = `lognext-chatbot__message lognext-chatbot__message--${type}`;
    if (type === "bot") {
      message.innerHTML = text;
    } else {
      message.textContent = text;
    }
    return message;
  }

  function buildChatbot() {
    const langCopy = copy[getLang()];
    const widget = document.createElement("section");
    widget.className = "lognext-chatbot";
    widget.id = "lognextChatbot";
    widget.innerHTML = `
      <button class="lognext-chatbot__launcher" type="button" aria-label="${langCopy.open}" aria-expanded="false" aria-controls="lognextChatbotPanel">
        <img class="lognext-chatbot__launcher-icon" src="${rootPrefix}assets/img/chatbot/chatbot_logo_cropped.png" alt="" aria-hidden="true">
      </button>
      <div class="lognext-chatbot__panel" id="lognextChatbotPanel" role="region" aria-label="${langCopy.title}">
        <div class="lognext-chatbot__header">
          <div>
            <p class="lognext-chatbot__title">${langCopy.title}</p>
            <p class="lognext-chatbot__subtitle">${langCopy.subtitle}</p>
          </div>
          <button class="lognext-chatbot__close" type="button" aria-label="${langCopy.close}">&times;</button>
        </div>
        <div class="lognext-chatbot__messages" role="log" aria-live="polite" aria-relevant="additions"></div>
        <div class="lognext-chatbot__quick-actions"></div>
        <form class="lognext-chatbot__form">
          <input class="lognext-chatbot__input" type="text" autocomplete="off" placeholder="${langCopy.placeholder}" aria-label="${langCopy.placeholder}">
          <button class="lognext-chatbot__send" type="submit">${langCopy.send}</button>
        </form>
      </div>
    `;
    document.body.appendChild(widget);
    return widget;
  }

  function initChatbot() {
    const widget = buildChatbot();
    const launcher = widget.querySelector(".lognext-chatbot__launcher");
    const closeBtn = widget.querySelector(".lognext-chatbot__close");
    const messages = widget.querySelector(".lognext-chatbot__messages");
    const quickActions = widget.querySelector(".lognext-chatbot__quick-actions");
    const form = widget.querySelector(".lognext-chatbot__form");
    const input = widget.querySelector(".lognext-chatbot__input");

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    function addBotMessage(text) {
      messages.appendChild(createMessage(text, "bot"));
      scrollToBottom();
    }

    function addUserMessage(text) {
      messages.appendChild(createMessage(text, "user"));
      scrollToBottom();
    }

    function answerQuestion(question) {
      const langCopy = copy[getLang()];
      const cleanQuestion = question.trim();
      if (!cleanQuestion) {
        addBotMessage(langCopy.empty);
        return;
      }

      addUserMessage(cleanQuestion);
      const intent = findIntent(cleanQuestion);
      addBotMessage(intent ? langCopy.responses[intent.key] : langCopy.fallback);
    }

    function renderQuickActions() {
      const langCopy = copy[getLang()];
      quickActions.innerHTML = "";
      langCopy.quick.forEach((label) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "lognext-chatbot__quick-btn";
        button.textContent = label;
        button.addEventListener("click", () => answerQuestion(label));
        quickActions.appendChild(button);
      });
    }

    function updateStaticText() {
      const langCopy = copy[getLang()];
      launcher.setAttribute("aria-label", langCopy.open);
      closeBtn.setAttribute("aria-label", langCopy.close);
      widget.querySelector(".lognext-chatbot__panel").setAttribute("aria-label", langCopy.title);
      widget.querySelector(".lognext-chatbot__title").textContent = langCopy.title;
      widget.querySelector(".lognext-chatbot__subtitle").textContent = langCopy.subtitle;
      input.placeholder = langCopy.placeholder;
      input.setAttribute("aria-label", langCopy.placeholder);
      widget.querySelector(".lognext-chatbot__send").textContent = langCopy.send;
      renderQuickActions();
    }

    function openChat() {
      updateStaticText();
      widget.classList.add("is-open");
      launcher.setAttribute("aria-expanded", "true");
      if (!messages.children.length) addBotMessage(copy[getLang()].initial);
      window.setTimeout(() => input.focus(), 50);
    }

    function closeChat() {
      widget.classList.remove("is-open");
      launcher.setAttribute("aria-expanded", "false");
      launcher.focus();
    }

    function syncWithMobileMenu() {
      const mainNav = document.querySelector(".main-nav");
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const shouldHide = Boolean(mainNav && mainNav.classList.contains("active") && isMobile);

      if (shouldHide && widget.classList.contains("is-open")) {
        closeChat();
      }

      widget.hidden = shouldHide;
    }

    launcher.addEventListener("click", () => {
      if (widget.classList.contains("is-open")) {
        closeChat();
      } else {
        openChat();
      }
    });

    closeBtn.addEventListener("click", closeChat);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      answerQuestion(input.value);
      input.value = "";
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && widget.classList.contains("is-open")) {
        closeChat();
      }
    });

    document.querySelectorAll(".language-switcher a, .language-switcher.mobile a").forEach((link) => {
      link.addEventListener("click", () => window.setTimeout(updateStaticText, 0));
    });

    const mainNav = document.querySelector(".main-nav");
    if (mainNav) {
      const navObserver = new MutationObserver(syncWithMobileMenu);
      navObserver.observe(mainNav, { attributes: true, attributeFilter: ["class"] });
      window.addEventListener("resize", syncWithMobileMenu);
      syncWithMobileMenu();
    }

    renderQuickActions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
