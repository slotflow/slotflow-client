import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { useIntegration } from '@/hooks/useIntegration';
import IntegrationCard from '../../components/integrations/IntegrationCard';
import stripeLogo from '../../assets/logos/external/stripe.jpeg';
import { Role, PaymentAccountStatus } from '@/shared/types/enums';
import googleCalendarLogo from '../../assets/logos/external/googleCalendar.png';

const IntegrationsSettingsPage = () => {
  const { connectStripe, connectGoogleCalendar } = useIntegration();
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const { googleCalendar, stripe } = useSelector((state: RootState) => state.integration);

  if (!authUser) return null;

  const listData = [
    {
      image: googleCalendarLogo,
      heading: 'Google',
      description:
        'Connect your Google calendar to enable calendar syncing and manage your appointments automatically avoid overlapping.',
      title: 'Connect Google',
      text: 'Connect',
      action: connectGoogleCalendar,
      show: true,
      connectionStatus: googleCalendar.isConnected,
      connectionText: 'Connected',
      isLoading: googleCalendar.isConnecting,
    },
    {
      image: stripeLogo,
      heading: 'Stripe',
      description:
        'Connect your Stripe account to securely manage payments, payouts, and transaction tracking.',
      title: 'Connect Stripe',
      text: 'Connect',
      action: () => connectStripe({ email: authUser.email }),
      show: authUser?.role !== Role.PROVIDER,
      connectionStatus: stripe.status === PaymentAccountStatus.ACTIVE,
      connectionText:
        stripe.status === PaymentAccountStatus.ACTIVE
          ? 'Connected'
          : stripe.status === PaymentAccountStatus.RESTRICTED
            ? 'Restricted'
            : stripe.status === PaymentAccountStatus.PENDING
              ? 'Pending'
              : 'Not Connected',
      isLoading: stripe.isConnecting,
    },
  ];

  if (!authUser) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-3 py-2">
      {listData?.map((item, index) => (
        <IntegrationCard
          key={index}
          image={item.image}
          heading={item.heading}
          description={item.description}
          title={item.title}
          text={item.text}
          action={item.action}
          show={item.show}
          connectionStatus={item.connectionStatus}
          connectionText={item.connectionText}
          isLoading={item.isLoading}
        />
      ))}
    </div>
  );
};

export default IntegrationsSettingsPage;
