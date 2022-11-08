import Image from "next/image"
import { absoluteUrl } from "lib/utils"

interface BlockImageWithTextProps {
  block: any
}

export function BlockImageWithText({ block, ...props }: BlockImageWithTextProps) {
  return (
    <div>
      {block.field_image && (
        <figure>
          <Image
            src={absoluteUrl(block.field_image.uri.url)}
            width={768}
            height={400}
            layout="responsive"
            objectFit="cover"
            alt={block.field_image.resourceIdObjMeta.alt}
            priority
          />
          {block.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {block.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>)}
        {block.field_text?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: block.field_text?.processed }}
          className="mt-6 font-serif max-w-none text-xl leading-loose"
        />
      )}
    </div>
  );
}
