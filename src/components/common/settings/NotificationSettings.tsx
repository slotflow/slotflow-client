import React from 'react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const NotificationSettings: React.FC = () => {
    return (
        <React.Fragment>
            <div className='flex-none'>
                <h3 className='text-lg font-medium'>Notifications</h3>
                <p className='text-muted-foreground text-sm'>Notifications description</p>
            </div>
            <Separator className='my-4 flex-none' />
            <div className="space-y-3">
                <Label className="text-sm font-medium">Notify me about...</Label>
                <RadioGroup defaultValue="all" className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all" className="font-normal">
                            All new messages
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mentions" id="mentions" />
                        <Label htmlFor="mentions" className="font-normal">
                            Direct messages and mentions
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="none" />
                        <Label htmlFor="none" className="font-normal">
                            Nothing
                        </Label>
                    </div>
                </RadioGroup>

                <div className='relative'>
                    <h3 className='mb-4 text-lg font-medium'>Email Notifications</h3>
                    <div className='space-y-4 w-8/12'>
                        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base">Communication Email</Label>
                                <p className="text-sm text-gray-500">Receive emails about your account activity.</p>
                            </div>
                            <Switch checked={false} />
                        </div>
                        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base">Marketing Emails</Label>
                                <p className="text-sm text-gray-500">Receive emails about new products, features, and more.</p>
                            </div>
                            <Switch checked={false} />
                        </div>
                        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base">Social Emails</Label>
                                <p className="text-sm text-gray-500">Receive emails from our social platforms.</p>
                            </div>
                            <Switch checked={false} />
                        </div>
                        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base">Security Emails</Label>
                                <p className="text-sm text-gray-500">Receive emails about your account activity and security.</p>
                            </div>
                            <Switch checked={false} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NotificationSettings;