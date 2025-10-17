import React from 'react'
import { cn } from '../lib/utils'
import SEO from '../components/SEO'

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className='bg-background text-text-base min-h-screen py-20 md:py-28'>
      <SEO
        title='Privātuma politika | PrintStudio'
        description='Kā mēs apstrādājam un aizsargājam personas datus saskaņā ar GDPR.'
        url='/privacy-policy'
      />
      <div className='container mx-auto px-4 md:px-8 max-w-4xl'>
        <h1 className='text-3xl md:text-4xl font-bold text-text-base mb-8 md:mb-12 text-center'>
          Privātuma politika
        </h1>

        <div
          className={cn(
            'prose prose-invert prose-lg max-w-none',
            'prose-headings:text-primary prose-headings:font-semibold prose-headings:mb-3',
            'prose-p:text-text-muted prose-p:leading-relaxed prose-p:mb-2',
            'prose-ul:text-text-muted prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-1 prose-ul:pl-4',
            'prose-li:my-1 prose-li:marker:text-text-muted',
            'prose-a:text-primary hover:prose-a:underline',
            'prose-strong:text-text-base'
          )}
        >
          <section className='mb-6'>
            <h2>1. Ievads</h2>
            <p>
              Šī privātuma politika nosaka, kā <strong>SIA "PrintStudio"</strong> (reģ. Nr.{' '}
              <em>40203573489</em>), juridiskā adrese –{' '}
              <strong>Virsnieku iela 13-2, Liepāja, LV-3401</strong> (turpmāk – <em>PrintStudio</em>
              , <em>mēs</em>, <em>mūsu</em> vai <em>uzņēmums</em>) apstrādā un aizsargā personas
              datus. Mēs apstrādājam personas datus atbilstoši{' '}
              <strong>Vispārīgajai datu aizsardzības regulai (ES) 2016/679 (GDPR)</strong> un{' '}
              <strong>Fizisko personu datu apstrādes likumam</strong>.
            </p>
            <p>
              Politika attiecas uz datiem, ko iegūstam, kad apmeklējat vietni{' '}
              <strong>www.printstudio.lv</strong>, sazināties ar mums (e-pastā, tālrunī, sociālajos
              tīklos), kļūstat par klientu vai sadarbojaties ar mums ārpus vietnes (piemēram,
              studijā, slēdzot līgumus, veicot pasūtījumus).
            </p>
          </section>

          <section className='mb-6'>
            <h2>2. Datu pārzinis un kontakti</h2>
            <ul>
              <li>
                <strong>Datu pārzinis:</strong> SIA "PrintStudio"
              </li>
              <li>
                <strong>Adrese:</strong> Virsnieku iela 13-2, Liepāja, LV-3401
              </li>
              <li>
                <strong>E-pasts:</strong>{' '}
                <a href='mailto:info@printstudio.lv'>info@printstudio.lv</a>
              </li>
              <li>
                <strong>Tālrunis:</strong> <a href='tel:+37129901071'>+371 29 901 071</a>
              </li>
              <li>
                <strong>Vietne:</strong>{' '}
                <a href='https://www.printstudio.lv' rel='noopener noreferrer'>
                  www.printstudio.lv
                </a>
              </li>
            </ul>
          </section>

          <section className='mb-6'>
            <h2>3. Datu kategorijas</h2>
            <ul>
              <li>
                <strong>Identifikācijas dati:</strong> vārds, uzvārds, uzņēmums, amats.
              </li>
              <li>
                <strong>Kontakti:</strong> e-pasts, tālrunis, piegādes/norēķinu adrese.
              </li>
              <li>
                <strong>Maksājumi un līgumi:</strong> pasūtījumu informācija, rēķini, norēķinu dati
                (bez pilniem kartes datiem; tos apstrādā maksājumu pakalpojumu sniedzēji, ja
                e-komercija tiek aktivizēta).
              </li>
              <li>
                <strong>Komunikācija un mārketings:</strong> sarakste, atsauksmes, piekrišanas un
                preferences.
              </li>
              <li>
                <strong>Tehniskie un lietošanas dati:</strong> IP adrese, ierīce, pārlūks, piekļuves
                laiki, navigācija vietnē; iegūstami ar sīkdatnēm un trešo pušu rīkiem (piem., Google
                Analytics, Meta Pixel).
              </li>
            </ul>
          </section>

          <section className='mb-6'>
            <h2>4. Datu iegūšana</h2>
            <ul>
              <li>
                no jums tieši (kontaktformas, e-pasts, tālrunis, pasūtījumi, līgumi, studijas
                apmeklējums);
              </li>
              <li>automātiski, izmantojot sīkdatnes/analītiku, kad lietojat vietni;</li>
              <li>
                no trešajām pusēm (piem., maksājumu, hostinga vai mārketinga pakalpojumu
                sniedzējiem) saskaņā ar tiesību aktiem.
              </li>
            </ul>
          </section>

          <section className='mb-6'>
            <h2>5. Apstrādes mērķi</h2>
            <ul>
              <li>
                <strong>Pakalpojumu sniegšana un līguma izpilde:</strong> pasūtījumu pieņemšana,
                izpilde, klientu apkalpošana.
              </li>
              <li>
                <strong>Komunikācija:</strong> piedāvājumi, precizējumi, atbalsts.
              </li>
              <li>
                <strong>Vietnes darbība un uzlabošana:</strong> drošība, lietojamība, statistika un
                analītika.
              </li>
              <li>
                <strong>Juridisko pienākumu izpilde:</strong> grāmatvedība, nodokļi, atbildes uz
                iestāžu pieprasījumiem.
              </li>
              <li>
                <strong>Mārketings:</strong> jaunumi un piedāvājumi ar jūsu piekrišanu (plānots
                ieviest).
              </li>
              <li>
                <strong>E-komercija:</strong> kad tiks aktivizēta – pasūtījumu un apmaksas apstrāde.
              </li>
            </ul>
          </section>

          <section className='mb-6'>
            <h2>6. Tiesiskais pamats</h2>
            <ul>
              <li>
                <strong>Līgums</strong> vai darbības pirms tā noslēgšanas (GDPR 6(1)(b)).
              </li>
              <li>
                <strong>Juridisks pienākums</strong> (GDPR 6(1)(c)).
              </li>
              <li>
                <strong>Leģitīmās intereses</strong> (GDPR 6(1)(f)) – piem., pakalpojumu kvalitāte,
                vietnes drošība, krāpniecības novēršana.
              </li>
              <li>
                <strong>Piekrišana</strong> (GDPR 6(1)(a)) – sīkdatnēm, analītikai, tiešajam
                mārketingam.
              </li>
            </ul>
          </section>

          <section className='mb-6'>
            <h2>7. Glabāšanas termiņi</h2>
            <ul>
              <li>
                <strong>Līgumi un grāmatvedība:</strong> līdz 10 gadiem pēc darījuma saskaņā ar
                tiesību aktiem.
              </li>
              <li>
                <strong>Mārketinga piekrišanas:</strong> līdz piekrišanas atsaukšanai vai termiņam,
                kas noteikts iekšējā kārtībā.
              </li>
              <li>
                <strong>Sīkdatnes/analītika:</strong> saskaņā ar Sīkdatņu politiku un/vai rīku
                noklusētajiem termiņiem.
              </li>
              <li>
                <strong>Sarakste:</strong> līdz 3 gadiem vai ilgāk, ja nepieciešams strīdu vai
                prasību izskatīšanai.
              </li>
            </ul>
          </section>

          <section className='mb-6'>
            <h2>8. Drošība</h2>
            <p>
              Mēs īstenojam tehniskus un organizatoriskus pasākumus (piekļuves kontrole, šifrēšana,
              rezerves kopijas, personāla konfidencialitāte), lai aizsargātu datus pret nejaušu vai
              nelikumīgu iznīcināšanu, nozaudēšanu, izpaušanu un nesankcionētu piekļuvi.
            </p>
          </section>

          <section className='mb-6'>
            <h2>9. Datu saņēmēji un pārsūtīšana</h2>
            <ul>
              <li>
                <strong>IT/hostings un e-pasts</strong> – vietnes un komunikācijas nodrošināšanai.
              </li>
              <li>
                <strong>Grāmatvedība un maksājumi</strong> – finanšu uzskaitei un norēķiniem.
              </li>
              <li>
                <strong>Mārketings/analītika</strong> – piem., Google LLC, Meta Platforms, Inc. (ar
                atbilstošiem aizsardzības mehānismiem).
              </li>
              <li>
                <strong>Valsts iestādes</strong> – ja to pieprasa tiesību akti.
              </li>
            </ul>
            <p>
              Ja dati tiek pārsūtīti ārpus EEZ, izmantojam GDPR paredzētos aizsardzības instrumentus
              (piem., ES standarta līguma klauzulas).
            </p>
          </section>

          <section className='mb-6'>
            <h2>10. Jūsu tiesības</h2>
            <ul>
              <li>piekļūt saviem datiem;</li>
              <li>labot neprecīzus datus;</li>
              <li>
                dzēst datus (<em>tiesības tikt aizmirstam</em>);
              </li>
              <li>ierobežot apstrādi;</li>
              <li>iebilst pret apstrādi, tostarp pret tiešo mārketingu;</li>
              <li>datu pārnesamība strukturētā, mašīnlasāmā formātā;</li>
              <li>
                atsaukt piekrišanu (ja apstrāde balstās uz piekrišanu), neietekmējot iepriekšējās
                apstrādes likumību.
              </li>
            </ul>
            <p>
              Tiesību izmantošanai rakstiet uz{' '}
              <a href='mailto:info@printstudio.lv'>info@printstudio.lv</a>. Ja uzskatāt, ka jūsu
              tiesības pārkāptas, varat iesniegt sūdzību <strong>Datu valsts inspekcijā</strong>{' '}
              (www.dvi.gov.lv).
            </p>
          </section>

          <section className='mb-6'>
            <h2>11. Sīkdatnes (Cookies) un līdzīgas tehnoloģijas</h2>
            <p>
              Vietnē izmantojam nepieciešamās sīkdatnes, kā arī, ar jūsu piekrišanu, analītikas un
              mārketinga sīkdatnes (piem., Google Analytics, Meta Pixel), lai uzlabotu saturu un
              mērītu veiktspēju. Plašāka informācija, tostarp sīkdatņu veidi, glabāšanas termiņi un
              piekrišanas atsaukšana, ir sniegta atsevišķā <strong>Sīkdatņu politikā</strong>.
            </p>
          </section>

          <section className='mb-6'>
            <h2>12. Tiešais mārketings</h2>
            <p>
              Ar jūsu piekrišanu varam nosūtīt jaunumus un piedāvājumus. No mārketinga iespējams
              atteikties jebkurā laikā, sekojot norādei e-pastā vai rakstot uz{' '}
              <a href='mailto:info@printstudio.lv'>info@printstudio.lv</a>.
            </p>
          </section>

          <section className='mb-6'>
            <h2>13. E-komercija</h2>
            <p>
              Kad e-komercija tiks aktivizēta, maksājumus apstrādās licencēts maksājumu pakalpojumu
              sniedzējs. Mēs nesaņemam un neglabājam pilnus maksājumu kartes datus. Pasūtījumu dati
              tiks apstrādāti līguma izpildei, rēķinu izrakstīšanai un preču/pakalpojumu piegādei.
            </p>
          </section>

          <section className='mb-6'>
            <h2>14. Politikas izmaiņas</h2>
            <p>
              Politiku varam atjaunināt, publicējot jaunu versiju vietnē. Lūdzu, regulāri pārbaudiet
              šo lapu, lai iepazītos ar aktuālo redakciju.
            </p>
          </section>

          <section className='mb-6'>
            <h2>15. Saziņa</h2>
            <p>
              Jautājumiem par personas datu apstrādi, pieprasījumiem vai sūdzībām sazinieties ar
              mums:
              <br />
              📧 <a href='mailto:info@printstudio.lv'>info@printstudio.lv</a> &nbsp;|&nbsp; 📞{' '}
              <a href='tel:+37129901071'>+371 29 901 071</a> &nbsp;|&nbsp; 📍 Virsnieku iela 13-2,
              Liepāja, LV-3401
            </p>
          </section>
        </div>

        <p className='text-sm text-text-muted mt-10 italic'>
          Pēdējo reizi atjaunināts: 2025. gada 16. oktobrī
        </p>
        <p className='text-sm text-accent mt-4 italic font-semibold'>
          Atruna: Šis ir vispārīgs juridisks paraugs. Lūdzu, izvērtējiet un, ja nepieciešams,
          konsultējieties ar juristu, īpaši par datu nodošanu ārpus EEZ, sīkdatņu termiņiem un
          iekšējām procedūrām.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
