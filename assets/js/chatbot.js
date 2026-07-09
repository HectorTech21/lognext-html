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
      fallback: `No estoy seguro de haber entendido exactamente tu pregunta. Puedes preguntarme por servicios, certificaciones, empleo o contacto.`,
      empty: "Escribe una pregunta para que pueda ayudarte.",
      responses: {
        empresa: `LogNext es una consultora tecnológica especializada en acompañar a organizaciones en sus procesos de transformación digital, ofreciendo servicios de consultoría IT, ciberseguridad, inteligencia artificial, gestión de aplicaciones, infraestructuras y outsourcing tecnológico.`,
        servicios: `LogNext ofrece servicios tecnológicos para ayudar a las organizaciones a transformar, operar y proteger sus entornos IT: inteligencia artificial, ciberseguridad, AMS, IMS, outsourcing, consultoría tecnológica, automatización, soporte IT y gobierno IT.`,
        orientacionServicios: `Depende de tu necesidad. Si buscas proteger información, encajaría Ciberseguridad; si necesitas mantener aplicaciones, AMS; si el problema está en sistemas o infraestructuras, IMS; si quieres automatizar o analizar datos, IA; y si necesitas talento especializado, Outsourcing.`,
        ciberseguridad: `LogNext ayuda a reforzar la ciberseguridad mediante protección de sistemas, seguridad de la información, gestión de riesgos, cumplimiento normativo, auditorías, ENS, ISO 27001, concienciación y respuesta ante incidentes. Es especialmente útil para organizaciones que necesitan proteger información crítica.`,
        ia: `LogNext aplica inteligencia artificial a la empresa para automatizar procesos, aprovechar mejor los datos, mejorar la eficiencia operativa y crear soluciones que ayuden a tomar mejores decisiones de negocio. Encaja con empresas que quieren automatizar, analizar datos o mejorar procesos.`,
        empleo: `Puedes consultar la sección "Trabaja con nosotros" para conocer oportunidades profesionales en LogNext. Buscamos talento tecnológico con ganas de crecer en proyectos innovadores y entornos colaborativos.`,
        contacto: `Puedes contactar con LogNext desde la sección de Contacto. El equipo revisará tu solicitud para ayudarte con la solución tecnológica que mejor encaje con tu organización.`,
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
        portal: `Si formas parte de LogNext, puedes acceder desde el <a href="https://w3.cezanneondemand.com/CezanneOnDemand/-/LOGNEXT/Account/LogIn?ReturnUrl=%7E%2F-%2FLOGNEXT" target="_blank" rel="noopener noreferrer">Portal del empleado</a>. Si tienes problemas de acceso, contacta con tu responsable o con el departamento correspondiente.`,
        navegacion: `Puedo orientarte por la web: <a href="${rootPrefix}index.html">Inicio</a>, <a href="${rootPrefix}index.html#servicios">Servicios</a>, <a href="${rootPrefix}quienes-somos.html">Quiénes somos</a>, <a href="${rootPrefix}trabaja-con-nosotros.html">Trabaja con nosotros</a>, <a href="mailto:info@lognext.com">Contacto</a>, <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Aviso legal</a>, <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Política de cookies</a> y <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Canal de denuncias</a>.`,
        actividad: `En LogNext desarrollamos soluciones de negocio basadas en la tecnología y en la innovación. Ayudamos a nuestros clientes a transformar sus procesos, mejorar su eficiencia y avanzar con soluciones IT adaptadas a sus necesidades.`,
        quienesSomos: `LogNext es una compañía especializada en soluciones y servicios IT. Acompañamos a nuestros clientes en sus procesos de transformación tecnológica, combinando experiencia, innovación y talento especializado para responder a sus necesidades de negocio.`,
        propuestaValor: `Lo que diferencia a LogNext es la combinación de conocimiento tecnológico, cercanía con el cliente, flexibilidad y capacidad para adaptar cada solución a las necesidades reales del negocio. Trabajamos con un enfoque práctico, especializado y orientado a resultados.`,
        certificaciones: `Sí. LogNext cuenta con <a href="${rootPrefix}assets/certificaciones/iso9001.pdf" target="_blank" rel="noopener noreferrer">ISO 9001</a> para calidad, <a href="${rootPrefix}assets/certificaciones/iso14001.pdf" target="_blank" rel="noopener noreferrer">ISO 14001</a> para gestión ambiental, <a href="${rootPrefix}assets/certificaciones/iso20000.pdf" target="_blank" rel="noopener noreferrer">ISO 20000</a> para gestión de servicios IT, <a href="${rootPrefix}assets/certificaciones/iso27001.pdf" target="_blank" rel="noopener noreferrer">ISO 27001</a> para seguridad de la información y <a href="${rootPrefix}assets/certificaciones/CertificadoENS-2025-0095_ES_2026-07-07.pdf" target="_blank" rel="noopener noreferrer">ENS Alto</a> para seguridad y cumplimiento en servicios digitales.`,
        certificacionesEns: `Sí. LogNext cuenta con certificación ENS Alto, el nivel más exigente dentro del Esquema Nacional de Seguridad. Esta certificación refuerza la confianza de clientes, administraciones públicas y colaboradores, demostrando un alto compromiso con la seguridad, la protección de la información y el cumplimiento normativo.`,
        sectorPublico: `Sí. LogNext puede acompañar tanto a Administraciones Públicas como a empresas privadas en proyectos tecnológicos, transformación digital, ciberseguridad, gestión de aplicaciones, infraestructuras, inteligencia artificial y outsourcing IT. Además, contar con ENS Alto refuerza la confianza en proyectos donde la seguridad y el cumplimiento normativo son especialmente importantes.`,
        responsable: `El responsable de LogNext es Patrick Pariente.`,
        clientesSectores: `LogNext puede aportar valor a organizaciones públicas y privadas que necesiten apoyo tecnológico en áreas como transformación digital, ciberseguridad, gestión de aplicaciones, infraestructuras, inteligencia artificial y outsourcing IT. Sus servicios se adaptan a las necesidades de cada organización.`,
        casosExito: `Puedes encontrar casos de éxito dentro de las páginas de servicios de LogNext. Sirven para ver ejemplos de aplicación práctica por área, como inteligencia artificial, ciberseguridad, AMS, IMS u outsourcing.`,
        innovacionTransformacion: `En LogNext entendemos la innovación como una forma de aportar valor real al negocio. Aplicamos la tecnología para mejorar procesos, optimizar servicios y ayudar a nuestros clientes a evolucionar de forma eficiente, segura y sostenible.`,
        ams: `AMS ayuda a gestionar, mantener, soportar y evolucionar aplicaciones de negocio. Es útil para empresas con aplicaciones en producción que requieren continuidad, mantenimiento, eficiencia, evolución y soporte especializado.`,
        ims: `IMS se centra en la gestión, operación y soporte de infraestructuras y servicios tecnológicos. Aporta estabilidad, seguridad, disponibilidad y soporte a organizaciones con entornos IT críticos.`,
        agile: `Actualmente no tengo información sobre Agile Transformation como servicio activo de LogNext. Puedes consultar la sección de Servicios o contactar con LogNext para confirmar qué soluciones están disponibles.`,
        outsourcing: `El Outsourcing IT permite incorporar talento tecnológico especializado para reforzar equipos, cubrir necesidades concretas y ganar flexibilidad. Encaja con compañías que necesitan sumar perfiles IT cualificados de forma flexible.`,
        consultoriaIt: `La consultoría tecnológica de LogNext ayuda a identificar necesidades, definir soluciones IT y orientar decisiones tecnológicas con una visión práctica, segura y alineada con el negocio.`,
        desarrolloAplicaciones: `LogNext puede ayudar en el desarrollo, mantenimiento y evolución de aplicaciones, buscando continuidad, calidad, eficiencia y adaptación a las necesidades reales de cada organización.`,
        automatizacionProcesos: `La automatización de procesos permite reducir tareas manuales, mejorar tiempos de respuesta y ganar eficiencia operativa. LogNext la aborda combinando tecnología, datos e integración con procesos de negocio.`,
        soporteIt: `El soporte IT ayuda a mantener servicios tecnológicos operativos, estables y disponibles. LogNext orienta este tipo de servicio a continuidad, eficiencia y resolución rápida de incidencias.`,
        gobiernoIt: `El gobierno IT ayuda a ordenar, priorizar y controlar los servicios tecnológicos para que estén alineados con la estrategia, los riesgos, la seguridad y las necesidades del negocio.`
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
      fallback: `I am not completely sure I understood your question. You can ask me about services, certifications, careers or contact.`,
      empty: "Type a question so I can help you.",
      responses: {
        empresa: `LogNext is a technology consulting company specialized in supporting organizations through digital transformation, offering IT consulting, cybersecurity, artificial intelligence, application management, infrastructure services and technology outsourcing.`,
        servicios: `LogNext offers technology services to help organizations transform, operate and protect their IT environments: artificial intelligence, cybersecurity, AMS, IMS, outsourcing, technology consulting, automation, IT support and IT governance.`,
        orientacionServicios: `It depends on your need. If you want to protect information, Cybersecurity would fit; if you need to maintain applications, AMS; if the issue is systems or infrastructure, IMS; if you want to automate or analyze data, AI; and if you need specialized talent, Outsourcing.`,
        ciberseguridad: `LogNext helps strengthen cybersecurity through system protection, information security, risk management, compliance, audits, ENS, ISO 27001, security awareness and incident response. It is especially useful for organizations that need to protect critical information.`,
        ia: `LogNext applies artificial intelligence to business contexts to automate processes, make better use of data, improve operational efficiency and create solutions that support better decision-making. It fits companies that want to automate, analyze data or improve processes.`,
        empleo: `You can visit the "Work with us" section to learn about professional opportunities at LogNext. We look for technology talent eager to grow in innovative projects and collaborative environments.`,
        contacto: `You can contact LogNext through the Contact section. The team will review your request to help you find the technology solution that best fits your organization.`,
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
        portal: `If you are part of LogNext, you can access the <a href="https://w3.cezanneondemand.com/CezanneOnDemand/-/LOGNEXT/Account/LogIn?ReturnUrl=%7E%2F-%2FLOGNEXT" target="_blank" rel="noopener noreferrer">Employee Portal</a>. If you have access issues, please contact your manager or the relevant department.`,
        navegacion: `I can guide you through the website: <a href="${rootPrefix}index.html">Home</a>, <a href="${rootPrefix}index.html#servicios">Services</a>, <a href="${rootPrefix}quienes-somos.html">About us</a>, <a href="${rootPrefix}trabaja-con-nosotros.html">Work with us</a>, <a href="mailto:info@lognext.com">Contact</a>, <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Legal notice</a>, <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Cookie policy</a> and <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Whistleblowing channel</a>.`,
        actividad: `At LogNext, we develop business solutions based on technology and innovation. We help our clients transform their processes, improve efficiency and move forward with IT solutions adapted to their needs.`,
        quienesSomos: `LogNext is a company specialized in IT solutions and services. We support our clients in their technology transformation processes, combining experience, innovation and specialized talent to respond to their business needs.`,
        propuestaValor: `What differentiates LogNext is the combination of technological knowledge, proximity to the client, flexibility and the ability to adapt each solution to real business needs. We work with a practical, specialized and results-oriented approach.`,
        certificaciones: `Yes. LogNext holds <a href="${rootPrefix}assets/certificaciones/iso9001.pdf" target="_blank" rel="noopener noreferrer">ISO 9001</a> for quality, <a href="${rootPrefix}assets/certificaciones/iso14001.pdf" target="_blank" rel="noopener noreferrer">ISO 14001</a> for environmental management, <a href="${rootPrefix}assets/certificaciones/iso20000.pdf" target="_blank" rel="noopener noreferrer">ISO 20000</a> for IT service management, <a href="${rootPrefix}assets/certificaciones/iso27001.pdf" target="_blank" rel="noopener noreferrer">ISO 27001</a> for information security and <a href="${rootPrefix}assets/certificaciones/CertificadoENS-2025-0095_ES_2026-07-07.pdf" target="_blank" rel="noopener noreferrer">ENS Alto</a> for security and compliance in digital services.`,
        certificacionesEns: `Yes. LogNext holds ENS Alto certification, the most demanding level within Spain's National Security Framework. This certification strengthens trust among clients, public administrations and partners, demonstrating a strong commitment to security, information protection and compliance.`,
        sectorPublico: `Yes. LogNext can support both public administrations and private companies in technology projects, digital transformation, cybersecurity, application management, infrastructure services, artificial intelligence and IT outsourcing. In addition, having the High ENS certification strengthens trust in projects where security and regulatory compliance are especially important.`,
        responsable: `The person responsible for LogNext is Patrick Pariente.`,
        clientesSectores: `LogNext can bring value to public and private organizations that need technology support in areas such as digital transformation, cybersecurity, application management, infrastructure, artificial intelligence and IT outsourcing. Its services adapt to each organization's needs.`,
        casosExito: `You can find success cases within LogNext's service pages. They show practical examples by area, such as artificial intelligence, cybersecurity, AMS, IMS or outsourcing.`,
        innovacionTransformacion: `At LogNext, we understand innovation as a way to bring real value to the business. We apply technology to improve processes, optimize services and help our clients evolve efficiently, securely and sustainably.`,
        ams: `AMS helps manage, maintain, support and evolve business applications. It is useful for companies with production applications that require continuity, maintenance, efficiency, evolution and specialized support.`,
        ims: `IMS focuses on managing, operating and supporting infrastructure and technology services. It brings stability, security, availability and support to organizations with critical IT environments.`,
        agile: `I currently do not have information about Agile Transformation as an active LogNext service. You can check the Services section or contact LogNext to confirm which solutions are available.`,
        outsourcing: `IT Outsourcing helps organizations incorporate specialized technology talent, reinforce teams, cover specific needs and gain flexibility. It fits companies that need to add qualified IT profiles quickly.`,
        consultoriaIt: `LogNext's technology consulting helps identify needs, define IT solutions and guide technology decisions with a practical, secure and business-aligned approach.`,
        desarrolloAplicaciones: `LogNext can support application development, maintenance and evolution, focusing on continuity, quality, efficiency and adaptation to each organization's needs.`,
        automatizacionProcesos: `Process automation reduces manual work, improves response times and increases operational efficiency. LogNext approaches it through technology, data and integration with business processes.`,
        soporteIt: `IT support helps keep technology services operational, stable and available. LogNext focuses this type of service on continuity, efficiency and fast incident resolution.`,
        gobiernoIt: `IT governance helps organize, prioritize and control technology services so they stay aligned with strategy, risks, security and business needs.`
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
      fallback: `Je ne suis pas certain d'avoir compris votre question. Vous pouvez me poser des questions sur les services, les certifications, les carrières ou le contact.`,
      empty: "Écrivez une question afin que je puisse vous aider.",
      responses: {
        empresa: `LogNext est une société de conseil technologique spécialisée dans l'accompagnement des organisations dans leur transformation numérique, avec des services de conseil IT, cybersécurité, intelligence artificielle, gestion d'applications, infrastructures et outsourcing technologique.`,
        servicios: `LogNext propose des services technologiques pour aider les organisations à transformer, opérer et protéger leurs environnements IT : intelligence artificielle, cybersécurité, AMS, IMS, outsourcing, conseil technologique, automatisation, support IT et gouvernance IT.`,
        orientacionServicios: `Cela dépend de votre besoin. Si vous souhaitez protéger l'information, la Cybersécurité est adaptée ; si vous devez maintenir des applications, AMS ; si le problème concerne les systèmes ou infrastructures, IMS ; si vous voulez automatiser ou analyser des données, l'IA ; et si vous avez besoin de talents spécialisés, l'Outsourcing.`,
        ciberseguridad: `LogNext aide à renforcer la cybersécurité grâce à la protection des systèmes, la sécurité de l'information, la gestion des risques, la conformité, les audits, l'ENS, ISO 27001, la sensibilisation et la réponse aux incidents. C'est particulièrement utile pour les organisations qui doivent protéger des informations critiques.`,
        ia: `LogNext applique l'intelligence artificielle à l'entreprise pour automatiser les processus, mieux exploiter les données, améliorer l'efficacité opérationnelle et créer des solutions utiles à la prise de décision. Cela convient aux entreprises qui veulent automatiser, analyser des données ou améliorer leurs processus.`,
        empleo: `Vous pouvez consulter la section "Travailler avec nous" pour connaître les opportunités professionnelles chez LogNext. Nous recherchons des talents technologiques souhaitant évoluer dans des projets innovants et des environnements collaboratifs.`,
        contacto: `Vous pouvez contacter LogNext via la section Contact. L'équipe examinera votre demande afin de vous aider avec la solution technologique la mieux adaptée à votre organisation.`,
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
        portal: `Si vous faites partie de LogNext, vous pouvez accéder au <a href="https://w3.cezanneondemand.com/CezanneOnDemand/-/LOGNEXT/Account/LogIn?ReturnUrl=%7E%2F-%2FLOGNEXT" target="_blank" rel="noopener noreferrer">Portail employé</a>. En cas de problème d'accès, contactez votre responsable ou le département correspondant.`,
        navegacion: `Je peux vous orienter sur le site : <a href="${rootPrefix}index.html">Accueil</a>, <a href="${rootPrefix}index.html#servicios">Services</a>, <a href="${rootPrefix}quienes-somos.html">Qui sommes-nous</a>, <a href="${rootPrefix}trabaja-con-nosotros.html">Travailler avec nous</a>, <a href="mailto:info@lognext.com">Contact</a>, <a href="${rootPrefix}enlaces-legales/aviso-legal.html">Mentions légales</a>, <a href="${rootPrefix}enlaces-legales/politica-cookies.html">Politique de cookies</a> et <a href="${rootPrefix}enlaces-legales/canal-denuncias.html">Canal de signalement</a>.`,
        actividad: `Chez LogNext, nous développons des solutions métier fondées sur la technologie et l'innovation. Nous aidons nos clients à transformer leurs processus, améliorer leur efficacité et avancer avec des solutions IT adaptées à leurs besoins.`,
        quienesSomos: `LogNext est une entreprise spécialisée dans les solutions et services IT. Nous accompagnons nos clients dans leurs processus de transformation technologique en combinant expérience, innovation et talent spécialisé pour répondre à leurs besoins métier.`,
        propuestaValor: `Ce qui différencie LogNext, c'est la combinaison de connaissances technologiques, de proximité avec le client, de flexibilité et de capacité à adapter chaque solution aux besoins réels du métier. Nous travaillons avec une approche pratique, spécialisée et orientée résultats.`,
        certificaciones: `Oui. LogNext dispose d'<a href="${rootPrefix}assets/certificaciones/iso9001.pdf" target="_blank" rel="noopener noreferrer">ISO 9001</a> pour la qualité, <a href="${rootPrefix}assets/certificaciones/iso14001.pdf" target="_blank" rel="noopener noreferrer">ISO 14001</a> pour la gestion environnementale, <a href="${rootPrefix}assets/certificaciones/iso20000.pdf" target="_blank" rel="noopener noreferrer">ISO 20000</a> pour la gestion des services IT, <a href="${rootPrefix}assets/certificaciones/iso27001.pdf" target="_blank" rel="noopener noreferrer">ISO 27001</a> pour la sécurité de l'information et <a href="${rootPrefix}assets/certificaciones/CertificadoENS-2025-0095_ES_2026-07-07.pdf" target="_blank" rel="noopener noreferrer">ENS Alto</a> pour la sécurité et la conformité des services numériques.`,
        certificacionesEns: `Oui. LogNext dispose de la certification ENS Alto, le niveau le plus exigeant du Schéma National de Sécurité espagnol. Cette certification renforce la confiance des clients, administrations publiques et partenaires, en démontrant un engagement élevé envers la sécurité, la protection de l'information et la conformité.`,
        sectorPublico: `Oui. LogNext peut accompagner les administrations publiques ainsi que les entreprises privées dans des projets technologiques, de transformation digitale, de cybersécurité, de gestion applicative, d'infrastructures, d'intelligence artificielle et d'outsourcing IT. De plus, la certification ENS Alto renforce la confiance dans les projets où la sécurité et la conformité sont essentielles.`,
        responsable: `Le responsable de LogNext est Patrick Pariente.`,
        clientesSectores: `LogNext peut apporter de la valeur aux organisations publiques et privées qui ont besoin d'un accompagnement technologique en transformation numérique, cybersécurité, gestion applicative, infrastructures, intelligence artificielle et outsourcing IT. Ses services s'adaptent aux besoins de chaque organisation.`,
        casosExito: `Vous pouvez trouver des cas de réussite dans les pages de services de LogNext. Ils présentent des exemples pratiques par domaine, comme l'intelligence artificielle, la cybersécurité, AMS, IMS ou l'outsourcing.`,
        innovacionTransformacion: `Chez LogNext, nous considérons l'innovation comme une manière d'apporter une valeur réelle au métier. Nous appliquons la technologie pour améliorer les processus, optimiser les services et aider nos clients à évoluer de façon efficace, sûre et durable.`,
        ams: `AMS aide à gérer, maintenir, supporter et faire évoluer les applications métier. Ce service est utile aux entreprises avec des applications en production qui nécessitent continuité, maintenance, efficacité, évolution et support spécialisé.`,
        ims: `IMS se concentre sur la gestion, l'exploitation et le support des infrastructures et services technologiques. Il apporte stabilité, sécurité, disponibilité et support aux organisations avec des environnements IT critiques.`,
        agile: `Je n'ai actuellement pas d'information indiquant qu'Agile Transformation soit un service actif de LogNext. Vous pouvez consulter la section Services ou contacter LogNext pour confirmer les solutions disponibles.`,
        outsourcing: `L'Outsourcing IT permet d'intégrer des talents technologiques spécialisés, de renforcer les équipes, de couvrir des besoins spécifiques et de gagner en flexibilité. Cela convient aux entreprises qui doivent intégrer rapidement des profils IT qualifiés.`,
        consultoriaIt: `Le conseil technologique de LogNext aide à identifier les besoins, définir des solutions IT et orienter les décisions technologiques avec une approche pratique, sûre et alignée sur le métier.`,
        desarrolloAplicaciones: `LogNext peut accompagner le développement, la maintenance et l'évolution d'applications, avec une attention portée à la continuité, la qualité, l'efficacité et l'adaptation aux besoins de chaque organisation.`,
        automatizacionProcesos: `L'automatisation des processus réduit les tâches manuelles, améliore les temps de réponse et renforce l'efficacité opérationnelle. LogNext l'aborde avec la technologie, les données et l'intégration aux processus métier.`,
        soporteIt: `Le support IT aide à maintenir les services technologiques opérationnels, stables et disponibles. LogNext l'oriente vers la continuité, l'efficacité et la résolution rapide des incidents.`,
        gobiernoIt: `La gouvernance IT aide à organiser, prioriser et contrôler les services technologiques afin qu'ils restent alignés avec la stratégie, les risques, la sécurité et les besoins métier.`
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
    consultoriaIt: {
      href: `${rootPrefix}index.html#servicios`,
      label: { es: "Ver servicios", en: "View services", fr: "Voir les services" }
    },
    desarrolloAplicaciones: {
      href: `${rootPrefix}servicios/ams.html`,
      label: { es: "Ver AMS", en: "View AMS", fr: "Voir AMS" }
    },
    automatizacionProcesos: {
      href: `${rootPrefix}servicios/ia.html`,
      label: { es: "Ver Inteligencia Artificial", en: "View Artificial Intelligence", fr: "Voir Intelligence Artificielle" }
    },
    soporteIt: {
      href: `${rootPrefix}servicios/ims.html`,
      label: { es: "Ver IMS", en: "View IMS", fr: "Voir IMS" }
    },
    gobiernoIt: {
      href: `${rootPrefix}index.html#servicios`,
      label: { es: "Ver servicios", en: "View services", fr: "Voir les services" }
    },
    orientacionServicios: {
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
    sectorPublico: {
      href: `${rootPrefix}quienes-somos.html`,
      label: { es: "Conocer más sobre LogNext", en: "Learn more about LogNext", fr: "En savoir plus sur LogNext" }
    },
    clientesSectores: {
      href: `${rootPrefix}quienes-somos.html`,
      label: { es: "Conocer más sobre LogNext", en: "Learn more about LogNext", fr: "En savoir plus sur LogNext" }
    },
    casosExito: {
      href: `${rootPrefix}index.html#servicios`,
      label: { es: "Ver servicios", en: "View services", fr: "Voir les services" }
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
        "politica cookies",
        "configurar cookies",
        "aceptar cookies",
        "rechazar cookies",
        "cookies rechazar",
        "gestion de cookies",
        "preferencias de cookies",
        "consentimiento de cookies",
        "cookie policy",
        "manage cookies",
        "accept cookies",
        "reject cookies",
        "cookie settings",
        "cookie consent",
        "politique de cookies",
        "politique des cookies",
        "gerer cookies",
        "gerer les cookies",
        "accepter cookies",
        "refuser cookies",
        "parametres des cookies"
      ],
      terms: ["cookies", "cookie", "consentimiento", "consent", "consentement"]
    },
    {
      key: "canal",
      words: [
        "canal de denuncias",
        "canal denuncias",
        "denuncia",
        "denuncias",
        "denunciar",
        "comunicar irregularidad",
        "informar incidencia",
        "comportamiento irregular",
        "irregularidad",
        "canal etico",
        "comunicar incidencia",
        "reportar incidencia",
        "quiero denunciar",
        "whistleblowing",
        "whistleblowing channel",
        "report channel",
        "complaint",
        "report an issue",
        "irregularity",
        "ethics channel",
        "report irregularity",
        "canal de signalement",
        "signalement",
        "denonciation",
        "signaler",
        "irregularite",
        "canal ethique",
        "signaler une irregularite"
      ],
      terms: ["denuncia", "irregularidad", "incidencia", "whistleblowing", "complaint", "signalement", "denonciation"]
    },
    {
      key: "privacidad",
      words: [
        "privacidad",
        "privacidad datos",
        "politica de privacidad",
        "proteccion de datos",
        "datos personales",
        "rgpd",
        "tratamiento de datos",
        "derechos rgpd",
        "uso de datos personales",
        "como tratais mis datos",
        "responsable legal",
        "responsable del tratamiento",
        "responsable de tratamiento",
        "delegado de proteccion de datos",
        "dpo",
        "privacy",
        "privacy policy",
        "personal data",
        "data protection",
        "gdpr",
        "data processing",
        "confidentialite",
        "politique de confidentialite",
        "donnees personnelles",
        "protection des donnees",
        "traitement des donnees"
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
        "acceso empleado",
        "soy empleado",
        "nominas",
        "nomina",
        "fichaje",
        "vacaciones",
        "intranet",
        "acceso portal",
        "portal interno",
        "no me va el portal",
        "no puedo acceder al portal",
        "problemas de acceso",
        "employee portal",
        "employees",
        "staff access",
        "internal access",
        "employee access",
        "i am an employee",
        "payroll",
        "timesheet",
        "vacations",
        "holiday request",
        "intranet",
        "portail employe",
        "employes",
        "acces interne",
        "acces employe",
        "je suis employe",
        "paie",
        "conges",
        "vacances",
        "intranet"
      ],
      terms: ["portal", "empleado", "nomina", "fichaje", "vacaciones", "intranet", "employee", "staff", "payroll", "timesheet", "portail", "employe", "paie", "conges"]
    },
    {
      key: "navegacion",
      words: [
        "como navegar por la web",
        "donde esta el menu",
        "ir a inicio",
        "volver a inicio",
        "ir a servicios",
        "ir a quienes somos",
        "ir a trabaja con nosotros",
        "ir a contacto",
        "ir a aviso legal",
        "ir a politica de cookies",
        "ir al canal de denuncias",
        "donde esta quienes somos",
        "donde esta trabaja con nosotros",
        "donde esta aviso legal",
        "donde esta politica de cookies",
        "donde esta canal de denuncias",
        "website navigation",
        "go to home",
        "go to services",
        "go to about us",
        "go to work with us",
        "go to contact",
        "go to legal notice",
        "go to cookie policy",
        "go to whistleblowing channel",
        "navigation du site",
        "aller a accueil",
        "aller aux services",
        "aller a qui sommes nous",
        "aller a travailler avec nous",
        "aller au contact",
        "aller aux mentions legales",
        "aller a la politique de cookies",
        "aller au canal de signalement"
      ],
      terms: ["navegar", "menu", "inicio", "web", "navigation", "home", "website", "accueil", "site"]
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
        "oficina madrid",
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
        "necesito presupuesto",
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
        "hay ofertas de empleo",
        "ofertas de empleo",
        "oportunidades laborales",
        "carrera profesional",
        "quiero curro",
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
        "quiero trabajar en lognext",
        "quiero trabajar con vosotros",
        "como puedo trabajar en lognext",
        "teneis ofertas de empleo",
        "puedo enviar mi cv",
        "enviar cv",
        "mandar curriculum",
        "enviar curriculum",
        "como me uno al equipo",
        "buscais gente",
        "buscais talento",
        "teneis practicas",
        "hay practicas",
        "practicas en lognext",
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
        "career opportunities",
        "job offers",
        "vacancies",
        "open positions",
        "work with you",
        "work at lognext",
        "send my cv",
        "send my resume",
        "resume",
        "internship",
        "internships",
        "application",
        "emploi",
        "carrieres",
        "opportunites professionnelles",
        "postes",
        "offres",
        "offres d emploi",
        "travailler chez lognext",
        "candidature",
        "envoyer cv",
        "stage"
      ],
      terms: ["trabajo", "trabajar", "empleo", "vacantes", "puestos", "ofertas", "cv", "curriculum", "practicas", "beca", "talento", "carrera", "laborales", "unirme", "seleccion", "jobs", "careers", "vacancies", "resume", "internship", "application", "emploi", "carrieres", "postes", "offres", "stage"]
    },
    {
      key: "certificacionesEns",
      words: [
        "ens alto",
        "teneis ens",
        "teneis ens alto",
        "lognext tiene ens alto",
        "certificacion ens alto",
        "certificado ens",
        "certificado ens alto",
        "teneis certificado ens",
        "teneis certificacion ens",
        "que significa ens alto",
        "que es ens alto",
        "donde puedo ver el certificado ens",
        "certificado de seguridad ens",
        "certificacion de seguridad ens",
        "esquema nacional de seguridad",
        "que supone tener ens alto",
        "ens",
        "nivel alto ens",
        "cumplimiento ens",
        "national security framework",
        "ens alto certification",
        "do you have ens alto",
        "does lognext have ens alto",
        "what does ens alto mean",
        "high ens certification",
        "ens security certificate",
        "ens certification",
        "certification ens",
        "certification ens alto",
        "avez vous ens alto",
        "lognext a ens alto",
        "que signifie ens alto",
        "certificat ens",
        "certification securite ens"
      ],
      terms: ["ens", "alto", "esquema", "nacional", "certificacion", "certificado", "security", "framework", "certificate", "securite", "certificat"],
      groups: [
        ["ens", "alto", "certificacion", "certificado", "seguridad"],
        ["ens", "alto", "certification", "certified", "security"],
        ["ens", "alto", "certification", "securite", "certifies"]
      ],
      phraseBoost: 8
    },
    {
      key: "sectorPublico",
      words: [
        "trabajais con administracion publica",
        "trabajais con administraciones publicas",
        "os dedicais a trabajar con administracion publica",
        "os dedicais a administracion publica",
        "trabajais para administraciones publicas",
        "trabajais con el sector publico",
        "teneis clientes publicos",
        "haceis proyectos para organismos publicos",
        "trabajais con ayuntamientos",
        "trabajais con ministerios",
        "trabajais con organismos publicos",
        "ofreceis servicios para administracion",
        "consultoria para sector publico",
        "transformacion digital para administraciones",
        "ciberseguridad para administracion publica",
        "servicios para administracion publica",
        "proyectos para administracion publica",
        "administracion publica",
        "administraciones publicas",
        "sector publico",
        "organismos publicos",
        "clientes publicos",
        "ayuntamientos",
        "ministerios",
        "public administrations",
        "public administration",
        "public sector",
        "public bodies",
        "public clients",
        "government agencies",
        "city councils",
        "ministries",
        "do you work with public administrations",
        "do you work with the public sector",
        "technology projects for public sector",
        "cybersecurity for public administrations",
        "administrations publiques",
        "secteur public",
        "organismes publics",
        "clients publics",
        "mairies",
        "ministeres",
        "travaillez vous avec administrations publiques",
        "travaillez vous avec des administrations publiques",
        "cybersecurite pour administrations publiques"
      ],
      terms: ["administracion", "administraciones", "publica", "publico", "publicos", "organismos", "ayuntamientos", "ministerios", "public", "administrations", "administration", "sector", "government", "ministries", "councils", "organismes", "publiques", "secteur", "mairies", "ministeres"],
      groups: [
        ["administracion", "publica"],
        ["administraciones", "publicas"],
        ["sector", "publico"],
        ["organismos", "publicos"],
        ["clientes", "publicos"],
        ["public", "administrations"],
        ["public", "sector"],
        ["government", "agencies"],
        ["administrations", "publiques"],
        ["secteur", "public"],
        ["organismes", "publics"]
      ],
      phraseBoost: 12
    },
    {
      key: "certificaciones",
      words: [
        "que certificaciones tiene lognext",
        "que certificaciones teneis",
        "que certificados teneis",
        "teneis certificaciones iso",
        "certificaciones iso",
        "teneis iso",
        "teneis iso 9001",
        "teneis iso 14001",
        "teneis iso 20000",
        "teneis iso 27001",
        "iso 9001",
        "iso 14001",
        "iso 20000",
        "iso 27001",
        "iso 27001 lognext",
        "donde puedo ver los certificados",
        "donde estan los certificados",
        "ver certificados",
        "ver certificaciones",
        "estais certificados en seguridad",
        "certificados en seguridad",
        "certificacion de seguridad",
        "certificado de seguridad",
        "que es iso 27001",
        "iso 27001 seguridad",
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
        "certificado",
        "certificados",
        "calidad",
        "cumplimiento",
        "solvencia",
        "acreditacion",
        "garantia",
        "homologacion",
        "certifications",
        "what certifications do you have",
        "does lognext have iso",
        "do you have iso",
        "do you have iso 27001",
        "where can i see the certificates",
        "view certificates",
        "certificates",
        "iso certifications",
        "quality certifications",
        "compliance",
        "trust",
        "certifications iso",
        "quelles certifications avez vous",
        "avez vous iso",
        "avez vous iso 27001",
        "ou voir les certificats",
        "certificats",
        "qualite",
        "conformite",
        "garantie"
      ],
      terms: ["certificacion", "certificaciones", "certificado", "certificados", "iso", "9001", "14001", "20000", "27001", "calidad", "cumplimiento", "solvencia", "acreditacion", "garantia", "confianza", "homologacion", "certifications", "certificates", "compliance", "trust", "certificats", "qualite", "conformite"],
      groups: [
        ["certificacion", "certificaciones", "certificado", "certificados", "iso", "calidad", "cumplimiento", "seguridad", "solvencia", "garantia", "confianza"],
        ["iso", "9001", "14001", "20000", "27001"],
        ["certifications", "certificates", "iso", "quality", "compliance", "trust"],
        ["certificats", "certifications", "iso", "qualite", "conformite"]
      ],
      phraseBoost: 5
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
        "ciberseguridad para proteger informacion critica",
        "cybersecurity",
        "cyber",
        "ofreceis ciberseguridad",
        "que haceis en ciberseguridad",
        "como protegeis la informacion",
        "servicios de seguridad",
        "como ayudais a mejorar la seguridad",
        "quiero mejorar mi seguridad",
        "mejorar mi seguridad",
        "problemas de seguridad",
        "soluciones de seguridad",
        "ayudais con ciberseguridad",
        "teneis servicios de seguridad",
        "protegeis empresas",
        "proteger informacion critica",
        "haceis auditorias",
        "haceis auditorías",
        "ayudais con ens",
        "seguridad de la informacion",
        "concienciacion en seguridad",
        "respuesta ante incidentes",
        "gestion de riesgos",
        "cumplimiento normativo",
        "necesito cumplir ens",
        "necesito cumplir iso 27001",
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
        "quiero automatizar tareas",
        "automatizar tareas",
        "quiero digitalizar procesos",
        "digitalizar procesos",
        "mejorar productividad",
        "mejorar eficiencia",
        "analizar datos",
        "prediccion",
        "asistentes",
        "que es ia aplicada a empresa",
        "ia aplicada a empresa",
        "haceis automatizacion",
        "trabajais con datos",
        "soluciones inteligentes",
        "como puede ayudar la ia a mi empresa",
        "capacidades en inteligencia artificial",
        "machine learning",
        "analisis de datos",
        "artificial intelligence",
        "business ai",
        "ai for business",
        "intelligence artificielle",
        "ia appliquee a l entreprise",
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
        "ams",
        "que es ams",
        "que significa ams",
        "que haceis en ams",
        "empresas con aplicaciones en produccion",
        "necesito soporte para aplicaciones",
        "soporte para aplicaciones",
        "incidencias de una app",
        "tengo incidencias en una app",
        "problemas con una aplicacion",
        "soporte funcional",
        "mantenimiento de software",
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
        "ims",
        "que es ims",
        "que significa ims",
        "que haceis en ims",
        "gestionais infraestructuras",
        "dais soporte de sistemas",
        "servicios de infraestructura",
        "necesito soporte para servidores",
        "soporte para servidores",
        "tengo problemas con mis sistemas",
        "problemas con sistemas",
        "tengo muchas incidencias en sistemas",
        "servidores",
        "redes",
        "monitorizacion",
        "disponibilidad",
        "soporte tecnico",
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
        "kanban",
        "perfiles scrum",
        "que significa agile",
        "que es agile",
        "equipos agiles",
        "metodologias agiles",
        "proyectos agile",
        "transformacion agile",
        "scrum",
        "agile",
        "what is agile",
        "qu est ce que agile"
      ],
      terms: ["agile", "scrum", "kanban"]
    },
    {
      key: "outsourcing",
      words: [
        "que haceis en outsourcing",
        "incorporar talento tecnologico especializado",
        "que es outsourcing it",
        "que es outsourcing",
        "necesito externalizar personal it",
        "externalizar personal it",
        "necesito perfiles tecnicos",
        "perfiles tecnicos",
        "reforzar equipo",
        "reforzar mi equipo",
        "contratar perfiles it",
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
        "what is it outsourcing",
        "what is outsourcing",
        "qu est ce que l outsourcing it",
        "qu est ce que l outsourcing",
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
        "que tipo de empresa sois",
        "sois una consultora",
        "sois consultora",
        "quienes forman lognext",
        "sobre la empresa",
        "informacion sobre lognext",
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
        "are you a consulting company",
        "are you a technology consulting company",
        "tell me about lognext",
        "lognext identity",
        "qui est lognext",
        "qu est ce que lognext",
        "quel type d entreprise etes vous",
        "etes vous une societe de conseil",
        "parlez moi de lognext",
        "a propos de lognext",
        "identite de lognext"
      ],
      terms: ["lognext", "empresa", "compania", "consultora", "organizacion", "firma", "entidad", "identidad", "esencia", "representa", "company", "consulting", "identity", "entreprise", "conseil", "identite"]
    },
    {
      key: "actividad",
      words: [
        "a que se dedica lognext",
        "que hace lognext",
        "q hace lognext",
        "que aceis",
        "que hace la empresa",
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
        "cual es vuestra mision",
        "cual es vuestra propuesta de valor",
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
        "what does the company do",
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
        "que fait l entreprise",
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
      key: "casosExito",
      words: [
        "casos de exito",
        "caso de exito",
        "casos exito",
        "proyectos realizados",
        "proyectos por servicio",
        "ejemplos de proyectos",
        "ejemplos reales",
        "experiencia en proyectos",
        "que habeis hecho",
        "que proyectos habeis realizado",
        "proyectos de clientes",
        "referencias de proyectos",
        "success cases",
        "case studies",
        "project examples",
        "completed projects",
        "client projects",
        "what have you done",
        "examples of projects",
        "use cases",
        "cas de reussite",
        "cas clients",
        "exemples de projets",
        "projets realises",
        "references projets",
        "qu avez vous fait",
        "exemples concrets"
      ],
      terms: ["casos", "exito", "proyectos", "realizados", "ejemplos", "experiencia", "clientes", "referencias", "success", "cases", "studies", "projects", "examples", "clients", "reussite", "projets", "exemples"],
      groups: [
        ["casos", "exito", "proyectos", "ejemplos", "experiencia", "clientes"],
        ["success", "cases", "projects", "examples", "clients"],
        ["cas", "reussite", "projets", "exemples", "clients"]
      ],
      phraseBoost: 4
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
        "trabajais con administracion publica",
        "trabajais con empresas privadas",
        "trabajais con banca",
        "trabajais con bancos",
        "trabajais con sector publico",
        "trabajais con sector público",
        "trabajais con industria",
        "trabajais con telecomunicaciones",
        "trabajais con empresas grandes",
        "trabajais con pymes",
        "teneis experiencia en sector tecnologico",
        "teneis experiencia en sector tecnológico",
        "en que sectores trabajais",
        "en qué sectores trabajáis",
        "sectores en los que trabajais",
        "trabajais con grandes empresas",
        "teneis experiencia",
        "que experiencia tiene lognext",
        "para que tipo de clientes trabajais",
        "a quien van dirigidos vuestros servicios",
        "perfil de cliente",
        "para quien trabaja lognext",
        "a que mercado se dirige lognext",
        "que tipo de cliente encaja con lognext",
        "que empresas pueden necesitar lognext",
        "clientes",
        "sectores",
        "banca",
        "bancos",
        "sector publico",
        "industria",
        "telecomunicaciones",
        "pymes",
        "sector tecnologico",
        "administraciones publicas",
        "organizations",
        "clients",
        "sectors",
        "banking",
        "banks",
        "public administrations",
        "private companies",
        "public sector",
        "industry",
        "telecommunications",
        "large companies",
        "smes",
        "technology sector",
        "what sectors do you work with",
        "do you work with banks",
        "do you work with industry",
        "do you work with telecommunications",
        "do you work with smes",
        "do you work with public administrations",
        "do you work with private companies",
        "what experience does lognext have",
        "clients",
        "secteurs",
        "banque",
        "banques",
        "secteur public",
        "industrie",
        "telecommunications",
        "grandes entreprises",
        "pme",
        "secteur technologique",
        "dans quels secteurs travaillez vous",
        "travaillez vous avec la banque",
        "travaillez vous avec l industrie",
        "travaillez vous avec les telecommunications",
        "administrations publiques",
        "entreprises privees",
        "travaillez vous avec des administrations publiques",
        "travaillez vous avec des entreprises privees"
      ],
      terms: ["clientes", "empresas", "organizaciones", "sectores", "banca", "bancos", "publico", "industria", "telecomunicaciones", "pymes", "tecnologico", "administracion", "administraciones", "mercado", "cliente", "clients", "organizations", "sectors", "banking", "banks", "public", "industry", "telecommunications", "smes", "secteurs", "banque", "industrie", "pme"],
      phraseBoost: 12
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
        "que hace la empresa",
        "a que os dedicais",
        "a que se dedica lognext",
        "que es lognext",
        "quien es lognext",
        "quienes sois",
        "quienes sois vosotros",
        "informacion de la empresa",
        "sobre lognext",
        "empresa",
        "consultora",
        "consultora tecnologica",
        "sois una consultora",
        "que tipo de empresa sois",
        "especialidad",
        "especializacion",
        "especializada",
        "que soluciones dais",
        "que podeis hacer",
        "que soluciones ofreceis",
        "que soluciones ofrecéis",
        "cual es vuestra mision",
        "cual es vuestra propuesta de valor",
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
      key: "orientacionServicios",
      words: [
        "no se que servicio necesito",
        "no se que servicio elegir",
        "que servicio me recomendais",
        "que servicio me recomiendas",
        "necesito ayuda tecnologica",
        "necesito orientacion tecnologica",
        "necesito ayuda con un proyecto tecnologico",
        "tengo problemas con mis sistemas",
        "tengo muchas incidencias",
        "quiero modernizar mi empresa",
        "quiero digitalizar procesos",
        "quiero automatizar tareas",
        "necesito mejorar mis procesos",
        "que solucion encaja conmigo",
        "que solucion necesito",
        "no tengo claro el servicio",
        "ayudame a elegir servicio",
        "ayudame a elegir una solucion",
        "i do not know what service i need",
        "i dont know what service i need",
        "which service do you recommend",
        "i need technology help",
        "i need help with a technology project",
        "i have many incidents",
        "i want to modernize my company",
        "i want to automate tasks",
        "help me choose a service",
        "je ne sais pas de quel service j ai besoin",
        "quel service recommandez vous",
        "j ai besoin d aide technologique",
        "j ai besoin d aide pour un projet technologique",
        "j ai beaucoup d incidents",
        "je veux moderniser mon entreprise",
        "je veux automatiser des taches",
        "aidez moi a choisir un service"
      ],
      terms: ["necesito", "ayuda", "tecnologica", "servicio", "recomendais", "recomiendas", "orientacion", "problemas", "incidencias", "modernizar", "digitalizar", "automatizar", "solucion", "service", "recommend", "technology", "help", "incidents", "modernize", "automate", "service", "recommandez", "technologique", "aide", "incidents", "moderniser", "automatiser"],
      groups: [
        ["servicio", "necesito", "recomendais", "recomiendas", "ayuda", "orientacion"],
        ["problemas", "sistemas", "incidencias", "ayuda"],
        ["modernizar", "digitalizar", "automatizar", "procesos"],
        ["service", "need", "recommend", "technology", "help"],
        ["service", "besoin", "recommandez", "technologique", "aide"]
      ],
      phraseBoost: 7
    },
    {
      key: "servicios",
      words: [
        "servicio",
        "servicios",
        "vuestros servicios",
        "que servicios teneis",
        "cuales son vuestros servicios",
        "que servicios ofreceis",
        "que ofrece lognext",
        "que ofreceis",
        "que ofreceis como empresa",
        "servicios de lognext",
        "soluciones",
        "soluciones tecnologicas",
        "areas",
        "areas de negocio",
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
        "consultoria it",
        "consultoria tecnologica",
        "desarrollo de software",
        "software",
        "automatizacion",
        "inteligencia artificial",
        "ciberseguridad",
        "tecnologia",
        "que podeis hacer",
        "services",
        "your services",
        "lognext services",
        "what services do you offer",
        "what services",
        "what do you offer",
        "solutions",
        "technology solutions",
        "it consulting",
        "software development",
        "automation",
        "artificial intelligence",
        "cybersecurity",
        "service portfolio",
        "technology services",
        "vos services",
        "services de lognext",
        "quels services proposez vous",
        "que proposez vous",
        "solutions technologiques",
        "conseil it",
        "developpement logiciel",
        "automatisation",
        "intelligence artificielle",
        "cybersecurite",
        "services technologiques",
        "portefeuille de services",
        "outsourcing"
      ],
      terms: ["servicios", "servicio", "soluciones", "areas", "lineas", "negocio", "capacidades", "portfolio", "especialidades", "tecnologicos", "consultoria", "software", "automatizacion", "services", "solutions", "portfolio", "consulting", "automation", "ams", "ims", "outsourcing"]
    },
    {
      key: "consultoriaIt",
      words: [
        "consultoria it",
        "consultoria tecnologica",
        "consultoria tecnologia",
        "necesito una consultora it",
        "necesito consultoria tecnologica",
        "asesoramiento tecnologico",
        "orientacion tecnologica",
        "definir solucion it",
        "definir estrategia tecnologica",
        "technology consulting",
        "it consulting",
        "technology consultancy",
        "technology advice",
        "it strategy",
        "conseil it",
        "conseil technologique",
        "conseil en technologie",
        "strategie it"
      ],
      terms: ["consultoria", "consultora", "asesoramiento", "estrategia", "tecnologica", "it", "consulting", "consultancy", "strategy", "conseil", "strategie"],
      groups: [
        ["consultoria", "tecnologica", "it", "estrategia"],
        ["technology", "consulting", "it", "strategy"],
        ["conseil", "technologique", "it", "strategie"]
      ]
    },
    {
      key: "desarrolloAplicaciones",
      words: [
        "desarrollo de software",
        "desarrollo de aplicaciones",
        "mantenimiento de aplicaciones",
        "mantenimiento software",
        "evolucion de aplicaciones",
        "aplicaciones de negocio",
        "soporte aplicativo",
        "application development",
        "software development",
        "application maintenance",
        "application support",
        "business applications",
        "developpement logiciel",
        "developpement d applications",
        "maintenance applicative",
        "support applicatif",
        "applications metier"
      ],
      terms: ["desarrollo", "software", "aplicaciones", "mantenimiento", "aplicativo", "development", "application", "software", "maintenance", "support", "developpement", "applications", "maintenance"]
    },
    {
      key: "automatizacionProcesos",
      words: [
        "automatizacion de procesos",
        "automatizar procesos",
        "automatizar tareas",
        "mejorar procesos",
        "procesos manuales",
        "eficiencia operativa",
        "robotizar procesos",
        "process automation",
        "automate processes",
        "automate tasks",
        "operational efficiency",
        "manual processes",
        "automatisation des processus",
        "automatiser les processus",
        "automatiser des taches",
        "efficacite operationnelle"
      ],
      terms: ["automatizacion", "automatizar", "procesos", "tareas", "eficiencia", "operativa", "automation", "automate", "processes", "efficiency", "automatisation", "automatiser", "processus"]
    },
    {
      key: "soporteIt",
      words: [
        "soporte it",
        "soporte tecnico",
        "soporte de sistemas",
        "soporte de infraestructura",
        "ayuda tecnica",
        "operacion it",
        "servicios gestionados",
        "it support",
        "technical support",
        "systems support",
        "infrastructure support",
        "managed services",
        "support it",
        "support technique",
        "support systemes",
        "services geres"
      ],
      terms: ["soporte", "tecnico", "sistemas", "infraestructura", "operacion", "support", "technical", "systems", "infrastructure", "managed", "services"]
    },
    {
      key: "gobiernoIt",
      words: [
        "gobierno it",
        "gobierno tecnologico",
        "gobernanza it",
        "gestion it",
        "alinear tecnologia y negocio",
        "control de servicios it",
        "priorizar servicios tecnologicos",
        "it governance",
        "technology governance",
        "it management",
        "align it and business",
        "gouvernance it",
        "gouvernance technologique",
        "gestion it",
        "aligner technologie et metier"
      ],
      terms: ["gobierno", "gobernanza", "gestion", "alinear", "control", "priorizar", "governance", "management", "align", "gouvernance", "gestion", "aligner"]
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
        "contacto comercial",
        "contactar",
        "quiero contactar",
        "como contacto",
        "como puedo contactar",
        "como contacto con lognext",
        "como contactar con la empresa",
        "necesito hablar con vosotros",
        "como puedo hablar con vosotros",
        "email",
        "correo",
        "telefono",
        "teléfono",
        "direccion",
        "oficina",
        "ubicacion",
        "ubicación",
        "donde estais",
        "donde se encuentra lognext",
        "donde esta lognext",
        "como puedo solicitar informacion",
        "quiero pedir informacion",
        "quiero solicitar informacion",
        "quiero solicitar presupuesto",
        "solicitar presupuesto",
        "quiero contratar",
        "pedir informacion",
        "pedir información",
        "solicitar propuesta",
        "quiero una demo",
        "quiero que me llamen",
        "necesito una consultora it",
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
        "hablar con ventas",
        "reunion",
        "comercial",
        "solicitar informacion",
        "contact",
        "i want to contact",
        "how can i contact you",
        "i need to talk to you",
        "contact you",
        "email",
        "phone",
        "telephone",
        "call",
        "meeting",
        "sales",
        "request a quote",
        "request a proposal",
        "i want a demo",
        "i want you to call me",
        "request information",
        "vous contacter",
        "je veux vous contacter",
        "comment vous contacter",
        "je veux demander des informations",
        "courriel",
        "telephone",
        "appel",
        "rendez vous",
        "commercial",
        "demander information",
        "demander un devis",
        "demander une proposition",
        "je veux une demo",
        "je veux etre appele"
      ],
      terms: ["contacto", "contactar", "correo", "email", "telefono", "direccion", "oficina", "ubicacion", "consulta", "informacion", "presupuesto", "llamar", "reunion", "comercial", "contact", "phone", "telephone", "call", "meeting", "sales", "quote", "courriel", "telephone", "appel", "devis"]
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
