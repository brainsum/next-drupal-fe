import Image from "next/image"
import { absoluteUrl } from "lib/utils"

interface BlockImageProps {
  block: any
}

export function BlockImage({ block, ...props }: BlockImageProps) {
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
        </figure>
      )}
    </div>
  );
}
