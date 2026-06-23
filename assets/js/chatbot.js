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
      fallback: `No tengo una respuesta exacta para eso todavía. Puedes preguntarme por servicios, ciberseguridad, inteligencia artificial, empleo o contacto. Si necesitas ayuda concreta, te recomendamos escribir a <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
      empty: "Escribe una pregunta para que pueda ayudarte.",
      responses: {
        empresa: `LogNext es una consultora tecnológica especializada en acompañar a empresas en su transformación digital, ofreciendo soluciones en inteligencia artificial, ciberseguridad, AMS, IMS, outsourcing y servicios tecnológicos. Puedes conocer más sobre nosotros en la sección <a href="${rootPrefix}quienes-somos.html">Quiénes somos</a>.`,
        servicios: `LogNext ofrece servicios tecnológicos como Inteligencia Artificial, Application Management Services, Infrastructure Management Services, Ciberseguridad y Outsourcing de Talento. Puedes verlos en <a href="${rootPrefix}index.html#servicios">Nuestros servicios</a>.`,
        ciberseguridad: `En ciberseguridad, LogNext ayuda a proteger activos digitales, reducir riesgos y reforzar la prevención, detección y gestión de amenazas. Más información en <a href="${rootPrefix}servicios/ciberseguridad.html">Ciberseguridad</a>.`,
        ia: `En Inteligencia Artificial, LogNext trabaja soluciones orientadas a automatización, análisis y nuevos modelos de interacción. Puedes consultar el servicio en <a href="${rootPrefix}servicios/ia.html">Inteligencia Artificial</a>.`,
        empleo: `Puedes consultar las oportunidades disponibles y enviar tu candidatura desde la sección <a href="${rootPrefix}trabaja-con-nosotros.html">Trabaja con nosotros</a>. No tengo acceso en tiempo real a vacantes concretas, pero puedo llevarte a la página correspondiente.`,
        contacto: `Puedes contactar con LogNext en <a href="mailto:info@lognext.com">info@lognext.com</a> o llamar al <a href="tel:+34915472550">+34 915 472 550</a>. También puedes escribir a <a href="mailto:talent@lognext.com">talent@lognext.com</a> para temas de talento.`,
        precios: `No puedo facilitar precios o tarifas cerradas desde el chat, porque dependen del alcance, contexto y necesidades de cada proyecto. Para solicitar una propuesta o presupuesto, contacta con LogNext en <a href="mailto:info@lognext.com">info@lognext.com</a>.`
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
      fallback: `I do not have an exact answer for that yet. You can ask me about services, cybersecurity, artificial intelligence, careers or contact details. For specific help, please write to <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
      empty: "Type a question so I can help you.",
      responses: {
        empresa: `LogNext is a technology consulting company specialized in supporting organizations through digital transformation, with solutions in artificial intelligence, cybersecurity, AMS, IMS, outsourcing and technology services. You can learn more in <a href="${rootPrefix}quienes-somos.html">About us</a>.`,
        servicios: `LogNext provides technology services such as Artificial Intelligence, Application Management Services, Infrastructure Management Services, Cybersecurity and Talent Outsourcing. You can see them at <a href="${rootPrefix}index.html#servicios">Our services</a>.`,
        ciberseguridad: `In cybersecurity, LogNext helps protect digital assets, reduce risks and strengthen prevention, detection and threat management. More information at <a href="${rootPrefix}servicios/ciberseguridad.html">Cybersecurity</a>.`,
        ia: `In Artificial Intelligence, LogNext works on solutions focused on automation, analysis and new interaction models. You can check the service at <a href="${rootPrefix}servicios/ia.html">Artificial Intelligence</a>.`,
        empleo: `You can check available opportunities and submit your application in <a href="${rootPrefix}trabaja-con-nosotros.html">Work with us</a>. I do not have real-time access to specific vacancies, but I can take you to the right page.`,
        contacto: `You can contact LogNext at <a href="mailto:info@lognext.com">info@lognext.com</a> or call <a href="tel:+34915472550">+34 915 472 550</a>. For talent-related topics, write to <a href="mailto:talent@lognext.com">talent@lognext.com</a>.`,
        precios: `I cannot provide fixed prices or rates from the chat because they depend on the scope, context and needs of each project. To request a proposal or quote, contact LogNext at <a href="mailto:info@lognext.com">info@lognext.com</a>.`
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
      fallback: `Je n'ai pas encore de réponse exacte à ce sujet. Vous pouvez me poser des questions sur les services, la cybersécurité, l'intelligence artificielle, les carrières ou le contact. Pour une aide précise, écrivez à <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
      empty: "Écrivez une question afin que je puisse vous aider.",
      responses: {
        empresa: `LogNext est une société de conseil technologique spécialisée dans l'accompagnement des entreprises dans leur transformation numérique, avec des solutions en intelligence artificielle, cybersécurité, AMS, IMS, outsourcing et services technologiques. Vous pouvez en savoir plus dans <a href="${rootPrefix}quienes-somos.html">Qui sommes-nous</a>.`,
        servicios: `LogNext propose des services technologiques comme l'Intelligence Artificielle, Application Management Services, Infrastructure Management Services, la Cybersécurité et l'Outsourcing de Talent. Vous pouvez les consulter dans <a href="${rootPrefix}index.html#servicios">Nos services</a>.`,
        ciberseguridad: `En cybersécurité, LogNext aide à protéger les actifs numériques, réduire les risques et renforcer la prévention, la détection et la gestion des menaces. Plus d'informations sur <a href="${rootPrefix}servicios/ciberseguridad.html">Cybersécurité</a>.`,
        ia: `En Intelligence Artificielle, LogNext travaille sur des solutions orientées vers l'automatisation, l'analyse et de nouveaux modèles d'interaction. Consultez le service <a href="${rootPrefix}servicios/ia.html">Intelligence Artificielle</a>.`,
        empleo: `Vous pouvez consulter les opportunités disponibles et envoyer votre candidature depuis la section <a href="${rootPrefix}trabaja-con-nosotros.html">Travailler avec nous</a>. Je n'ai pas accès en temps réel aux offres concrètes, mais je peux vous diriger vers la page correspondante.`,
        contacto: `Vous pouvez contacter LogNext à <a href="mailto:info@lognext.com">info@lognext.com</a> ou appeler le <a href="tel:+34915472550">+34 915 472 550</a>. Pour les sujets liés au talent, écrivez à <a href="mailto:talent@lognext.com">talent@lognext.com</a>.`,
        precios: `Je ne peux pas fournir de prix ou de tarifs fixes depuis le chat, car ils dépendent du périmètre, du contexte et des besoins de chaque projet. Pour demander une proposition ou un devis, contactez LogNext à <a href="mailto:info@lognext.com">info@lognext.com</a>.`
      }
    }
  };

  const intents = [
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
        "conseil technologique"
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
        "emploi",
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
        <svg class="lognext-chatbot__launcher-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M4 5.5A3.5 3.5 0 0 1 7.5 2h9A3.5 3.5 0 0 1 20 5.5v6A3.5 3.5 0 0 1 16.5 15H10l-4.2 4.2A1 1 0 0 1 4 18.5V5.5Zm3.5-1.6A1.6 1.6 0 0 0 5.9 5.5v10.6l3.1-3.1h7.5a1.6 1.6 0 0 0 1.6-1.6v-6a1.6 1.6 0 0 0-1.6-1.6h-9Z"/>
          <path fill="currentColor" d="M8 8h8v1.7H8V8Zm0 3h5.7v1.7H8V11Z"/>
        </svg>
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
