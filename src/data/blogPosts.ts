// src/data/blogPosts.ts

export interface BlogPost {
  id: string; // Unikāls identifikators (var būt URL draudzīgs slug)
  title: string;
  date: string; // ISO formāta datums vai vienkārši string
  author: string;
  image: string; // Ceļš uz attēlu VAI URL (galvenais attēls)
  excerpt: string; // Īss apraksts priekšskatījumam
  content: string; // Pilns saturs (var būt HTML vai Markdown)
  tags: string[]; // Atslēgvārdi filtrēšanai
}

export const blogPosts: BlogPost[] = [
  {
    id: 'modern-print-trends-2025',
    title: 'Modernās drukas tendences 2025. gadā',
    date: '2025-04-28',
    author: 'Jānis Bērziņš',
    image:
      'https://cdn.pixabay.com/photo/2017/03/13/07/33/plotter-2138990_1280.jpg',
    excerpt:
      'Apskatām jaunākās tendences drukas pasaulē — no ilgtspējīgiem materiāliem līdz digitālai personalizācijai un automatizācijai.',
    content: `
      <h2>Ievads drukas nākotnē</h2>
      <p>Drukas industrija 2025. gadā turpina strauji mainīties: pieaug pieprasījums pēc personalizācijas, īsiem izpildes termiņiem un videi draudzīgiem risinājumiem. Šajā rakstā īsi apkopoju virzienus, kas reāli ietekmē klientu rezultātu un budžetu.</p>

      <h3>1) Ilgtspējība kā standarts</h3>
      <ul>
        <li>Pārstrādāts un FSC sertificēts papīrs</li>
        <li>Augu bāzes vai zema VOC tintes</li>
        <li>Energoefektīvas iekārtas un atkritumu samazināšana</li>
      </ul>

      <h3>2) Masas personalizācija</h3>
      <p>Digitālās drukas līnijas ļauj mainīt dizainu katrai vienībai (vārdam, QR kodam, seriālam). Tas īpaši strādā dāvanām un lojalitātes kampaņām.</p>

      <h3>3) Automatizācija un integrācijas</h3>
      <p>No tiešsaistes pasūtījumiem līdz automātiskai failu pārbaudei — process kļūst ātrāks un precīzāks, samazinot cilvēciskās kļūdas.</p>

      <h3>4) Tekstils un DTF uzvaras gājiens</h3>
      <p>Universāla, noturīga un ekonomiska mazās sērijās — tāpēc DTF turpina izspiest vecākas metodes tur, kur vajadzīga elastība.</p>

      <p><strong>Kopsavilkums:</strong> Ilgtspējība, automatizācija un personalizācija — trīs pīlāri, kas 2025. gadā nodrošina labāko cenas/rezultāta attiecību.</p>
    `,
    tags: ['Tehnoloģijas', 'Dizains', 'Ilgtspējība', 'Trends'],
  },
  {
    id: 'choosing-right-paper',
    title: 'Kā izvēlēties pareizo papīru savam projektam?',
    date: '2025-04-15',
    author: 'Anna Ozoliņa',
    image:
      'https://cdn.pixabay.com/photo/2016/07/31/14/37/paper-1559010_1280.jpg',
    excerpt:
      'Papīra svars, apdare un baltums ietekmē krāsu, asumu un kopējo premium sajūtu. Šeit – praktisks ceļvedis.',
    content: `
      <h2>Papīra nozīme</h2>
      <p>Pareizā papīra izvēle var uzlabot uztveri līdz pat 50% — vizītkartes šķiet stingrākas, bukleti košāki, bet plāns plakāts ārā ātri nodilst.</p>

      <h3>Galvenie kritēriji</h3>
      <ol>
        <li><strong>Svars (gsm):</strong> 90–130 gsm bukletiem, 170–250 gsm afišām, 300–450 gsm vizītkartēm.</li>
        <li><strong>Apdare:</strong> matēts (elegants), glancēts (košs), zīdains (premium). Teksturēti papīri akcentiem.</li>
        <li><strong>Baltums/Krāsa:</strong> siltāks tonis mīkstina, aukstāks — padara “tehniskāku”.</li>
        <li><strong>Caurspīdīgums (opacity):</strong> svarīgi divpusējai drukai, lai teksts nelīstu cauri.</li>
      </ol>

      <h3>Ieteikumi pēc pielietojuma</h3>
      <ul>
        <li>Vizītkartes — 350–450 gsm, matēts vai soft-touch lamināts.</li>
        <li>Brošūras — 170–200 gsm iekšlapām, 250–300 gsm vākiem.</li>
        <li>Plakāti iekštelpām — 170–200 gsm; ārtelpām — ūdensizturīgs materiāls + lamināts.</li>
      </ul>

      <p><strong>Padoms:</strong> ja neesi pārliecināts, izvēlies par vienu soli biezāku — taktilā sajūta bieži izšķir premium iespaidu.</p>
    `,
    tags: ['Materiāli', 'Padomi', 'Dizains'],
  },
  {
    id: 'large-format-printing-tips',
    title: 'Lielformāta drukas noslēpumi: Padomi iespaidīgiem rezultātiem',
    date: '2025-03-30',
    author: 'Mārtiņš Kalniņš',
    image:
      'https://images.unsplash.com/photo-1706895040634-62055892cbbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    excerpt:
      'Pareizs DPI, skatīšanās distance un materiālu izvēle nosaka, vai baneris izskatīsies ass arī no 1–2 metriem.',
    content: `
      <h2>Kas ir lielformāta druka?</h2>
      <p>Viss virs A2 formāta — baneri, roll-up, skatlogi, auto uzlīmes, sienas grafikas. Te kļūdas kļūst redzamas lielā mērogā.</p>

      <h3>Sagatavošana drukai</h3>
      <ul>
        <li><strong>Izšķirtspēja:</strong> 300 dpi mazajiem materiāliem; 100–150 dpi lielformātam, ja skatīšanās distance ≥ 1,5 m.</li>
        <li><strong>Krāsu profils:</strong> CMYK; vēl labāk — pieprasīt mūsu ICC profilu konkrētajam materiālam.</li>
        <li><strong>Drošības zonas un apgriešana:</strong> atstāj 3–5 mm bleed un 30–50 mm maliņas auklām vai kederiem.</li>
      </ul>

      <h3>Materiālu izvēle</h3>
      <ul>
        <li>PVC baneris (frontlit, mesh) — izturīgs āram.</li>
        <li>Roll-up plēve — stabilitātei pret “čūpošanu”.</li>
        <li>Fotopapīrs/kanva — iekštelpu premium izskatam.</li>
      </ul>

      <p><strong>Pro padoms:</strong> skatlogiem izmanto “one-way vision” vai četras kārtas plēvi gaismas spēlei.</p>
    `,
    tags: ['Tehnoloģijas', 'Padomi', 'Lielformāts'],
  },
  {
    id: 'uv-printing-advantages',
    title: 'UV drukas priekšrocības dažādiem materiāliem',
    date: '2025-03-10',
    author: 'Jānis Bērziņš',
    image:
      'https://img.freepik.com/premium-photo/large-format-printing-equipment-creates-bright-highquality-images-paper-commercial-use_1062399-17054.jpg?semt=ais_hybrid&w=740&q=80',
    excerpt:
      'UV druka ļauj drukāt uz koka, stikla, metāla un plastmasas ar tūlītēju nožūšanu un augstu noturību.',
    content: `
      <h2>Kas ir UV druka?</h2>
      <p>UV tinti sacietē UV gaisma, tāpēc druka nožūst uzreiz, neizsmērējas un labi turas uz neuzsūcošām virsmām.</p>

      <h3>Galvenās priekšrocības</h3>
      <ul>
        <li><strong>Ātra žūšana</strong> — tūlītēja apstrāde, nav žūšanas paužu.</li>
        <li><strong>Daudzveidīgi materiāli</strong> — koks, stikls, metāls, akrils, ABS, PP u.c.</li>
        <li><strong>Augsta noturība</strong> — pret skrāpējumiem un mitrumu, īpaši ar laku/reljefu.</li>
        <li><strong>Reljefa un lakas efekti</strong> — spot gloss, braila imitācija, taktili akcenti.</li>
      </ul>

      <h3>Pielietojums</h3>
      <p>Suvenīri, zīmes, industriālie paneļi, personalizēti interjera elementi. Ideāli, ja nepieciešama “wow” faktora faktūra.</p>
    `,
    tags: ['Tehnoloģijas', 'Materiāli', 'Inovācijas'],
  },

  /* === JAUNIE IZGLĪTOJOŠIE SEO RAKSTI PAR ATŠĶIRĪBĀM === */

  {
    id: 'sublimation-vs-dtf-vs-screen',
    title: 'Sublimācija vs DTF vs Sietspiede: kuru apdruku izvēlēties?',
    date: '2025-10-02',
    author: 'Aivis Veinbergs',
    image:
      'https://cdn2.bigcommerce.com/server500/cd6a7/images/stencil/original/image-manager/different-printing-methods.jpg',
    excerpt:
      'Salīdzinām trīs populārākās tekstila apdrukas metodes pēc kvalitātes, ilgmūžības, izmaksām un piemērotības dažādiem projektiem.',
    content: `
      <h2>Kāpēc salīdzinājums ir svarīgs?</h2>
      <p>Pareiza tehnoloģija nosaka izskatu, noturību un cenas/termiņa balansu. Šeit — skaidra tabula un reāli piemēri.</p>

      <h3>Īsumā par metodēm</h3>
      <ul>
        <li><strong>Sublimācija:</strong> krāsa iesūcas materiālā. Ideāli gaišiem poliestera izstrādājumiem un krūzēm ar pārklājumu.</li>
        <li><strong>DTF:</strong> drukā uz plēves un pārnes uz auduma. Elastīga, detalizēta, der gandrīz visiem audumiem (arī tumšiem).</li>
        <li><strong>Sietspiede:</strong> krāsa tiek spiesta caur sietu tieši uz materiāla. Ekonomiska lielos apjomos, ļoti spilgtas krāsas.</li>
      </ul>

      <h3>Salīdzinājums</h3>
      <ul>
        <li><strong>Kvalitāte/Detalizācija:</strong> DTF ≈ Sublimācija &gt; Sietspiede smalkām niansēm.</li>
        <li><strong>Izturība:</strong> Sietspiede &amp; DTF; sublimācija — izcili noturīga, ja pareizs materiāls.</li>
        <li><strong>Apjoms:</strong> Mazas sērijas — DTF; Lieli apjomi — sietspiede.</li>
        <li><strong>Materiāli:</strong> Sublimācijai vajag poliestera saturu/grafikas pārklājumu; DTF un sietspiede — plašāks klāsts.</li>
      </ul>

      <h3>Ko izvēlēties?</h3>
      <p><em>Promo krekli 100–500 gab.</em> — sietspiede. <em>Nelieli personalizēti pasūtījumi</em> — DTF. <em>Sporta krekli ar košām fotogrāfijām</em> — sublimācija.</p>

      <p><strong>Padoms:</strong> ja failā daudz krāsu pāreju un mazs apjoms — DTF būs labākais kompromiss starp cenu un kvalitāti.</p>
    `,
    tags: ['Apdruka', 'Tekstils', 'DTF', 'Sietspiede', 'Sublimācija', 'Salīdzinājums'],
  },
  {
    id: 'cmyk-vs-rgb',
    title: 'CMYK vs RGB: krāsu atšķirības drukā un kā izvairīties no vilšanās',
    date: '2025-10-02',
    author: 'Aivis Veinbergs',
    image:
      'https://cyansolutions.com/wp-content/uploads/2020/05/blog-rgb-and-cmyk-explained.jpg',
    excerpt:
      'Uzzini, kāpēc drukā krāsas izskatās citādi nekā ekrānā, un kā pareizi sagatavot failu, lai saglabātu toni.',
    content: `
      <h2>Kāpēc RGB ≠ CMYK?</h2>
      <p>RGB ir gaismas krāsas ekrāniem; CMYK — pigmenti drukai. CMYK krāsu telpa ir šaurāka, tāpēc daļa “neona” toņu drukā nav sasniedzami 1:1.</p>

      <h3>Kā sagatavot failu</h3>
      <ul>
        <li>Pārvērt dizainu CMYK pirms drukas.</li>
        <li>Izmanto ICC profilu konkrētajam materiālam/iekārtai.</li>
        <li>Izvairies no 100% piesātinājuma neona toņiem — tie izbalēs.</li>
      </ul>

      <h3>Krāsu pārbaude</h3>
      <p>Proof izdruka vai digitāls soft-proof ar ICC profilu palīdzēs izvairīties no pārsteigumiem. Ja krāsa ir kritiska, lūdz paraugu.</p>

      <p><strong>Kopsavilkums:</strong> domā CMYK kategorijās jau dizaina sākumā — tā ietaupīsi laiku un nervus.</p>
    `,
    tags: ['Krāsas', 'CMYK', 'RGB', 'Faili', 'Druka'],
  },
  {
    id: 'vector-vs-raster',
    title: 'Vektors vs rastrs: kad kurš formāts ir labākais drukai?',
    date: '2025-10-02',
    author: 'Iveta Veinberga',
    image:
      'https://www.simplyprint.net/wp-content/uploads/2020/10/Vector-v-raster-1024x640.jpg',
    excerpt:
      'Logotipi un piktogrammas vienmēr vektorā, foto — rastrā. Bet ir arī “pelēkās zonas”. Te – praktiskas vadlīnijas.',
    content: `
      <h2>Kas ir vektors un rastrs?</h2>
      <p>Vektors (AI, PDF, CDR, SVG) balstās uz līknēm, tāpēc paliek ass jebkurā izmērā. Rastrs (JPG, PNG, TIFF) ir pikseļi — palielinot kļūst miglains.</p>

      <h3>Ko likt vektorā?</h3>
      <ul>
        <li>Logotipi, piktogrammas, teksts, vienkāršas ilustrācijas.</li>
        <li>Uzlīmju griešanas kontūras, sietspiedes separācijas.</li>
      </ul>

      <h3>Ko likt rastrā?</h3>
      <ul>
        <li>Fotogrāfijas, faktūras, gaismas/ēnu efekti.</li>
        <li>Digitālās gleznas ar daudzām niansēm.</li>
      </ul>

      <h3>Hibrīdais risinājums</h3>
      <p>Bieži labākais rezultāts ir apvienot: vektorā — teksti un maliņas, rastrā — foto. Eksportē PDF ar 300 dpi attēliem.</p>
    `,
    tags: ['Faili', 'Dizains', 'Druka', 'Vektors', 'Rastrs'],
  },
  {
    id: 'stickers-monomer-polymer-cast',
    title: 'Uzlīmju materiāli: monomērs, polimērs vai cast? Ilgmūžības ceļvedis',
    date: '2025-10-02',
    author: 'Mārtiņš Kalniņš',
    image:
      'https://www.printonline.ae/media/catalog/product/cache/1/image/1800x/5ebd91fbb2977711334c8748990c7905/v/i/vinyl_prod_1.jpg',
    excerpt:
      'Kā izvēlēties pareizo vinilu auto, skatlogiem vai interjeram? Salīdzinām saraušanos, elastību, UV noturību un cenu.',
    content: `
      <h2>Trīs galvenie PVC plēvju tipi</h2>
      <ul>
        <li><strong>Monomērs:</strong> budžeta risinājums līdz ~2–3 gadiem; iekšdarbiem, plakaniem paneļiem.</li>
        <li><strong>Polimērs:</strong> 3–5+ gadi; mazāka saraušanās, piemērots viegli ieliektām virsmām, ārtelpām.</li>
        <li><strong>Cast:</strong> premium; elastīgs, formējams 3D ieliekumos (auto pārklāšana), 7–10+ gadi.</li>
      </ul>

      <h3>Lamināts</h3>
      <p>Matēts pret atspīdumiem, glancēts krāsu intensitātei, anti-graffiti īpašiem pielietojumiem. Uz āru — lamināts obligāts.</p>

      <h3>Kopsavilkums</h3>
      <p>Plakana virsma un īss termiņš — monomērs. Ārtelpas un viegli ieliekumi — polimērs. Auto pilns pārklājums — cast.</p>
    `,
    tags: ['Uzlīmes', 'Materiāli', 'Lielformāts', 'Auto'],
  },
  {
    id: 'dtf-vs-flex',
    title: 'DTF vai termoplēves (flex) uzraksti? Estētika, noturība un cena',
    date: '2025-10-02',
    author: 'Aivis Veinbergs',
    image:
      'https://blog.ricoma.com/wp-content/uploads/2024/08/DTF-vs-screen-print-transfers-1024x640.webp',
    excerpt:
      'Kad pietiek ar vienkāršu vienkrāsas uzrakstu, bet kad vajag pilnkrāsu grafiku ar niansēm — skaidra izvēles formula.',
    content: `
      <h2>Kas atšķir DTF no flex?</h2>
      <p><strong>Flex</strong> — vienkrāsas plēve, izgriež un uzpresē. <strong>DTF</strong> — pilnkrāsu druka uz plēves ar baltu pamatkārtu, ļoti laba sīkai grafikai.</p>

      <h3>Izvēles princips</h3>
      <ul>
        <li><strong>Vienkrāsas teksti/logotipi</strong> (sporta numuri, skaidras līnijas) — flex ir lēts un ass.</li>
        <li><strong>Pilnkrāsu zīmējumi</strong> (pārejas, foto, miniatūras) — DTF.</li>
        <li><strong>Noturība</strong> — abas tehnoloģijas ir noturīgas, ja ievēro kopšanu; DTF elastīgāks lielās platībās.</li>
      </ul>

      <h3>Budžets</h3>
      <p>Mazām vienībām un vienkāršiem uzrakstiem flex parasti lētāks; sarežģītai grafikai DTF dod vairāk brīvības bez papildus izgriešanas darba.</p>
    `,
    tags: ['DTF', 'Flex', 'Tekstils', 'Apdruka', 'Salīdzinājums'],
  },
  {
    id: 'file-preflight-checklist',
    title: 'Failu sagatavošanas “preflight” kontrolsaraksts (drukai gatavs!)',
    date: '2025-10-02',
    author: 'Iveta Veinberga',
    image:
      'https://cdn.prod.website-files.com/67dd87a09a0df218fdc114d3/67dd87a09a0df218fdc12522_how-to-guides-revamp-hero.avif',
    excerpt:
      'Īss, bet pilns kontrolsaraksts, lai izvairītos no pikseļiem, “pārbīdēm” un nepareizām krāsām drukā.',
    content: `
      <h2>Obligātie soļi pirms sūtīšanas</h2>
      <ul>
        <li>Izšķirtspēja: 300 dpi (mazajiem formātiem), 100–150 dpi lielformātam ar pietiekamu skatīšanās distanci.</li>
        <li>Krāsu režīms: CMYK + ICC profils.</li>
        <li>Fonts: pārvērsti kontūrās vai iekļauti.</li>
        <li>Bleed: 3–5 mm; drošības zona: 3 mm no malas.</li>
        <li>Melnais: teksta K100; dziļais melnais lielām platībām, piem., C40 M30 Y30 K100.</li>
        <li>PDF/X-1a vai augstas kvalitātes PDF; attēli iebūvēti, ne linki.</li>
      </ul>

      <p><strong>Noteikums:</strong> zemas kvalitātes faili = garantija netiek piemērota. Ja vajag, palīdzam failus pielāgot par papildus samaksu.</p>
    `,
    tags: ['Faili', 'Padomi', 'Preflight', 'Druka'],
  },
  {
    id: 'lamination-uv-varnish',
    title: 'Lamināts vs UV laka: skrāpējumu aizsardzība un vizuālais efekts',
    date: '2025-10-02',
    author: 'Jānis Bērziņš',
    image:
      'https://parklanepress.co.uk/wp-content/uploads/2016/01/laminating.jpg',
    excerpt:
      'Kā izvēlēties starp matētu/ glancētu laminātu un spot UV laku? Aizsardzība, taktilā sajūta un brandinga efekts.',
    content: `
      <h2>Kad vajag laminātu?</h2>
      <p>Ja materiāls tiks “staipīts” (brošūras, ēdienkartes, caurlaides) vai izmantots ārā — lamināts pagarinās mūžu un pasargās no mitruma.</p>

      <h3>UV laka (pilna vai spot)</h3>
      <p>Dod spīdumu un taktilu akcentu. Spot UV kombinācijā ar matētu laminātu rada luksusa kontrastu (piem., vizītkartēm, ielūgumiem).</p>

      <h3>Ieteikums</h3>
      <p>Funkcionāliem drukdarbiem — lamināts. Premium akcentiem — spot UV virs matētas bāzes.</p>
    `,
    tags: ['Apdare', 'Lamināts', 'UV laka', 'Dizains'],
  },
];

export const getAllTags = (): string[] => {
  const allTags = blogPosts.flatMap((post) => post.tags);
  return Array.from(new Set(allTags));
};
