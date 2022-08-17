interface BlockTextProps {
  block: any
}

export function BlockText({ block, ...props }: BlockTextProps) {
  return (
    <div>
      {block.field_text?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: block.field_text?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
    </div>
  );
}
