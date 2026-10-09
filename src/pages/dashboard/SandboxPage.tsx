import { useState } from 'react';
import { SandboxPageProps } from '@/shared/types/component';

type ComponentPropsMap = Record<string, unknown>;

export const SandboxPage = ({ specs }: SandboxPageProps) => {
  const [selectedId, setSelectedId] = useState<string>(specs[0]?.id || '');

  const activeSpec = specs.find((s) => s.id === selectedId) || specs[0];
  const [currentProps, setCurrentProps] = useState<ComponentPropsMap>(
    (activeSpec?.defaultProps as ComponentPropsMap) || {},
  );

  const handleSelectChange = (id: string) => {
    setSelectedId(id);
    const newSpec = specs.find((s) => s.id === id);
    if (newSpec) {
      setCurrentProps((newSpec.defaultProps as ComponentPropsMap) || {});
    }
  };

  const handlePropChange = (key: string, value: unknown) => {
    setCurrentProps((prev) => ({ ...prev, [key]: value }));
  };

  if (!activeSpec) return <div>No components registered.</div>;

  const TargetComponent = activeSpec.component;

  return (
    <div className="mx-auto space-y-6 bg-slate-50 dark:bg-zinc-950 min-h-screen text-slate-900 dark:text-slate-50 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 border-slate-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold">Component Test Sandbox</h1>
          <p className="text-xs text-slate-500 mt-1">
            Select a component from the dropdown to preview sample usage and interactive states.
          </p>
        </div>

        <select
          value={selectedId}
          onChange={(e) => handleSelectChange(e.target.value)}
          className="p-2 border rounded-md bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-sm"
        >
          {specs.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="p-4 border rounded-lg bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Manipulation Settings
          </h2>
          {activeSpec.controls ? (
            Object.entries(activeSpec.controls).map(([propKey, control]) => (
              <div key={propKey} className="flex flex-col gap-1 text-sm">
                <label className="font-medium text-xs">{control?.label || propKey}</label>
                {control?.type === 'text' && (
                  <input
                    type="text"
                    value={String(currentProps[propKey] ?? '')}
                    onChange={(e) => handlePropChange(propKey, e.target.value)}
                    className="p-1.5 border rounded bg-slate-50 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700"
                  />
                )}
                {control?.type === 'boolean' && (
                  <input
                    type="checkbox"
                    checked={Boolean(currentProps[propKey])}
                    onChange={(e) => handlePropChange(propKey, e.target.checked)}
                    className="size-4"
                  />
                )}
                {control?.type === 'select' && (
                  <select
                    value={String(currentProps[propKey] ?? '')}
                    onChange={(e) => handlePropChange(propKey, e.target.value)}
                    className="p-1.5 border rounded bg-slate-50 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700"
                  >
                    {control?.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400">
              No manipulation controls configured for this component.
            </p>
          )}
        </div>

        <div className="lg:col-span-2 p-6 border rounded-lg bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 flex items-center justify-center min-h-[300px]">
          <TargetComponent {...(currentProps as Record<string, unknown>)} />
        </div>
      </div>
    </div>
  );
};

export default SandboxPage;
