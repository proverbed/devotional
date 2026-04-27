import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const FEATURES = [
  {
    icon: '📖',
    title: 'NKJV Scripture',
    desc: 'Every devotional anchored in the New King James Version of the Bible.',
  },
  {
    icon: '✨',
    title: 'AI-Powered Reflection',
    desc: 'Warm, Spirit-filled reflections connecting scripture to daily life.',
  },
  {
    icon: '🙏',
    title: 'Prayer & Declaration',
    desc: 'Personal prayer and bold faith declaration crafted for each theme.',
  },
  {
    icon: '📧',
    title: 'Newsletter-Ready',
    desc: 'Includes a compelling email subject line — ready to copy and send.',
  },
];

export function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5FF] to-[#EDE8FB]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✝️</span>
          <span className="font-bold text-[#2D1F4E] text-lg">Daily Devotional</span>
        </div>
        <button
          type="button"
          onClick={() => navigate(user ? '/admin' : '/login')}
          className="px-5 py-2 rounded-lg bg-[#7C5CBF] text-white text-sm font-semibold hover:bg-[#5B3FA0] transition-colors"
        >
          {user ? 'Go to Admin' : 'Sign in'}
        </button>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 pt-16 pb-20 max-w-3xl mx-auto">
        <div className="text-6xl mb-6">✝️</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D1F4E] leading-tight mb-4">
          Daily Devotional<br />
          <span className="text-[#7C5CBF]">Generator</span>
        </h1>
        <p className="text-lg text-[#5B3FA0] mb-10 max-w-xl mx-auto leading-relaxed">
          Generate powerful, Spirit-filled NKJV devotionals in seconds.
          Choose a theme, get a complete scripture reflection, prayer, and
          declaration — ready to share.
        </p>
        <button
          type="button"
          onClick={() => navigate(user ? '/admin' : '/login')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C5CBF] to-[#5B3FA0] text-white text-base font-bold shadow-lg hover:shadow-xl hover:opacity-90 transition-all"
        >
          ✨ {user ? 'Open Admin' : 'Get Started'}
        </button>
        <p className="mt-4 text-sm text-[#9B8AC4]">
          {user ? `Signed in as ${user.email}` : 'Sign in to generate and save devotionals'}
        </p>
      </section>

      {/* Features */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#EDE8FB]"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-[#2D1F4E] mb-2">{f.title}</h3>
              <p className="text-sm text-[#7C5CBF] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample card preview */}
      <section className="px-6 pb-24 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#EDE8FB]">
          <div className="bg-gradient-to-r from-[#7C5CBF] to-[#5B3FA0] px-8 py-7 text-white">
            <p className="text-xs tracking-widest uppercase opacity-75 mb-1">
              Daily Devotional · NKJV
            </p>
            <h2 className="text-2xl font-bold">God's Faithfulness</h2>
            <p className="text-sm opacity-70 mt-1">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="px-8 py-6 space-y-5">
            <div className="bg-[#F8F5FF] border-l-4 border-[#7C5CBF] rounded-r-xl px-5 py-4">
              <p className="text-xs font-bold text-[#7C5CBF] tracking-widest mb-2">📖 SCRIPTURE</p>
              <p className="text-[#2D1F4E] italic leading-relaxed">
                "Your faithfulness endures to all generations; You established
                the earth, and it abides."
              </p>
              <p className="text-xs font-semibold text-[#7C5CBF] mt-2">— Psalm 119:90</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#7C5CBF] tracking-widest mb-2">✨ REFLECTION</p>
              <p className="text-sm text-[#3D3050] leading-relaxed">
                God's faithfulness is not bound by circumstance or season — it
                stretches across every generation, as steady as the earth
                beneath our feet…
              </p>
            </div>
            <div className="bg-[#FFF8F0] border border-[#F5DEB3] rounded-xl px-5 py-4">
              <p className="text-xs font-bold text-[#B8860B] tracking-widest mb-2">🙏 PRAYER</p>
              <p className="text-sm text-[#3D3050] italic leading-relaxed">
                Father, thank You that Your faithfulness never wavers…
              </p>
            </div>
            <div className="bg-gradient-to-r from-[#F3F0FA] to-[#EDE8FB] rounded-xl px-5 py-4 text-center">
              <p className="text-xs font-bold text-[#7C5CBF] tracking-widest mb-2">
                📣 TODAY'S DECLARATION
              </p>
              <p className="text-sm font-semibold text-[#5B3FA0] leading-relaxed">
                I declare that God is faithful in every season of my life.
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-[#9B8AC4] mt-4">
          Sample devotional — yours will be uniquely generated by AI
        </p>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-[#7C5CBF] to-[#5B3FA0] py-16 px-6 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to inspire your community?</h2>
        <p className="opacity-80 mb-6 text-sm">
          Generate, save, and manage your devotional library in one place.
        </p>
        <button
          type="button"
          onClick={() => navigate(user ? '/admin' : '/login')}
          className="px-8 py-3 rounded-xl bg-white text-[#5B3FA0] font-bold text-sm hover:bg-[#F8F5FF] transition-colors"
        >
          {user ? 'Go to Admin' : 'Sign in to get started'}
        </button>
      </section>

      <footer className="text-center py-6 text-xs text-[#9B8AC4]">
        Daily Devotional Generator · NKJV · Powered by Claude AI
      </footer>
    </div>
  );
}
