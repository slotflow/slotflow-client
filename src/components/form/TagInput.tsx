import { useState } from 'react';
import { Input } from '../ui/input';
import { Plus, X } from 'lucide-react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { TagInputProps } from '@/shared/types/component';
import { actionBtnClass, closeBtnClass } from '@/shared/utils/constants';

const TagInput = ({ value, onChange }: TagInputProps) => {
  const [input, setInput] = useState('');

  const addTag = () => {
    if (input.trim() === '') return;
    onChange([...value, input.trim()]);
    setInput('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="w-full mt-5">
      <Label htmlFor="tags" className="text-sm font-medium">
        Tags
      </Label>
      <div className="flex gap-2 mt-1">
        <Input
          type="text"
          value={input}
          placeholder="Enter your tags here"
          onChange={(e) => setInput(e.target.value)}
          className="border rounded-md px-3 py-2 w-full text-sm"
        />
        <Button
          title="Create Tag"
          type="button"
          variant="secondary"
          onClick={addTag}
          className={actionBtnClass}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-2 mt-2 flex-wrap">
        {value.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 border-1 rounded-lg text-sm flex items-center gap-1"
          >
            {tag}
            <Button
              title="Delete tag"
              type="button"
              variant="ghost"
              size='icon'
              onClick={() => removeTag(tag)}
              className={closeBtnClass}
            >
              <X className='w-4 h-4' />
            </Button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
