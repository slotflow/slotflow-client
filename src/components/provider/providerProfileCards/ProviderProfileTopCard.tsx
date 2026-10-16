import { Role } from '@/shared/types/enums';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Check, Share2, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ProviderProfileTopCardProps } from '@/shared/types/component';
import { useCopy } from '@/hooks/useCopy';
import ProfileImage from '@/components/profile/ProfileImage';

const ProviderProfileTopCard = ({
  isLoading,
  isError,
  name,
  image,
  categoryName,
  trusted,
  role,
  isShowPreview = false,
  handleIsShowPreview,
}: ProviderProfileTopCardProps) => {
  const { copied, copy } = useCopy(2000);

  return (
    <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <div className="h-32 bg-muted/50 relative" />
      <CardContent className="-mt-16 px-6 pb-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
            <ProfileImage
              name={name || 'Provider'}
              profileImage={image}
              size="size-28"
              textSize="text-2xl"
              rounded="full"
              isLoading={isLoading}
              className="border-4 border-background shadow-md"
            />
            <div className="space-y-2 pb-1 flex flex-col items-center md:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {isLoading ? (
                    <div className="w-32 h-6 bg-muted rounded shimmer" />
                  ) : isError ? (
                    <p className="text-red-500 text-sm font-normal">Name fetching error</p>
                  ) : (
                    name
                  )}
                </h1>
                {trusted && (
                  <Badge
                    variant="secondary"
                    className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 flex items-center gap-1 rounded-full text-xs font-semibold mt-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    SlotFlow Trusted
                  </Badge>
                )}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {isLoading ? (
                  <span className="w-38 h-2 bg-muted rounded shimmer" />
                ) : isError ? (
                  <p className="text-red-500 text-sm font-normal">Category fetching error</p>
                ) : (
                  categoryName
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Button
              variant="outline"
              size="sm"
              className={`cursor-pointer h-9 gap-1.5 transition-all duration-200 ${
                copied
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-500/60 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/60'
                  : ''
              }`}
              onClick={() =>
                copy({
                  title: 'Service Provider Profile',
                  text: 'Check out this service provider profile!',
                  url: window.location.href,
                })
              }
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Link copied</span>
                </>
              ) : (
                <>
                  <Share2 className="size-4" />
                  <span>Share Profile</span>
                </>
              )}
            </Button>
            {role === Role.PROVIDER && handleIsShowPreview && (
              <div className="flex items-center space-x-2 mt-2">
                <Label htmlFor="airplane-mode">See how your profile looks to customers</Label>
                <Switch
                  id="preview-mode"
                  checked={isShowPreview}
                  className="cursor-pointer"
                  onCheckedChange={() => handleIsShowPreview()}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderProfileTopCard;
