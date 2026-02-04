import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ value, onChange }) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input.trim() === "") return;
    onChange([...value, input.trim()]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="w-full">
      <label className="text-sm font-medium">Tags</label>

      <div className="flex gap-2 mt-2">
        <Input
          type="text"
          value={input}
          placeholder="Type a tag and press Add"
          onChange={(e) => setInput(e.target.value)}
          className="border rounded-md px-3 py-2 w-full text-sm"
        />
        <Button
          type="button"
          variant="default"
          onClick={addTag}
          className="cursor-pointer w-10/12 md:w-auto hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)] flex items-center gap-2"
        >
          Add
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
              type="button"
              variant="ghost"
              onClick={() => removeTag(tag)}
              className="text-red-600 font-bold text-xs cursor-pointer"
            >
              ×
            </Button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
