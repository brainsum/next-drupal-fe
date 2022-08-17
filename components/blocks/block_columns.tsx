import { BlockImage } from "./block_image"
import { BlockImageWithText } from "./block_image_with_text"
import { BlockText } from "./block_text"

interface BlockColumnsProps {
  block: any
}

interface LayoutParagraphsProps{
  region: string
}

interface BehaviorSettingsProps {
  layout_paragraphs: LayoutParagraphsProps
}

interface ChildProps {
  behavior_settings: BehaviorSettingsProps,
  type: string,
  id: string
}

export function BlockColumns({ block, ...props }: BlockColumnsProps) {
  let first = [];
  let second = [];

  Object.values(block.children).map((child: ChildProps) => {
    const region = child.behavior_settings?.layout_paragraphs?.region || false;
    let childElement;

    switch(child.type) {
      case 'paragraph--columns':
        childElement = (<BlockColumns key={child.id} block={child}/>)
        break;
      case 'paragraph--image':
        childElement = (<BlockImage key={child.id} block={child}/>)
        break;
      case 'paragraph--image_with_text':
        childElement = (<BlockImageWithText key={child.id} block={child}/>)
        break;
      case 'paragraph--text':
        childElement = (<BlockText key={child.id} block={child}/>)
        break;
    }

    if (region ==='first') {
      first.push(childElement);
    } else if (region ==='second') {
      second.push(childElement);
    }
  });

  return (
    <div className="flex">
      <div className="w-1/2">
        {first}
      </div>
      <div className="w-1/2">
        {second}
      </div>
    </div>
  );
}
