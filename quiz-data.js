/* ============================================================
   quiz-data.js — 50 Questions de Cybersécurité
   Couvrant les 4 chapitres du cours
   Types: QCM et Vrai/Faux
   ============================================================ */

const QUIZ_DATA = [

  /* ─────────────────────────────────────────────
     CHAPITRE 1 — Introduction à la Sécurité (Q1-Q13)
  ───────────────────────────────────────────── */
  {
    id: 1,
    chapter: "Chapitre 1 — Introduction",
    type: "qcm",
    question: "Quelle formule exprime correctement le risque en sécurité informatique ?",
    options: [
      "Risque = Menace + Vulnérabilité + Impact",
      "Risque = Menace × Vulnérabilité × Impact",
      "Risque = Menace / Vulnérabilité",
      "Risque = Impact - Vulnérabilité"
    ],
    answer: 1,
    explanation: "Le risque est le produit de trois facteurs : la menace (le danger potentiel), la vulnérabilité (la faiblesse exploitable) et l'impact (les conséquences si l'attaque réussit). Si l'un d'eux est nul, le risque est nul."
  },
  {
    id: 2,
    chapter: "Chapitre 1 — Introduction",
    type: "vf",
    question: "La sécurité absolue d'un système informatique est un objectif atteignable avec les technologies modernes.",
    options: ["Vrai", "Faux"],
    answer: 1,
    explanation: "FAUX — La sécurité absolue n'existe pas. L'objectif est de réduire les risques à un niveau acceptable. Il y a toujours des vulnérabilités inconnues (zero-day) et le facteur humain reste imprévisible."
  },
  {
    id: 3,
    chapter: "Chapitre 1 — Introduction",
    type: "qcm",
    question: "Quelle propriété du modèle CIA garantit que seules les personnes autorisées peuvent accéder aux informations ?",
    options: [
      "Disponibilité (Availability)",
      "Intégrité (Integrity)",
      "Confidentialité (Confidentiality)",
      "Authenticité (Authenticity)"
    ],
    answer: 2,
    explanation: "La Confidentialité garantit que l'information n'est accessible qu'aux personnes autorisées. Dans le modèle DAD (opposé du CIA), la menace correspondante est la Disclosure (Divulgation)."
  },
  {
    id: 4,
    chapter: "Chapitre 1 — Introduction",
    type: "qcm",
    question: "Une attaque DDoS (Déni de Service Distribué) affecte principalement quelle propriété du modèle CIA ?",
    options: [
      "Confidentialité",
      "Intégrité",
      "Disponibilité",
      "Authenticité"
    ],
    answer: 2,
    explanation: "Un DDoS surcharge les serveurs pour les rendre inaccessibles, compromettant ainsi la Disponibilité (Availability). C'est une attaque de type Interruption dans la classification des attaques."
  },
  {
    id: 5,
    chapter: "Chapitre 1 — Introduction",
    type: "vf",
    question: "Un utilisateur interne (employé) ne peut pas représenter une menace pour la sécurité d'une organisation.",
    options: ["Vrai", "Faux"],
    answer: 1,
    explanation: "FAUX — Les menaces internes (initiés) sont parmi les plus dangereuses. Un employé mécontent, négligent ou manipulé par ingénierie sociale a déjà un accès légitime et connait l'infrastructure."
  },
  {
    id: 6,
    chapter: "Chapitre 1 — Introduction",
    type: "qcm",
    question: "Quelle est la différence fondamentale entre une menace et une vulnérabilité ?",
    options: [
      "Une menace est technique, une vulnérabilité est humaine",
      "Une menace est le danger potentiel, une vulnérabilité est la faiblesse exploitable",
      "Une menace est interne, une vulnérabilité est externe",
      "Il n'y a aucune différence, ce sont des synonymes"
    ],
    answer: 1,
    explanation: "Une vulnérabilité est une faiblesse interne du système (ex : mot de passe faible). Une menace est le danger extérieur ou intérieur qui pourrait exploiter cette faiblesse (ex : un attaquant). Sans vulnérabilité, la menace ne peut aboutir."
  },
  {
    id: 7,
    chapter: "Chapitre 1 — Introduction",
    type: "qcm",
    question: "Dans le principe des 5P, quelle phase correspond à l'installation d'une backdoor pour maintenir l'accès ?",
    options: [
      "Préparation",
      "Pénétration",
      "Persistance",
      "Propagation"
    ],
    answer: 2,
    explanation: "La Persistance est la 3e phase des 5P. L'attaquant installe des backdoors (portes dérobées) pour maintenir son accès sans être détecté, même si la faille initiale est corrigée. Outils : Netcat, Cobalt Strike."
  },
  {
    id: 8,
    chapter: "Chapitre 1 — Introduction",
    type: "qcm",
    question: "Quel type de hacker agit légalement avec autorisation pour identifier et corriger des vulnérabilités ?",
    options: [
      "Black Hat",
      "Gray Hat",
      "White Hat",
      "Script Kiddie"
    ],
    answer: 2,
    explanation: "Le White Hat (hacker éthique) travaille avec autorisation pour tester et améliorer la sécurité. Il réalise des tests de pénétration (pentests) et des audits de sécurité. À l'opposé, le Black Hat agit illégalement."
  },
  {
    id: 9,
    chapter: "Chapitre 1 — Introduction",
    type: "vf",
    question: "Une vulnérabilité zero-day est dangereuse car aucun correctif n'est encore disponible au moment de son exploitation.",
    options: ["Vrai", "Faux"],
    answer: 0,
    explanation: "VRAI — Une vulnérabilité zero-day est exploitée avant qu'un correctif (patch) ne soit développé ou publié. Le terme 'zero-day' signifie que les développeurs ont eu 0 jours pour y remédier, rendant toute protection très difficile."
  },
  {
    id: 10,
    chapter: "Chapitre 1 — Introduction",
    type: "qcm",
    question: "Quelle norme internationale définit les exigences d'un Système de Management de la Sécurité de l'Information (SMSI) ?",
    options: [
      "ISO/IEC 27002",
      "ISO/IEC 27001",
      "NIST SP 800-53",
      "GDPR/RGPD"
    ],
    answer: 1,
    explanation: "ISO/IEC 27001 est la norme certifiable qui définit les exigences pour établir, mettre en œuvre et améliorer un SMSI. Elle repose sur le cycle PDCA (Plan-Do-Check-Act) et est reconnue internationalement."
  },
  {
    id: 11,
    chapter: "Chapitre 1 — Introduction",
    type: "qcm",
    question: "Le phishing est principalement une attaque de type :",
    options: [
      "Technique — exploitation d'une faille logicielle",
      "Physique — accès physique non autorisé",
      "Ingénierie sociale — manipulation psychologique",
      "Réseau — interception de paquets"
    ],
    answer: 2,
    explanation: "Le phishing est une attaque d'ingénierie sociale qui manipule psychologiquement les victimes pour les inciter à divulguer des informations confidentielles (mots de passe, données bancaires). Il exploite la confiance, non une faille technique."
  },
  {
    id: 12,
    chapter: "Chapitre 1 — Introduction",
    type: "qcm",
    question: "Quelle action correspond à la phase 'Préjudice' (5e P) dans le principe des 5P ?",
    options: [
      "Scanner le réseau avec Nmap",
      "Installer une backdoor",
      "Voler des données ou lancer un ransomware",
      "Se déplacer latéralement dans le réseau"
    ],
    answer: 2,
    explanation: "Le Préjudice est la 5e phase — l'objectif final de l'attaque est accompli : vol de données, chiffrement par ransomware, destruction de systèmes ou perturbation de services. C'est le résultat de toutes les phases précédentes."
  },
  {
    id: 13,
    chapter: "Chapitre 1 — Introduction",
    type: "vf",
    question: "Une attaque passive modifie les données ou perturbe le système cible.",
    options: ["Vrai", "Faux"],
    answer: 1,
    explanation: "FAUX — Une attaque passive (sniffing, écoute) se contente d'observer et collecter des informations sans modifier le système. C'est l'attaque active qui modifie, perturbe ou détruit (malware, DDoS, ransomware)."
  },

  /* ─────────────────────────────────────────────
     CHAPITRE 2 — Cryptographie (Q14-Q26)
  ───────────────────────────────────────────── */
  {
    id: 14,
    chapter: "Chapitre 2 — Cryptographie",
    type: "qcm",
    question: "Avec le chiffre de César (k=3), quel est le chiffré de la lettre 'A' (position 0) ?",
    options: ["C", "D", "B", "Z"],
    answer: 1,
    explanation: "Formule : C = (P + k) mod 26 → (0 + 3) mod 26 = 3 → lettre D. Rappel de l'alphabet numéroté : A=0, B=1, C=2, D=3... Z=25."
  },
  {
    id: 15,
    chapter: "Chapitre 2 — Cryptographie",
    type: "qcm",
    question: "Quelle est la différence principale entre le chiffrement et le hachage ?",
    options: [
      "Le chiffrement est plus rapide que le hachage",
      "Le chiffrement est réversible (avec clé), le hachage est irréversible",
      "Le hachage utilise une clé publique, le chiffrement utilise une clé privée",
      "Il n'y a aucune différence"
    ],
    answer: 1,
    explanation: "Le chiffrement est réversible — avec la bonne clé, on peut retrouver le message original (déchiffrement). Le hachage est irréversible — on ne peut pas retrouver le message depuis le hash. Le hachage produit toujours une empreinte de taille fixe."
  },
  {
    id: 16,
    chapter: "Chapitre 2 — Cryptographie",
    type: "vf",
    question: "Dans le chiffrement asymétrique RSA, la clé publique est utilisée pour chiffrer et la clé privée pour déchiffrer.",
    options: ["Vrai", "Faux"],
    answer: 0,
    explanation: "VRAI — C'est le principe fondamental de RSA pour assurer la confidentialité. Pour la signature numérique c'est l'inverse : on signe avec la clé privée et on vérifie avec la clé publique."
  },
  {
    id: 17,
    chapter: "Chapitre 2 — Cryptographie",
    type: "qcm",
    question: "Quelle propriété des fonctions de hachage stipule qu'une petite modification du message produit un hash complètement différent ?",
    options: [
      "Résistance à la collision",
      "Résistance à la préimage",
      "Effet avalanche",
      "Déterminisme"
    ],
    answer: 2,
    explanation: "L'effet avalanche signifie que même un changement minime dans l'entrée (un seul bit) produit un hash radicalement différent. Cette propriété est essentielle pour la détection de modifications. Par exemple, changer une virgule dans un document change complètement son SHA-256."
  },
  {
    id: 18,
    chapter: "Chapitre 2 — Cryptographie",
    type: "qcm",
    question: "Quelle est la taille du hash produit par SHA-256 ?",
    options: [
      "128 bits (32 caractères hexadécimaux)",
      "160 bits (40 caractères hexadécimaux)",
      "256 bits (64 caractères hexadécimaux)",
      "512 bits (128 caractères hexadécimaux)"
    ],
    answer: 2,
    explanation: "SHA-256 produit un hash de 256 bits, soit 64 caractères hexadécimaux. C'est la fonction recommandée actuellement, contrairement à MD5 (128 bits, obsolète) et SHA-1 (160 bits, vulnérable)."
  },
  {
    id: 19,
    chapter: "Chapitre 2 — Cryptographie",
    type: "qcm",
    question: "Pour RSA avec p=17, q=11, quelle est la valeur de n (module de chiffrement) ?",
    options: ["187", "160", "28", "143"],
    answer: 0,
    explanation: "n = p × q = 17 × 11 = 187. Le module n est utilisé dans les deux clés (publique et privée). φ(n) = (p-1)(q-1) = 16 × 10 = 160."
  },
  {
    id: 20,
    chapter: "Chapitre 2 — Cryptographie",
    type: "vf",
    question: "Le chiffre de Vigenère est plus sécurisé que le César car il utilise plusieurs décalages différents pour chaque lettre.",
    options: ["Vrai", "Faux"],
    answer: 0,
    explanation: "VRAI — Vigenère utilise une clé composée de plusieurs lettres, chaque lettre appliquant un décalage différent. Cela rend l'analyse fréquentielle directe impossible. Cependant, il reste vulnérable à l'analyse de Kasiski si la clé est courte."
  },
  {
    id: 21,
    chapter: "Chapitre 2 — Cryptographie",
    type: "qcm",
    question: "Quel est le principal avantage du chiffrement symétrique par rapport à l'asymétrique ?",
    options: [
      "Il n'a pas de problème de distribution de clé",
      "Il est beaucoup plus rapide (100 à 1000 fois)",
      "Il permet la signature numérique",
      "Il utilise des clés plus longues"
    ],
    answer: 1,
    explanation: "Le chiffrement symétrique est 100 à 1000 fois plus rapide que l'asymétrique. C'est pourquoi en pratique on utilise un système hybride : l'asymétrique pour échanger la clé secrète, puis le symétrique (AES) pour chiffrer les données volumineuses."
  },
  {
    id: 22,
    chapter: "Chapitre 2 — Cryptographie",
    type: "qcm",
    question: "À quoi sert une infrastructure PKI (Public Key Infrastructure) ?",
    options: [
      "À générer des mots de passe sécurisés",
      "À gérer les clés cryptographiques et les certificats numériques",
      "À filtrer le trafic réseau malveillant",
      "À analyser les logs de connexion"
    ],
    answer: 1,
    explanation: "La PKI gère l'ensemble du cycle de vie des clés et certificats numériques : création, distribution, révocation. Elle comprend l'AC (Autorité de Certification), la RA (Registration Authority) et le CMS (Certificate Management System). Elle protège contre les attaques MITM."
  },
  {
    id: 23,
    chapter: "Chapitre 2 — Cryptographie",
    type: "qcm",
    question: "Avec Vigenère, message = BONJOUR et clé = CLE. Quel est le chiffré de la 1re lettre B(1) avec C(2) ?",
    options: ["E", "D", "C", "F"],
    answer: 1,
    explanation: "Formule : Ci = (Pi + Ki) mod 26 → (1 + 2) mod 26 = 3 → lettre D. (A=0, B=1, C=2, D=3...) Le résultat complet est DZRLZYT."
  },
  {
    id: 24,
    chapter: "Chapitre 2 — Cryptographie",
    type: "vf",
    question: "MD5 est recommandé pour le stockage sécurisé des mots de passe car il est rapide.",
    options: ["Vrai", "Faux"],
    answer: 1,
    explanation: "FAUX — MD5 est obsolète et ne doit jamais être utilisé pour les mots de passe. Des collisions sont connues (deux messages différents donnent le même hash). Pour les mots de passe, il faut utiliser bcrypt, Argon2 ou PBKDF2 qui sont lents par conception (résistance au brute-force)."
  },
  {
    id: 25,
    chapter: "Chapitre 2 — Cryptographie",
    type: "qcm",
    question: "La signature numérique garantit quelle(s) propriété(s) de sécurité ?",
    options: [
      "Confidentialité uniquement",
      "Disponibilité uniquement",
      "Authenticité, Intégrité et Non-répudiation",
      "Confidentialité et Disponibilité"
    ],
    answer: 2,
    explanation: "La signature numérique garantit : l'Authenticité (vérifier l'identité de l'expéditeur), l'Intégrité (le message n'a pas été modifié) et la Non-répudiation (l'expéditeur ne peut pas nier avoir signé). Elle NE garantit PAS la confidentialité."
  },
  {
    id: 26,
    chapter: "Chapitre 2 — Cryptographie",
    type: "qcm",
    question: "Dans la transposition par colonnes avec clé JETON, quel est l'ordre de lecture des colonnes (rang alphabétique) ?",
    options: [
      "J=1, E=2, T=3, O=4, N=5",
      "E=1, J=2, N=3, O=4, T=5",
      "T=1, O=2, N=3, J=4, E=5",
      "J=5, E=1, T=4, O=3, N=2"
    ],
    answer: 1,
    explanation: "Le rang alphabétique des lettres de JETON : E=1 (1er alphabétiquement), J=2, N=3, O=4, T=5. Les colonnes sont lues dans cet ordre, pas l'ordre original du mot-clé."
  },

  /* ─────────────────────────────────────────────
     CHAPITRE 3 — Sécurité des systèmes (Q27-Q39)
  ───────────────────────────────────────────── */
  {
    id: 27,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "qcm",
    question: "Dans le modèle de contrôle d'accès MAC (Mandatory Access Control), qui définit les règles d'accès ?",
    options: [
      "Le propriétaire du fichier",
      "L'utilisateur qui accède à la ressource",
      "Le système ou une politique centrale imposée",
      "L'administrateur réseau uniquement"
    ],
    answer: 2,
    explanation: "Dans MAC, les règles fixes d'accès sont imposées par le système ou une politique centrale. Les utilisateurs NE peuvent PAS modifier ces règles. Chaque ressource et utilisateur a un niveau de sécurité. Exemples : systèmes militaires, contextes gouvernementaux."
  },
  {
    id: 28,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "qcm",
    question: "Quelle commande Linux change les permissions d'un fichier en lecture+écriture+exécution pour le propriétaire, lecture+exécution pour le groupe, et lecture seule pour les autres ?",
    options: [
      "chmod 755",
      "chmod 644",
      "chmod 777",
      "chmod 500"
    ],
    answer: 0,
    explanation: "chmod 755 : 7=rwx (propriétaire), 5=r-x (groupe), 5=r-x (autres). r=4, w=2, x=1. 7=4+2+1, 5=4+0+1, 4=4+0+0. C'est la permission classique des scripts et exécutables."
  },
  {
    id: 29,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "vf",
    question: "Dans RBAC (Role-Based Access Control), les permissions sont attribuées directement à chaque utilisateur individuellement.",
    options: ["Vrai", "Faux"],
    answer: 1,
    explanation: "FAUX — Dans RBAC, les permissions sont attribuées à des RÔLES, et les utilisateurs reçoivent un ou plusieurs rôles. Cela simplifie la gestion : au lieu de gérer des permissions pour 1000 employés, on gère quelques rôles (admin, manager, comptable...)."
  },
  {
    id: 30,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "qcm",
    question: "Quelle est la valeur numérique de la permission 'rw-' (lecture + écriture, pas d'exécution) en Linux ?",
    options: ["5", "6", "7", "4"],
    answer: 1,
    explanation: "r=4, w=2, x=1. rw- = 4+2+0 = 6. Exemples courants : rw-r--r-- = 644 (fichiers standards), rwxr-xr-x = 755 (scripts/exécutables), rwx------ = 700 (fichiers privés)."
  },
  {
    id: 31,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "qcm",
    question: "Quel type de malware se réplique automatiquement via le réseau sans nécessiter d'action humaine ?",
    options: [
      "Virus",
      "Trojan (Cheval de Troie)",
      "Ver (Worm)",
      "Adware"
    ],
    answer: 2,
    explanation: "Le Ver (Worm) se propage automatiquement dans le réseau sans intervention humaine, en exploitant des vulnérabilités réseau. Exemple : WannaCry. Contrairement au virus qui nécessite qu'un utilisateur exécute un fichier infecté."
  },
  {
    id: 32,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "qcm",
    question: "Quel outil est le plus adapté pour la détection d'intrusions réseau (IDS) en temps réel ?",
    options: [
      "Wireshark",
      "Nmap",
      "Snort / Suricata",
      "Tripwire"
    ],
    answer: 2,
    explanation: "Snort et Suricata sont des IDS/IPS réseau qui analysent le trafic en temps réel et déclenchent des alertes (ou bloquent) en cas de comportement suspect. Wireshark est pour l'analyse manuelle, Nmap pour le scan, Tripwire pour l'intégrité des fichiers (HIDS)."
  },
  {
    id: 33,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "vf",
    question: "Un rootkit est facile à détecter car il laisse des traces visibles dans les logs du système.",
    options: ["Vrai", "Faux"],
    answer: 1,
    explanation: "FAUX — Un rootkit est conçu pour être très difficile à détecter. Il se cache en modifiant les composants du système d'exploitation (noyau), masquant sa présence dans les logs et les outils de sécurité. C'est l'une des menaces les plus dangereuses."
  },
  {
    id: 34,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "qcm",
    question: "Quelle est la séquence correcte des étapes du contrôle d'accès ?",
    options: [
      "Autorisation → Authentification → Identification",
      "Identification → Authentification → Autorisation",
      "Authentification → Identification → Autorisation",
      "Identification → Autorisation → Authentification"
    ],
    answer: 1,
    explanation: "La séquence est : 1) Identification (se présenter avec un nom d'utilisateur), 2) Authentification (prouver son identité avec un mot de passe, biométrie...), 3) Autorisation (vérifier et accorder les droits d'accès selon les règles)."
  },
  {
    id: 35,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "qcm",
    question: "Quels sont les 4 types de logs mentionnés dans le cours ?",
    options: [
      "Logs système, logs d'erreur, logs de sécurité, logs d'accès",
      "Logs système, logs d'authentification, logs d'application, logs réseau",
      "Logs utilisateur, logs admin, logs firewall, logs IDS",
      "Logs de démarrage, logs d'arrêt, logs de crash, logs d'update"
    ],
    answer: 1,
    explanation: "Les 4 types de logs couverts : Logs Système (événements OS), Logs d'Authentification (connexions SSH, sudo), Logs d'Application (web, BD, erreurs applicatives) et Logs Réseau (trafic entrant/sortant). Ensemble ils permettent de détecter les intrusions."
  },
  {
    id: 36,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "qcm",
    question: "Quelle est l'action d'un ransomware sur les fichiers de la victime ?",
    options: [
      "Supprimer définitivement tous les fichiers",
      "Voler les fichiers et les transférer à l'attaquant",
      "Chiffrer les fichiers et exiger une rançon pour la clé",
      "Surveiller les frappes du clavier"
    ],
    answer: 2,
    explanation: "Un ransomware chiffre les fichiers de la victime (les rendant inaccessibles) et exige une rançon (souvent en crypto-monnaie) pour fournir la clé de déchiffrement. Il affecte la Disponibilité et l'Intégrité du modèle CIA. Exemples : WannaCry, Ryuk, Locky."
  },
  {
    id: 37,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "vf",
    question: "Le principe du moindre privilège recommande d'accorder à chaque utilisateur tous les droits nécessaires pour son travail ET quelques droits supplémentaires par précaution.",
    options: ["Vrai", "Faux"],
    answer: 1,
    explanation: "FAUX — Le principe du moindre privilège stipule d'accorder UNIQUEMENT les droits strictement nécessaires pour accomplir sa mission, et rien de plus. Des privilèges excessifs augmentent la surface d'attaque si le compte est compromis."
  },
  {
    id: 38,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "qcm",
    question: "L'audit de sécurité des logs a pour objectif principal de :",
    options: [
      "Améliorer les performances du système",
      "Détecter des intrusions, identifier des comportements anormaux et reconstituer des attaques",
      "Compresser les données stockées",
      "Automatiser les mises à jour du système"
    ],
    answer: 1,
    explanation: "L'audit de sécurité analyse les logs pour détecter des intrusions, identifier des comportements anormaux et permettre l'analyse forensique (reconstitution d'une attaque). On cherche : tentatives de connexion échouées répétées, accès inhabituels, erreurs critiques."
  },
  {
    id: 39,
    chapter: "Chapitre 3 — Sécurité des systèmes",
    type: "qcm",
    question: "Un spyware collecte principalement :",
    options: [
      "Des ressources CPU pour le minage de crypto-monnaie",
      "Des informations sur l'utilisateur (mots de passe, historique) à son insu",
      "De l'espace disque pour stocker des fichiers malveillants",
      "Des connexions réseau pour les vendre à des botnets"
    ],
    answer: 1,
    explanation: "Un spyware (logiciel espion) collecte des informations sur l'utilisateur à son insu : mots de passe via keylogger, historique de navigation, données personnelles, frappes clavier. Ces infos sont envoyées à l'attaquant sans que la victime s'en aperçoive."
  },

  /* ─────────────────────────────────────────────
     CHAPITRE 4 — Sécurité des BDD (Q40-Q50)
  ───────────────────────────────────────────── */
  {
    id: 40,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "qcm",
    question: "Quelle commande SQL accorde à l'utilisateur 'alice' les droits SELECT et INSERT sur la table 'clients' ?",
    options: [
      "ALLOW SELECT, INSERT ON clients TO alice;",
      "GRANT SELECT, INSERT ON clients TO alice;",
      "PERMIT SELECT, INSERT ON clients FOR alice;",
      "GIVE SELECT, INSERT ON clients TO alice;"
    ],
    answer: 1,
    explanation: "La commande correcte en SQL est GRANT [privilèges] ON [table] TO [utilisateur]. Pour révoquer : REVOKE [privilèges] ON [table] FROM [utilisateur]. GRANT et REVOKE sont les commandes SQL standards de gestion des privilèges (DCL - Data Control Language)."
  },
  {
    id: 41,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "qcm",
    question: "Quelle est la méthode la plus efficace pour prévenir les injections SQL ?",
    options: [
      "Filtrer les caractères spéciaux avec des expressions régulières",
      "Limiter la longueur des champs de saisie",
      "Utiliser des requêtes préparées (Prepared Statements)",
      "Crypter tous les messages SQL"
    ],
    answer: 2,
    explanation: "Les requêtes préparées (Prepared Statements) séparent le code SQL des données. Les données saisies ne peuvent jamais être interprétées comme du code SQL. C'est la protection la plus robuste. Exemple PHP/PDO : $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?'); $stmt->execute([$id]);"
  },
  {
    id: 42,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "vf",
    question: "Dans une base de données, les mots de passe doivent être stockés en clair pour permettre leur vérification lors de la connexion.",
    options: ["Vrai", "Faux"],
    answer: 1,
    explanation: "FAUX — Les mots de passe ne doivent JAMAIS être stockés en clair. On stocke leur empreinte (hash) calculée avec une fonction sécurisée comme bcrypt ou Argon2 (avec sel). Lors de la connexion, on hache le mot de passe saisi et on compare les hashes."
  },
  {
    id: 43,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "qcm",
    question: "Qu'est-ce qu'une injection SQL aveugle (Blind SQL Injection) ?",
    options: [
      "Une injection effectuée sans connaître la structure de la base de données",
      "Une attaque où le pirate ne voit pas les résultats mais peut inférer des informations",
      "Une injection qui efface toutes les données sans laisser de trace",
      "Une attaque SQL qui ne fonctionne que de nuit"
    ],
    answer: 1,
    explanation: "L'injection aveugle (Blind SQL) est utilisée quand l'application ne retourne pas les erreurs SQL. L'attaquant pose des questions booléennes (' AND 1=1 --') et déduit les informations selon le comportement de l'application (résultat différent ou délai)."
  },
  {
    id: 44,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "qcm",
    question: "Quelle commande SQL retire TOUS les privilèges de l'utilisateur 'bob' sur la table 'commandes' ?",
    options: [
      "DELETE PRIVILEGES ON commandes FROM bob;",
      "REMOVE ALL FROM bob ON commandes;",
      "REVOKE ALL PRIVILEGES ON commandes FROM bob;",
      "CANCEL GRANT ON commandes TO bob;"
    ],
    answer: 2,
    explanation: "La commande est REVOKE ALL PRIVILEGES ON [table] FROM [utilisateur]. Pour retirer un privilège spécifique : REVOKE INSERT ON table_name FROM bob. REVOKE est l'opposé de GRANT."
  },
  {
    id: 45,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "qcm",
    question: "La règle 3-2-1 des sauvegardes recommande :",
    options: [
      "3 administrateurs, 2 serveurs, 1 base de données",
      "3 copies, sur 2 types de supports, dont 1 hors site",
      "Sauvegardes toutes les 3h, 2 fois par semaine, 1 fois par mois",
      "3 incrémentales, 2 différentielles, 1 complète par semaine"
    ],
    answer: 1,
    explanation: "La règle 3-2-1 : 3 copies des données (1 principale + 2 sauvegardes), sur 2 types de supports différents (ex: disque dur + cloud), dont 1 copie hors site (protection contre incendie, inondation, vol physique). C'est le standard de l'industrie."
  },
  {
    id: 46,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "vf",
    question: "Le TDE (Transparent Data Encryption) chiffre automatiquement toutes les données de la base sans nécessiter de modifications dans le code de l'application.",
    options: ["Vrai", "Faux"],
    answer: 0,
    explanation: "VRAI — Le TDE est transparent pour l'application. Il chiffre les données au niveau du stockage (fichiers de la base) automatiquement. L'application continue de fonctionner normalement sans modification. C'est un chiffrement au repos (at-rest encryption)."
  },
  {
    id: 47,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "qcm",
    question: "Lors d'une injection SQL classique, un attaquant saisit 'admin' --' dans le champ username. Quel est l'effet sur la requête SQL ?",
    options: [
      "La requête est bloquée par le serveur",
      "Le commentaire -- ignore la vérification du mot de passe",
      "La base de données est supprimée",
      "L'utilisateur est redirigé vers une page d'erreur"
    ],
    answer: 1,
    explanation: "-- est un commentaire SQL. Tout ce qui suit est ignoré. La requête devient : SELECT * FROM users WHERE username = 'admin' -- ' AND password='...' → La vérification du mot de passe est court-circuitée ! L'attaquant accède au compte admin sans mot de passe."
  },
  {
    id: 48,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "qcm",
    question: "Quelle type de sauvegarde copie UNIQUEMENT les données modifiées depuis la dernière sauvegarde (de n'importe quel type) ?",
    options: [
      "Sauvegarde complète",
      "Sauvegarde différentielle",
      "Sauvegarde incrémentale",
      "Sauvegarde miroir"
    ],
    answer: 2,
    explanation: "La sauvegarde incrémentale copie uniquement les modifications depuis la DERNIÈRE sauvegarde (quelle qu'elle soit). La différentielle copie les modifications depuis la DERNIÈRE sauvegarde COMPLÈTE. L'incrémentale est plus rapide mais la restauration nécessite plus d'étapes."
  },
  {
    id: 49,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "qcm",
    question: "Dans la sécurisation des connexions à une BDD, que permet SSL/TLS ?",
    options: [
      "Stocker les mots de passe de manière chiffrée",
      "Chiffrer le canal de communication entre l'application et la base de données",
      "Vérifier l'identité des utilisateurs par biométrie",
      "Détecter les injections SQL dans les requêtes"
    ],
    answer: 1,
    explanation: "SSL/TLS chiffre le canal de communication (en transit). Cela protège les données échangées entre l'application et le serveur de base de données contre les interceptions (attaque Man-in-the-Middle). Sans SSL, les requêtes et résultats transitent en clair sur le réseau."
  },
  {
    id: 50,
    chapter: "Chapitre 4 — Sécurité des BDD",
    type: "qcm",
    question: "Quelle activité suspecte sur une base de données peut indiquer une tentative d'exfiltration de données ?",
    options: [
      "Un utilisateur qui consulte son propre dossier",
      "Une requête SELECT retournant 1 million de lignes à 3h du matin",
      "Un administrateur qui crée un nouvel utilisateur",
      "Une mise à jour planifiée du schéma de la base"
    ],
    answer: 1,
    explanation: "Une requête SELECT retournant une quantité anormalement grande de données en dehors des heures normales est un signe d'alerte fort d'exfiltration de données. La surveillance des accès (audit) doit détecter ce type d'activité : volume inhabituel, horaires anormaux, utilisateur inhabituel."
  }
];
