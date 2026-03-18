import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const NotificationCard = () => {

    return (
        <Alert>
            <AlertTitle>Payment successful</AlertTitle>
            <AlertDescription>
                Your payment of $29.99 has been processed. A receipt has been sent to
                your email address.
            </AlertDescription>
        </Alert>
    );
};

export default NotificationCard;