import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, type Block } from "@blocknote/core";
import * as styles from "./RichTextViewer.css";
import { useCallback, useMemo } from "react";

interface RichTextViewerProps {
  content: Block[];
}

const defaultContent: Block[] = [
  {
    id: "f48a6c9a-b38d-4271-8a26-4d139ffda2db",
    type: "paragraph",
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "Welcome to this demo!",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "26e99775-d09b-4d06-9267-210e89d6436f",
    type: "heading",
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
      level: 1,
      isToggleable: false,
    },
    content: [
      {
        type: "text",
        text: "This is a heading block",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "9630790e-9342-4e4b-ae6e-2d01292eedfa",
    type: "paragraph",
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "This is a paragraph block",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "9af19e45-6026-41a1-9eef-f018249d5408",
    type: "paragraph",
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
    content: [],
    children: [],
  },
];

export function RichTextViewer({ content }: RichTextViewerProps) {
  const handleValue = useCallback((value: string | Block[]) => {
    if (typeof value === "string") {
      return defaultContent;
    }
    return value;
  }, []);

  const editor = useMemo(() => {
    return BlockNoteEditor.create({
      initialContent: handleValue(content),
    });
  }, [content, handleValue]);

  return (
    <div className={styles.viewerWrapper}>
      <BlockNoteView editor={editor} editable={false} theme="light" />
    </div>
  );
}
