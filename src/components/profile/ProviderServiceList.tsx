import {
  Tag,
  Hash,
  Video,
  Users,
  Layers,
  XCircle,
  FileText,
  Notebook,
  UserPlus,
  Briefcase,
  LayoutGrid,
  IndianRupee,
  CheckCircle2,
  ExternalLink,
  ClipboardList,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import DataField from '../app/DataField';
import { SelectSeparator } from '../ui/select';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import DataFetchingError from '../error/DataFetchingError';
import { ProviderServiceListProps } from '@/shared/types/component';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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
    <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      {(showHeading || canUpdate) && (
        <CardHeader className="flex justify-between items-center">
          {showHeading && (
            <CardTitle className="flex flex-row space-x-2"> <LayoutGrid className="size-4 text-indigo-500" /> <span>Service</span></CardTitle>
          )}
          {canUpdate && (
            <Button
              title="Update Service"
              variant={showForm ? 'destructive' : 'secondary'}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
            >
              {showForm ? 'Cancel' : 'Update'}
            </Button>
          )}
        </CardHeader>
      )}

      <CardContent>
        <span className="mb-4 text-xs font-medium text-slate-500 dark:text-slate-400 block">
          Primary Information
        </span>

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

        <span className="my-4 text-xs font-medium text-slate-500 dark:text-slate-400 block">
          Primary Information
        </span>

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

        <span className="my-4 text-xs font-medium text-slate-500 dark:text-slate-400 block">
          Media & Search Tags
        </span>

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
      </CardContent>

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
            <SelectSeparator />
            <CardContent className="space-y-2 mt-4">
              <ProviderServiceForm isUpdating={true} heading="Update Service Details" />
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default ProviderServiceList;
