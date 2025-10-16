// src/pages/FileGuidelinesPage.tsx
import React from 'react'
import { FileText, Image, Type, Ruler, Droplets, Layers, CheckCircle2, AlertTriangle, Upload } from 'lucide-react'
import { cn } from '../lib/utils'

const Card: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className }) => (
  <article className={cn(
    'bg-surface border border-border-color rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow',
    className
  )}>
    <header className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-text-base">{title}</h2>
    </header>
    <div className="prose prose-sm max-w-none text-text-muted">
      {children}
    </div>
  </article>
)

const Bullet: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <li className={cn('flex items-start gap-2', className)}>
    <span className="mt-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-primary/70" />
    <span className="text-sm">{children}</span>
  </li>
)

const FileGuidelinesPage: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-text-base mb-3">Failu sagatave & maketa iesūtīšana</h1>
          <p className="text-lg text-text-base  max-w-3xl mx-auto">
            Lai nodrošinātu perfektu drukas kvalitāti un ātru izpildi, lūdzu, sekojiet zemāk redzamajiem ieteikumiem.
          </p>
        </div>

        {/* Grid: pamata prasības */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <Card title="Faila formāts" icon={<FileText size={20} />}>
            <ul className="space-y-2">
              <Bullet><strong>PDF (vēlams PDF/X-1a vai PDF/X-4)</strong> — drošākais variants drukai.</Bullet>
              <Bullet>Neiesakām <strong>Word/PowerPoint</strong> — var mainīties fonti/izkārtojums.</Bullet>
            </ul>
          </Card>

          <Card title="Krāsu režīms" icon={<Droplets size={20} />}>
            <ul className="space-y-2">
              <Bullet><strong>CMYK</strong> krāsu režīms (nevis RGB).</Bullet>
              <Bullet>Krāsu atšķirības starp ekrānu un druku ir normālas (ekrāns = RGB, apgaismots).</Bullet>
            </ul>
          </Card>

          <Card title="Izšķirtspēja" icon={<Image size={20} />}>
            <ul className="space-y-2">
              <Bullet><strong>300 dpi</strong> attēli (pie faktiskā drukas izmēra).</Bullet>
              <Bullet>Izvairieties no “izstieptiem”/neasas kvalitātes attēliem.</Bullet>
            </ul>
          </Card>

          <Card title="Bleed (uzlaide) & drošās malas" icon={<Ruler size={20} />}>
            <ul className="space-y-2">
              <Bullet><strong>Bleed: 3 mm</strong> visapkārt.</Bullet>
              <Bullet><strong>Drošā mala: 3–5 mm</strong> (neizvietojiet svarīgu tekstu pārāk tuvu malai).</Bullet>
              <Bullet>Atzīmējiet <strong>crop marks</strong></Bullet>
            </ul>
          </Card>

          <Card title="Fonti & kontūras" icon={<Type size={20} />}>
            <ul className="space-y-2">
              <Bullet>PDF failos fonti - pārveidoti par <strong>līknēm (convert to curves / create outlines)</strong>.</Bullet>
              <Bullet>Ja sūtāt atvērtu failu (AI/INDD), pievienojiet <strong>fontus un linkotos attēlus</strong>.</Bullet>
            </ul>
          </Card>

          <Card title="Pārklāšanās & melnais" icon={<Layers size={20} />}>
            <ul className="space-y-2">
              <Bullet><strong>Overprint</strong>: lietojiet apzināti; melnajam tekstam parasti.</Bullet>
              <Bullet><strong>Melns blīvam laukam</strong>: “rich black”, piem. <code>C60 M40 Y40 K100</code>.</Bullet>
            </ul>
          </Card>
        </div>

        {/* Checklist + Upload info */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="bg-surface border border-border-color rounded-2xl p-5 md:p-6 shadow-lg">
            <header className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 size={20} />
              </div>
              <h2 className="text-xl font-semibold text-text-base">Ātrā pārbaudes lapa (pirms sūtīšanas)</h2>
            </header>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-text-muted">
              <li>✓ Formāts: <strong>PDF/X</strong> (vai drukai draudzīgs formāts)</li>
              <li>✓ Krāsu režīms: <strong>CMYK</strong></li>
              <li>✓ Izšķirtspēja: <strong>300 dpi</strong></li>
              <li>✓ Bleed: <strong>3 mm & drošās malas ievērotas</strong></li>
              <li>✓ Fonti: pārveidoti par <strong>līknēm (convert to curves / create outlines)</strong>.</li>
            </ul>
          </article>

          <article className="bg-surface border border-border-color rounded-2xl p-5 md:p-6 shadow-lg">
            <header className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Upload size={20} />
              </div>
              <h2 className="text-xl font-semibold text-text-base">Kā iesūtīt failus</h2>
            </header>
            <div className="prose prose-sm max-w-none text-text-muted">
              <ol className="list-decimal pl-5 space-y-2">
                <li>Sūtiet uz <a className="text-primary hover:underline" href="mailto:info@printstudio.lv">info@printstudio.lv</a> (līdz ~20 MB).</li>
                <li>Lieliem failiem izmantojiet <strong>WeTransfer/Dropbox/Google Drive</strong>.</li>
                <li>Faila nosaukums: <code>Uzvards_Projekts_Formāts_Puses.pdf</code> (piem., <em>Bērziņš_Vizītkarte_A4_2x.pdf</em>).</li>
              </ol>
            </div>
          </article>
        </div>

        {/* Lejupielādes sagataves */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-text-base mb-4">Lejupielādējamas sagataves</h2>
          <p className="text-text-muted mb-4">Izmantojiet gatavas sagataves ar pareiziem izmēriem un uzlaidēm. (Aizstāj saites ar savām.)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Vizītkarte 90×50 mm (+3 mm bleed)', href: '/templates/visiitkarte-90x50.zip' },
              { title: 'A4 skrejlapa (+3 mm bleed)', href: '/templates/skrejlapa-a4.zip' },
              { title: 'A3 plakāts (+3 mm bleed)', href: '/templates/plakats-a3.zip' },
              { title: 'Roll-up 85×200 cm', href: '/templates/rollup-85x200.zip' },
            ].map((t, i) => (
              <a key={i} href={t.href} className="group block rounded-xl border border-border-color bg-surface p-4 shadow hover:shadow-lg transition">
                <div className="mb-2 font-medium text-text-base group-hover:text-primary">{t.title}</div>
                <div className="text-sm text-text-muted">AI, PDF, PNG</div>
              </a>
            ))}
          </div>
        </div>

        {/* Brīdinājums / noderīga info */}
        <div className="mt-10 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="mt-0.5" size={18} />
          <p className="text-sm">
            Ja maketā tiks konstatētas problēmas (krāsu profils, bleed, izšķirtspēja u.c.), mēs ar jums sazināsimies pirms drukas.
            Nepilnību labošanas darbi var būt par papildu maksu.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a href="mailto:info@printstudio.lv" className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-white font-semibold hover:opacity-95 transition">
            Jautājumi par failu sagatavi? Rakstiet mums
          </a>
        </div>
      </div>
    </section>
  )
}

export default FileGuidelinesPage
