export const LANGUAGES = [
  { code: 'de', label: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'sq', label: 'SQ', name: 'Shqip',   flag: '🇽🇰' },
]

export const t = {
  // ── Navbar ──────────────────────────────────────────────────────────────
  nav: {
    services:    { de: 'Leistungen',     en: 'Services',     sq: 'Shërbime' },
    tachographs: { de: 'Tachographen',   en: 'Tachographs',  sq: 'Tahografë' },
    about:       { de: 'Über uns',       en: 'About',        sq: 'Rreth nesh' },
    booking:     { de: 'Termin buchen',   en: 'Book',         sq: 'Rezervo' },
    contact:     { de: 'Kontakt',        en: 'Contact',      sq: 'Kontakt' },
    getQuote:    { de: 'Angebot anfragen', en: 'Get Quote',  sq: 'Kërko Ofertë' },
  },

  // ── Stats ────────────────────────────────────────────────────────────────
  stats: {
    established:    { de: 'Gegründet',           en: 'Established',         sq: 'Themeluar' },
    years:          { de: 'Jahre Erfahrung',      en: 'Years of expertise',  sq: 'Vite ekspertize' },
    vehicles:       { de: 'Kalibrierte Fahrzeuge',en: 'Vehicles calibrated', sq: 'Automjete të kalibriara' },
    turnaround:     { de: 'Schnelle Abwicklung',  en: 'Fast turnaround',     sq: 'Përpunim i shpejtë' },
  },

  // ── Services ─────────────────────────────────────────────────────────────
  services: {
    label:    { de: 'Kernleistungen',     en: 'Core Services',     sq: 'Shërbimet Kryesore' },
    headline: { de: 'Entwickelt für',     en: 'Engineered for',    sq: 'Projektuar për' },
    headlineSub: { de: 'Gewerbliche Flotten.', en: 'Commercial Fleets.', sq: 'Flota Komerciale.' },
    bookCta:  { de: 'Diesen Service buchen', en: 'Book this service', sq: 'Rezervo këtë shërbim' },
    counter:  { de: '/ 04', en: '/ 04', sq: '/ 04' },

    s1title:  { de: 'Tachographenkalibrierung', en: 'Tachograph Calibration', sq: 'Kalibrimi i Tahografëve' },
    s1sub:    { de: 'Kalibrimi i Tahografëve',  en: 'Kalibrimi i Tahografëve', sq: 'Kalibrimi i Tahografëve' },
    s1desc:   {
      de: 'Präzise Kalibrierung von digitalen und analogen Tachographen für vollständige gesetzliche Konformität Ihrer Flotte. Wir verwenden EU-zertifizierte Ausrüstung für jede Messung.',
      en: 'Precise calibration of digital and analog tachographs ensuring full regulatory compliance for your fleet. We use EU-certified equipment for every measurement.',
      sq: 'Kalibrim preciz i tahografëve dixhitalë dhe analogë duke garantuar pajtueshmëri të plotë ligjore për flotën tuaj. Përdorim pajisje të certifikuara nga BE për çdo matje.',
    },

    s2title:  { de: 'Technische Inspektion', en: 'Technical Inspection', sq: 'Inspektimi Teknik' },
    s2sub:    { de: 'Inspektimi Teknik',     en: 'Inspektimi Teknik',     sq: 'Inspektimi Teknik' },
    s2desc:   {
      de: 'Vollständige Fahrzeuginspektion für gewerbliche Fuhrparks. Jede Prüfung folgt zertifizierten Inspektionsmethoden für Sicherheit und gesetzliche Konformität.',
      en: 'Complete vehicle inspection for commercial fleets. Every check follows the certified inspection methods (Metodat e Inspektimit) to ensure safety and legal compliance.',
      sq: 'Inspektim i plotë i automjeteve për flota komerciale. Çdo kontroll ndjek metodat e certifikuara të inspektimit për të garantuar sigurinë dhe pajtueshmërinë ligjore.',
    },

    s3title:  { de: 'Analoge Tachographen', en: 'Analog Tachographs', sq: 'Tahografët Analogë' },
    s3sub:    { de: 'Tahografët Analogë',   en: 'Tahografët Analogë', sq: 'Tahografët Analogë' },
    s3desc:   {
      de: 'Spezialisierte Inspektion und Wartung von analogen Tachographensystemen. Originalscheiben, Siegelintegrität und mechanische Genauigkeit geprüft.',
      en: 'Specialized inspection and servicing of legacy analog tachograph systems. Original charts, seal integrity, and mechanical accuracy verified to the highest standard.',
      sq: 'Inspektim dhe mirëmbajtje e specializuar e sistemeve analoge të tahografëve. Disqet origjinale, integriteti i vulës dhe saktësia mekanike verifikohen sipas standardit më të lartë.',
    },

    s4title:  { de: 'Fahrzeugdiagnose', en: 'Vehicle Diagnostics', sq: 'Diagnostifikimi i Automjeteve' },
    s4sub:    { de: 'Diagnostifikimi',  en: 'Diagnostifikimi',      sq: 'Diagnostifikimi' },
    s4desc:   {
      de: 'Erweiterte Elektronikdiagnose für LKW und Schwerlastfahrzeuge. Vollständiges Fehlercode-Scanning, Systemanalyse und technischer Bericht inklusive.',
      en: 'Advanced electronic diagnostics for trucks and heavy-duty vehicles. Full fault-code scanning, system analysis, and technical reporting included.',
      sq: 'Diagnostikim elektronik i avancuar për kamionë dhe automjete të rënda. Skanim i plotë i kodeve të gabimeve, analiza e sistemit dhe raportim teknik të përfshirë.',
    },
  },

  // ── Showcase ─────────────────────────────────────────────────────────────
  showcase: {
    label:    { de: 'Tachograph-Technologie', en: 'Tachograph Technology', sq: 'Teknologjia e Tahografëve' },
    headline: { de: 'Fortschrittliche Inspektions-', en: 'Advanced Inspection', sq: 'Metoda të Avancuara' },
    headlineSub: { de: 'Methoden.', en: 'Methods.', sq: 'Inspektimi.' },
    body:     {
      de: 'Wir wenden zertifizierte Inspektionsmethoden auf jedes Fahrzeug an. Sowohl analoge als auch digitale Systeme werden mit der gleichen Präzision und technischen Strenge behandelt.',
      en: 'We apply certified inspection methods (Metodat e Inspektimit) to every vehicle. Both analog and digital systems handled with the same precision and technical rigor.',
      sq: 'Ne aplikojmë metodat e certifikuara të inspektimit (Metodat e Inspektimit) për çdo automjet. Sistemet analoge dhe dixhitale trajtohen me të njëjtën precizion dhe rreptësi teknike.',
    },
    feature1: { de: 'Digitale & analoge Tachographen', en: 'Digital & Analog Tachographs', sq: 'Tahografë Dixhitalë & Analogë' },
    feature2: { de: 'Flotten-Compliance-Lösungen',     en: 'Fleet Compliance Solutions',    sq: 'Zgjidhje Pajtueshmërie për Flota' },
    feature3: { de: 'Kalibrierung vor Ort verfügbar',  en: 'On-Site Calibration Available', sq: 'Kalibrim në Vendndodhje të Disponueshëm' },
    feature4: { de: 'Zertifizierte Inspektionsmethoden', en: 'Certified Inspection Methods', sq: 'Metoda të Certifikuara Inspektimi' },
    cta:      { de: 'Inspektion buchen', en: 'Book Inspection', sq: 'Rezervo Inspektim' },
    badge:    { de: 'VDO DTCO Digitaler Tachograph', en: 'VDO DTCO Digital Tachograph', sq: 'VDO DTCO Tahograf Dixhital' },
  },

  // ── About ────────────────────────────────────────────────────────────────
  about: {
    bannerLabel: { de: 'Unser Erbe',      en: 'Our Heritage',   sq: 'Trashëgimia Jonë' },
    bannerTitle: { de: 'Präzision seit 2001.', en: 'Precision since 2001.', sq: 'Precizion që nga 2001.' },
    label:    { de: 'Das Kienzle-Erbe', en: 'The Kienzle Legacy', sq: 'Trashëgimia Kienzle' },
    headline: { de: 'Zwei Jahrzehnte', en: 'Two Decades of', sq: 'Dy Dekada' },
    headlineSub: { de: 'Technische Präzision.', en: 'Technical Precision.', sq: 'Precizion Teknik.' },
    p1: {
      de: 'Die Trupa Inspektuese për Tahograf Kienzle wurde 2001 mit einer Mission gegründet: zuverlässige, präzise Tachographenkalibrierungsdienste für gewerbliche Transportunternehmen im Kosovo zu erbringen.',
      en: 'Trupa Inspektuese për Tahograf Kienzle was founded in 2001 with one mission: to provide reliable, accurate tachograph calibration services for commercial transporters across Kosovo.',
      sq: 'Trupa Inspektuese për Tahograf Kienzle u themelua në vitin 2001 me një mision: të ofrojë shërbime të besueshme dhe të sakta të kalibrimit të tahografëve për transportuesit komercialë në të gjithë Kosovën.',
    },
    p2: {
      de: 'Im Laufe der Jahre haben wir uns zu einem umfassenden technischen Servicezentrum entwickelt, das sowohl analoge als auch digitale Tachographentechnologien umfasst.',
      en: 'Over the years we have grown into a comprehensive technical service center, embracing both analog and digital tachograph technologies to serve every fleet type.',
      sq: 'Me kalimin e viteve, jemi rritur në një qendër gjithëpërfshirëse shërbimi teknik, duke përfshirë teknologjitë analoge dhe dixhitale të tahografëve për të shërbyer çdo lloj flote.',
    },
    p3: {
      de: 'Unser Engagement bleibt unverändert: Präzision, Zuverlässigkeit und höchste Servicequalitätsstandards — für jeden Kunden, jedes Mal.',
      en: 'Our commitment remains unchanged: precision, reliability, and the highest standards of service quality — for every customer, every time.',
      sq: 'Angazhimi ynë mbetet i pandryshuar: precizion, besueshmëri dhe standardet më të larta të cilësisë së shërbimit — për çdo klient, çdo herë.',
    },
    cta: { de: 'Kontakt aufnehmen', en: 'Get in Touch', sq: 'Na Kontaktoni' },
    facilityLabel: { de: 'Unsere Einrichtung', en: 'Our Facility', sq: 'Objekti Ynë' },
    specialistsBadge: {
      de: 'Kosovos führende',
      en: 'Kosovo\'s leading',
      sq: 'Specialistët kryesorë',
    },
    specialists: { de: 'Spezialisten', en: 'specialists', sq: 'të Kosovës' },
    tl1: { de: 'Unternehmen in Kosovo gegründet',    en: 'Company founded in Kosovo',        sq: 'Kompania themelua në Kosovë' },
    tl2: { de: 'Digitale Tachographendienste hinzugefügt', en: 'Digital tachograph services added', sq: 'Shërbime dixhitale të tahografëve u shtuan' },
    tl3: { de: 'Online-Terminbuchungssystem gestartet', en: 'Online appointment system launched', sq: 'Sistemi i rezervimit online u lansua' },
    tl4: { de: 'Ausrüstung und Einrichtungen erneuert',  en: 'Equipment and facilities upgraded',  sq: 'Pajisjet dhe objektet u azhurnuan' },
    quote: {
      de: '"Wir bieten zuverlässige und nachhaltige Kalibrierungslösungen für Flottenoperatoren im Kosovo — garantierte Genauigkeit bei jeder Inspektion."',
      en: '"Providing reliable and sustainable calibration solutions for fleet operators across Kosovo — guaranteed accuracy in every inspection."',
      sq: '"Duke ofruar zgjidhje të besueshme dhe të qëndrueshme kalibrimi për operatorët e flotave në të gjithë Kosovën — saktësi e garantuar në çdo inspektim."',
    },
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contact: {
    label:    { de: 'Kontakt aufnehmen', en: 'Get in Touch',  sq: 'Na Kontaktoni' },
    headline: { de: 'Optimieren wir',    en: 'Let\'s Optimize', sq: 'Le të Optimizojmë' },
    headlineSub: { de: 'Ihre Flotte.',   en: 'Your Fleet.',    sq: 'Flotën Tuaj.' },
    body:     {
      de: 'Fragen zur Tachographenkalibrierung oder Inspektionsanforderungen? Unser Team steht bereit.',
      en: 'Questions about tachograph calibration or inspection requirements? Our team is ready to help.',
      sq: 'Pyetje rreth kalibrimit të tahografëve apo kërkesave të inspektimit? Ekipi ynë është gati të ndihmojë.',
    },
    phone:    { de: 'WhatsApp & Telefon', en: 'WhatsApp & Phone', sq: 'WhatsApp & Telefon' },
    location: { de: 'Standort',           en: 'Location',          sq: 'Vendndodhja' },
    whatsapp: { de: 'WhatsApp schreiben', en: 'Chat on WhatsApp',  sq: 'Shkruaj në WhatsApp' },
    name:     { de: 'Vollständiger Name', en: 'Full Name',         sq: 'Emri i Plotë' },
    email:    { de: 'E-Mail',             en: 'Email',              sq: 'Email' },
    yourName: { de: 'Ihr Name',           en: 'Your name',          sq: 'Emri juaj' },
    service:  { de: 'Gewünschter Service', en: 'Service Required',  sq: 'Shërbimi i Kërkuar' },
    selectService: { de: 'Service wählen', en: 'Select a service', sq: 'Zgjidhni një shërbim' },
    message:  { de: 'Nachricht',           en: 'Message',           sq: 'Mesazhi' },
    messagePlaceholder: { de: 'Erzählen Sie uns von Ihrer Flotte...', en: 'Tell us about your fleet...', sq: 'Na tregoni për flotën tuaj...' },
    send:     { de: 'Anfrage senden',      en: 'Send Inquiry',       sq: 'Dërgoni Kërkesën' },
    sent:     { de: 'Nachricht gesendet!', en: 'Message Sent!',      sq: 'Mesazhi u Dërgua!' },
    sentBody: { de: 'Wir melden uns in Kürze.', en: 'We\'ll get back to you shortly.', sq: 'Do t\'ju përgjigjemi së shpejti.' },
  },

  // ── CTA ──────────────────────────────────────────────────────────────────
  cta: {
    badge:    { de: 'Bereit loszulegen', en: 'Ready to get started', sq: 'Gati të fillojmë' },
    headline: { de: 'Halten Sie Ihre Flotte',   en: 'Keep Your Fleet',    sq: 'Mbajeni Flotën Tuaj' },
    headlineSub: { de: 'Voll Compliant.',        en: 'Fully Compliant.',   sq: 'Plotësisht Konform.' },
    body:     {
      de: 'Planen Sie noch heute Ihre Tachographenkalibrierung oder Inspektion. WhatsApp für schnellste Antwort.',
      en: 'Schedule your tachograph calibration or inspection today. WhatsApp us for the fastest response.',
      sq: 'Planifikoni kalibrimin ose inspektimin e tahografëve tuaj sot. Na shkruani në WhatsApp për përgjigjen më të shpejtë.',
    },
    primary:  { de: 'WhatsApp jetzt',    en: 'WhatsApp Now',  sq: 'WhatsApp Tani' },
    secondary:{ de: 'Anfrage senden',    en: 'Send Inquiry',  sq: 'Dërgoni Kërkesën' },
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    tagline: {
      de: 'Kosovos vertrauenswürdige Tachographenspezialisten seit 2001.',
      en: 'Kosovo\'s trusted tachograph specialists since 2001.',
      sq: 'Specialistët e besuar të tahografëve të Kosovës që nga 2001.',
    },
    servicesLabel: { de: 'Leistungen',  en: 'Services',  sq: 'Shërbime' },
    companyLabel:  { de: 'Unternehmen', en: 'Company',   sq: 'Kompania' },
    s1: { de: 'Tachographenkalibrierung', en: 'Tachograph Calibration', sq: 'Kalibrimi i Tahografëve' },
    s2: { de: 'Technische Inspektion',    en: 'Technical Inspection',   sq: 'Inspektimi Teknik' },
    s3: { de: 'Analogdienste',            en: 'Analog Services',         sq: 'Shërbime Analoge' },
    s4: { de: 'Fahrzeugdiagnose',         en: 'Vehicle Diagnostics',     sq: 'Diagnostifikimi' },
    c1: { de: 'Über uns',    en: 'About Us',       sq: 'Rreth Nesh' },
    c2: { de: 'Kontakt',     en: 'Contact',         sq: 'Kontakt' },
    c3: { de: 'Online-Buchung', en: 'Online Booking', sq: 'Rezervim Online' },
    copy: { de: 'Kosovo — Präzision in Bewegung', en: 'Kosovo — Precision in Motion', sq: 'Kosovë — Precizion në Lëvizje' },
  },

  // ── Booking ──────────────────────────────────────────────────────────────
  booking: {
    label:    { de: 'Online-Terminbuchung', en: 'Online Booking', sq: 'Rezervim Online' },
    headline: { de: 'Termin',               en: 'Book Your',      sq: 'Rezervoni' },
    headlineSub: { de: 'Online buchen.',    en: 'Appointment.',   sq: 'Terminin Online.' },
    body:     {
      de: 'Wählen Sie Datum und Uhrzeit — wir bestätigen Ihren Termin direkt per Telefon.',
      en: 'Choose a date and time — we will confirm your appointment directly by phone.',
      sq: 'Zgjidhni datën dhe orën — ne do të konfirmojmë terminin tuaj drejtpërdrejt me telefon.',
    },
    selectDate:  { de: 'Datum wählen',   en: 'Select Date',  sq: 'Zgjidhni Datën' },
    selectTime:  { de: 'Uhrzeit wählen', en: 'Select Time',  sq: 'Zgjidhni Orën' },
    yourName:    { de: 'Ihr Name',        en: 'Your Name',    sq: 'Emri juaj' },
    yourPhone:   { de: 'Telefonnummer',   en: 'Phone Number', sq: 'Numri i telefonit' },
    namePh:      { de: 'Vor- und Nachname',    en: 'First and last name',  sq: 'Emri dhe mbiemri' },
    phonePh:     { de: '+383 ...',             en: '+383 ...',              sq: '+383 ...' },
    book:        { de: 'Termin buchen',        en: 'Book Appointment',      sq: 'Rezervo Terminin' },
    sent:        { de: 'Termin angefragt!',    en: 'Appointment Requested!', sq: 'Termini u Kërkua!' },
    sentBody:    {
      de: 'Wir melden uns in Kürze telefonisch, um Ihren Termin zu bestätigen.',
      en: 'We will call you shortly to confirm your appointment.',
      sq: 'Do t\'ju kontaktojmë me telefon së shpejti për të konfirmuar terminin.',
    },
    noDate:    { de: 'Bitte Datum wählen',    en: 'Please select a date',    sq: 'Ju lutemi zgjidhni datën' },
    noTime:    { de: 'Bitte Uhrzeit wählen',  en: 'Please select a time',    sq: 'Ju lutemi zgjidhni orën' },
    noName:    { de: 'Bitte Name eingeben',   en: 'Please enter your name',   sq: 'Ju lutemi shkruani emrin' },
    noPhone:   { de: 'Bitte Telefon eingeben', en: 'Please enter your phone', sq: 'Ju lutemi shkruani telefonin' },
    errorSend: {
      de: 'Fehler beim Senden. Bitte WhatsApp nutzen.',
      en: 'Failed to send. Please use WhatsApp.',
      sq: 'Dërgimi dështoi. Ju lutemi përdorni WhatsApp.',
    },
    days:      { de: 'Mo,Di,Mi,Do,Fr,Sa,So', en: 'Mo,Tu,We,Th,Fr,Sa,Su', sq: 'Hë,Ma,Më,En,Pr,Sh,Di' },
    months:    {
      de: 'Januar,Februar,März,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember',
      en: 'January,February,March,April,May,June,July,August,September,October,November,December',
      sq: 'Janar,Shkurt,Mars,Prill,Maj,Qershor,Korrik,Gusht,Shtator,Tetor,Nëntor,Dhjetor',
    },
  },

  // ── Chatbot ──────────────────────────────────────────────────────────────
  chat: {
    title:       { de: 'Kienzle Assistent',     en: 'Kienzle Assistant',      sq: 'Asistenti Kienzle' },
    subtitle:    { de: 'Fragen Sie uns alles',  en: 'Ask us anything',         sq: 'Na pyesni çdo gjë' },
    placeholder: { de: 'Ihre Frage...',         en: 'Your question...',        sq: 'Pyetja juaj...' },
    welcome:     {
      de: 'Hallo! Ich bin der Kienzle KS Assistent. Ich helfe Ihnen gerne bei Fragen zu unseren Tachographenservices, Kalibrierungen, Inspektionen und allem rund um unsere Tätigkeiten. Wie kann ich Ihnen helfen?',
      en: 'Hello! I\'m the Kienzle KS assistant. I can help you with questions about our tachograph services, calibrations, inspections, and everything related to our work. How can I help you?',
      sq: 'Përshëndetje! Unë jam asistenti i Kienzle KS. Mund t\'ju ndihmoj me pyetje rreth shërbimeve tona të tahografëve, kalibrimeve, inspektimeve dhe gjithçka që ka lidhje me punën tonë. Si mund t\'ju ndihmoj?',
    },
    sending: { de: 'Tippt...', en: 'Typing...', sq: 'Duke shkruar...' },
    error:   {
      de: 'Entschuldigung, etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
      en: 'Sorry, something went wrong. Please try again.',
      sq: 'Na vjen keq, diçka shkoi keq. Ju lutemi provoni përsëri.',
    },
    noKey: {
      de: 'OpenAI API-Schlüssel fehlt. Bitte VITE_OPENAI_API_KEY in .env eintragen.',
      en: 'OpenAI API key missing. Please add VITE_OPENAI_API_KEY to .env.',
      sq: 'Çelësi i OpenAI API mungon. Ju lutemi shtoni VITE_OPENAI_API_KEY në .env.',
    },
  },
}

export function getText(key, lang) {
  const parts = key.split('.')
  let node = t
  for (const p of parts) {
    node = node?.[p]
    if (!node) return key
  }
  return node[lang] || node['en'] || key
}
