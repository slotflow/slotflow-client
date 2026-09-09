import { useState } from 'react';
import {
  Tag,
  Hash,
  Video,
  Users,
  Layers,
  FileText,
  Notebook,
  UserPlus,
  Briefcase,
  LayoutGrid,
  IndianRupee,
  ClipboardList,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../ui/button';
import DataField from '../app/DataField';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import DataFetchingError from '../error/DataFetchingError';
import { defaultButtonClassName } from '@/shared/utils/constants';
import { ProviderServiceListProps } from '@/shared/types/component';
import ProviderServiceForm from '../form/provider/ProviderServiceForm';

const ProviderServiceList = ({
  providerId,
  fetchApiFunction,
  queryKey,
  canUpdate = false,
  showHeading = false,
}: ProviderServiceListProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const res = await fetchApiFunction(providerId);
      return res.data;
    },
    queryKey: [...queryKey, providerId],
  });

  if (isError) {
    return <DataFetchingError message={error?.message} />;
  }

  return (
    <div className="space-y-6 pb-8 sm:pb-12">
      {(showHeading || canUpdate) && (
        <div className="flex items-center justify-between gap-4 py-1">
          <div>
            {showHeading && (
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-indigo-500" /> Service Details
              </h3>
            )}
          </div>

          {canUpdate && (
            <Button
              title={showForm ? 'Cancel Update' : 'Update Service'}
              variant={showForm ? 'destructive' : 'default'}
              className={defaultButtonClassName}
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
            >
              {showForm ? 'Cancel Update' : 'Update Service'}
            </Button>
          )}
        </div>
      )}

      {/* Primary Service Profile Information */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-4">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-border/60 pb-3">
          <Briefcase className="w-4 h-4 text-indigo-500" /> Primary Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataField
            label="Category"
            value={data?.serviceId?.serviceName}
            Icon={LayoutGrid}
            isLoading={isLoading}
            shimmerWidth="w-32"
          />

          <DataField
            label="Service Title"
            value={data?.serviceName}
            Icon={Tag}
            isLoading={isLoading}
            shimmerWidth="w-36"
          />

          <DataField
            label="Pricing"
            value={
              data?.servicePrice !== undefined && data?.servicePrice !== null
                ? `₹${data.servicePrice.toLocaleString('en-IN')}`
                : undefined
            }
            Icon={IndianRupee}
            isLoading={isLoading}
            shimmerWidth="w-24"
          />

          <DataField
            label="Service Mode / Type"
            value={data?.serviceType}
            Icon={Layers}
            isLoading={isLoading}
            shimmerWidth="w-28"
          />

          <div className="md:col-span-2">
            <DataField
              label="Service Description"
              value={data?.serviceDescription}
              Icon={FileText}
              isLoading={isLoading}
              shimmerWidth="w-full"
            />
          </div>
        </div>
      </div>

      {/* Experience & Requirements Card */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-4">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-border/60 pb-3">
          <Briefcase className="w-4 h-4 text-indigo-500" /> Experience & Requirements
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataField
            label="Experience (Years)"
            value={
              data?.serviceExperienceYears !== undefined
                ? `${data.serviceExperienceYears} Year${data.serviceExperienceYears === 1 ? '' : 's'}`
                : undefined
            }
            Icon={Briefcase}
            isLoading={isLoading}
            shimmerWidth="w-24"
          />

          <DataField
            label="Experience Summary"
            value={data?.serviceExperience}
            Icon={FileText}
            isLoading={isLoading}
            shimmerWidth="w-36"
          />

          <DataField
            label="Group Service Offer"
            value={
              data?.isGroupService !== undefined ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {data.isGroupService ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Yes
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-rose-500" /> No
                    </>
                  )}
                </span>
              ) : undefined
            }
            Icon={Users}
            isLoading={isLoading}
            shimmerWidth="w-20"
          />

          {data?.isGroupService && (
            <DataField
              label="Max Participants"
              value={data?.maxParticipants?.toString()}
              Icon={UserPlus}
              isLoading={isLoading}
              shimmerWidth="w-20"
            />
          )}

          {data?.requirements && data.requirements.length > 0 && (
            <div className="md:col-span-2 space-y-3 pt-2 border-t border-slate-100 dark:border-border/40">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
                Requirements Checklist
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.requirements.map((req: string, i: number) => (
                  <DataField
                    key={i}
                    label={`Requirement ${i + 1}`}
                    value={req}
                    Icon={ClipboardList}
                    isLoading={isLoading}
                    shimmerWidth="w-32"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Links, Demos & Tags Section */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-4">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-border/60 pb-3">
          <Hash className="w-4 h-4 text-indigo-500" /> Media & Search Tags
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataField
            label="Demo Video"
            value={
              data?.videoUrl ? (
                <a
                  href={data.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium hover:underline text-xs"
                >
                  Watch Demo Video <ExternalLink className="w-3 h-3" />
                </a>
              ) : undefined
            }
            Icon={Video}
            isLoading={isLoading}
            shimmerWidth="w-28"
          />

          <DataField
            label="Portfolio Link"
            value={
              data?.portfolioUrl ? (
                <a
                  href={data.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium hover:underline text-xs"
                >
                  View Portfolio <ExternalLink className="w-3 h-3" />
                </a>
              ) : undefined
            }
            Icon={Notebook}
            isLoading={isLoading}
            shimmerWidth="w-28"
          />

          <div className="md:col-span-2">
            <DataField
              label="Associated Tags"
              value={
                data?.tags && data.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {data.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/60 dark:border-border/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : undefined
              }
              Icon={Hash}
              isLoading={isLoading}
              shimmerWidth="w-40"
            />
          </div>
        </div>
      </div>

      {/* Animated Update Form */}
      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="provider-service-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
              <ProviderServiceForm isUpdating={true} heading="Update Service Details" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProviderServiceList;
