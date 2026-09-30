import { useEffect, useState } from 'react';
import { GripVertical } from 'lucide-react';
import { DashboardItem } from '@/shared/types/common';
import { ReorderableProps } from '@/shared/types/component';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const Reorderable = ({ initialItems }: ReorderableProps) => {
  const [items, setItems] = useState<DashboardItem[]>(initialItems);

  useEffect(() => {
    setItems((prev) => {
      return initialItems.map((item) => {
        const existing = prev.find((prevItem) => prevItem.id === item.id);
        return {
          ...item,
          colSpan: existing?.colSpan ?? item.colSpan,
        };
      });
    });
  }, [initialItems]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(items);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setItems(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="bento-dashboard" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-12 gap-2 items-stretch"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(draggableProvided, snapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    className={`${item.colSpan} relative flex flex-col group transition-all duration-200 ${
                      snapshot.isDragging
                        ? 'ring-2 ring-primary shadow-2xl z-50 rounded-2xl scale-[1.02]'
                        : ''
                    }`}
                  >
                    <div
                      {...draggableProvided.dragHandleProps}
                      className="absolute top-2 right-2 z-20 p-1.5 rounded-lg bg-background/80 backdrop-blur border border-border/50 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing hover:bg-accent hover:text-foreground"
                      title="Drag to reposition card"
                    >
                      <GripVertical className="size-4" />
                    </div>

                    <div className="h-full w-full flex-1">{item.component}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Reorderable;
