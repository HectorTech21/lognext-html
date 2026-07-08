(function () {
  if (document.getElementById("lognextChatbot")) return;

  const CHATBOT_DEBUG = false;
  const EXACT_PHRASE_SCORE = 8;
  const KEYWORD_SCORE = 3;
  const SUPPORT_TERM_SCORE = 1;
  const GROUP_MATCH_SCORE = 5;
  const MIN_INTENT_SCORE = 2;

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
      typing: "Escribiendo...",
      quick: ["Servicios", "Ciberseguridad", "Inteligencia Artificial", "Trabaja con nosotros", "Contacto"],
      fallback: `No estoy seguro de haber entendido exactamente tu pregunta, pero puedo ayudarte con información sobre LogNext, sus servicios, certificaciones, equipo, oportunidades de empleo o formas de contacto. ¿Quieres que te cuente algo de eso?`,
      empty: "Escribe una pregunta para que pueda ayudarte.",
      responses: {
        empresa: `LogNext es una consultora tecnológica especializada en acompañar a empresas en su transformación digital, ofreciendo soluciones en inteligencia artificial, ciberseguridad, AMS, IMS, outsourcing y servicios tecnológicos. Puedes conocer más sobre nosotros en la sección <a href="${rootPrefix}quienes-somos.html">Quiénes somos</a>.`,
        servicios: `LogNext ofrece servicios tecnológicos orientados a cubrir distintas necesidades de negocio, incluyendo áreas como inteligencia artificial, ciberseguridad, AMS, IMS, Agile y Outsourcing. Nuestro objetivo es aportar soluciones especializadas y adaptadas a cada cliente.`,
        ciberseguridad: `LogNext ofrece soluciones orientadas a reforzar la seguridad tecnológica y la protección de la información. Ayudamos a las organizaciones a mejorar su postura de seguridad, reducir riesgos y trabajar en entornos digitales más seguros.`,
        ia: `LogNext trabaja con soluciones basadas en inteligencia artificial para ayudar a las organizaciones a automatizar procesos, aprovechar mejor sus datos y generar nuevas oportunidades de eficiencia e innovación.`,
        empleo: `Si quieres formar parte de LogNext, puedes visitar la sección <a href="${rootPrefix}trabaja-con-nosotros.html">Trabaja con Nosotros</a> de la web. Allí encontrarás información sobre oportunidades profesionales y cómo enviar tu candidatura.`,
        contacto: `Puedes contactar con LogNext a través de la sección de Contacto de la web, donde encontrarás las vías disponibles para enviar tu consulta o solicitar más información.`,
        contactoHumano: `Para hablar con el equipo de LogNext, puedes escribir a <a href="mailto:info@lognext.com">info@lognext.com</a> o llamar al <a href="tel:+34915472550">+34 915 472 550</a>. Si tu consulta es sobre talento o candidaturas, también puedes contactar en <a href="mailto:talent@lognext.com">talent@lognext.com</a>.`,
        saludo: `¡Hola! 👋 Soy el asistente virtual de LogNext. Puedo ayudarte con información sobre servicios, ubicación, contacto, empleo, ciberseguridad, inteligencia artificial, aviso legal, cookies o canal de denuncias. ¿Sobre qué tema necesitas ayuda?`,
        agradecimiento: `¡De nada! 😊 Si necesitas algo más sobre LogNext, servicios, empleo, contacto o información legal, aquí estoy.`,
        precios: `No puedo facilitar precios o tarifas cerradas desde el chat, porque dependen del alcance, contexto y necesidades de cada proyecto. Para solicitar una propuesta o presupuesto, contacta con LogNext en <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
        ubicacion: `La sede de LogNext está en <a href="https://maps.google.com/?q=Avenida+de+Burgos+17+Madrid+Spain" target="_blank" rel="noopener noreferrer">Avenida de Burgos 17, 28036 Madrid, Spain</a>. También puedes contactar por teléfono en <a href="tel:+34915472550">+34 915 472 550</a>.`,
        legal: `Puedes consultar la información legal de LogNext en la página <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Aviso Legal</a>.`,
        politicasCorporativas: `Puedes consultar la documentación corporativa y legal publicada por LogNext: <a href="${rootPrefix}assets/docs/politica-seguridad.pdf" target="_blank" rel="noopener noreferrer">Política de Seguridad de la Información</a>, <a href="${rootPrefix}assets/docs/politica-sistema-integrado.pdf" target="_blank" rel="noopener noreferrer">Política de Sistema Integrado</a>, <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Aviso Legal</a>, <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Política de Cookies</a> y <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Canal de Denuncias</a>. Para documentación adicional sobre cumplimiento normativo, contacta con LogNext en <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
        cookies: `La información sobre uso, configuración y consentimiento de cookies está disponible en la <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Política de Cookies</a>.`,
        canal: `Para comunicar posibles incidencias o irregularidades, puedes consultar el <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Canal de Denuncias</a>.`,
        privacidad: `No veo una página independiente de privacidad en la web. La información sobre tratamiento de datos personales aparece dentro del <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Aviso Legal</a>. Para dudas específicas, escribe a <a href="mailto:privacy@lognext.com">privacy@lognext.com</a>.`,
        portal: `El <a href="https://w3.cezanneondemand.com/CezanneOnDemand/-/LOGNEXT/Account/LogIn?ReturnUrl=%7E%2F-%2FLOGNEXT" target="_blank" rel="noopener noreferrer">Portal del empleado</a> es un acceso específico para personal autorizado. No puedo facilitar credenciales ni instrucciones internas desde el chat.`,
        actividad: `En LogNext desarrollamos soluciones de negocio basadas en la tecnología y en la innovación. Ayudamos a nuestros clientes a transformar sus procesos, mejorar su eficiencia y avanzar con soluciones IT adaptadas a sus necesidades.`,
        quienesSomos: `LogNext es una compañía especializada en soluciones y servicios IT. Acompañamos a nuestros clientes en sus procesos de transformación tecnológica, combinando experiencia, innovación y talento especializado para responder a sus necesidades de negocio.`,
        propuestaValor: `Lo que diferencia a LogNext es la combinación de conocimiento tecnológico, cercanía con el cliente, flexibilidad y capacidad para adaptar cada solución a las necesidades reales del negocio. Trabajamos con un enfoque práctico, especializado y orientado a resultados.`,
        certificaciones: `LogNext cuenta con certificaciones que refuerzan su compromiso con la calidad, la seguridad de la información, la gestión de servicios, el medioambiente y el cumplimiento. Estas certificaciones aportan confianza a clientes, colaboradores y administraciones públicas.`,
        certificacionesEns: `LogNext cuenta con certificación ENS Alto, un reconocimiento especialmente relevante en materia de seguridad de la información. Esto refuerza nuestra capacidad para trabajar con clientes, administraciones públicas y entornos donde la protección de la información es crítica.`,
        responsable: `El responsable de LogNext es Patrick Pariente.`,
        clientesSectores: `LogNext trabaja con organizaciones que necesitan soluciones tecnológicas especializadas para mejorar sus procesos, reforzar su seguridad, optimizar sus servicios IT o avanzar en su transformación digital. Nuestros servicios se adaptan a las necesidades de cada cliente.`,
        innovacionTransformacion: `En LogNext entendemos la innovación como una forma de aportar valor real al negocio. Aplicamos la tecnología para mejorar procesos, optimizar servicios y ayudar a nuestros clientes a evolucionar de forma eficiente, segura y sostenible.`,
        ams: `El servicio AMS de LogNext está orientado a la gestión, mantenimiento, soporte y evolución de aplicaciones, ayudando a los clientes a asegurar la continuidad, eficiencia y mejora constante de sus sistemas.`,
        ims: `El servicio IMS de LogNext se centra en la gestión y operación de infraestructuras y servicios tecnológicos, ayudando a los clientes a mantener entornos IT fiables, seguros y eficientes.`,
        agile: `LogNext acompaña a las organizaciones en la adopción y aplicación de metodologías ágiles, facilitando la gestión de proyectos, la colaboración entre equipos y la entrega de valor de forma más flexible y eficiente.`,
        outsourcing: `LogNext ofrece servicios de Outsourcing IT para ayudar a las organizaciones a incorporar talento especializado, reforzar sus equipos y cubrir necesidades tecnológicas concretas con flexibilidad y experiencia.`
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
      typing: "Typing...",
      quick: ["Services", "Cybersecurity", "Artificial Intelligence", "Work with us", "Contact"],
      fallback: `I am not completely sure I understood your question, but I can help with information about LogNext, its services, certifications, team, career opportunities or contact channels. Would you like me to tell you about any of those topics?`,
      empty: "Type a question so I can help you.",
      responses: {
        empresa: `LogNext is a technology consulting company specialized in supporting organizations through digital transformation, with solutions in artificial intelligence, cybersecurity, AMS, IMS, outsourcing and technology services. You can learn more in <a href="${rootPrefix}quienes-somos.html">About us</a>.`,
        servicios: `LogNext offers technology services designed to cover different business needs, including areas such as artificial intelligence, cybersecurity, AMS, IMS, Agile and Outsourcing. Our goal is to provide specialized solutions adapted to each client.`,
        ciberseguridad: `LogNext offers solutions aimed at strengthening technological security and information protection. We help organizations improve their security posture, reduce risks and work in safer digital environments.`,
        ia: `LogNext works with artificial-intelligence-based solutions to help organizations automate processes, make better use of their data and create new opportunities for efficiency and innovation.`,
        empleo: `If you want to join LogNext, you can visit the <a href="${rootPrefix}trabaja-con-nosotros.html">Work with us</a> section of the website. There you will find information about professional opportunities and how to submit your application.`,
        contacto: `You can contact LogNext through the Contact section of the website, where you will find the available channels to send your query or request more information.`,
        contactoHumano: `To talk to the LogNext team, you can write to <a href="mailto:info@lognext.com">info@lognext.com</a> or call <a href="tel:+34915472550">+34 915 472 550</a>. For talent or application-related questions, you can also contact <a href="mailto:talent@lognext.com">talent@lognext.com</a>.`,
        saludo: `Hello! 👋 I’m LogNext’s virtual assistant. I can help you with services, location, contact, careers, cybersecurity, artificial intelligence, legal notice, cookies or the whistleblowing channel. What would you like to know?`,
        agradecimiento: `You’re welcome! 😊 If you need anything else about LogNext, services, careers, contact or legal information, I’m here to help.`,
        precios: `I cannot provide fixed prices or rates from the chat because they depend on the scope, context and needs of each project. To request a proposal or quote, contact LogNext at <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
        ubicacion: `LogNext is located at <a href="https://maps.google.com/?q=Avenida+de+Burgos+17+Madrid+Spain" target="_blank" rel="noopener noreferrer">Avenida de Burgos 17, 28036 Madrid, Spain</a>. You can also call <a href="tel:+34915472550">+34 915 472 550</a>.`,
        legal: `You can review LogNext's legal information on the <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Legal Notice</a> page.`,
        politicasCorporativas: `You can check the corporate and legal documentation published by LogNext: <a href="${rootPrefix}assets/docs/politica-seguridad.pdf" target="_blank" rel="noopener noreferrer">Information Security Policy</a>, <a href="${rootPrefix}assets/docs/politica-sistema-integrado.pdf" target="_blank" rel="noopener noreferrer">Integrated System Policy</a>, <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Legal Notice</a>, <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Cookie Policy</a> and <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Whistleblowing Channel</a>. For additional compliance documentation, contact LogNext at <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
        cookies: `Information about cookie use, settings and consent is available in the <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Cookie Policy</a>.`,
        canal: `To report possible issues or irregularities, please visit the <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Whistleblowing Channel</a>.`,
        privacidad: `I do not see a separate privacy page on the website. Information about personal data processing appears within the <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Legal Notice</a>. For specific questions, write to <a href="mailto:privacy@lognext.com">privacy@lognext.com</a>.`,
        portal: `The <a href="https://w3.cezanneondemand.com/CezanneOnDemand/-/LOGNEXT/Account/LogIn?ReturnUrl=%7E%2F-%2FLOGNEXT" target="_blank" rel="noopener noreferrer">Employee Portal</a> is a specific access point for authorized staff. I cannot provide credentials or internal instructions from the chat.`,
        actividad: `At LogNext, we develop business solutions based on technology and innovation. We help our clients transform their processes, improve efficiency and move forward with IT solutions adapted to their needs.`,
        quienesSomos: `LogNext is a company specialized in IT solutions and services. We support our clients in their technology transformation processes, combining experience, innovation and specialized talent to respond to their business needs.`,
        propuestaValor: `What differentiates LogNext is the combination of technological knowledge, proximity to the client, flexibility and the ability to adapt each solution to real business needs. We work with a practical, specialized and results-oriented approach.`,
        certificaciones: `LogNext has certifications that reinforce its commitment to quality, information security, service management, the environment and compliance. These certifications bring confidence to clients, partners and public administrations.`,
        certificacionesEns: `LogNext has ENS Alto certification, a particularly relevant recognition in information security. This reinforces our ability to work with clients, public administrations and environments where information protection is critical.`,
        responsable: `The person responsible for LogNext is Patrick Pariente.`,
        clientesSectores: `LogNext works with organizations that need specialized technology solutions to improve processes, strengthen security, optimize IT services or advance their digital transformation. Our services adapt to each client's needs.`,
        innovacionTransformacion: `At LogNext, we understand innovation as a way to bring real value to the business. We apply technology to improve processes, optimize services and help our clients evolve efficiently, securely and sustainably.`,
        ams: `LogNext's AMS service focuses on application management, maintenance, support and evolution, helping clients ensure continuity, efficiency and continuous improvement of their systems.`,
        ims: `LogNext's IMS service focuses on managing and operating infrastructure and technology services, helping clients maintain reliable, secure and efficient IT environments.`,
        agile: `LogNext supports organizations in adopting and applying agile methodologies, facilitating project management, team collaboration and value delivery in a more flexible and efficient way.`,
        outsourcing: `LogNext offers IT Outsourcing services to help organizations incorporate specialized talent, reinforce teams and cover specific technology needs with flexibility and experience.`
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
      typing: "Écriture...",
      quick: ["Services", "Cybersécurité", "Intelligence Artificielle", "Travailler avec nous", "Contact"],
      fallback: `Je ne suis pas certain d'avoir parfaitement compris votre question, mais je peux vous aider avec des informations sur LogNext, ses services, ses certifications, son équipe, ses opportunités professionnelles ou ses moyens de contact. Souhaitez-vous que je vous parle de l'un de ces sujets ?`,
      empty: "Écrivez une question afin que je puisse vous aider.",
      responses: {
        empresa: `LogNext est une société de conseil technologique spécialisée dans l'accompagnement des entreprises dans leur transformation numérique, avec des solutions en intelligence artificielle, cybersécurité, AMS, IMS, outsourcing et services technologiques. Vous pouvez en savoir plus dans <a href="${rootPrefix}quienes-somos.html">Qui sommes-nous</a>.`,
        servicios: `LogNext propose des services technologiques destinés à couvrir différents besoins métier, notamment l'intelligence artificielle, la cybersécurité, AMS, IMS, Agile et Outsourcing. Notre objectif est d'apporter des solutions spécialisées et adaptées à chaque client.`,
        ciberseguridad: `LogNext propose des solutions orientées vers le renforcement de la sécurité technologique et la protection de l'information. Nous aidons les organisations à améliorer leur posture de sécurité, réduire les risques et travailler dans des environnements numériques plus sûrs.`,
        ia: `LogNext travaille avec des solutions basées sur l'intelligence artificielle pour aider les organisations à automatiser leurs processus, mieux exploiter leurs données et créer de nouvelles opportunités d'efficacité et d'innovation.`,
        empleo: `Si vous souhaitez rejoindre LogNext, vous pouvez visiter la section <a href="${rootPrefix}trabaja-con-nosotros.html">Travailler avec nous</a> du site. Vous y trouverez des informations sur les opportunités professionnelles et la manière d'envoyer votre candidature.`,
        contacto: `Vous pouvez contacter LogNext via la section Contact du site, où vous trouverez les moyens disponibles pour envoyer votre demande ou solliciter plus d'informations.`,
        contactoHumano: `Pour parler avec l'équipe de LogNext, vous pouvez écrire à <a href="mailto:info@lognext.com">info@lognext.com</a> ou appeler le <a href="tel:+34915472550">+34 915 472 550</a>. Pour les questions liées au talent ou aux candidatures, vous pouvez également contacter <a href="mailto:talent@lognext.com">talent@lognext.com</a>.`,
        saludo: `Bonjour ! 👋 Je suis l’assistant virtuel de LogNext. Je peux vous aider avec les services, la localisation, le contact, les carrières, la cybersécurité, l’intelligence artificielle, les mentions légales, les cookies ou le canal de signalement. Que souhaitez-vous savoir ?`,
        agradecimiento: `Avec plaisir ! 😊 Si vous avez besoin d’autre chose sur LogNext, les services, les carrières, le contact ou les informations légales, je suis là pour vous aider.`,
        precios: `Je ne peux pas fournir de prix ou de tarifs fixes depuis le chat, car ils dépendent du périmètre, du contexte et des besoins de chaque projet. Pour demander une proposition ou un devis, contactez LogNext à <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
        ubicacion: `LogNext est situé à <a href="https://maps.google.com/?q=Avenida+de+Burgos+17+Madrid+Spain" target="_blank" rel="noopener noreferrer">Avenida de Burgos 17, 28036 Madrid, Spain</a>. Vous pouvez également appeler le <a href="tel:+34915472550">+34 915 472 550</a>.`,
        legal: `Vous pouvez consulter les informations légales de LogNext sur la page <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Mentions légales</a>.`,
        politicasCorporativas: `Vous pouvez consulter la documentation corporative et légale publiée par LogNext : <a href="${rootPrefix}assets/docs/politica-seguridad.pdf" target="_blank" rel="noopener noreferrer">Politique de sécurité de l’information</a>, <a href="${rootPrefix}assets/docs/politica-sistema-integrado.pdf" target="_blank" rel="noopener noreferrer">Politique du système intégré</a>, <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Mentions légales</a>, <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Politique de cookies</a> et <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Canal de signalement</a>. Pour toute documentation supplémentaire sur la conformité, contactez LogNext à <a href="mailto:info@lognext.com">info@lognext.com</a>.`,
        cookies: `Les informations sur l'utilisation, la configuration et le consentement des cookies sont disponibles dans la <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Politique de cookies</a>.`,
        canal: `Pour signaler une possible incidence ou irrégularité, consultez le <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Canal de signalement</a>.`,
        privacidad: `Je ne vois pas de page de confidentialité indépendante sur le site. Les informations sur le traitement des données personnelles figurent dans les <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Mentions légales</a>. Pour une question spécifique, écrivez à <a href="mailto:privacy@lognext.com">privacy@lognext.com</a>.`,
        portal: `Le <a href="https://w3.cezanneondemand.com/CezanneOnDemand/-/LOGNEXT/Account/LogIn?ReturnUrl=%7E%2F-%2FLOGNEXT" target="_blank" rel="noopener noreferrer">Portail employé</a> est un accès spécifique réservé au personnel autorisé. Je ne peux pas fournir d'identifiants ni d'instructions internes depuis le chat.`,
        actividad: `Chez LogNext, nous développons des solutions métier fondées sur la technologie et l'innovation. Nous aidons nos clients à transformer leurs processus, améliorer leur efficacité et avancer avec des solutions IT adaptées à leurs besoins.`,
        quienesSomos: `LogNext est une entreprise spécialisée dans les solutions et services IT. Nous accompagnons nos clients dans leurs processus de transformation technologique en combinant expérience, innovation et talent spécialisé pour répondre à leurs besoins métier.`,
        propuestaValor: `Ce qui différencie LogNext, c'est la combinaison de connaissances technologiques, de proximité avec le client, de flexibilité et de capacité à adapter chaque solution aux besoins réels du métier. Nous travaillons avec une approche pratique, spécialisée et orientée résultats.`,
        certificaciones: `LogNext dispose de certifications qui renforcent son engagement envers la qualité, la sécurité de l'information, la gestion des services, l'environnement et la conformité. Ces certifications apportent de la confiance aux clients, partenaires et administrations publiques.`,
        certificacionesEns: `LogNext dispose de la certification ENS Alto, une reconnaissance particulièrement importante en matière de sécurité de l'information. Cela renforce notre capacité à travailler avec des clients, des administrations publiques et des environnements où la protection de l'information est critique.`,
        responsable: `Le responsable de LogNext est Patrick Pariente.`,
        clientesSectores: `LogNext travaille avec des organisations qui ont besoin de solutions technologiques spécialisées pour améliorer leurs processus, renforcer leur sécurité, optimiser leurs services IT ou avancer dans leur transformation numérique. Nos services s'adaptent aux besoins de chaque client.`,
        innovacionTransformacion: `Chez LogNext, nous considérons l'innovation comme une manière d'apporter une valeur réelle au métier. Nous appliquons la technologie pour améliorer les processus, optimiser les services et aider nos clients à évoluer de façon efficace, sûre et durable.`,
        ams: `Le service AMS de LogNext est orienté vers la gestion, la maintenance, le support et l'évolution des applications, afin d'aider les clients à assurer la continuité, l'efficacité et l'amélioration constante de leurs systèmes.`,
        ims: `Le service IMS de LogNext se concentre sur la gestion et l'exploitation des infrastructures et services technologiques, en aidant les clients à maintenir des environnements IT fiables, sûrs et efficaces.`,
        agile: `LogNext accompagne les organisations dans l'adoption et l'application de méthodologies agiles, en facilitant la gestion de projets, la collaboration entre équipes et la livraison de valeur de manière plus flexible et efficace.`,
        outsourcing: `LogNext propose des services d'Outsourcing IT pour aider les organisations à intégrer des talents spécialisés, renforcer leurs équipes et couvrir des besoins technologiques concrets avec flexibilité et expérience.`
      }
    }
  };

  const responseLinks = {
    empresa: {
      href: `${rootPrefix}quienes-somos.html`,
      label: { es: "Conocer LogNext", en: "Learn about LogNext", fr: "Découvrir LogNext" }
    },
    servicios: {
      href: `${rootPrefix}index.html#servicios`,
      label: { es: "Ver servicios", en: "View services", fr: "Voir les services" }
    },
    ciberseguridad: {
      href: `${rootPrefix}servicios/ciberseguridad.html`,
      label: { es: "Ver Ciberseguridad", en: "View Cybersecurity", fr: "Voir Cybersécurité" }
    },
    ia: {
      href: `${rootPrefix}servicios/ia.html`,
      label: { es: "Ver Inteligencia Artificial", en: "View Artificial Intelligence", fr: "Voir Intelligence Artificielle" }
    },
    empleo: {
      href: `${rootPrefix}trabaja-con-nosotros.html`,
      label: { es: "Ir a Trabaja con Nosotros", en: "Go to Work with us", fr: "Aller à Travailler avec nous" }
    },
    contacto: {
      href: "mailto:info@lognext.com",
      label: { es: "Ir a Contacto", en: "Contact LogNext", fr: "Contacter LogNext" }
    },
    contactoHumano: {
      href: "mailto:info@lognext.com",
      label: { es: "Contactar con LogNext", en: "Contact LogNext", fr: "Contacter LogNext" }
    },
    actividad: {
      href: `${rootPrefix}quienes-somos.html`,
      label: { es: "Conocer más sobre LogNext", en: "Learn more about LogNext", fr: "En savoir plus sur LogNext" }
    },
    quienesSomos: {
      href: `${rootPrefix}quienes-somos.html`,
      label: { es: "Conocer LogNext", en: "Learn about LogNext", fr: "Découvrir LogNext" }
    },
    propuestaValor: {
      href: `${rootPrefix}quienes-somos.html`,
      label: { es: "Conocer más sobre LogNext", en: "Learn more about LogNext", fr: "En savoir plus sur LogNext" }
    },
    certificaciones: {
      href: `${rootPrefix}index.html#certificaciones`,
      label: { es: "Ver certificaciones", en: "View certifications", fr: "Voir les certifications" }
    },
    certificacionesEns: {
      href: `${rootPrefix}index.html#certificaciones`,
      label: { es: "Ver certificaciones", en: "View certifications", fr: "Voir les certifications" }
    },
    clientesSectores: {
      href: `${rootPrefix}quienes-somos.html`,
      label: { es: "Conocer más sobre LogNext", en: "Learn more about LogNext", fr: "En savoir plus sur LogNext" }
    },
    innovacionTransformacion: {
      href: `${rootPrefix}quienes-somos.html`,
      label: { es: "Conocer más sobre LogNext", en: "Learn more about LogNext", fr: "En savoir plus sur LogNext" }
    },
    ams: {
      href: `${rootPrefix}servicios/ams.html`,
      label: { es: "Ver AMS", en: "View AMS", fr: "Voir AMS" }
    },
    ims: {
      href: `${rootPrefix}servicios/ims.html`,
      label: { es: "Ver IMS", en: "View IMS", fr: "Voir IMS" }
    },
    agile: {
      href: `${rootPrefix}index.html#servicios`,
      label: { es: "Ver Agile", en: "View Agile", fr: "Voir Agile" }
    },
    outsourcing: {
      href: `${rootPrefix}servicios/outsourcing.html`,
      label: { es: "Ver Outsourcing", en: "View Outsourcing", fr: "Voir Outsourcing" }
    }
  };

  const intents = [
    {
      key: "cookies",
      words: [
        "cookies",
        "politica de cookies",
        "configurar cookies",
        "aceptar cookies",
        "rechazar cookies",
        "cookie policy",
        "manage cookies",
        "accept cookies",
        "reject cookies",
        "politique de cookies",
        "gerer cookies",
        "gerer les cookies",
        "accepter cookies",
        "refuser cookies"
      ],
      terms: ["cookies", "cookie", "consentimiento", "consent", "consentement"]
    },
    {
      key: "canal",
      words: [
        "canal de denuncias",
        "denuncia",
        "denuncias",
        "denunciar",
        "comunicar irregularidad",
        "informar incidencia",
        "comportamiento irregular",
        "irregularidad",
        "whistleblowing",
        "whistleblowing channel",
        "report channel",
        "complaint",
        "report an issue",
        "irregularity",
        "canal de signalement",
        "signalement",
        "denonciation",
        "signaler",
        "irregularite"
      ],
      terms: ["denuncia", "irregularidad", "incidencia", "whistleblowing", "complaint", "signalement", "denonciation"]
    },
    {
      key: "privacidad",
      words: [
        "privacidad",
        "proteccion de datos",
        "datos personales",
        "rgpd",
        "tratamiento de datos",
        "responsable legal",
        "responsable del tratamiento",
        "responsable de tratamiento",
        "delegado de proteccion de datos",
        "dpo",
        "privacy",
        "personal data",
        "data protection",
        "gdpr",
        "confidentialite",
        "donnees personnelles",
        "protection des donnees"
      ],
      terms: ["privacidad", "rgpd", "tratamiento", "dpo", "privacy", "gdpr", "confidentialite", "donnees"]
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
      ],
      terms: ["portal", "empleado", "employee", "staff", "portail", "employe"]
    },
    {
      key: "ubicacion",
      words: [
        "direccion",
        "ubicacion",
        "localizacion",
        "donde esta la oficina",
        "donde estais",
        "donde se encuentra lognext",
        "donde esta lognext",
        "donde estan las oficinas",
        "cual es vuestra direccion",
        "oficina",
        "oficinas",
        "sede",
        "sede central",
        "como llegar",
        "llegar a lognext",
        "ir a lognext",
        "donde os encuentro",
        "donde os ubicais",
        "estamos en madrid",
        "teneis oficina en madrid",
        "cual es la sede",
        "donde queda",
        "ubicados",
        "address",
        "company address",
        "where are you",
        "where is lognext",
        "where is your office",
        "what is your office location",
        "office location",
        "offices",
        "madrid office",
        "headquarters",
        "how to get there",
        "how can i get there",
        "location",
        "where can i find you",
        "adresse",
        "quelle est votre adresse",
        "localisation",
        "ou etes vous",
        "ou se trouve lognext",
        "ou sont vos bureaux",
        "bureau",
        "bureaux",
        "siege",
        "comment arriver",
        "comment venir",
        "ou vous trouver",
        "madrid"
      ],
      terms: [
        "donde",
        "oficina",
        "oficinas",
        "direccion",
        "ubicacion",
        "localizacion",
        "sede",
        "madrid",
        "llegar",
        "queda",
        "ubicados",
        "address",
        "office",
        "location",
        "headquarters",
        "adresse",
        "localisation",
        "bureau",
        "bureaux",
        "siege"
      ]
    },
    {
      key: "legal",
      words: [
        "aviso legal",
        "informacion legal",
        "datos legales",
        "terminos legales",
        "legal",
        "legal notice",
        "legal information",
        "legal terms",
        "terms",
        "mentions legales",
        "informations legales"
      ],
      terms: ["legal", "terminos", "terms", "mentions"]
    },
    {
      key: "precios",
      words: [
        "precio",
        "precios",
        "cuanto cuesta",
        "coste",
        "costo",
        "presupuesto",
        "tarifa",
        "tarifas",
        "cuanto vale",
        "pedir presupuesto",
        "solicitar presupuesto",
        "price",
        "prices",
        "cost",
        "how much",
        "how much does it cost",
        "budget",
        "quote",
        "pricing",
        "prix",
        "combien",
        "combien ca coute",
        "cout",
        "budget",
        "devis",
        "tarif",
        "tarifs"
      ],
      terms: ["precio", "precios", "cuesta", "coste", "presupuesto", "tarifa", "price", "cost", "budget", "quote", "pricing", "prix", "combien", "cout", "devis", "tarif"]
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
        "ofertas",
        "ofertas de trabajo",
        "puesto",
        "puestos",
        "puestos abiertos",
        "candidatura",
        "enviar cv",
        "mandar cv",
        "cv",
        "curriculum",
        "practicas",
        "beca",
        "quiero trabajar",
        "quiero trabajar con vosotros",
        "como puedo trabajar en lognext",
        "teneis ofertas de empleo",
        "puedo enviar mi cv",
        "como me uno al equipo",
        "buscais talento",
        "teneis practicas",
        "como puedo formar parte de lognext",
        "oportunidades profesionales",
        "procesos de seleccion abiertos",
        "donde envio el curriculum",
        "puedo hacer practicas en lognext",
        "quiero unirme a lognext",
        "como es trabajar en lognext",
        "bolsa de empleo",
        "hay vacantes",
        "buscais gente",
        "jobs",
        "careers",
        "vacancies",
        "open positions",
        "work with you",
        "work at lognext",
        "send my cv",
        "send my resume",
        "resume",
        "internship",
        "application",
        "emploi",
        "carrieres",
        "postes",
        "offres",
        "offres d emploi",
        "travailler chez lognext",
        "candidature",
        "envoyer cv",
        "stage"
      ],
      terms: ["trabajo", "trabajar", "empleo", "vacantes", "puestos", "cv", "curriculum", "practicas", "beca", "talento", "carrera", "unirme", "seleccion", "jobs", "careers", "vacancies", "resume", "internship", "emploi", "carrieres", "postes", "offres", "stage"]
    },
    {
      key: "certificacionesEns",
      words: [
        "ens alto",
        "teneis ens alto",
        "lognext tiene ens alto",
        "certificacion ens alto",
        "esquema nacional de seguridad",
        "que supone tener ens alto",
        "ens",
        "administracion publica",
        "administraciones publicas",
        "seguridad administracion publica",
        "national security framework",
        "public administrations",
        "ens certification",
        "certification ens",
        "administrations publiques"
      ],
      terms: ["ens", "alto", "seguridad", "administracion", "publica", "certificacion", "security", "public", "administrations"],
      groups: [
        ["ens", "alto", "certificacion", "seguridad"],
        ["administracion", "publica", "informacion", "seguridad"]
      ]
    },
    {
      key: "certificaciones",
      words: [
        "que certificaciones tiene lognext",
        "teneis certificaciones iso",
        "certificaciones iso",
        "que garantias ofrece lognext",
        "esta lognext certificada",
        "que acredita la calidad de lognext",
        "que certificaciones avalan a lognext",
        "que demuestra vuestra solvencia",
        "que nivel de cumplimiento teneis",
        "certificaciones de calidad",
        "certificaciones de seguridad",
        "lognext tiene iso",
        "que garantias dais a los clientes",
        "que confianza puede tener un cliente en lognext",
        "iso",
        "calidad",
        "cumplimiento",
        "solvencia",
        "acreditacion",
        "garantia",
        "homologacion",
        "certifications",
        "iso certifications",
        "quality certifications",
        "compliance",
        "trust",
        "certifications iso",
        "qualite",
        "conformite",
        "garantie"
      ],
      terms: ["certificacion", "certificaciones", "certificado", "iso", "calidad", "cumplimiento", "solvencia", "acreditacion", "garantia", "confianza", "homologacion", "certifications", "compliance", "trust", "qualite", "conformite"],
      groups: [
        ["certificacion", "certificaciones", "iso", "calidad", "cumplimiento", "seguridad", "solvencia", "garantia", "confianza"],
        ["certifications", "iso", "quality", "compliance", "trust"]
      ]
    },
    {
      key: "politicasCorporativas",
      words: [
        "politica de seguridad de la informacion",
        "seguridad de la informacion",
        "politica de seguridad",
        "politica corporativa",
        "politicas corporativas",
        "politicas de empresa",
        "cumplimiento normativo",
        "compliance",
        "sistema de gestion de seguridad de la informacion",
        "sistema de gestion de la seguridad de la informacion",
        "sgsi",
        "ens",
        "esquema nacional de seguridad",
        "information security policy",
        "security policy",
        "information security",
        "corporate policies",
        "information security management system",
        "isms",
        "politique de securite de l information",
        "securite de l information",
        "politiques corporatives",
        "conformite",
        "systeme de gestion de la securite de l information"
      ],
      terms: ["politica", "politicas", "seguridad", "informacion", "cumplimiento", "compliance", "sgsi", "ens", "security", "policy", "information", "corporate", "isms", "conformite"]
    },
    {
      key: "ciberseguridad",
      words: [
        "ciberseguridad",
        "cybersecurity",
        "cyber",
        "ofreceis ciberseguridad",
        "que haceis en ciberseguridad",
        "como protegeis la informacion",
        "servicios de seguridad",
        "como ayudais a mejorar la seguridad",
        "soluciones de seguridad",
        "gestionais riesgos tecnologicos",
        "proteger datos",
        "capacidades en seguridad de la informacion",
        "como protegeis a los clientes",
        "ciberataques",
        "seguridad informatica",
        "soluciones de ciberseguridad",
        "seguridad",
        "ens",
        "auditoria",
        "proteccion",
        "vulnerabilidad",
        "vulnerabilidades",
        "riesgo",
        "riesgos",
        "amenaza",
        "amenazas",
        "threat",
        "security",
        "securite",
        "cybersecurite"
      ],
      terms: ["ciberseguridad", "seguridad", "informatica", "informacion", "proteccion", "datos", "riesgos", "ciberataques", "entornos", "cybersecurity", "security", "threat", "securite", "cybersecurite"]
    },
    {
      key: "ia",
      words: [
        "ia",
        "ai",
        "inteligencia artificial",
        "teneis servicios de inteligencia artificial",
        "que haceis con ia",
        "ofreceis soluciones de ia",
        "como usais la inteligencia artificial",
        "que aporta la ia",
        "haceis automatizacion",
        "trabajais con datos",
        "soluciones inteligentes",
        "como puede ayudar la ia a mi empresa",
        "capacidades en inteligencia artificial",
        "machine learning",
        "analisis de datos",
        "artificial intelligence",
        "intelligence artificielle",
        "automatizacion",
        "automation",
        "automatizacion de procesos",
        "datos",
        "data",
        "modelos",
        "models",
        "rag",
        "chatbot"
      ],
      terms: ["ia", "ai", "inteligencia", "artificial", "automatizacion", "datos", "modelos", "machine", "learning", "analisis", "inteligentes", "automation", "data", "models", "intelligence"]
    },
    {
      key: "ams",
      words: [
        "que es ams",
        "que significa ams",
        "que haceis en ams",
        "ofreceis mantenimiento de aplicaciones",
        "mantenimiento de aplicaciones",
        "gestionais aplicaciones",
        "dais soporte aplicativo",
        "soporte aplicativo",
        "evolucionar aplicaciones",
        "application management",
        "application management services",
        "mantenéis sistemas o aplicaciones",
        "mantenimiento aplicativo"
      ],
      terms: ["ams", "aplicaciones", "aplicativo", "mantenimiento", "soporte", "evolucion", "application", "management"]
    },
    {
      key: "ims",
      words: [
        "que es ims",
        "que significa ims",
        "que haceis en ims",
        "gestionais infraestructuras",
        "dais soporte de sistemas",
        "servicios de infraestructura",
        "operacion it",
        "administrais sistemas",
        "gestionais entornos tecnologicos",
        "soporte de infraestructura",
        "infrastructure management",
        "infrastructure management services"
      ],
      terms: ["ims", "infraestructura", "infraestructuras", "sistemas", "operacion", "administrais", "entornos", "infrastructure", "management"]
    },
    {
      key: "agile",
      words: [
        "que haceis en agile",
        "metodologias agiles",
        "servicios agile",
        "gestion agil",
        "perfiles scrum",
        "que significa agile",
        "equipos agiles",
        "metodologias agiles",
        "proyectos agile",
        "transformacion agile",
        "scrum",
        "agile"
      ],
      terms: ["agile", "agil", "agiles", "scrum", "metodologias", "proyectos", "equipos"]
    },
    {
      key: "outsourcing",
      words: [
        "que haceis en outsourcing",
        "ofreceis outsourcing",
        "perfiles it",
        "aportar consultores",
        "reforzar equipos",
        "externalizais servicios",
        "talento especializado",
        "contratar profesionales it",
        "equipos externos",
        "perfiles tecnologicos",
        "outsourcing",
        "externalizacion",
        "consultores"
      ],
      terms: ["outsourcing", "externalizacion", "consultores", "perfiles", "talento", "equipos", "profesionales"]
    },
    {
      key: "quienesSomos",
      words: [
        "que es lognext",
        "hablame de lognext",
        "explicame que es lognext",
        "quienes sois",
        "quien es lognext",
        "que tipo de empresa es lognext",
        "que representa lognext",
        "como definirias lognext",
        "cual es la identidad de lognext",
        "cual es la esencia de lognext",
        "que papel tiene lognext en el sector tecnologico",
        "que es esta empresa",
        "a que se orienta lognext",
        "perfil de lognext como compania",
        "identidad de lognext",
        "esencia de lognext",
        "what is lognext",
        "about lognext",
        "who is lognext",
        "what type of company is lognext",
        "lognext identity",
        "qui est lognext",
        "qu est ce que lognext",
        "a propos de lognext",
        "identite de lognext"
      ],
      terms: ["lognext", "empresa", "compania", "consultora", "organizacion", "firma", "entidad", "identidad", "esencia", "representa", "company", "identity", "entreprise", "identite"]
    },
    {
      key: "actividad",
      words: [
        "a que se dedica lognext",
        "que hace lognext",
        "cual es la actividad de lognext",
        "actividad de lognext",
        "que ofrece lognext",
        "que ofreceis",
        "que tipo de soluciones desarrolla lognext",
        "que soluciones desarrolla lognext",
        "soluciones desarrolla lognext",
        "cual es el negocio de lognext",
        "negocio de lognext",
        "en que trabaja lognext",
        "cual es la especialidad de lognext",
        "especialidad de lognext",
        "que aporta lognext a sus clientes",
        "que valor aporta lognext",
        "cual es el proposito de lognext",
        "proposito de lognext",
        "cual es la vocacion de lognext",
        "cual es la vocacion exacta de lognext",
        "vocacion de lognext",
        "actividad principal de lognext",
        "a que os dedicais",
        "que haceis en lognext",
        "que desarrollais",
        "que soluciones ofreceis",
        "soluciones de negocio",
        "soluciones tecnologicas",
        "tecnologia e innovacion",
        "innovacion tecnologica",
        "what does lognext do",
        "what do you do",
        "what does lognext offer",
        "what solutions does lognext develop",
        "what is lognext business",
        "what is lognext specialty",
        "what value does lognext bring",
        "what is lognext purpose",
        "lognext purpose",
        "business solutions",
        "technology and innovation",
        "que fait lognext",
        "que faites vous",
        "que propose lognext",
        "quelles solutions developpe lognext",
        "quelle est l activite de lognext",
        "quel est le metier de lognext",
        "quelle est la specialite de lognext",
        "quelle valeur apporte lognext",
        "quel est le but de lognext",
        "vocation de lognext",
        "solutions metier",
        "technologie et innovation"
      ],
      terms: [
        "lognext",
        "dedica",
        "hace",
        "actividad",
        "ofrece",
        "soluciones",
        "desarrolla",
        "negocio",
        "trabaja",
        "especialidad",
        "aporta",
        "clientes",
        "proposito",
        "vocacion",
        "tecnologia",
        "innovacion",
        "offer",
        "develop",
        "business",
        "solutions",
        "specialty",
        "purpose",
        "technology",
        "innovation",
        "activite",
        "metier",
        "propose",
        "developpe",
        "specialite",
        "valeur",
        "technologie"
      ],
      groups: [
        ["dedica", "hace", "actividad", "ofrece", "desarrolla", "negocio", "trabaja", "especialidad", "aporta", "proposito", "vocacion"],
        ["lognext", "soluciones", "tecnologia", "innovacion", "clientes", "negocio"],
        ["offer", "develop", "business", "solutions", "specialty", "purpose", "technology", "innovation"],
        ["activite", "metier", "propose", "developpe", "solutions", "specialite", "valeur", "technologie", "innovation"]
      ],
      phraseBoost: 6
    },
    {
      key: "propuestaValor",
      words: [
        "que diferencia a lognext",
        "que os diferencia",
        "que os diferencia de otras consultoras",
        "otras consultoras",
        "cual es vuestra propuesta de valor",
        "propuesta de valor",
        "por que elegir lognext",
        "que os hace diferentes",
        "ventaja competitiva",
        "que valor aportais",
        "por que trabajar con lognext",
        "que tiene lognext que no tengan otros",
        "destacais frente a la competencia",
        "factor diferencial",
        "que os hace especiales",
        "por que contratar a lognext",
        "que beneficios aporta lognext",
        "valor anadido",
        "por que confiar en lognext",
        "diferenciacion",
        "what makes lognext different",
        "why choose lognext",
        "value proposition",
        "competitive advantage",
        "added value",
        "pourquoi choisir lognext",
        "proposition de valeur",
        "avantage competitif",
        "valeur ajoutee"
      ],
      terms: ["diferencia", "diferenciacion", "valor", "ventaja", "competitiva", "beneficios", "especiales", "confiar", "solvencia", "value", "different", "advantage", "valeur", "avantage"],
      groups: [
        ["diferencia", "valor", "ventaja", "beneficios", "especiales", "confiar"],
        ["lognext", "consultora", "competencia", "cliente"]
      ]
    },
    {
      key: "clientesSectores",
      words: [
        "para que tipo de clientes trabajais",
        "con que empresas trabajais",
        "a que sectores ayudais",
        "quien puede contratar a lognext",
        "tipo de organizaciones son vuestros clientes",
        "trabajais con administraciones publicas",
        "trabajais con grandes empresas",
        "a quien van dirigidos vuestros servicios",
        "perfil de cliente",
        "para quien trabaja lognext",
        "a que mercado se dirige lognext",
        "que tipo de cliente encaja con lognext",
        "que empresas pueden necesitar lognext",
        "clientes",
        "sectores",
        "administraciones publicas",
        "organizations",
        "clients",
        "sectors",
        "public administrations",
        "clients",
        "secteurs",
        "administrations publiques"
      ],
      terms: ["clientes", "empresas", "organizaciones", "sectores", "administraciones", "mercado", "cliente", "clients", "organizations", "sectors", "secteurs"]
    },
    {
      key: "innovacionTransformacion",
      words: [
        "como aplica lognext la innovacion",
        "papel tiene la innovacion",
        "transformacion digital",
        "como ayudais en la transformacion digital",
        "que tecnologias utilizais",
        "como impulsa lognext la digitalizacion",
        "que significa innovacion para lognext",
        "como modernizais procesos",
        "soluciones innovadoras",
        "evolucionar tecnologicamente",
        "transformar empresas",
        "papel tiene la tecnologia",
        "mejorar procesos",
        "transformacion tecnologica",
        "digitalizacion",
        "modernizacion",
        "innovation",
        "digital transformation",
        "modernization",
        "technological evolution",
        "innovation",
        "transformation numerique",
        "digitalisation",
        "modernisation"
      ],
      terms: ["innovacion", "tecnologia", "transformacion", "digitalizacion", "modernizacion", "evolucion", "procesos", "eficiencia", "automatizacion", "innovation", "technology", "transformation", "digitalisation"]
    },
    {
      key: "responsable",
      words: [
        "quien es el responsable",
        "quien es el responsable de lognext",
        "quien esta al mando",
        "quien dirige lognext",
        "quien lleva la empresa",
        "quien es el jefe",
        "quien lidera lognext",
        "responsable de lognext",
        "quien es la persona responsable",
        "persona responsable",
        "responsable",
        "encargado",
        "jefe",
        "director",
        "direccion",
        "lider",
        "quien dirige",
        "quien lidera",
        "quien manda",
        "quien esta al mando",
        "who is responsible",
        "who is responsible for lognext",
        "who leads lognext",
        "who runs lognext",
        "who manages lognext",
        "who is in charge",
        "person in charge",
        "responsible person",
        "manager",
        "director",
        "leader",
        "qui est le responsable",
        "qui est responsable de lognext",
        "qui dirige lognext",
        "qui mene lognext",
        "qui est aux commandes",
        "personne responsable",
        "responsable",
        "directeur",
        "direction",
        "leader"
      ],
      terms: [
        "responsable",
        "encargado",
        "jefe",
        "director",
        "direccion",
        "lider",
        "dirige",
        "lidera",
        "manda",
        "mando",
        "responsible",
        "leads",
        "runs",
        "manages",
        "charge",
        "manager",
        "leader",
        "responsable",
        "directeur",
        "direction"
      ],
      groups: [
        ["responsable", "encargado", "jefe", "director", "direccion", "lider", "dirige", "lidera", "manda", "mando"],
        ["lognext", "empresa", "persona"],
        ["responsible", "leads", "runs", "manages", "charge", "manager", "director", "leader"],
        ["responsable", "dirige", "directeur", "direction", "leader"]
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
        "informacion de la empresa",
        "sobre lognext",
        "empresa",
        "consultora",
        "consultora tecnologica",
        "especialidad",
        "especializacion",
        "especializada",
        "que soluciones dais",
        "que podeis hacer",
        "soluciones tecnologicas",
        "empresa tecnologica",
        "transformacion digital",
        "cual es la vocacion exacta de lognext",
        "vocacion de lognext",
        "cual es la mision de lognext",
        "mision de lognext",
        "cual es el proposito de lognext",
        "proposito de lognext",
        "razon de ser de lognext",
        "que busca lognext como empresa",
        "que quiere conseguir lognext",
        "a que se dedica realmente lognext",
        "esencia de lognext",
        "que representa lognext",
        "que aporta lognext a sus clientes",
        "que valor aporta lognext",
        "propuesta de valor de lognext",
        "filosofia de lognext",
        "valores de lognext",
        "actividad principal de lognext",
        "identidad de lognext",
        "naturaleza de lognext",
        "enfoque de lognext",
        "orientacion de lognext",
        "que hay detras de lognext",
        "que define a lognext",
        "razon de ser",
        "mision",
        "proposito",
        "vocacion",
        "esencia",
        "propuesta de valor",
        "filosofia",
        "identidad",
        "naturaleza",
        "enfoque",
        "orientacion",
        "what do you do",
        "what is lognext",
        "what does lognext do",
        "who are you",
        "about lognext",
        "company information",
        "technology consulting",
        "consulting company",
        "what can you do",
        "what solutions do you provide",
        "digital transformation",
        "lognext mission",
        "what is lognext mission",
        "what is lognext purpose",
        "lognext purpose",
        "reason for being",
        "what does lognext stand for",
        "what does lognext represent",
        "what value does lognext bring",
        "value proposition",
        "company purpose",
        "core purpose",
        "company mission",
        "company values",
        "company identity",
        "business focus",
        "what defines lognext",
        "que faites vous",
        "que fait lognext",
        "qui etes vous",
        "qui est lognext",
        "a propos de lognext",
        "entreprise",
        "conseil technologique",
        "que proposez vous",
        "transformation digitale",
        "mission de lognext",
        "quelle est la mission de lognext",
        "quel est le but de lognext",
        "objectif de lognext",
        "raison d etre de lognext",
        "que represente lognext",
        "quelle valeur apporte lognext",
        "proposition de valeur",
        "vocation de lognext",
        "identite de lognext",
        "nature de lognext",
        "approche de lognext",
        "ce qui definit lognext"
      ],
      terms: [
        "lognext",
        "empresa",
        "consultora",
        "especializada",
        "especializacion",
        "vocacion",
        "mision",
        "proposito",
        "razon",
        "esencia",
        "representa",
        "aporta",
        "valor",
        "clientes",
        "conseguir",
        "busca",
        "actividad",
        "filosofia",
        "identidad",
        "naturaleza",
        "enfoque",
        "orientacion",
        "company",
        "consulting",
        "specialized",
        "mission",
        "purpose",
        "value",
        "represent",
        "stand",
        "clients",
        "customers",
        "identity",
        "focus",
        "values",
        "entreprise",
        "conseil",
        "specialisee",
        "vocation",
        "objectif",
        "mission",
        "valeur",
        "represente",
        "identite",
        "approche"
      ],
      groups: [
        ["vocacion", "mision", "proposito", "razon", "esencia", "representa", "aporta", "valor", "conseguir", "busca", "actividad", "filosofia", "identidad", "naturaleza", "enfoque", "orientacion"],
        ["lognext", "empresa", "consultora", "clientes", "soluciones", "tecnologia", "transformacion"],
        ["mission", "purpose", "value", "represent", "stand", "clients", "customers", "company", "identity", "focus", "values"],
        ["vocation", "mission", "objectif", "valeur", "represente", "entreprise", "identite", "approche"]
      ]
    },
    {
      key: "servicios",
      words: [
        "servicio",
        "servicios",
        "vuestros servicios",
        "cuales son vuestros servicios",
        "que servicios ofreceis",
        "que ofrece lognext",
        "que ofreceis",
        "soluciones",
        "areas",
        "cuales son vuestras areas",
        "lineas de negocio",
        "capacidades tiene lognext",
        "que soluciones presta lognext",
        "en que areas trabajais",
        "que especialidades teneis",
        "que puede contratar un cliente",
        "servicios tecnologicos ofreceis",
        "portfolio de servicios",
        "soluciones it",
        "areas tecnologicas",
        "que haceis en tecnologia",
        "departamentos o servicios",
        "catalogo de servicios",
        "servicios tecnologicos",
        "tecnologia",
        "que podeis hacer",
        "services",
        "your services",
        "what services do you offer",
        "what services",
        "what do you offer",
        "solutions",
        "service portfolio",
        "technology services",
        "vos services",
        "quels services proposez vous",
        "services technologiques",
        "portefeuille de services",
        "ams",
        "ims",
        "outsourcing",
        "application management",
        "infrastructure management"
      ],
      terms: ["servicios", "servicio", "soluciones", "areas", "lineas", "negocio", "capacidades", "portfolio", "especialidades", "tecnologicos", "services", "solutions", "portfolio", "ams", "ims", "outsourcing"]
    },
    {
      key: "contactoHumano",
      words: [
        "quiero hablar con una persona",
        "hablar con alguien",
        "hablar con un comercial",
        "hablar con soporte",
        "contactar con una persona",
        "agente humano",
        "persona real",
        "talk to a person",
        "speak to someone",
        "human agent",
        "contact a person",
        "talk to sales",
        "talk to support",
        "parler a une personne",
        "parler a quelqu un",
        "agent humain",
        "contacter une personne",
        "parler au commercial"
      ],
      terms: ["persona", "alguien", "comercial", "soporte", "humano", "person", "someone", "human", "sales", "support", "personne", "quelqu", "commercial"]
    },
    {
      key: "contacto",
      words: [
        "contacto",
        "contactar",
        "como contacto",
        "como contacto con lognext",
        "como contactar con la empresa",
        "como puedo hablar con vosotros",
        "email",
        "correo",
        "telefono",
        "direccion",
        "oficina",
        "ubicacion",
        "donde estais",
        "donde se encuentra lognext",
        "como puedo solicitar informacion",
        "con quien puedo hablar",
        "a quien me dirijo",
        "como puedo enviar una consulta",
        "necesito contactar con lognext",
        "teneis email",
        "teneis telefono",
        "como os puedo escribir",
        "como puedo pedir informacion",
        "donde esta vuestra oficina",
        "donde estais o como puedo contactar",
        "llamar",
        "hablar con vosotros",
        "reunion",
        "comercial",
        "solicitar informacion",
        "contact",
        "contact you",
        "email",
        "phone",
        "call",
        "meeting",
        "sales",
        "request information",
        "vous contacter",
        "courriel",
        "telephone",
        "appel",
        "rendez vous",
        "commercial",
        "demander information"
      ],
      terms: ["contacto", "contactar", "correo", "email", "telefono", "direccion", "oficina", "ubicacion", "consulta", "informacion", "llamar", "reunion", "comercial", "contact", "phone", "call", "meeting", "sales", "courriel", "telephone", "appel"]
    },
    {
      key: "saludo",
      words: [
        "hola",
        "buenas",
        "buenos dias",
        "buenas tardes",
        "buenas noches",
        "que tal",
        "como estas",
        "hola buenas",
        "hey",
        "buenas que tal",
        "hello",
        "hi",
        "good morning",
        "good afternoon",
        "good evening",
        "how are you",
        "how are you doing",
        "bonjour",
        "salut",
        "bonsoir",
        "coucou",
        "comment ca va",
        "ca va"
      ],
      terms: ["hola", "buenas", "hello", "hi", "hey", "bonjour", "salut", "bonsoir", "coucou"]
    },
    {
      key: "agradecimiento",
      words: [
        "gracias",
        "muchas gracias",
        "perfecto",
        "vale gracias",
        "adios",
        "hasta luego",
        "nos vemos",
        "thanks",
        "thank you",
        "perfect",
        "bye",
        "goodbye",
        "see you",
        "merci",
        "merci beaucoup",
        "parfait",
        "au revoir",
        "a bientot"
      ],
      terms: ["gracias", "perfecto", "adios", "thanks", "perfect", "bye", "goodbye", "merci", "parfait"]
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

  function countGroupMatches(normalizedText, group) {
    return group.reduce((total, term) => total + (matchesKeyword(normalizedText, term) ? 1 : 0), 0);
  }

  function scoreIntent(normalizedText, intent) {
    let score = 0;

    intent.words.forEach((word) => {
      if (matchesKeyword(normalizedText, word)) {
        score += normalize(word).includes(" ") ? EXACT_PHRASE_SCORE : KEYWORD_SCORE;
      }
    });

    if (intent.terms) {
      intent.terms.forEach((term) => {
        if (matchesKeyword(normalizedText, term)) {
          score += SUPPORT_TERM_SCORE;
        }
      });
    }

    if (intent.groups) {
      intent.groups.forEach((group) => {
        const matches = countGroupMatches(normalizedText, group);
        if (matches >= 2) {
          score += GROUP_MATCH_SCORE + matches;
        }
      });
    }

    if (intent.phraseBoost && score >= EXACT_PHRASE_SCORE) {
      score += intent.phraseBoost;
    }

    return score;
  }

  function buildResponseLink(intentKey) {
    const link = responseLinks[intentKey];
    if (!link) return "";

    const lang = getLang();
    const label = link.label[lang] || link.label.es;
    return `<a class="lognext-chatbot__response-cta" href="${link.href}">${label}</a>`;
  }

  function buildBotResponse(intent, langCopy) {
    const response = langCopy.responses[intent.key];
    const responseLink = buildResponseLink(intent.key);
    return responseLink ? `${response}${responseLink}` : response;
  }

  function getIntentScores(normalizedText) {
    return intents.map((intent, priority) => ({
      key: intent.key,
      priority,
      score: scoreIntent(normalizedText, intent)
    }));
  }

  function logIntentDebug(originalText, normalizedText, intent, scores) {
    if (!CHATBOT_DEBUG) return;

    console.info("[LogNext chatbot intent]", {
      originalText,
      normalizedText,
      detectedIntent: intent ? intent.key : null,
      scores: scores.reduce((result, item) => {
        result[item.key] = item.score;
        return result;
      }, {}),
      activeLanguage: getLang()
    });
  }

  function findIntent(text) {
    const normalized = normalize(text);
    const scores = getIntentScores(normalized);
    let bestIntent = null;
    let bestScore = 0;
    let bestPriority = Number.POSITIVE_INFINITY;

    scores.forEach((item) => {
      if (item.score > bestScore || (item.score === bestScore && item.priority < bestPriority)) {
        bestScore = item.score;
        bestPriority = item.priority;
        bestIntent = intents[item.priority];
      }
    });

    const detectedIntent = bestScore >= MIN_INTENT_SCORE ? bestIntent : null;
    logIntentDebug(text, normalized, detectedIntent, scores);
    return detectedIntent;
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
    let pendingTyping = null;

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    function addBotMessage(text) {
      messages.appendChild(createMessage(text, "bot"));
      scrollToBottom();
    }

    function finishPendingTyping() {
      if (!pendingTyping) return;

      window.clearTimeout(pendingTyping.timer);
      pendingTyping.element.classList.remove("lognext-chatbot__message--typing");
      pendingTyping.element.innerHTML = pendingTyping.response;
      pendingTyping = null;
      scrollToBottom();
    }

    function addTypingMessage(response) {
      finishPendingTyping();

      const langCopy = copy[getLang()];
      const message = createMessage(langCopy.typing, "bot");
      message.classList.add("lognext-chatbot__message--typing");
      messages.appendChild(message);
      scrollToBottom();

      pendingTyping = {
        element: message,
        response,
        timer: window.setTimeout(() => {
          message.classList.remove("lognext-chatbot__message--typing");
          message.innerHTML = response;
          pendingTyping = null;
          scrollToBottom();
        }, 500)
      };
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
      addTypingMessage(intent ? buildBotResponse(intent, langCopy) : langCopy.fallback);
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
