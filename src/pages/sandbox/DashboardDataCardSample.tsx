import { useState } from 'react';
import {
  Calendar,
  CreditCard,
  Layers,
  Sparkles,
  MapPin,
  Users,
  ShieldCheck,
  ShieldAlert,
  DollarSign,
  Copy,
  Check,
  Sliders,
} from 'lucide-react';
import { DashboardDataCardProps } from '@/shared/types/common';
import DashboardDataCard from '@/components/common/DashboardDataCard';

const AVAILABLE_ICONS = {
  CreditCard,
  Calendar,
  DollarSign,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Layers,
  Users,
};

export const DashboardDataCardSample = () => {
  const [label, setLabel] = useState<string>('Monthly Subscription');
  const [iconName, setIconName] = useState<keyof typeof AVAILABLE_ICONS>('CreditCard');
  const [value, setValue] = useState<string>('49.99');
  const [status, setStatus] = useState<string>('normal');
  const [price, setPrice] = useState<boolean>(true);
  const [suffix, setSuffix] = useState<string>(' /mo');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  const SelectedIcon = AVAILABLE_ICONS[iconName];

  const resolvedStatus =
    status === 'true'
      ? true
      : status === 'false'
        ? false
        : (status as DashboardDataCardProps['status']);

  const generateCodeSnippet = () => {
    const props: string[] = [`label="${label}"`, `icon={${iconName}}`];

    if (value)
      props.push(
        `value=${typeof value === 'number' || !isNaN(Number(value)) ? `{${value}}` : `"${value}"`}`,
      );
    if (status !== 'normal')
      props.push(`status={${status === 'true' || status === 'false' ? status : `"${status}"`}`);
    if (price) props.push('price');
    if (suffix) props.push(`suffix="${suffix}"`);
    if (isLoading) props.push('isLoading={true}');

    return `<DashboardDataCard\n  ${props.join('\n  ')}\n/>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    {
      title: 'Formatted Price',
      props: { label: 'Monthly Rate', icon: CreditCard, value: 49, price: true, suffix: ' /mo' },
    },
    {
      title: 'Boolean Status (Verified)',
      props: { label: 'Address Details', icon: MapPin, status: true },
    },
    {
      title: 'Boolean Status (Unverified)',
      props: { label: 'Identity Verification', icon: ShieldAlert, status: false },
    },
    {
      title: 'Custom Metric & Suffix',
      props: { label: 'Max Bookings', icon: Layers, value: 150, suffix: ' /mo' },
    },
    {
      title: 'Custom String Status',
      props: { label: 'Trial Window', icon: Sparkles, value: '14 Days', status: true },
    },
    {
      title: 'Plain Text Value',
      props: { label: 'Active Plan', icon: ShieldCheck, value: 'Pro Tier' },
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-bold">Interactive Component Playground</h2>
          </div>
          <button
            onClick={() => setIsLoading((prev) => !prev)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm"
          >
            Toggle Loading ({isLoading ? 'ON' : 'OFF'})
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Value</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Suffix</label>
                <input
                  type="text"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Icon</label>
                <select
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value as keyof typeof AVAILABLE_ICONS)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {Object.keys(AVAILABLE_ICONS).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="normal">normal</option>
                  <option value="true">true (Verified)</option>
                  <option value="false">false (Unverified)</option>
                  <option value="verified">verified</option>
                  <option value="unverified">unverified</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="price-toggle"
                checked={price}
                onChange={(e) => setPrice(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="price-toggle"
                className="text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Format as Price (`price={'{true}'}`)
              </label>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-4 bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl border border-slate-200 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2 block">
                Live Preview
              </span>
              <DashboardDataCard
                label={label}
                icon={SelectedIcon}
                value={value}
                status={resolvedStatus}
                price={price}
                suffix={suffix}
                isLoading={isLoading}
              />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Generated JSX Code
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy JSX
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-zinc-900 text-zinc-100 text-xs font-mono overflow-x-auto border border-zinc-800">
                {generateCodeSnippet()}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Preset Common Usages
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {presets.map((preset, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="text-[11px] font-medium text-slate-500">{preset.title}</span>
              <DashboardDataCard {...preset.props} isLoading={isLoading} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardDataCardSample;
