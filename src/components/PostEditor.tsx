"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PostEditorHandle {
  getHTML: () => string;
  getJSON: () => unknown;
}

interface PostEditorProps {
  initialHTML?: string;
  onImageUpload?: (file: File) => Promise<string>;
  onChange?: (hasContent: boolean) => void;
}

const PostEditor = forwardRef<PostEditorHandle, PostEditorProps>(
  function PostEditor({ initialHTML, onImageUpload, onChange }, ref) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const editor = useEditor({
      immediatelyRender: false,
      extensions: [StarterKit, Image],
      content: initialHTML ?? "",
      editorProps: {
        attributes: {
          class:
            "prose prose-gray max-w-none min-h-[300px] focus:outline-none p-4",
        },
      },
      onUpdate: ({ editor }) => {
        onChange?.(!editor.isEmpty);
      },
    });

    useImperativeHandle(ref, () => ({
      getHTML: () => editor?.getHTML() ?? "",
      getJSON: () => editor?.getJSON() ?? {},
    }));

    const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor || !onImageUpload) return;
      setUploadingImage(true);
      try {
        const url = await onImageUpload(file);
        editor.chain().focus().setImage({ src: url }).run();
      } finally {
        setUploadingImage(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    return (
      <div className="border border-gray-300 rounded overflow-hidden">
        {editor && (
          <div className="flex gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
              title="Bold"
            >
              <strong>B</strong>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
              title="Italic"
            >
              <em>I</em>
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor.isActive("heading", { level: 2 })}
              title="Heading 2"
            >
              H2
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              active={editor.isActive("heading", { level: 3 })}
              title="Heading 3"
            >
              H3
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
              title="Bullet list"
            >
              • List
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
              title="Ordered list"
            >
              1. List
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive("blockquote")}
              title="Blockquote"
            >
              ❝
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              active={editor.isActive("codeBlock")}
              title="Code block"
            >
              {"</>"}
            </ToolbarButton>
            {onImageUpload && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageFile}
                />
                <ToolbarButton
                  onClick={() => fileInputRef.current?.click()}
                  active={false}
                  title="Insert image"
                  disabled={uploadingImage}
                >
                  {uploadingImage ? "Uploading…" : "🖼 Image"}
                </ToolbarButton>
              </>
            )}
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
    );
  }
);

function ToolbarButton({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  active: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn("px-2 h-7 text-sm", !active && "text-gray-700")}
    >
      {children}
    </Button>
  );
}

export default PostEditor;
