import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import { appConfig } from '@/config/env';
import { chatSocket } from '@/lib/socketService';
import { Image, Send, Trash } from 'lucide-react';
import { sendMessage } from '@/services/apis/message';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { MessageInputProps } from '@/shared/types/component';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { allowedFileTypes, maxFileSize } from '@/shared/utils/constants/appConstants';

const MessageInput = ({ setIsTyping, isTyping, setMessageSenderId }: MessageInputProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { authUser } = useSelector((store: RootState) => store.auth);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { selectedUser } = useSelector((store: RootState) => store.chat);

  const [file, setFile] = useState<File | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    setIsTyping(false);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [selectedUser?._id, setIsTyping]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const selectedFile = input.files?.[0];

    input.value = '';

    if (!selectedFile) return;

    setFile(null);
    setImagePreview(null);

    if (!allowedFileTypes.includes(selectedFile.type as (typeof allowedFileTypes)[number])) {
      toast.error('Only PNG, JPEG, and WebP images are allowed.');
      return;
    }

    if (selectedFile.size === 0) {
      toast.error('The selected image is empty.');
      return;
    }

    if (selectedFile.size > maxFileSize) {
      toast.error('Chat images must not exceed 5 MiB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFile(selectedFile);
        setImagePreview(reader.result);
      }
    };

    reader.onerror = () => {
      toast.error('Unable to read the selected image.');
    };

    reader.readAsDataURL(selectedFile);
  };

  const removeImage = (): void => {
    setImagePreview(null);
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSending || (!text.trim() && !file)) return;
    if (!selectedUser) return;

    const formData = new FormData();

    if (file) {
      formData.append('messageImage', file);
    }

    formData.append('text', text.trim());

    setIsSending(true);

    try {
      await dispatch(
        sendMessage({
          selectedUserId: selectedUser._id,
          messageData: formData,
        }),
      ).unwrap();

      setText('');
      removeImage();
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.error('Failed to send message:', error);
      }

      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (!authUser || !selectedUser) return;

    if (!isTyping) {
      setIsTyping(true);
      if (chatSocket) {
        setMessageSenderId(authUser.uid ?? null);
        chatSocket.emit('typing', {
          fromUserId: authUser.uid,
          toUserId: selectedUser?._id,
        });
      }
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (chatSocket) {
        setMessageSenderId(authUser.uid ?? null);
        chatSocket.emit('stopTyping', {
          fromUserId: authUser.uid,
          toUserId: selectedUser._id,
        });
      }
    }, 1000);
  };

  return (
    <div className="h-16 w-full border-t p-4 relative">
      {imagePreview && (
        <div className="absolute bottom-full mb-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <Button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center cursor-pointer hover:text-red-500"
              type="button"
            >
              <Trash className="size-3" />
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 h-full">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full h-10 border border-input bg-background px-3 text-sm rounded-lg outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
            placeholder="Message"
            value={text}
            onChange={handleTyping}
            disabled={isSending}
          />
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        <button
          type="button"
          className={`flex btn btn-circle btn-sm cursor-pointer
                     ${imagePreview ? 'text-emerald-500' : 'text-neutral-600'}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>
        <button
          type="submit"
          className="btn btn-sm text-neutral-600 cursor-pointer"
          disabled={isSending || (!text.trim() && !file)}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
