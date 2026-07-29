/**
 * Editorial section eyebrow: a gold tick line + uppercase label,
 * optionally prefixed with a serif index number (01 / 02 …).
 */
export default function SectionLabel({
  children,
  align = 'left',
  light = false,
  index,
}: {
  children: React.ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  index?: string;
}) {
  const lineColor = light ? 'bg-gold-400/60' : 'bg-gold/60';
  return (
    <div
      className={`flex items-center gap-4 ${
        align === 'center' ? 'justify-center' : ''
      }`}
    >
      <span className={`h-px w-10 ${lineColor}`} />
      {index && (
        <span
          className={`index-mark text-sm ${
            light ? 'text-ink-900/30' : 'text-white/25'
          }`}
        >
          {index}
        </span>
      )}
      <span className={`eyebrow ${light ? 'text-gold-500' : ''}`}>
        {children}
      </span>
      {align === 'center' && (
        <span className={`h-px w-10 ${lineColor}`} />
      )}
    </div>
  );
}
