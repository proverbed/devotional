import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';
import { saveDevotional, deleteDevotional, subscribeToDevotionals } from '../services/devotionals';
import type { Devotional } from '../types/devotional';

const THEMES = [
  "God's Faithfulness",
  'Peace in the Storm',
  'Walking in Faith',
  'His Unfailing Love',
  'Strength & Courage',
  'Hope & Renewal',
  'Gratitude',
  'Purpose & Calling',
  'Forgiveness',
  'Trust in God\'s Plan',
];

// ─── Loading dots ────────────────────────────────────────────────────────────

function LoadingDots() {
  return (
    <div className="flex gap-2 items-center justify-center py-10">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 rounded-full bg-[#7C5CBF] animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

// ─── Devotional card ─────────────────────────────────────────────────────────

interface DevotionalCardProps {
  content: Omit<Devotional, 'id' | 'createdAt' | 'createdBy'>;
}

function DevotionalCard({ content }: DevotionalCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = [
      content.subject,
      '',
      `📖 ${content.theme}`,
      '',
      content.scripture_ref,
      `"${content.scripture}"`,
      '',
      content.reflection,
      '',
      '🙏 Prayer',
      content.prayer,
      '',
      '📣 Declaration',
      content.declaration,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="font-serif max-w-xl mx-auto">
      {/* Subject preview */}
      <div className="bg-[#F3F0FA] border border-[#D6CCF0] rounded-xl px-4 py-2.5 mb-4 text-sm text-[#5A4A8A]">
        <span className="font-bold font-sans">📧 Subject line: </span>
        {content.subject}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#EDE8FB]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7C5CBF] to-[#5B3FA0] px-8 py-7 text-white">
          <p className="text-xs tracking-widest uppercase opacity-75 mb-1 font-sans">
            Daily Devotional · NKJV
          </p>
          <h2 className="text-2xl font-bold">{content.theme}</h2>
          <p className="text-xs opacity-70 mt-1 font-sans">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="px-8 py-6 space-y-5">
          {/* Scripture */}
          <div className="bg-[#F8F5FF] border-l-4 border-[#7C5CBF] rounded-r-xl px-5 py-4">
            <p className="text-xs font-bold text-[#7C5CBF] tracking-widest font-sans mb-2">📖 SCRIPTURE</p>
            <p className="text-[#2D1F4E] italic leading-relaxed">"{content.scripture}"</p>
            <p className="text-xs font-semibold text-[#7C5CBF] mt-2 font-sans">— {content.scripture_ref}</p>
          </div>

          {/* Reflection */}
          <div>
            <p className="text-xs font-bold text-[#7C5CBF] tracking-widest font-sans mb-2">✨ REFLECTION</p>
            <p className="text-[#3D3050] leading-relaxed text-sm">{content.reflection}</p>
          </div>

          {/* Prayer */}
          <div className="bg-[#FFF8F0] border border-[#F5DEB3] rounded-xl px-5 py-4">
            <p className="text-xs font-bold text-[#B8860B] tracking-widest font-sans mb-2">🙏 PRAYER</p>
            <p className="text-[#3D3050] italic leading-relaxed text-sm">{content.prayer}</p>
          </div>

          {/* Declaration */}
          <div className="bg-gradient-to-r from-[#F3F0FA] to-[#EDE8FB] rounded-xl px-5 py-4 text-center">
            <p className="text-xs font-bold text-[#7C5CBF] tracking-widest font-sans mb-2">📣 TODAY'S DECLARATION</p>
            <p className="text-[#5B3FA0] font-semibold leading-relaxed text-sm">{content.declaration}</p>
          </div>
        </div>
      </div>

      {/* Copy button */}
      <button
        type="button"
        onClick={handleCopy}
        className="mt-3 w-full py-3 rounded-xl border border-[#D6CCF0] bg-white text-[#5B3FA0] font-semibold text-sm hover:bg-[#F3F0FA] transition-colors font-sans"
      >
        {copied ? '✅ Copied!' : '📋 Copy for newsletter'}
      </button>
    </div>
  );
}

// ─── Library item ─────────────────────────────────────────────────────────────

interface LibraryItemProps {
  item: Devotional;
  onDelete: (id: string) => void;
}

function LibraryItem({ item, onDelete }: LibraryItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-[#EDE8FB] rounded-2xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full text-left px-6 py-4 flex items-start justify-between gap-4 hover:bg-[#F8F5FF] transition-colors"
      >
        <div>
          <p className="font-semibold text-[#2D1F4E]">{item.theme}</p>
          <p className="text-xs text-[#9B8AC4] mt-0.5 font-sans">
            {item.scripture_ref} ·{' '}
            {new Date(item.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
        <span className="text-[#9B8AC4] text-lg mt-0.5">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-[#EDE8FB] pt-4">
          <DevotionalCard content={item} />
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="mt-2 px-4 py-2 rounded-lg border border-red-200 text-red-500 text-xs font-semibold font-sans hover:bg-red-50 transition-colors"
          >
            Delete devotional
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Generate tab ─────────────────────────────────────────────────────────────

interface GenerateTabProps {
  userEmail: string;
}

type GenerateStep = 'idle' | 'generating' | 'result';

function GenerateTab({ userEmail }: GenerateTabProps) {
  const [step, setStep] = useState<GenerateStep>('idle');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [customTheme, setCustomTheme] = useState('');
  const [devotional, setDevotional] = useState<Omit<Devotional, 'id' | 'createdAt' | 'createdBy'> | null>(null);
  const [saving, setSaving] = useState(false);

  const activeTheme = selectedTheme === 'custom' ? customTheme : selectedTheme;

  const generate = async () => {
    if (!activeTheme) return;
    setStep('generating');

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;
      if (!apiKey) throw new Error('VITE_ANTHROPIC_API_KEY is not set');

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1000,
          system:
            'You are a warm, Spirit-filled devotional writer. You write short, powerful daily devotionals using the New King James Version (NKJV) of the Bible. Every devotional must be readable in about 2 minutes. Always respond with ONLY valid JSON, no markdown, no extra text.',
          messages: [
            {
              role: 'user',
              content: `Write a daily devotional on the theme: "${activeTheme}".

Return ONLY this JSON structure:
{
  "subject": "a compelling email subject line under 60 characters",
  "theme": "${activeTheme}",
  "scripture": "the scripture verse text (NKJV)",
  "scripture_ref": "Book Chapter:Verse",
  "reflection": "2-3 warm, encouraging paragraphs connecting the scripture to daily life. About 120-150 words.",
  "prayer": "A personal, heartfelt prayer of 3-4 sentences. Start with 'Father,'",
  "declaration": "A bold, first-person faith declaration. One or two sentences. Start with 'I declare'"
}`,
            },
          ],
        }),
      });

      const data = await response.json() as {
        content: Array<{ text?: string }>;
        error?: { message: string };
      };
      if (data.error) throw new Error(data.error.message);

      const text = data.content.map((b) => b.text ?? '').join('');
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim()) as Omit<
        Devotional,
        'id' | 'createdAt' | 'createdBy'
      >;
      setDevotional(parsed);
      setStep('result');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Generation failed. Try again.');
      setStep('idle');
    }
  };

  const handleSave = async () => {
    if (!devotional) return;
    setSaving(true);
    try {
      await saveDevotional(devotional, userEmail);
      toast.success('Devotional saved to library!');
    } catch {
      toast.error('Failed to save devotional.');
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setStep('idle');
    setDevotional(null);
    setSelectedTheme('');
    setCustomTheme('');
  };

  if (step === 'generating') {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-[#EDE8FB]">
        <LoadingDots />
        <p className="text-[#7C5CBF] font-semibold">
          Preparing your devotional on <em>"{activeTheme}"</em>…
        </p>
        <p className="text-[#B0A0E0] text-sm mt-1 font-sans">
          Searching NKJV scripture · Writing reflection · Crafting prayer
        </p>
      </div>
    );
  }

  if (step === 'result' && devotional) {
    return (
      <div>
        <DevotionalCard content={devotional} />
        <div className="flex gap-3 mt-4 max-w-xl mx-auto font-sans">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 rounded-xl bg-[#7C5CBF] text-white font-semibold text-sm hover:bg-[#5B3FA0] disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving…' : '💾 Save to Library'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="flex-1 py-3 rounded-xl border-2 border-[#7C5CBF] text-[#7C5CBF] font-semibold text-sm hover:bg-[#F3F0FA] transition-colors"
          >
            ↩ Generate Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EDE8FB]">
        <p className="text-xs font-bold text-[#5B3FA0] tracking-widest mb-4 font-sans">
          STEP 1 — CHOOSE A THEME
        </p>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTheme(t)}
              className={[
                'px-3 py-1.5 rounded-full text-sm font-sans transition-all',
                selectedTheme === t
                  ? 'bg-[#7C5CBF] text-white font-semibold border-2 border-[#7C5CBF]'
                  : 'bg-white text-[#5B3FA0] border border-[#D6CCF0] hover:border-[#7C5CBF]',
              ].join(' ')}
            >
              {t}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelectedTheme('custom')}
            className={[
              'px-3 py-1.5 rounded-full text-sm font-semibold font-sans transition-all',
              selectedTheme === 'custom'
                ? 'bg-[#7C5CBF] text-white border-2 border-[#7C5CBF]'
                : 'bg-white text-[#9B8AC4] border border-dashed border-[#B0A0E0] hover:border-[#7C5CBF]',
            ].join(' ')}
          >
            + Custom theme
          </button>
        </div>

        {selectedTheme === 'custom' && (
          <input
            value={customTheme}
            onChange={(e) => setCustomTheme(e.target.value)}
            placeholder="Type your theme, e.g. 'Healing' or 'Patience'"
            className="mt-3 w-full px-3 py-2 rounded-lg border border-[#D6CCF0] text-sm text-[#2D1F4E] outline-none focus:ring-2 focus:ring-[#7C5CBF]/30 font-sans"
          />
        )}
      </div>

      <button
        type="button"
        onClick={generate}
        disabled={!activeTheme}
        className="w-full py-4 rounded-xl text-white font-bold text-base transition-all font-sans disabled:cursor-not-allowed"
        style={{
          background: activeTheme
            ? 'linear-gradient(135deg, #7C5CBF, #5B3FA0)'
            : '#D6CCF0',
          boxShadow: activeTheme ? '0 4px 16px rgba(124,92,191,0.35)' : 'none',
        }}
      >
        ✨ Generate Today's Devotional
      </button>
    </div>
  );
}

// ─── Library tab ──────────────────────────────────────────────────────────────

function LibraryTab() {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToDevotionals((items) => {
      setDevotionals(items);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDevotional(id);
      toast.success('Devotional deleted.');
    } catch {
      toast.error('Failed to delete.');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <LoadingDots />
      </div>
    );
  }

  if (devotionals.length === 0) {
    return (
      <div className="text-center py-16 text-[#B0A0E0]">
        <div className="text-4xl mb-3">📚</div>
        <p className="font-semibold text-[#9B8AC4]">No saved devotionals yet</p>
        <p className="text-sm mt-1">Generate one and save it to your library.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {devotionals.map((d) => (
        <LibraryItem key={d.id} item={d} onDelete={handleDelete} />
      ))}
    </div>
  );
}

// ─── Admin page ───────────────────────────────────────────────────────────────

type AdminTab = 'generate' | 'library';

export function Admin() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState<AdminTab>('generate');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5FF] to-[#EDE8FB]">
      {/* Header */}
      <header className="bg-white border-b border-[#EDE8FB] shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">✝️</span>
            <span className="font-bold text-[#2D1F4E]">Daily Devotional</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#9B8AC4] font-sans hidden sm:block">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={() => signOut()}
              className="px-3 py-1.5 rounded-lg border border-[#D6CCF0] text-[#5B3FA0] text-xs font-semibold font-sans hover:bg-[#F3F0FA] transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-[#EDE8FB] rounded-xl p-1 mb-6 font-sans shadow-sm">
          {(['generate', 'library'] as AdminTab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={[
                'flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize',
                tab === t
                  ? 'bg-[#7C5CBF] text-white shadow-sm'
                  : 'text-[#9B8AC4] hover:text-[#5B3FA0]',
              ].join(' ')}
            >
              {t === 'generate' ? '✨ Generate' : '📚 Library'}
            </button>
          ))}
        </div>

        {tab === 'generate' && <GenerateTab userEmail={user?.email ?? 'unknown'} />}
        {tab === 'library' && <LibraryTab />}
      </main>
    </div>
  );
}
