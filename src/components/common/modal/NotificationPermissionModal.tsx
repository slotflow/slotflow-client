import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface NotificationPermissionModalProps {
    open: boolean;
    onAllow: () => void;
    onDecline: () => void;
}

const NotificationPermissionModal: React.FC<NotificationPermissionModalProps> = ({
    onAllow,
    onDecline,
    open
}) => {
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enable Notifications?</DialogTitle>
                    <DialogDescription>
                        Slotflow can notify you about bookings, cancellations, and payments.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={onDecline}>
                        Not now
                    </Button>
                    <Button onClick={onAllow}>
                        Allow
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NotificationPermissionModal;
