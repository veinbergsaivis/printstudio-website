import React from 'react';
import { cn } from '../lib/utils'; // Importējam cn

const TermsOfServicePage: React.FC = () => {
  return (
    // === KRĀSAS NOMAINĪTAS ===
    // Galvenais fons un pamata teksts
    <div className="bg-background text-text-base min-h-screen py-20 md:py-28">
      {/* Konteiners ar ierobežotu platumu lasāmībai */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* === KRĀSAS NOMAINĪTAS === */}
        <h1 className="text-3xl md:text-4xl font-bold text-text-base mb-8 md:mb-12 text-center">
          Lietošanas Noteikumi
        </h1>

        {/* --- SĀKUMS: JURIDISKAIS TEKSTS (AIZSTĀT AR REĀLO) --- */}

        {/* Izmantojam @tailwindcss/typography konsekventam stilam */}
        <div className={cn(
          "prose prose-invert prose-lg max-w-none", // Pamata stili tumšam fonam
          // Pielāgojam krāsas un stilus
          "prose-headings:text-primary prose-headings:font-semibold prose-headings:mb-3", // Virsrakstu (h2) krāsa (primārā) un stils
          "prose-p:text-text-muted prose-p:leading-relaxed prose-p:mb-2", // Paragrāfu krāsa (pieklusināta) un stils
          // Pievieno stilus citiem elementiem, ja tie parādās tekstā (piem., saraksti, saites)
          "prose-ul:text-text-muted prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-1 prose-ul:pl-4",
          "prose-ol:text-text-muted prose-ol:list-decimal prose-ol:list-inside prose-ol:space-y-1 prose-ol:pl-4",
          "prose-li:my-1 prose-li::marker:text-text-muted",
          "prose-a:text-primary hover:prose-a:underline",
          "prose-strong:text-text-base"
        )}>
          <section className="mb-6"> {/* Section tagi paliek struktūrai */}
            <h2>1. Noteikumu pieņemšana</h2>
            <p>
              Laipni lūdzam PrintStudio! Piekļūstot mūsu vietnei vai izmantojot mūsu pakalpojumus, jūs piekrītat ievērot šos Lietošanas noteikumus ("Noteikumi"). Ja nepiekrītat kādai šo Noteikumu daļai, jums nav atļauts piekļūt Pakalpojumam.
            </p>
            <p>
              [Detalizētāk aprakstiet, kā notiek piekrišana.]
            </p>
          </section>

          <section className="mb-6">
            <h2>2. Pakalpojuma izmantošana</h2>
            <p>
              Jūs piekrītat izmantot mūsu pakalpojumus tikai likumīgiem mērķiem un veidā, kas nepārkāpj citu personu tiesības, neierobežo vai nekavē citu personu Pakalpojuma izmantošanu un baudīšanu. Aizliegtā rīcība ietver citu lietotāju uzmākšanos vai neērtību radīšanu, neķītru vai aizskarošu satura pārraidīšanu vai parastās dialoga plūsmas traucēšanu Pakalpojumā.
            </p>
            <p>
              [Norādiet konkrētus lietošanas ierobežojumus, aizliegtās darbības, lietotāja pienākumus.]
            </p>
          </section>

          <section className="mb-6">
            <h2>3. Intelektuālais īpašums</h2>
            <p>
              Pakalpojums un tā sākotnējais saturs (izņemot Lietotāja nodrošināto saturu), funkcijas un funkcionalitāte ir un paliks PrintStudio un tā licences devēju ekskluzīvs īpašums. Pakalpojumu aizsargā autortiesības, preču zīmes un citi [Jūsu valsts] un ārvalstu likumi. Mūsu preču zīmes nedrīkst izmantot saistībā ar jebkuru produktu vai pakalpojumu bez PrintStudio iepriekšējas rakstiskas piekrišanas.
            </p>
          </section>

          <section className="mb-6">
            <h2>4. Lietotāja saturs</h2>
            <p>
              Jūs esat atbildīgs par saturu, ko iesniedzat vai augšupielādējat Pakalpojumā. Jūs garantējat, ka jums pieder visas tiesības uz šādu saturu vai esat ieguvis nepieciešamās atļaujas tā izmantošanai. [Detalizētāk par lietotāja satura tiesībām un atbildību.]
            </p>
          </section>

          <section className="mb-6">
            <h2>5. Atbildības ierobežojums</h2>
            <p>
              Nekādā gadījumā PrintStudio, ne tā direktori, darbinieki, partneri, aģenti, piegādātāji vai saistītās personas nav atbildīgas par jebkādiem netiešiem, nejaušiem, īpašiem, izrietošiem vai soda zaudējumiem, ieskaitot, bet neaprobežojoties ar peļņas, datu, lietošanas, nemateriālās vērtības vai citu nemateriālu zaudējumu zaudēšanu, kas rodas no (i) jūsu piekļuves Pakalpojumam vai tā izmantošanas vai nespējas piekļūt vai izmantot Pakalpojumu; ... [Turpiniet ar citiem atrunas punktiem].
            </p>
          </section>

          <section className="mb-6">
            <h2>6. Piemērojamie tiesību akti</h2>
            <p>
              Šos Noteikumus reglamentē un interpretē saskaņā ar [Jūsu valsts/reģiona] tiesību aktiem, neņemot vērā to tiesību normu kolīzijas principus.
            </p>
          </section>

          <section className="mb-6">
            <h2>7. Izmaiņas noteikumos</h2>
            <p>
              Mēs paturam tiesības pēc saviem ieskatiem jebkurā laikā mainīt vai aizstāt šos Noteikumus. Ja pārskatīšana ir būtiska, mēs centīsimies sniegt vismaz 30 dienu iepriekšēju brīdinājumu pirms jauno noteikumu stāšanās spēkā. Kas ir būtiskas izmaiņas, tiks noteikts pēc mūsu ieskatiem.
            </p>
          </section>

          <section className="mb-6">
            <h2>8. Saziņa ar mums</h2>
            <p>
              Ja jums ir kādi jautājumi par šiem Noteikumiem, lūdzu, sazinieties ar mums, izmantojot kontaktinformāciju, kas norādīta mūsu vietnes kontaktu sadaļā.
            </p>
          </section>
        </div> {/* Beidzas prose bloks */}

        {/* Pēdējās piezīmes ārpus prose bloka */}
        {/* === KRĀSAS NOMAINĪTAS === */}
        <p className="text-sm text-text-muted mt-10 italic">
          Pēdējo reizi atjaunināts: [Ievietojiet datumu]
        </p>
        {/* === KRĀSAS NOMAINĪTAS === */}
        <p className="text-sm text-accent mt-4 italic font-semibold"> {/* Izmantojam akcenta krāsu atrunai */}
          Atruna: Šis ir tikai paraugs. Lūdzu, konsultējieties ar juristu, lai izstrādātu jūsu vajadzībām atbilstošus lietošanas noteikumus.
        </p>

        {/* --- BEIGAS: JURIDISKAIS TEKSTS --- */}

      </div>
    </div>
  );
};

export default TermsOfServicePage;