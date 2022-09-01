import Image from "next/image"
import { BlockColumns } from "./blocks/block_columns"
import { BlockImage } from "./blocks/block_image"
import { BlockImageWithText } from "./blocks/block_image_with_text"
import { BlockText } from "./blocks/block_text"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeArticleProps {
  node: DrupalNode
}

interface BlockProps {
  id:string,
  type: string
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {

  const organizedBlocks = {};

  node.field_blocks.map((block) => {
    const parentId = block.behavior_settings?.layout_paragraphs?.parent_uuid || false;

    if (parentId) {
      organizedBlocks[parentId].children[block.id] = block;
    } else {
      organizedBlocks[block.id] = block;
      organizedBlocks[block.id].children = {};
    }
  });

  const blocks = Object.values(organizedBlocks);
  console.log(node.field_image);
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      {node.field_image && (
        <figure className="my-4">
          <Image
            src={absoluteUrl(node.field_image.uri.url)}
            width={768}
            height={480}
            layout="responsive"
            objectFit="cover"
            alt={node.field_image.resourceIdObjMeta.alt}
          />
        </figure>
      )}
      {blocks && blocks.map((b:BlockProps) => {
        switch(b.type) {
          case 'paragraph--columns':
            return (<BlockColumns key={b.id} block={b}/>)
          case 'paragraph--image':
            return (<BlockImage key={b.id} block={b}/>)
          case 'paragraph--image_with_text':
            return (<BlockImageWithText key={b.id} block={b}/>)
          case 'paragraph--text':
            return (<BlockText key={b.id} block={b}/>)
        }
      })}
    </article>
  )
}
