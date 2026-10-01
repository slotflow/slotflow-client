// TODO update this compoenent and use in the settings account

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { Button } from '@/components/ui/button';
// import { AppDispatch } from '@/app/store/appStore';
// import { TimeZone } from '@/shared/types/entity/user';
// import timezone from '../../assets/svgs/timezone.png';
// import { useAppNavigation } from '@/hooks/useAppNavigation';
// import { setBoardingData } from '@/app/store/slices/authSlice';
// import { updateBoardingStep } from '@/app/store/slices/appSlice';
// import TimezoneSelect, { type ITimezone } from 'react-timezone-select';
// import { redirectPaths } from '@/shared/utils/constants/routeConstants';
// import {
//   Check,
//   ChevronLeft,
//   AlertCircle,
//   CheckCircle2,
// } from 'lucide-react';

// export const TimeZoneSelectPage = () => {
//   const { goTo } = useAppNavigation();
//   const dispatch = useDispatch<AppDispatch>();

//   const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
//     Intl.DateTimeFormat().resolvedOptions().timeZone
//   );

//   const timeZonePayload: TimeZone =
//     typeof selectedTimezone === 'object'
//       ? {
//           value: selectedTimezone.value,
//           label: selectedTimezone.label ?? '',
//           offset: selectedTimezone.offset ?? 0,
//           abbrev: selectedTimezone.abbrev ?? '',
//           altName: selectedTimezone.altName ?? '',
//         }
//       : {
//           value: selectedTimezone,
//           label: selectedTimezone,
//           offset: 0,
//           abbrev: '',
//           altName: '',
//         };

//   const handleContinue = () => {
//     if (!timeZonePayload.value) {
//       toast.error('Please select a valid timezone');
//       return;
//     }

//     dispatch(
//       setBoardingData({
//         timeZone: timeZonePayload,
//       })
//     );

//     goTo(redirectPaths.PROFILE_SETUP_HEAR_ABOUT_US);
//   };

//   const handlePrevious = () => {
//     dispatch(updateBoardingStep(5));
//     goTo(redirectPaths.PROFILE_SETUP_USERNAME);
//   };

//   return (
//     <div className="h-full w-full flex flex-col justify-center items-center py-4 sm:py-8 px-4 sm:px-6">
//       <div className="w-full max-w-md sm:max-w-lg mx-auto flex flex-col items-center">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="w-full flex flex-col items-center text-center space-y-4 sm:space-y-6"
//         >
//           {/* Illustration */}
//           <div className="flex items-center justify-center">
//             <img
//               src={timezone}
//               alt="timezone illustration"
//               className="size-52 object-contain"
//             />
//           </div>

//           {/* Heading */}
//           <div className="space-y-1 sm:space-y-1.5 px-2">
//             <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
//               Select your timezone
//             </h2>

//             <p className="text-xs sm:text-sm text-muted-foreground">
//               Ensure accurate calendar schedules, bookings, and notifications.
//             </p>
//           </div>

//           {/* Timezone Field */}
//           <div className="w-full space-y-2 text-left pt-1 sm:pt-2">
//             <div className="relative w-full">
//               <TimezoneSelect
//                 value={selectedTimezone}
//                 onChange={setSelectedTimezone}
//                 className="react-timezone-select-container text-sm font-medium"
//                 classNamePrefix="react-timezone-select"
//                 unstyled
//                 classNames={{
//                   control: (state) =>
//                     `w-full rounded-xl border bg-background px-3.5 py-3 sm:py-3.5 transition-all outline-none ${
//                       state.isFocused
//                         ? 'border-primary ring-1 ring-primary'
//                         : timeZonePayload.value
//                         ? 'border-emerald-500/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
//                         : 'border-input focus:border-primary focus:ring-1 focus:ring-primary'
//                     }`,

//                   menu: () =>
//                     'mt-2 rounded-xl border bg-popover text-popover-foreground shadow-lg overflow-hidden py-1 z-50 max-h-60',

//                   option: (state) =>
//                     `px-3.5 py-2.5 text-sm cursor-pointer transition-colors ${
//                       state.isFocused
//                         ? 'bg-accent text-accent-foreground'
//                         : 'hover:bg-accent/50'
//                     }`,

//                   singleValue: () =>
//                     'text-foreground font-medium',

//                   placeholder: () =>
//                     'text-muted-foreground',
//                 }}
//               />

//               {/* Validation Icon */}
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
//                 {timeZonePayload.value ? (
//                   <CheckCircle2 className="size-4 sm:size-5 text-emerald-500" />
//                 ) : (
//                   <AlertCircle className="size-4 sm:size-5 text-destructive" />
//                 )}
//               </div>
//             </div>

//             {/* Validation Message */}
//             <div className="flex items-center justify-center text-xs pt-1">
//               {timeZonePayload.value ? (
//                 <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
//                   <CheckCircle2 className="size-3.5" />
//                   Selected: {timeZonePayload.value}
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-1.5 text-destructive font-medium">
//                   <AlertCircle className="size-3.5" />
//                   Timezone selection required
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex flex-col-reverse sm:flex-row w-full items-center justify-between gap-2.5 sm:gap-3 pt-2 sm:pt-4">
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={handlePrevious}
//               className="w-full sm:w-1/2 min-w-[110px]"
//             >
//               <ChevronLeft className="size-4" />
//               Previous
//             </Button>

//             <Button
//               type="button"
//               variant="default"
//               onClick={handleContinue}
//               disabled={!timeZonePayload.value}
//               className="w-full sm:w-1/2 min-w-[110px]"
//             >
//               <Check className="size-4" />
//               Continue
//             </Button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default TimeZoneSelectPage;
